import React, { useEffect, useState } from 'react'
import './BlogList.css'
import { client } from '../../../sanityClient';
import Header from '../../components/Header/Header';
import { Link } from 'react-router-dom';
import { urlFor } from '../../../sanityClient'; 


const BlogList = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(()=>{
        const fetchBlogs = async () => {
            const response = await client.fetch(`*[_type == "blog"]`);
            setBlogs(response)
            console.log(response)
        }
        fetchBlogs()
    },[])
  return (
    <div>
        <Header/>
        <div className="blogs-container">
            <div className="search">
            <span>Search Blog</span>
            <input type="search" placeholder='not functional yet...'/>
            </div>
            <div className="cards">
            {blogs.map((blog) => (
  <div key={blog._id} className="blog-card">
    <div className="img-container">
      {blog.image && (
        <img
          src={urlFor(blog.image)?.url()}
          alt={blog.title}
          className="your-image-class"
        />
      )}
    </div>
    <div className="blog-details">
      <h2>{blog.title}</h2>
      <div className="button">
        <Link to={`/appointment-booking-page/blogs/${blog.slug?.current}`}>
          Read More
        </Link>
      </div>
    </div>
  </div>
))}


            </div>
        </div>
    </div>
  )
}

export default BlogList
