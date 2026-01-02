import { fetchStrapi } from "../../utils/strapi";

export async function GET() {
  const posts = await fetchStrapi('post-pages?populate=*');
  
  const searchItems = posts.map((post: any) => ({
    title: post.Title,
    slug: post.Slug,
    tags: post.Tags || [],
    description: post.Content?.[0]?.paragraph?.rich_text?.[0]?.plain_text || "",
  }));

  return new Response(JSON.stringify(searchItems));
}