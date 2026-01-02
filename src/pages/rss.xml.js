import rss from '@astrojs/rss';
import { fetchStrapi } from "../utils/strapi";

export async function GET(context) {
  const posts = await fetchStrapi('post-pages?sort=publishedAt:desc&populate=*');
  return rss({
    title: '이로우라',
    description: '삶에 향기를 더하다, 이로우라 아카데미',
    site: context.site,
    items: posts.map((post) => ({
      title: post.Title,
      pubDate: new Date(post.publishedAt),
      link: `/post/${post.Slug}/`,
    })),
  });
}