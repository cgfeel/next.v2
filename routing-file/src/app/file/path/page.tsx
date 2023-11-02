import FindPath from "./FindPath";

export default function Page() {
    return (
        <div>
            <div>这里只为了证明use client并不一定是在客户端渲染</div>
            <div>path:{<FindPath />}</div>
        </div>
    );
}