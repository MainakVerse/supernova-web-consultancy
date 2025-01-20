'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

interface Post {
  title: string;
  content: string;
  published: string;
  labels?: string[];
}

// Utility function to process HTML content and preserve styling
const processContent = (htmlContent: string) => {
  const doc = new DOMParser().parseFromString(htmlContent, 'text/html');
  
  // Process all elements with style attributes
  const styledElements = doc.querySelectorAll('[style]');
  styledElements.forEach(element => {
    const styles = element.getAttribute('style');
    if (styles) {
      // Convert inline styles to Tailwind classes
      if (styles.includes('color')) {
        const colorMatch = styles.match(/color:\s*([^;]+)/);
        if (colorMatch) {
          (element as HTMLElement).style.removeProperty('color');
          element.setAttribute('data-color', colorMatch[1]);
          element.className = `${element.className} styled-text`;
        }
      }
      
      if (styles.includes('font-weight: bold') || styles.includes('font-weight:bold')) {
        (element as HTMLElement).style.removeProperty('font-weight');
        element.className = `${element.className} font-bold`;
      }
    }
  });

  // Process specific HTML elements
  const boldElements = doc.querySelectorAll('b, strong');
  boldElements.forEach(element => {
    element.className = 'font-bold';
  });

  // Process paragraphs
  const paragraphs = doc.querySelectorAll('p');
  paragraphs.forEach(p => {
    p.className = 'mb-4 leading-relaxed';
  });

  return doc.body.innerHTML;
};

export default function BlogPost() {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  const fetchBlogPost = async () => {
    const API_KEY = process.env.NEXT_PUBLIC_BLOGGER_API_KEY;
    const postUrl = `https://www.googleapis.com/blogger/v3/blogs/byurl?url=https://supernova-mv.blogspot.com/&key=${API_KEY}`;

    try {
      const blogIdResponse = await fetch(postUrl);
      if (!blogIdResponse.ok) {
        throw new Error(`Error fetching blog ID: ${blogIdResponse.statusText}`);
      }
      const blogIdData = await blogIdResponse.json();
      const blogId = blogIdData.id;

      const postDetailUrl = `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts/${params.id}?key=${API_KEY}`;
      const postResponse = await fetch(postDetailUrl);
      if (!postResponse.ok) {
        throw new Error(`Error fetching post: ${postResponse.statusText}`);
      }
      const postData: Post = await postResponse.json();
      setPost(postData);
    } catch (error) {
      console.error('Error fetching blog post:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params.id) {
      fetchBlogPost();
    }
  }, [params.id]);

  // Add styles for colored text
  useEffect(() => {
    if (post) {
      const styleSheet = document.createElement('style');
      styleSheet.textContent = `
        .styled-text {
          color: var(--text-color);
        }
      `;
      document.head.appendChild(styleSheet);

      // Find all styled text elements and set their color
      const styledElements = document.querySelectorAll('.styled-text');
      styledElements.forEach(element => {
        const color = element.getAttribute('data-color');
        if (color) {
          (element as HTMLElement).style.setProperty('--text-color', color);
        }
      });

      return () => {
        document.head.removeChild(styleSheet);
      };
    }
  }, [post]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        <div className="text-xl text-gray-600">Loading your post...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-xl mb-4">Post not found</div>
        <Link href="/" className="text-blue-500 hover:underline">
          Return to Home
        </Link>
      </div>
    );
  }

  const mainImage = post.content.includes('<img') 
    ? new DOMParser().parseFromString(post.content, 'text/html').querySelector('img')?.src 
    : null;

  const processedContent = processContent(post.content.replace(/<img.*?>/, ''));

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/blogs" className="text-blue-500 hover:underline mt-20 flex items-center">
          ← Back to Blogs
        </Link>
      </div>
      
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-indigo-600">
        {post.title}
      </h1>
      
      <div className="text-gray-500 mb-6">
        Published on {new Date(post.published).toLocaleDateString()}
      </div>
  
      {mainImage && (
        <div className="mb-8">
          <img
            src={mainImage}
            alt={post.title}
            className="w-full h-auto rounded-lg"
          />
        </div>
      )}
  
      <div
        className="prose max-w-none text-white"
        dangerouslySetInnerHTML={{ __html: processedContent }}
      />
      
      {post.labels && (
        <div className="mt-8 flex flex-wrap gap-2">
          {post.labels.map((label) => (
            <span key={label} className="bg-gray-100 px-3 py-1 rounded-full text-sm text-white">
              {label}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}