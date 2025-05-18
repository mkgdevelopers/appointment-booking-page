import React, { useEffect, useState } from "react";
import "./BlogList.css";
import { client } from "../../../sanityClient";
import Header from "../../components/Header/Header";
import { Link } from "react-router-dom";
import { urlFor } from "../../../sanityClient";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await client.fetch(`*[_type == "blog"]`);
      setBlogs(response);
      setFilteredBlogs(response);
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    const filtered = blogs.filter((blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredBlogs(filtered);
  }, [searchQuery, blogs]);
  return (
    <div>
      <Header />
      <div className="blogs-container">
        <div className="search">
          <input
            type="text"
            placeholder="search blogs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="cards">
          {filteredBlogs.length > 0
            ? filteredBlogs.map((blog) => (
                <Link
                  to={`/blogs/${blog.slug.current}`}
                  key={blog.slug.current}
                  className="blog-card"
                >
                  {blog.image && (
                    <img
                      src={urlFor(blog.image).width(300).url()}
                      alt={blog.title}
                    />
                  )}
                  <h2>{blog.title}</h2>
                </Link>
              ))
            : 
            (<p>Blogs not found</p>)
              }
        </div>
      </div>
    </div>
  );
};

export default BlogList;
