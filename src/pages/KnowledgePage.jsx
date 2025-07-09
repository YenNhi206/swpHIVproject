import React, { useEffect, useState } from 'react';
import { BookOpenText, LoaderCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function KnowledgePage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8080/api/blogs')
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching blogs:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-gray-600">
        <LoaderCircle className="animate-spin mr-2" /> Đang tải dữ liệu...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-3xl font-bold text-center mb-8 flex items-center justify-center gap-2">
        <BookOpenText className="w-8 h-8 text-blue-600" />
        Kiến Thức Về HIV
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogs.map((blog) => (
          <motion.div
            key={blog.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white shadow-md p-5 rounded-2xl border border-gray-200 hover:shadow-lg transition-all"
          >
            <div className="text-lg font-semibold text-blue-700 mb-2">
              {blog.title}
            </div>
            <p className="text-sm text-gray-600 mb-2">{blog.description}</p>
            <div className="text-sm text-gray-400 mb-2">
              <span>🖊 {blog.author}</span> •{' '}
              <span>🗓 {new Date(blog.createdAt).toLocaleDateString('vi-VN')}</span>
            </div>
            <a
              href={blog.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 text-sm font-medium text-blue-500 hover:underline"
            >
              Đọc thêm →
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
