import { getBlogPostBySlug, getAllBlogPosts } from '@/utils/blogUtils';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeftIcon, CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';
import ReactMarkdown from 'react-markdown';

interface BlogPageProps {
  params: Promise<{
    slug?: string[];
  }>;
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({
    slug: [post.slug],
  }));
}

export default async function BlogPage({ params }: BlogPageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug?.[0];

  // If no slug, show all blogs
  if (!slug) {
    const allPosts = await getAllBlogPosts();
    
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 pt-24">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="mb-12">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors mb-6 group"
            >
              <ArrowLeftIcon className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to home</span>
            </Link>

            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
              All Blog Posts
            </h1>
            <p className="text-slate-600 text-lg">
              {allPosts.length} {allPosts.length === 1 ? 'article' : 'articles'} and counting...
            </p>
          </div>

          <div className="space-y-6">
            {allPosts.length > 0 ? (
              allPosts.map((post) => (
                <Link 
                  key={post.id} 
                  href={`/blog/${post.slug}`}
                  className="block group"
                >
                  <article className="bg-white p-8 rounded-2xl border border-slate-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r ${post.gradient} text-white`}>
                        {post.category}
                      </span>
                      <div className="flex items-center gap-1 text-sm text-slate-500">
                        <CalendarIcon className="h-4 w-4" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-slate-500">
                        <ClockIcon className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all">
                      {post.title}
                    </h2>
                    
                    {post.excerpt && (
                      <p className="text-slate-600 leading-relaxed">
                        {post.excerpt}
                      </p>
                    )}

                    <div className="mt-4 text-blue-600 font-semibold flex items-center gap-2 group-hover:gap-4 transition-all">
                      <span>Read article</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </article>
                </Link>
              ))
            ) : (
              <div className="text-center py-20">
                <p className="text-slate-500 text-lg">No blog posts yet. Create your first post in <code className="bg-slate-100 px-2 py-1 rounded">src/content/blogs/</code></p>
              </div>
            )}
          </div>
        </div>
      </main>
    );
  }

  // Show individual blog post
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { frontmatter, content } = post;

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 pt-24">
      <article className="max-w-3xl mx-auto px-6 py-12">
        {/* Back Button */}
        <Link 
          href="/blog"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors mb-8 group"
        >
          <ArrowLeftIcon className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to all posts</span>
        </Link>

        {/* Post Header */}
        <header className="mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className={`text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r ${frontmatter.gradient || 'from-blue-500 to-cyan-500'} text-white`}>
              {frontmatter.category || 'General'}
            </span>
            <div className="flex items-center gap-1 text-sm text-slate-500">
              <CalendarIcon className="h-4 w-4" />
              <span>{frontmatter.date}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-slate-500">
              <ClockIcon className="h-4 w-4" />
              <span>{frontmatter.readTime || '5 min read'}</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent leading-tight">
            {frontmatter.title}
          </h1>

          {frontmatter.excerpt && (
            <p className="text-xl text-slate-600 leading-relaxed">
              {frontmatter.excerpt}
            </p>
          )}

          {frontmatter.author && (
            <p className="text-sm text-slate-500 mt-6">
              By <span className="font-semibold text-slate-700">{frontmatter.author}</span>
            </p>
          )}
        </header>

        {/* Post Content with styled Markdown */}
        <div className="prose prose-lg prose-slate max-w-none
          prose-headings:font-bold prose-headings:tracking-tight
          prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-8
          prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:text-slate-900
          prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-slate-900
          prose-p:text-slate-700 prose-p:leading-relaxed prose-p:mb-6
          prose-a:text-blue-600 prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
          prose-strong:text-slate-900 prose-strong:font-bold
          prose-code:text-pink-600 prose-code:bg-pink-50 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:font-mono prose-code:text-sm
          prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-pre:p-6 prose-pre:rounded-xl prose-pre:overflow-x-auto
          prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:pl-6 prose-blockquote:py-1 prose-blockquote:italic prose-blockquote:text-slate-700
          prose-ul:list-disc prose-ul:pl-6 prose-ul:my-6
          prose-ol:list-decimal prose-ol:pl-6 prose-ol:my-6
          prose-li:text-slate-700 prose-li:mb-2 prose-li:leading-relaxed
          prose-img:rounded-xl prose-img:shadow-lg
        ">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>

        {/* Post Footer */}
        <footer className="mt-16 pt-8 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors group"
            >
              <ArrowLeftIcon className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              <span>Read more articles</span>
            </Link>

            <Link 
              href="/"
              className="text-slate-600 hover:text-blue-600 transition-colors"
            >
              Back to home
            </Link>
          </div>
        </footer>
      </article>
    </main>
  );
}