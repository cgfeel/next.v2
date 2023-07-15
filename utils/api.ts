import Storage, { EmptyObject, StorageDataType, STORAGE_KEY, StorageError, SignatureType, SignatureIndexType, UserTokenType } from '@/utils/storage/deviceStorage';
// import { Modal } from 'antd';
import get from 'lodash/get';
import pull from 'lodash/pull';
import random from 'lodash/random';
import capitalize from 'lodash/capitalize';
// import { history } from 'umi';
import { extend, ExtendOptionsInit, ExtendOptionsWithoutResponse, ExtendOptionsWithResponse, OnionOptions, RequestMethod, RequestOptionsInit, ResponseInterceptor, RequestResponse } from 'umi-request';

const API_URL = 'https://jsonplaceholder.typicode.com';
const PREFIX_URI = '/';
const LOGIN_URL = '/auth/login';

export const REFRESH_URL = `${API_URL}${PREFIX_URI}/refresh`;
export const controller = new AbortController();

export type ApiResponseType<T extends any> = StorageDataType<T>|StorageError<T>;

type ApiWaitType = {
    type: string;
    time: number;
};

type ApiQueueType = {
    id: number;
    token: null|UserTokenType;
};

type ApiOptionsType = RequestOptionsInit & Partial<ApiQueueType> & {
    signal?: AbortSignal;
    point?: string;
};

const { signal } = controller;
signal.addEventListener('abort', () => {
    console.log('aborted!');
});

const codeMessage: Record<number, string> = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    429: '请求过于频繁，已被服务器拒绝。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
};

type ResponseType = {
    url: string;
    status: number;
    statusText?: string;
    statusData?: StorageDataType<{ ret: number }>;
    json: () => Promise<{}>
};

type ErrorType = {
    response: ResponseType;
}

const errorHandler = async (error: ErrorType) => {
    const { response } = error;
    if (!response) {
        return error;
    }

    const { url, status, statusText } = response;
    try {
        if (response.statusData && response.statusData.ret) {
            return new StorageError(response.statusData, url, status);
        }
        const resData = await response.json() as StorageDataType<{ ret: number }>;
        return new StorageError(resData, url, status);
    } catch (e) {
        return new StorageError({
            api: url,
            ret: status,
            message: (codeMessage[status]||'请求错误') + (statusText ? `：${statusText}` : ''),
            data: {},
        }, url, status);
    }
};

const waitUntil = async (prop: ApiWaitType, res: boolean = false): Promise<Omit<ApiWaitType, 'time'>> => {
    const { time, ...info } = prop;
    return await new Promise((resolve, reject) => {
        setTimeout(() => res ? resolve(info) : reject(info), time);
    });
};

// 返回null继续定时循环，其他返回
const loadUntil: <T extends null|UserTokenType|StorageError<{}>>(time: number, call: (start: number) => Promise<T>) => Promise<T> = async (time, call) => {
    const start = Date.now();
    const data = await call(start);
    return await new Promise((resolve, reject) => {
        if (null !== data) return data instanceof StorageError ? reject(data) : resolve(data);
        const _timer = setInterval(async () => {
            const data = await call(start);
            if (null !== data) {
                clearInterval(_timer);
                data instanceof StorageError ? reject(data) : resolve(data);
            }
          }, time);
    });
};

type HeadersType = HeadersInit & { 
    Accept?: string;
    Authorization?: string;
    signature?: string;
};

