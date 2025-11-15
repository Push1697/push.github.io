import { getBlogPosts, BlogPost } from '@/lib/hashnode';
import BlogCard from '@/components/BlogCard';
import Link from 'next/link';
import { BookOpen, ArrowLeft } from 'lucide-react';

export const revalidate = 3600;

export default async function BlogPage() {
  let posts: BlogPost[] = [];
  try {
    posts = await getBlogPosts(20);
  } catch (error) {
    console.error('Failed to fetch blog posts:', error);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Portfolio
          </Link>
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
          <p className="text-blue-100 mb-6">
            Visit my Hashnode blog for the full experience and more content
          </p>
          <a
            href="https://pushpendra16.hashnode.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors"
          >
            Visit Hashnode Blog
          </a>
        </div>
      </div>
    </div>
  );
}
