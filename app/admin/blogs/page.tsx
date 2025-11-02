import BlogsAdminTable from "##/components/admin/BlogsAdminTable";
import BlogDB from "##/DataBase/BlogDB";

export default async function AdminBlogsPage() {
  const blogs = await BlogDB.getBlogs();

  const blogRows = blogs.map((b: unknown) => {
    const row = b as Record<string, unknown>;
    return {
      id: String(row.id ?? ""),
      title: String(row.title ?? ""),
      slug: String(row.slug ?? ""),
    };
  });
  return <BlogsAdminTable blogs={blogRows} />;
}
