import { globby } from 'globby'

function addPage(page: string) {
  const path = page.replace('src/app', '').replace('.tsx', '').replace('.mdx', '')
  return path
}
export default async function sitemap() {
  const pages = await globby(['src/app/blog/*{.js,jsx,ts,tsx,.mdx}', '!src/app/blog/_components'])
  const routes = pages.map((page: string) => ({
    url: `${process.env.WEBSITE_URL}${addPage(page)}`,
    lastModified: new Date().toISOString(),
  }))
  console.log(pages)
  return [...routes]
}
