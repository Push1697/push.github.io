import React from 'react';
import { Calendar, Clock, Eye } from 'lucide-react';
import { BlogPost } from '@/lib/hashnode';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <a
      href={`https://blog.overflowbyte.cloud/${post.slug}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-cyan-500/20 hover:border-cyan-500/40 transition-all transform hover:scale-[1.02] backdrop-blur-sm overflow-hidden"
    >
      {/* Cover Image */}
      {post.coverImage && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-medium bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 rounded-full hover:bg-cyan-500/30 transition-colors"
              >
                {tag}
              </span>
            ))}
            {post.tags.length > 2 && (
              <span className="px-3 py-1 text-xs font-medium text-gray-400">
                +{post.tags.length - 2} more
              </span>
            )}
          </div>
        )}

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors line-clamp-2">
          {post.title}
        </h3>

        {/* Brief */}
        <p className="text-gray-400 mb-4 line-clamp-2 text-sm leading-relaxed">
          {post.brief}
        </p>

        {/* Meta Information */}
        <div className="flex items-center justify-between text-xs text-gray-500 border-t border-slate-700/50 pt-4">
          <div className="flex items-center space-x-3">
            <span className="flex items-center space-x-1">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(post.dateAdded)}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{post.readTime}m</span>
            </span>
          </div>
          <span className="flex items-center space-x-1">
            <Eye className="w-3 h-3" />
            <span>{post.views}</span>
          </span>
        </div>
      </div>

      {/* Hover border effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/10 group-hover:via-transparent group-hover:to-purple-500/10 transition-all duration-300 pointer-events-none" />
    </a>
  );
}
