import type { Metadata } from 'next'

// 提示：路由中的每个文件夹代表一个路由段。每个路由段映射到 URL 路径中的对应段。
// `fetch` 默认是强制缓存返回结果可复用，也可使用 cache 方法缓存数据
// import { cache } from 'react';
// export const getUser = cache(async (id: string) => {
//   const user = await db.user.findUnique({ id });
//   return user;
// });

interface ParamsType {
  params: { id: string }
}

async function getProduct(id: string) {
  // Sharing fetch requests between Server Components，不需要通过传递 props 参数，服务端组件之前共享请求结果
  // const res = await fetch(`https://.../api/products/${id}`);
  // return res.json();
  return { id, title: id }
}

// 示例：使用generateMetadata来生成动态元数据。params 是来自路由的参数
export async function generateMetadata({ params }: ParamsType): Promise<Metadata> {
  const product = await getProduct(params.id)
  return { title: product.title }
}

// 示例：控制是否动态生成
// true (默认) - 未包含在 generateStaticParams 中的动态路由段是根据需要生成的。
// false - 未包含在generateStaticParams中的动态段将返回404
export const dynamicParams = true

// 示例：动态路由页面编译时预渲染参数，替代原 getStaticPaths 功能
// 生成构建时预渲染的路由参数 params
export async function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }]
}

// 示例：params 参数
// app/shop/[slug]/page.js	/shop/1	            { slug: '1' }
// app/shop/[category]/[item]/page.js	/shop/1/2	{ category: '1', item: '2' }
// app/shop/[...slug]/page.js	/shop/1/2	        { slug: ['1', '2'] }

// 示例：searchParams (optional)
// /shop?a=1	    { a: '1' }
// /shop?a=1&b=2	{ a: '1', b: '2' }
// /shop?a=1&a=2	{ a: ['1', '2'] }

export default async function Page({ params }: ParamsType) {
  // Next.js会自动在generateMetadata、generateStaticParams、Layouts、Pages和 Server Components之间自动删除重复获取相同数据的请求。
  const product = await getProduct(params.id)

  // 示例：JSON-LD is a format for structured data that can be used by search engines to understand your content
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.id,
    image: product.id,
    description: product.id,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <p className="m-8 font-bold">Product Page id: {product.id}</p>
    </>
  )
}
