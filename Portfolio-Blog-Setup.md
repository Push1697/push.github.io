# Complete Portfolio + Blog Setup Guide

## 🎯 Project Structure

Your portfolio will be a **Next.js/React app** deployed to GitHub Pages with:
- Portfolio sections (About, Experience, Skills, Certifications)
- **Integrated Blog section** (fetching from Hashnode API)
- Custom domain: `pushpendra.overflowbyte.cloud`
- Repository: `push1697.github.io`

---

## 📁 File Structure

```
push1697.github.io/
├── public/
│   ├── CNAME                 # Custom domain configuration
│   ├── images/
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── page.tsx          # Main portfolio page
│   │   ├── blog/
│   │   │   ├── page.tsx      # Blog listing page
│   │   │   └── [slug]/
│   │   │       └── page.tsx  # Individual blog post
│   │   └── layout.tsx
│   ├── components/
│   │   ├── Portfolio.tsx     # Your existing portfolio component
│   │   ├── BlogCard.tsx      # Blog post card
│   │   └── Navigation.tsx    # Site navigation
│   └── lib/
│       └── hashnode.ts       # Hashnode API integration
├── package.json
├── next.config.js            # GitHub Pages configuration
├── .github/
│   └── workflows/
│       └── deploy.yml        # Automatic deployment
└── README.md
```

---

## 🚀 Step-by-Step Implementation

### Step 1: Update Your Repository

1. **Clone your repository:**
```bash
git clone https://github.com/push1697/push1697.github.io.git
cd push1697.github.io
```

2. **Initialize Next.js (if not already):**
```bash
npx create-next-app@latest . --typescript --tailwind --app
```

### Step 2: Add CNAME File

Create `public/CNAME`:
```
pushpendra.overflowbyte.cloud
```

### Step 3: Configure DNS (On Your Domain Provider)

Add these DNS records for `overflowbyte.cloud`:

```
Type: CNAME
Name: pushpendra
Value: push1697.github.io
TTL: 3600
```

Also add A records (for root domain fallback):
```
Type: A
Name: @
Value: 185.199.108.153
Value: 185.199.109.153
Value: 185.199.110.153
Value: 185.199.111.153
```

### Step 4: Configure GitHub Repository

In your GitHub repository settings:
1. Go to **Settings → Pages**
2. Source: **Deploy from a branch** → `gh-pages` branch
3. Custom domain: `pushpendra.overflowbyte.cloud`
4. Enable **Enforce HTTPS**

---

## 📝 Code Implementation

### 1. Update `next.config.js`

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Enable static export for GitHub Pages
  basePath: '',      // No base path needed for custom domain
  images: {
    unoptimized: true,  // Required for static export
  },
  trailingSlash: true,  // Add trailing slashes to URLs
}

module.exports = nextConfig
```

### 2. Create Hashnode API Integration

Create `src/lib/hashnode.ts`:

```typescript
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
const USERNAME = 'pushpendra16'; // Your Hashnode username

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
```

### 3. Create Blog Card Component

Create `src/components/BlogCard.tsx`:

```typescript
import React from 'react';
import Link from 'next/link';
import { Calendar, Clock, Eye } from 'lucide-react';
import { BlogPost } from '@/lib/hashnode';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Link href={`/blog/${post.slug}`}>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer">
        {/* Cover Image */}
        {post.coverImage && (
          <div className="relative h-48 overflow-hidden">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
            {post.title}
          </h3>

          {/* Brief */}
          <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
            {post.brief}
          </p>

          {/* Meta Information */}
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {formatDate(post.dateAdded)}
              </span>
              <span className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {post.readTime} min read
              </span>
            </div>
            <span className="flex items-center">
              <Eye className="w-4 h-4 mr-1" />
              {post.views}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
```

### 4. Create Blog Listing Page

Create `src/app/blog/page.tsx`:

```typescript
import React from 'react';
import { getBlogPosts } from '@/lib/hashnode';
import BlogCard from '@/components/BlogCard';
import { BookOpen } from 'lucide-react';

export const revalidate = 3600; // Revalidate every hour

export default async function BlogPage() {
  const posts = await getBlogPosts(20);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-6">
            <BookOpen className="w-16 h-16" />
          </div>
          <h1 className="text-5xl font-bold text-center mb-4">
            Tech Blog
          </h1>
          <p className="text-xl text-center text-blue-100 max-w-3xl mx-auto">
            Insights on Cloud Infrastructure, DevOps, AWS, Kubernetes, and everything in between.
            Real-world solutions from the field.
          </p>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No blog posts yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Want to stay updated?
          </h2>
          <p className="text-lg text-blue-100 mb-8">
            Follow me on Hashnode for the latest articles on Cloud & DevOps
          </p>
          <a
            href="https://pushpendra16.hashnode.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors"
          >
            Visit My Hashnode Blog
          </a>
        </div>
      </div>
    </div>
  );
}
```

### 5. Update Main Portfolio Page

Update `src/app/page.tsx` to include your portfolio and link to blog:

```typescript
import Portfolio from '@/components/Portfolio';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';

export default function HomePage() {
  return (
    <div>
      {/* Navigation Bar with Blog Link */}
      <nav className="fixed top-0 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-xl font-bold text-blue-600">
              Pushpendra Bairwa
            </Link>
            <div className="flex items-center space-x-6">
              <Link
                href="/blog"
                className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <BookOpen className="w-5 h-5" />
                <span>Blog</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Portfolio Content */}
      <div className="pt-16">
        <Portfolio />
      </div>
    </div>
  );
}
```

---

## 🔄 GitHub Actions Deployment

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main  # or master, depending on your default branch

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

---

## 📦 Package.json Scripts

Update `package.json`:

```json
{
  "name": "pushpendra-portfolio",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "export": "next export",
    "deploy": "npm run build && touch out/.nojekyll && echo 'pushpendra.overflowbyte.cloud' > out/CNAME"
  },
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "lucide-react": "^0.294.0"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "autoprefixer": "^10",
    "postcss": "^8",
    "tailwindcss": "^3",
    "typescript": "^5"
  }
}
```

---

## 🚀 Deployment Steps

### Option 1: Automatic Deployment (Recommended)

1. **Push to GitHub:**
```bash
git add .
git commit -m "Add blog integration and custom domain"
git push origin main
```

2. **GitHub Actions will automatically:**
   - Build your Next.js app
   - Export static files
   - Deploy to `gh-pages` branch
   - Site available at `pushpendra.overflowbyte.cloud`

### Option 2: Manual Deployment

```bash
# Build and export
npm run build

