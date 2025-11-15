# 🚀 QUICK START - Deploy Portfolio + Blog to Custom Domain

## What You'll Get
- ✅ Portfolio at `pushpendra.overflowbyte.cloud`
- ✅ Blog section at `pushpendra.overflowbyte.cloud/blog`
- ✅ Automatic deployment via GitHub Actions
- ✅ Blog posts fetched from your Hashnode

---

## 🎯 3-Step Implementation

### STEP 1: Setup Your Repository (5 minutes)

```bash
# Clone your repository
cd ~/projects  # or wherever you keep projects
git clone https://github.com/push1697/push1697.github.io.git
cd push1697.github.io

# Initialize Next.js project
npx create-next-app@latest . --typescript --tailwind --app --yes

# Install additional dependencies
npm install lucide-react
```

### STEP 2: Add Required Files (10 minutes)

Create these files in your repository:

#### File 1: `public/CNAME`
```
pushpendra.overflowbyte.cloud
```

#### File 2: `next.config.js` (replace existing)
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

module.exports = nextConfig
```

#### File 3: `.github/workflows/deploy.yml`
```yaml
name: Deploy

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: touch out/.nojekyll
      - run: echo 'pushpendra.overflowbyte.cloud' > out/CNAME
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./out
      - uses: actions/deploy-pages@v4
        id: deployment
```

#### File 4: `src/lib/hashnode.ts` (NEW)
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
}

const API = 'https://gql.hashnode.com/';

export async function getBlogPosts(): Promise<BlogPost[]> {
  const query = `
    query {
      user(username: "pushpendra16") {
        publication {
          posts(page: 0) {
            nodes {
              id
              title
              brief
              slug
              coverImage { url }
              publishedAt
              readTimeInMinutes
              views
              tags { name }
            }
          }
        }
      }
    }
  `;

  try {
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    const { data } = await res.json();
    const posts = data?.user?.publication?.posts?.nodes || [];

    return posts.map((p: any) => ({
      id: p.id,
      title: p.title,
      brief: p.brief,
      slug: p.slug,
      coverImage: p.coverImage?.url || '',
      dateAdded: p.publishedAt,
      readTime: p.readTimeInMinutes,
      views: p.views,
      tags: p.tags.map((t: any) => t.name),
    }));
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}
```

#### File 5: `src/app/blog/page.tsx` (NEW)
```typescript
import { getBlogPosts } from '@/lib/hashnode';
import Link from 'next/link';
import { BookOpen, Calendar, Clock, Eye, ArrowLeft } from 'lucide-react';

export const revalidate = 3600;

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <Link 
            href="/" 
            className="inline-flex items-center text-white/80 hover:text-white mb-6"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Portfolio
          </Link>
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="w-12 h-12" />
          </div>
          <h1 className="text-4xl font-bold text-center mb-3">
            Tech Blog
          </h1>
          <p className="text-lg text-center text-blue-100 max-w-2xl mx-auto">
            Cloud Infrastructure, DevOps, AWS, Kubernetes and real-world solutions
          </p>
        </div>
      </div>

      {/* Blog Posts */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg">
              No blog posts yet. Coming soon!
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <a
                key={post.id}
                href={`https://pushpendra16.hashnode.dev/${post.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all group"
              >
                {post.coverImage && (
                  <div className="relative h-40 overflow-hidden rounded-t-xl">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-5">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {post.brief}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {post.readTime} min
                    </span>
                    <span className="flex items-center">
                      <Eye className="w-3 h-3 mr-1" />
                      {post.views}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-3">Want more?</h2>
          <p className="text-blue-100 mb-6">
            Visit my Hashnode blog for the full experience
          </p>
          <a
            href="https://pushpendra16.hashnode.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-50"
          >
            Visit Hashnode Blog
          </a>
        </div>
      </div>
    </div>
  );
}
```

#### File 6: Update `src/app/page.tsx`
Add this at the top of your existing portfolio:

```typescript
import Link from 'next/link';
import { BookOpen } from 'lucide-react';

