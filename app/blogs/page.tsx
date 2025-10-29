import BlogCard from "##/components/blogs/BlogCard";
import ScrollAnimation from "##/components/common/ScrollAnimation";
import BlogService from "##/services/blogService";
import type { RenderBlog } from "##/types/Blog";

export const metadata = {
  title: "Blogs - The Quiet Space",
  description:
    "Explore articles on mindfulness, emotional resilience, and personal growth at The Quiet Space.",
};

export const revalidate = 60;

const Blogs = async () => {
  const blogPosts = await BlogService.getBlogs();
  return (
    <main className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
      <ScrollAnimation>
        <header className="text-center mb-16">
          <h2 className="text-5xl font-extrabold text-[#2C3531] mb-4">
            Insight & Guidance
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Practical articles and deep dives into mindfulness, emotional
            resilience, and personal growth. Find the answers you need.
          </p>
        </header>
      </ScrollAnimation>

      <ScrollAnimation delay={200}>
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 space-y-4 md:space-y-0">
          <input
            type="search"
            placeholder="Search articles..."
            className="w-full md:w-1/3 p-3 border border-gray-300 rounded-lg focus:ring-[#B48B7F] focus:border-[#B48B7F] transition bg-white shadow-sm"
          />
          <div className="flex items-center space-x-4">
            <label
              htmlFor="categoryFilter"
              className="text-[#2C3531] font-medium"
            >
              Filter by Topic:
            </label>
            <select
              id="categoryFilter"
              className="p-3 border border-gray-300 rounded-lg focus:ring-[#B48B7F] focus:border-[#B48B7F] transition bg-white shadow-sm"
            >
              <option>All Topics</option>
              <option>Mindfulness</option>
              <option>Stress</option>
              <option>Boundaries</option>
              <option>Self-Care</option>
            </select>
          </div>
        </div>
      </ScrollAnimation>

      <section className="grid md:grid-cols-3 gap-10">
        {blogPosts.map((post: RenderBlog, index: number) => (
          <ScrollAnimation key={post.slug} delay={index * 100}>
            <BlogCard key={post.slug} {...post} />
          </ScrollAnimation>
        ))}
      </section>
    </main>
  );
};

export default Blogs;
