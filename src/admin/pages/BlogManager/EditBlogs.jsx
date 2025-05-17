import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { client, adminClient } from '../../../sanityClient';
import './EditBlog.css';

export default function EditBlog() {
  const navigate = useNavigate()
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [formData, setFormData] = useState({ title: '', content: '' });

  const fetchBlog = async () => {
    try {
      const blogDoc = await adminClient.fetch(
        `*[_type == "blog" && slug.current == $slug][0]`,
        { slug }
      );

      if (!blogDoc) {
        console.warn("No blog found for slug:", slug);
        setBlog(null);
        return;
      }

      setBlog(blogDoc);
      setFormData({
        title: blogDoc.title || '',
        content: blogDoc.content || '',
      });
    } catch (err) {
      console.error('Error fetching blog:', err);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [slug]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!blog) {
      alert("Blog not found.");
      return;
    }

    try {
      await adminClient
        .patch(blog._id)
        .set({
          title: formData.title,
          content: formData.content,
        })
        .commit();

      alert('Blog updated successfully!');
      fetchBlog(); 
    } catch (err) {
      console.error('Error updating blog:', err);
      alert('Failed to update blog.');
    }
  };

  if (blog === null) return <p>No blog found with this slug.</p>;
  if (!blog) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit} className='edit-blog-form'>
      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Blog Title"
        className='edit-blog-title'
      />
      <textarea
        name="content"
        value={formData.content}
        onChange={handleChange}
        placeholder="Blog Content"
        className='edit-blog-content'
      />
      <button type="submit" className='edit-blog-button'>
        Save Changes
      </button>
    </form>
  );
}
