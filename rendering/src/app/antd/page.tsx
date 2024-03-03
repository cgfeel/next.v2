import { Button, Card, Divider } from "antd";

export default function page() {
    return (
        <>
            <Card>
                <Button type="primary">test</Button>文字
            </Card>
            <div>
                <h3>antd切换主题的缺点：</h3>
                <Divider />
                <p>
                    网站首次被访问的时候，初始主题必须设置为“白色”或“黑色”，不能设置为“自动”，需要用户手动选择一次主题后才可以为任意主题值，也包括“自动”
                </p>
                <p>
                    这是因为“antd”在SSR环境下是通过cookies记录的方式进行切换，而服务端本身没办法获取客户端的主题信息，因此可能造成用户第一次看到的网站主题和系统不一致
                </p>
                <Divider />
                <p>那可以放到客户端做决定吗？</p>
                <p>
                    可以，在根目录的“Layout.tsx”中添加“script”标签，通过它在渲染前设置样式信息。但问题是React外部的“script”怎么和React上下文传值，且保证在网页渲染前进行，要知道“antd
                    v5”采用的是“css-in-js”来设置主题，只能通过JS，而非传统CSS可以通过“script”修改“html”元素来决定整个网站主题
                </p>
                <Divider />
                <p>除此之外已解决闪动了吗？</p>
                <p>
                    基本上是，但是由于“antd”本身组件加载的原因，在浏览器强刷的情况下，整个页面中的组件渲染有可能会有一个延迟，也就造成了视觉上的抖动，如果有这方面追求可能“antd”不是最好的选择
                </p>
                <Divider />
            </div>
        </>
    );
}
