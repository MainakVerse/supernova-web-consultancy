'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Loader2, ChevronLeft, ChevronRight } from 'lucide-react';

interface Blog {
  id: string;
  title: string;
  content: string;
  contentSnippet?: string;
}

export const Blogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  const fetchBlogIdAndPosts = async () => {
    const API_KEY = process.env.NEXT_PUBLIC_BLOGGER_API_KEY;
    const BLOG_URL = process.env.NEXT_PUBLIC_BLOG_URL;
    const blogIdUrl = `https://www.googleapis.com/blogger/v3/blogs/byurl?url=${BLOG_URL}&key=${API_KEY}`;

    try {
      const blogIdResponse = await fetch(blogIdUrl);
      if (!blogIdResponse.ok) {
        throw new Error(`Error fetching blog ID: ${blogIdResponse.statusText}`);
      }
      const blogIdData = await blogIdResponse.json();
      const blogId = blogIdData.id;

      const postsUrl = `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts?key=${API_KEY}`;
      const postsResponse = await fetch(postsUrl);
      if (!postsResponse.ok) {
        throw new Error(`Error fetching posts: ${postsResponse.statusText}`);
      }
      const postsData = await postsResponse.json();
      setBlogs(postsData.items || []);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (text: string): string => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, ' ');
  };

  useEffect(() => {
    fetchBlogIdAndPosts();
  }, []);

  // Pagination calculations
  const totalPages = Math.ceil(blogs.length / blogsPerPage);
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="projects" className="flex flex-col items-center justify-center py-20">
      <h1 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 mb-12">
        Blogs
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-10 w-full">
        {loading ? (
          <div className="col-span-3 flex flex-col items-center justify-center gap-4 min-h-[400px]">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            <div className="text-xl text-gray-600">Loading blogs...</div>
          </div>
        ) : currentBlogs.length > 0 ? (
          currentBlogs.map((blog) => {
            const parser = new DOMParser();
            const contentDoc = parser.parseFromString(blog.content || '', 'text/html');
            const image = contentDoc.querySelector('img')?.src;
            const firstLine = contentDoc.body.textContent?.split('\n')[0] || 'No title';
            const slug = generateSlug(firstLine);

            return (
              <div key={blog.id} className="flex flex-col border rounded-xl shadow overflow-hidden bg-gray-900 opacity-90">
                {/* Fixed aspect ratio container for images */}
                <div className="relative w-full pt-[56.25%]">
                  {image ? (
                    <img
                      src={image}
                      alt={blog.title}
                      className="absolute top-0 left-0 w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute top-0 left-0 w-full h-full bg-gray-700 flex items-center justify-center">
                      <span className="text-gray-400">No image available</span>
                    </div>
                  )}
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h2 className="text-xl text-yellow-200 font-bold h-14 overflow-hidden line-clamp-2">
                    {blog.title}
                  </h2>
                  <p className="text-white h-6 overflow-hidden text-ellipsis whitespace-nowrap">
                    {slug}
                  </p>
                  <div 
                    className="text-gray-300 h-20 overflow-hidden line-clamp-3"
                    dangerouslySetInnerHTML={{
                      __html: blog.contentSnippet || blog.content.slice(0, 100),
                    }}
                  />
                  <Link 
                    href={`/blog/${blog.id}`} 
                    className="text-blue-500 hover:underline mt-auto"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-600 col-span-3 text-center">No blogs available.</p>
        )}
      </div>

      {/* Pagination Controls */}
      {!loading && blogs.length > blogsPerPage && (
        <div className="flex items-center justify-center mt-8 gap-2">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 bg-white rounded-lg border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`px-4 bg-white font-bold py-2 rounded-lg border ${
                currentPage === number
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              {number}
            </button>
          ))}
          
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 bg-white rounded-lg border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </section>
  );
};

export default Blogs; 
