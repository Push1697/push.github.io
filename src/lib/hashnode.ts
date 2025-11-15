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
const USERNAME = 'pushpendra16';

export async function getBlogPosts(limit: number = 10): Promise<BlogPost[]> {
  const query = `
    query GetUserPosts($username: String!, $page: Int!) {
      user(username: $username) {
        publication {
          posts(page: $page) {
            nodes {
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
        variables: { username: USERNAME, page: 0 },
      }),
    });

    const { data } = await response.json();
    const posts = data?.user?.publication?.posts?.nodes || [];

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
    query GetPost($username: String!, $slug: String!) {
      user(username: $username) {
        publication {
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
        variables: { username: USERNAME, slug },
      }),
    });

    const { data } = await response.json();
    const post = data?.user?.publication?.post;

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

