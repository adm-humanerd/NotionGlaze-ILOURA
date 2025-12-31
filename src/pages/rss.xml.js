import rss from '@astrojs/rss';
import { fetchStrapi } from "../utils/strapi";

export async function GET(context) {
  const posts = await fetchStrapi('test-pages?sort=publishedAt:desc&populate=*');
  return rss({
    title: 'NotionGlaze Blog',
    description: 'Automated Blog from Notion',
    site: context.site,
    items: posts.map((post) => ({
      title: post.Title,
      pubDate: new Date(post.publishedAt),
      link: `/post/${post.Slug}/`,
    })),
  });
}