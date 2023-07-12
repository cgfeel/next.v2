import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '基础路由',
  description: '包含：1级页面，2级页面',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-cn">
      <body>{children}</body>
    </html>
  )
}
