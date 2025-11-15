import { getBlogPosts, BlogPost } from '@/lib/hashnode';
import BlogCard from '@/components/BlogCard';
import Link from 'next/link';
import { BookOpen, ArrowLeft, Cloud, Server, Code } from 'lucide-react';

export const revalidate = 3600;

export default async function BlogPage() {
  let posts: BlogPost[] = [];
  try {
    posts = await getBlogPosts(20);
  } catch (error) {
    console.error('Failed to fetch blog posts:', error);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Header */}
      <div className="relative overflow-hidden pt-20 pb-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
          <div className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse delay-1000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link 
            href="/" 
            className="inline-flex items-center text-gray-400 hover:text-cyan-400 mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Portfolio
          </Link>
          
          <div className="text-center">
            <div className="mb-6 flex justify-center space-x-4">
              <Cloud className="w-12 h-12 text-cyan-400" />
              <BookOpen className="w-12 h-12 text-purple-400" />
              <Code className="w-12 h-12 text-pink-400" />
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Tech Blog
            </h1>
            
            <p className="text-xl md:text-2xl mb-4 text-gray-300 max-w-3xl mx-auto">
              Cloud Infrastructure, DevOps & Real-world Engineering Solutions
            </p>
            
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Insights on AWS, Kubernetes, Server Administration, and scalable infrastructure design
            </p>
          </div>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-400">
                No blog posts available yet. Check back soon!
              </p>
              <a
                href="https://blog.overflowbyte.cloud"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-6 text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Visit Blog →
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border-t border-cyan-500/20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Want to read more?
          </h2>
          <p className="text-gray-300 mb-8 text-lg">
            Visit the full blog for comprehensive articles and in-depth technical insights
          </p>
          <a
            href="https://blog.overflowbyte.cloud"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105"
          >
            Visit Full Blog
          </a>
        </div>
      </div>
    </div>
  );
}
