import React, { useEffect, useState } from 'react'
import './BlogList.css'
import { client } from '../../../prismicClient';
import Header from '../../components/Header/Header';
import { PrismicImage, PrismicRichText } from '@prismicio/react';
import { Link } from 'react-router-dom';

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(()=>{
        const fetchBlogs = async () => {
            const response = await client.getAllByType('blog_post')
            setBlogs(response)
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
            {blogs.map((blog)=>(
                <div key={blog.id} className="blog-card">
                    <div className="img-container">
                   {blog?.data?.image?.url && (
                <img
                    src={blog.data.image.url}
                    alt="Test image"
                    style={{
                    display: "block",
                    border: "none",
                    }}
                    className='blogs-img'
                />
            )}
            </div>
                    <div className="blog-details">
                    <PrismicRichText field={blog.data.title}/>
                    <PrismicRichText field={blog.data.excerpt}/>
                    <div className="button">
                    <a href={`blogs/${blog.uid}`}>Read  More</a>
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