export default function Home() {
  return (
    <>
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-sm z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
          <span className="text-xl font-bold text-blue-600">Pushpendra Bairwa</span>
          <Link
            href="/blog"
            className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
          >
            <BookOpen className="w-5 h-5" />
            <span className="font-medium">Blog</span>
          </Link>
        </div>
      </nav>

      {/* Add padding to avoid overlap with fixed nav */}
      <div className="pt-16">
        {/* Your existing portfolio component goes here */}
        {/* Keep all your existing portfolio code */}
      </div>
    </>
  );
}
```

### STEP 3: Configure DNS & Deploy (5 minutes)

#### A. Configure DNS (On your domain provider dashboard)

Add CNAME record:
```
Type: CNAME
Name: pushpendra
Target: push1697.github.io
TTL: 3600
```

#### B. Configure GitHub Repository

1. Go to: `https://github.com/push1697/push1697.github.io/settings/pages`
2. **Source:** Deploy from a branch
3. **Branch:** `gh-pages` (will be created automatically)
4. **Custom domain:** `pushpendra.overflowbyte.cloud`
5. ✅ Check "Enforce HTTPS"

#### C. Push to GitHub

```bash
# Add all files
git add .

# Commit changes
git commit -m "Add blog integration and custom domain"

# Push to GitHub
git push origin main
```

✅ **GitHub Actions will automatically build and deploy!**

---

## 🎉 DONE!

Your site will be live at:
- **Portfolio:** https://pushpendra.overflowbyte.cloud
- **Blog:** https://pushpendra.overflowbyte.cloud/blog

**Deployment time:** 2-3 minutes after pushing to GitHub

---

## 📱 How It Works

1. **Portfolio Page (`/`)**: Your existing portfolio with navigation to blog
2. **Blog Page (`/blog`)**: Lists all your Hashnode articles
3. **Click article**: Opens on Hashnode (where readers can comment, react, etc.)
4. **Auto-updates**: Blog fetches latest posts from Hashnode API every hour

---

## ✅ Verification Checklist

After deployment (wait 3-5 minutes):

- [ ] Visit `pushpendra.overflowbyte.cloud` - portfolio loads
- [ ] Click "Blog" button - blog page loads
- [ ] See your Hashnode articles listed
- [ ] Click an article - opens on Hashnode
- [ ] HTTPS working (green padlock)
- [ ] Mobile responsive

---

## 🔧 Common Issues & Fixes

### Issue 1: 404 Error
**Fix:** Wait 5 minutes for deployment, then hard refresh (Ctrl+Shift+R)

### Issue 2: Domain not working
**Fix:** DNS can take 24-48 hours. Meanwhile, use: `https://push1697.github.io`

### Issue 3: Build fails
**Fix:**
```bash
rm -rf node_modules .next out
npm install
npm run build
```

### Issue 4: Blog posts not showing
**Fix:** 
- Ensure you have published posts on Hashnode
- Check username is correct in `hashnode.ts`
- Wait 1 hour for cache to refresh

---

## 🎨 Customize

### Change colors in `src/app/blog/page.tsx`:
- `from-blue-600 to-purple-600` → Your preferred gradient
- `bg-blue-100 text-blue-600` → Your tag colors

### Add more sections:
- Projects showcase
- Contact form
- Newsletter
- Social links

---

## 📊 Next Steps

1. ✅ Deploy this setup (today)
2. ✅ Publish first article on Hashnode (this week)
3. ✅ Share your custom domain (social media)
4. ✅ Add Google Analytics (optional)
5. ✅ Keep publishing consistently!

---

## 💡 Pro Tips

- **Blog posts automatically sync** from Hashnode every hour
- **No manual updates needed** - just publish on Hashnode
- **Custom domain looks professional** for job applications
- **Portfolio + Blog = Complete online presence**

---

**Need help?** Check the full guide in `Portfolio-Blog-Setup.md`

**Let's ship it! 🚀**