const apiQueue = async (url: string, options: ApiOptionsType & { headers?: HeadersType, signature?: string }): Promise<ApiQueueType> => {
    const { headers = {}, data = {}, signature = '' } = options;
    let { id = 0 } = options;

    const http = url.indexOf('http') === 0;
    const uri = http ? url : url.replace('../', '');

    const without = (http && uri.indexOf(API_URL) < 0) || ['forget', 'login', 'refresh', 'register'].indexOf(uri) >= 0;
    const token = await (without ? { token: null, id } : UserToken.get().then(info => info).catch(err => err));
    if (!token.access_token) {
        return token.type === undefined ? token : await Promise.reject(token);
    }

    if ('' !== signature) {
        const signIndex = await getSignature([signature], true);
        if (signIndex[signature]) {
            headers.signature= signIndex[signature].code;
            options.headers = headers;
        } else {
            return await Promise.reject(new StorageError<{}>({
                api: url,
                ret: 101,
                message: '获取口令失败，请联系技术解决问题',
                data: {},
            }, url));
        }
    }
    
    const list: number[] = await Storage.local({
        point: STORAGE_KEY.API_QUEUE,
    }).catch(
        () => ([])
    );

    const isset = id > 0 && list.indexOf(id) >= 0;
    if (!isset) {
        if (list.length > 60) {
            const waitData = await waitUntil({ type: 'apiWait', time: 5000 });
            return {
                ...waitData,
                id,
                token,
            };
        }

        while (true) {
            id = random(10000000, 99999999);
            if (list.indexOf(id) < 0) break;
        }
    }

    Storage.save<number[]>({
        point: STORAGE_KEY.API_QUEUE,
        data: [
            ...list,
            id,
        ],
    });
    return { token, id };
};

const apiQueueOut = async (id: number) => {
    const list = await Storage.local({
        point: STORAGE_KEY.API_QUEUE,
    }).catch(
        () => ([])
    );
    list.length > 0 && Storage.save<number[]>({
        point: STORAGE_KEY.API_QUEUE,
        data: pull(list, id),
    });
};

const UserToken = {
    async get(): Promise<null|UserTokenType|Omit<ApiWaitType, 'time'>> {
        const token = Storage.userToken();

        if (token === null) return Promise.reject({ type: 'logout' });
        if (token.action === 'active') return token;

        const info = await waitUntil({ type: 'apiWait', time: 5000 });
        return info;
    },
    async refresh(refresh_token: string, id: number = 0): Promise<null|UserTokenType|StorageError<{}>> {
        return await loadUntil(500, async (start) => {
            const token = Storage.userToken();
            const {refresh_token: current_token = '',  action = ''} = token||{};

            if (action === 'update') return null;
            if (current_token !== refresh_token && action === 'active') return token;

            Storage.userUpdate('update');
            const info = await Api.Post<ApiResponseType<UserTokenType> & { type?: string; id?: number; }>('refresh', {
                id,
                data: {
                    token: refresh_token,
                },
            });

            if (!(info instanceof StorageError) && info.ret === 0) {
                return Storage.userCreate(info.data);
            }

            info.type = 'logout';
            info.id = id;
            Storage.remove({
                point: Storage.config.userTokenKey
            });

            return info as StorageError<{}>;
        });
    },
};

type PointType = 'Get'|'Post'|'Put'|'Patch'|'Delete';
type RequestMethodType = <T = any>(url: string, options?: RequestOptionsInit) => Promise<T>;

interface RequestJwtMethod<R = false> extends RequestMethod<R>, Record<PointType, RequestMethodType> {
}

export interface ExtendOfJwt {
    (options: ExtendOptionsWithoutResponse): RequestJwtMethod<false>;
    (options: ExtendOptionsWithResponse): RequestJwtMethod<true>;
    (options: ExtendOptionsInit): RequestJwtMethod;
}

const extendOfjwt = extend as ExtendOfJwt;

const Api = extendOfjwt({
    timeout: 10 * 1000,
    errorHandler
});

Api.interceptors.request.use((url, options) => {
    const http = url.indexOf('http') === 0;
    const uri = http ? url : url.replace('../', '');

    const { token, headers = {}, retry = { count: 5, num: 1 } } = options as ApiOptionsType & {
        headers: HeadersType;
        retry: {
            count: number;
            num: number;
        }
    };

    /*if (url === 'shop') {
        controller.abort();
        return;
    }*/

    headers['Accept'] = 'application/json';
    if (token) {
        headers['Authorization'] = `Bearer ${token.access_token}`;
    }
    
    return {
        url: uri === url ? (http ? uri : `${API_URL}${PREFIX_URI}/${uri}`): `${API_URL}/${uri}`,
        options: {
            ...options,
            headers,
            retry,
        },
    };
});

