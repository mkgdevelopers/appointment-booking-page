import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { client } from "../../../prismicClient";
import { PrismicImage, PrismicRichText } from "@prismicio/react";
import './BlogDetails.css'
import Header from '../../components/Header/Header';

const BlogDetails = () => {
    const [blog, setBlog] = useState(null);
    const { uid } = useParams()

    useEffect(()=>{
        const fetchBlog = async () => {
            const response = await client.getByUID('blog_post',uid);
            setBlog(response)
            console.log(response.data.image)
        };
        fetchBlog();
    },[uid])

    if (!blog) return (<p>Blog not found!</p>)

  return (
    <>
    <Header/>
    <div className="blog-container">
        <div className="blog">
            <PrismicRichText field={blog.data.title}/>
            {/* <PrismicImage field={blog.data.image}/> */}
            {blog?.data?.image?.url && (
                <img
                    src={blog.data.image.url}
                    alt="Test image"
                    style={{
                    display: "block",
                    width: "50%",
                    height: "auto",
                    border: "none",
                    }}
                    className='blog-img'
                />
            )}
            <div className="blog-text">
                <PrismicRichText field={blog.data.content_body}/>
            </div>
        </div>
    </div>
    </>
  )
}

export default BlogDetails
