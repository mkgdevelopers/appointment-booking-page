import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { client } from "../../../sanityClient";
import './BlogDetails.css'
import Header from '../../components/Header/Header';
import { urlFor } from '../../../sanityClient'; 

const BlogDetails = () => {
    const [blog, setBlog] = useState(null);
    const { slug } = useParams()

  useEffect(() => {
    const fetchBlog = async () => {
      const response = await client.fetch(
        `*[_type == "blog" && slug.current == $slug][0]`,
        { slug }
      );
      setBlog(response);
    };

    fetchBlog();
  }, [slug]);

    if (!blog) return (<p>Blog not found!</p>)

  return (
    <>
    <Header/>
    <div className="blog-container">
        <div className="blog">
            <h1>{blog.title}</h1>
            {blog.image && (
                    <img
                      src={urlFor(blog.image)?.url()}
                      alt={blog.title}
                      className="your-image-class"
                    />
                  )}
            <div className="blog-text">
                <p>{blog.content}</p>
            </div>
        </div>
    </div>
    </>
  )
}

export default BlogDetails
