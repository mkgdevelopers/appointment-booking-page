import { useEffect, useState } from "react";
import { client } from "../../../sanityClient";
import "./AllBlogs.css";
import { useNavigate } from "react-router-dom";
import { PrismicRichText } from "@prismicio/react";

const BlogManager = () => {

  const navigate = useNavigate()
  const [blogs, setBlogs] = useState([]);
    const handleCreateBlog = () => {
    navigate("/appointment-booking-page/admin/create-blog"); 
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await client.fetch(`*[_type == "blog"]`);
      setBlogs(response);
    };
    fetchBlogs();
  }, []);

{(!blogs) && (<p>Loading...</p>) }
  return (
    <div className='admin-blogcontainer'>
      <h1 className='admin-blog-heading'>Manage Blogs</h1>
      <button className="admin-dashboard-create-btn" onClick={handleCreateBlog}>
            + Create New Blog
      </button>
      <table className='admin-blog-table'>
        <thead className='admin-blog-thead'>
          <tr>
            <th className='admin-blog-th'>#</th>
            <th className='admin-blog-th'>Title</th>
            <th className='admin-blog-th'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog, index) => (
            <tr key={blog._id}>
              <td className='admin-blog-td'>{index + 1}</td>
              <td className='admin-blog-td'><p>{blog.title}</p></td>
              <td className='admin-blog-td'>
                <a href={`./edit-blogs/${blog.slug.current}`} className='admin-blog-actionsButton'>Edit</a>
                <a href={`./delete-blog/${blog.slug.current}`} className='admin-blog-deleteButton'>Delete</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default BlogManager;
