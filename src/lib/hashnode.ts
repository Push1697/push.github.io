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

export async function getBlogPosts(limit: number = 50): Promise<BlogPost[]> {
  const query = `
    query GetPublicationPosts($host: String!, $first: Int!, $after: String) {
      publication(host: $host) {
        posts(first: $first, after: $after) {
          pageInfo {
            hasNextPage
            endCursor
          }
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
    let allPosts: any[] = [];
    let hasNextPage = true;
    let afterCursor: string | null = null;
    let fetchCount = 0;
    const maxFetches = 5; // Prevent infinite loops, max 5 pages

    // Fetch all pages up to the limit
    while (hasNextPage && fetchCount < maxFetches && allPosts.length < limit) {
      const response: Response = await fetch(HASHNODE_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables: { 
            host: BLOG_HOST, 
            first: Math.min(20, limit - allPosts.length), // Fetch up to 20 per request
            after: afterCursor 
          },
        }),
        // Add cache: 'no-store' to ensure fresh data
        cache: 'no-store',
      });

      const result = await response.json();
      
      if (result.errors) {
        console.error('GraphQL errors:', result.errors);
        break;
      }

      const posts = result.data?.publication?.posts?.edges?.map((edge: any) => edge.node) || [];
      const pageInfo = result.data?.publication?.posts?.pageInfo;

      allPosts = [...allPosts, ...posts];
      hasNextPage = pageInfo?.hasNextPage || false;
      afterCursor = pageInfo?.endCursor || null;
      fetchCount++;

      // If we've reached the limit, stop fetching
      if (allPosts.length >= limit) {
        hasNextPage = false;
      }
    }

    return allPosts.slice(0, limit).map((post: any) => ({
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

