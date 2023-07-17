import { Metadata } from 'next'
import Link from "next/link";
import ActivePath from './components/ActivePath';

export const metadata: Metadata = {
  title: '插槽演示',
  description: '包含：插槽、平行route、懒加载、页面跳转、本地组件',
}

export default function Layout({ children, performance }: any) {
  return (
    <>
      {children}
      {/* 导航 */}
      <div>
        <Link 
          href={"/dashboard/app"}
        >
          <span>app 性能数据</span>
          <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
        </Link>
      </div>
      <div>
        <Link 
          href={"/dashboard/web"}
        >
          <span>Web 链接</span>
          <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
        </Link>
      </div>
      <hr />
      <ActivePath />
      <hr />
      <div className="performance">{performance}</div>
    </>
  );
}