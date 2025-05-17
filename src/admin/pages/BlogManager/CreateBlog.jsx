import React, { useState } from 'react';
import { adminClient } from '../../../sanityClient';
import './CreateBlog.css';

const CreateBlog = () => {
  const [blogData, setBlogData] = useState({
    title: '',
    content: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setBlogData({ ...blogData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      let imageAsset = null;

      if (imageFile) {
        const imageDoc = {
          _type: 'image',
          asset: await adminClient.assets.upload('image', imageFile),
        };
        imageAsset = {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageDoc.asset._id,
          },
        };
      }

      const slugifiedTitle = blogData.title
  .toLowerCase()
  .replace(/\s+/g, '-')
  .replace(/[^a-z0-9-]/g, '')
  .slice(0, 96);

const doc = {
  _type: 'blog',
  title: blogData.title,
  content: blogData.content,
  image: imageAsset,
  slug: {
    _type: 'slug',
    current: slugifiedTitle,
  },
  createdAt: new Date().toISOString(),
};


      await adminClient.create(doc);
      setSuccessMsg('✅ Blog post created successfully!');
      setBlogData({ title: '', content: '' });
      setImageFile(null);
    } catch (err) {
      console.error(err);
      setErrorMsg('❌ Failed to create blog post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-blog-container">
      <h2>Create a New Blog Post</h2>
      <form onSubmit={handleSubmit} className="create-blog-form">
        <input
          type="text"
          name="title"
          placeholder="Blog Title"
          value={blogData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="content"
          placeholder="Blog Content"
          value={blogData.content}
          onChange={handleChange}
          required
        />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button type="submit" disabled={loading}>
          {loading ? 'Publishing...' : 'Publish Blog'}
        </button>
        {successMsg && <p className="success">{successMsg}</p>}
        {errorMsg && <p className="error">{errorMsg}</p>}
      </form>
    </div>
  );
};

export default CreateBlog;
