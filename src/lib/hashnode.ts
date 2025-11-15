export interface BlogPost {
  id: string;
  title: string;
  brief: string;
  slug: string;
  coverImage: string;
  dateAdded: string;
  readTime: number;
  views: number;
  tags: string[];
  content?: string;
}

const HASHNODE_API = 'https://gql.hashnode.com/';
const USERNAME = 'deepdev';
const BLOG_HOST = 'blog.overflowbyte.cloud';

export async function getBlogPosts(limit: number = 10): Promise<BlogPost[]> {
  const query = `
    query GetPublicationPosts($host: String!, $first: Int!) {
      publication(host: $host) {
        posts(first: $first) {
          edges {
            node {
              id
              title
              brief
              slug
              coverImage {
                url
              }
              publishedAt
              readTimeInMinutes
              views
              tags {
                name
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch(HASHNODE_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { host: BLOG_HOST, first: limit },
      }),
    });

    const result = await response.json();
    
    if (result.errors) {
      console.error('GraphQL errors:', result.errors);
      return [];
    }

    const posts = result.data?.publication?.posts?.edges?.map((edge: any) => edge.node) || [];

    return posts.map((post: any) => ({
      id: post.id,
      title: post.title,
      brief: post.brief,
      slug: post.slug,
      coverImage: post.coverImage?.url || '',
      dateAdded: post.publishedAt,
      readTime: post.readTimeInMinutes,
      views: post.views,
      tags: post.tags.map((tag: any) => tag.name),
    }));
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const query = `
    query GetPost($host: String!, $slug: String!) {
      publication(host: $host) {
        post(slug: $slug) {
          id
          title
          brief
          slug
          content {
            html
          }
          coverImage {
            url
          }
          publishedAt
          readTimeInMinutes
          views
          tags {
            name
          }
        }
      }
    }
  `;

  try {
    const response = await fetch(HASHNODE_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { host: BLOG_HOST, slug },
      }),
    });

    const result = await response.json();
    
    if (result.errors) {
      console.error('GraphQL errors:', result.errors);
      return null;
    }

    const post = result.data?.publication?.post;

    if (!post) return null;

    return {
      id: post.id,
      title: post.title,
      brief: post.brief,
      slug: post.slug,
      coverImage: post.coverImage?.url || '',
      dateAdded: post.publishedAt,
      readTime: post.readTimeInMinutes,
      views: post.views,
      tags: post.tags.map((tag: any) => tag.name),
      content: post.content?.html,
    };
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