Api.interceptors.response.use(async (response, options) => {
    const responseOrg = response as Response & { statusData?: StorageDataType<{}>; };
    const { url, status, headers: res_header } = response as Response;
    if (res_header.has('x-signature')) {
        const signature: Record<string, string> = JSON.parse(
            decodeURIComponent(res_header.get('x-signature')||'{}')
        );
        const { seter } = Storage.signature();
        Object.keys(signature).forEach(key => seter(key, signature[key]));
    }
    if ((status >= 200 && status < 300) || [400, 403, 404, 500].indexOf(status) >= 0) {
        return response;
    }

    const { headers, id, retry, point = '', token = {}, ...opts } = options as RequestOptionsInit & {
        id: number;
        retry: {
            num: number;
            count: number;
        };
        token: {
            refresh_token?: string;
        };
        point?: 'delete'|'get'|'patch'|'post'|'put';
    };
    let statusData = {} as StorageDataType<{}>;

    try {
        statusData = await response.json();
    } catch (e) {}

    if (status === 429 && statusData.ret !== 13) {
        responseOrg.statusData = statusData;
        return responseOrg as Response;
    }

    if (retry.num >= retry.count) {
        throw new StorageError<{}>({
            api: url,
            ret: status,
            message: '错误请求次数太多，请稍后重试',
            data: statusData.data,
        }, url);
    }

    // Create new promise to handle exponential backoff
    const backoff = () => new Promise(resolve => {
        setTimeout(() => resolve(true), status === 429 ? 2000 : 500);
    });

    retry.num++;
    if (status === 401) {
        const { refresh_token = null } = token;
        const { ret = 1 } = statusData;

        if (ret === 11 && refresh_token !== null && url.indexOf(REFRESH_URL) < 0) {
            const token_new = await UserToken.refresh(refresh_token, id).then(info => info).catch(err => null);
            
            if (get(token_new, 'access_token', '') !== '') {
                const newOptions = {
                    ...opts,
                    point,
                    headers,
                    id,
                    retry,
                };

                return await ('' !== point ? Api[point](url, newOptions) : Api(url, newOptions));
            }
            // return Promise.reject(token_new);
            if (token_new instanceof StorageError) {
                throw token_new;
            }
            throw new StorageError<UserTokenType|null>({
                api: url,
                ret: status,
                message: 'refresh token faild',
                data: token_new,
            }, url);
        }
        return response as Response;
    }

    await backoff();
    return await Api(url, {
        ...options,
        retry,
    }) as Response;
});

const umiInstance: RequestMethodType = async function (url, options = {}) {
    const { method, ...opts } = options as ApiOptionsType & { method: 'get'|'post'|'put'|'patch'|'delete' } & { headers?: HeadersType, signature?: string };
    const point = capitalize(method) as PointType;
    const data = await apiQueue(url, opts).then(async ({ id, token }) => {
        const res = await Api[method](url, {
            ...opts,
            point,
            signal,
            token,
            id,
        });

        id > 0 && apiQueueOut(id);
        return res;
    }).catch((info: {
        type?: string;
        id?: number;
    }) => {
        const { type = '', id = 0 } = info;

        id > 0 && apiQueueOut(id);
        if (type === 'apiWait') return Api[point](url, options);

        type === 'logout' && alert('登录失效了');

        //type === 'logout' && Modal.error({
        //    title: '登录失效了',
        //    content: '点击“重新登录”按钮将跳转至登录页',
        //    okText: '重新登录',
        //    afterClose: () => history.replace(LOGIN_URL),
        //});
        return info;
    });

    return data;
};

// 异步执行返回流程，见：https://codesandbox.io/s/yi-bu-huo-qu-yi-chang-fan-hui-jie-guo-zhuang-tai-z3umzw
['get', 'post', 'put', 'patch', 'delete'].forEach(method => {
    const point = capitalize(method) as PointType;
    Api[point] = (url, options = {}) => umiInstance(url, { ...options, method });
});

export async function getSignature(list: string[], reget: boolean = false): Promise<SignatureIndexType> {
    const { geter } = Storage.signature();
    const signature = geter();
  
    const action = list.filter(key => signature[key] === undefined);
    if (action.length === 0) return signature;

    await Api.Post('token', {
        data: { action }
    });
    return reget ? geter() : signature;
};

export default Api;