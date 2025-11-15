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
    <a
      href={`https://pushpendra16.hashnode.dev/${post.slug}`}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer"
    >
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
    </a>
  );
}
