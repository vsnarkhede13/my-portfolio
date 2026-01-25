// src/data/blogData.ts

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  gradient: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Future of AI Design Tools",
    excerpt: "Exploring how AI is reshaping the design landscape and what it means for creators.",
    date: "Jan 24, 2026",
    readTime: "5 min read",
    category: "Technology",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: 2,
    title: "Building Scalable Web Applications",
    excerpt: "Best practices for creating applications that grow with your business needs.",
    date: "Jan 22, 2026",
    readTime: "8 min read",
    category: "Development",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: 3,
    title: "The Art of Minimalist UI Design",
    excerpt: "Less is more: creating beautiful interfaces through simplicity and purpose.",
    date: "Jan 20, 2026",
    readTime: "6 min read",
    category: "Design",
    gradient: "from-orange-500 to-red-500",
  },
  {
    id: 4,
    title: "My Journey into Web Development",
    excerpt: "Reflecting on the path that led me to become a full-stack developer.",
    date: "Jan 18, 2026",
    readTime: "10 min read",
    category: "Personal",
    gradient: "from-green-500 to-emerald-500",
  },
];

// Get total blog count
export const getTotalBlogCount = () => blogPosts.length;