# Create .nojekyll file (prevents Jekyll processing)
touch out/.nojekyll

# Add CNAME file
echo 'pushpendra.overflowbyte.cloud' > out/CNAME

# Deploy to gh-pages branch
npx gh-pages -d out -t true
```

---

## ✅ Verification Checklist

After deployment:

- [ ] Visit `https://pushpendra.overflowbyte.cloud` - portfolio loads
- [ ] Visit `https://pushpendra.overflowbyte.cloud/blog` - blog page loads
- [ ] Blog posts fetched from Hashnode API
- [ ] Click on blog post - individual post page loads
- [ ] HTTPS is enabled (green padlock)
- [ ] Custom domain works correctly
- [ ] Navigation between portfolio and blog works

---

## 🔧 Troubleshooting

### Issue 1: 404 Page Not Found

**Solution:**
- Ensure `output: 'export'` in `next.config.js`
- Check that `CNAME` file exists in `public/` folder
- Verify GitHub Pages is set to `gh-pages` branch

### Issue 2: Custom Domain Not Working

**Solution:**
- Check DNS records are correct (CNAME pointing to `push1697.github.io`)
- Wait 24-48 hours for DNS propagation
- Ensure HTTPS is enforced in GitHub settings
- Clear browser cache

### Issue 3: Blog Posts Not Loading

**Solution:**
- Check Hashnode username is correct (`pushpendra16`)
- Verify Hashnode API is accessible
- Check browser console for errors
- Ensure blog posts are published on Hashnode

### Issue 4: Build Fails

**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules .next out
npm install
npm run build
```

---

## 📱 Mobile Responsiveness

The portfolio and blog are fully responsive:
- Desktop: 3-column grid for blog posts
- Tablet: 2-column grid
- Mobile: Single column, optimized touch targets

---

## 🎨 Customization Options

### Change Color Scheme

In `tailwind.config.js`:
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#0066CC',    // Your blue
        secondary: '#FF6600',  // Your orange
      },
    },
  },
}
```

### Add More Sections

You can add:
- Projects showcase
- Testimonials
- Contact form
- Newsletter signup
- Social proof

---

## 🚀 Next Steps

1. **Deploy portfolio with blog integration**
2. **Publish first article on Hashnode**
3. **Test custom domain works**
4. **Add Google Analytics** (optional)
5. **Set up SEO metadata**
6. **Share on social media**

---

## 📞 Support

If you encounter issues:
1. Check GitHub Actions logs
2. Verify DNS settings
3. Test locally first: `npm run dev`
4. Check browser console for errors

---

**Your portfolio with integrated blog will be live at:**
🌐 **https://pushpendra.overflowbyte.cloud**

**Blog section:**
📝 **https://pushpendra.overflowbyte.cloud/blog**

Let's make it happen! 🚀