import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { adminClient } from '../../../sanityClient';
import './DeleteBlog.css'

const DeleteBlog = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [deleteError, setDeleteError] = useState(false);
  const [confirmationText, setConfirmationText] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await adminClient.fetch(
          `*[_type == "blog" && slug.current == $slug][0]`,
          { slug }
        );
        setBlog(response);
      } catch (err) {
        console.error('Error fetching blog:', err);
      }
    };
    fetchBlog();
  }, [slug]);

  const handleDelete = async () => {
    if (!blog) return;

    if (confirmationText !== blog.title) {
      setDeleteError(true);
      return;
    }

    const confirmDelete = window.confirm(
      `Are you sure you want to delete the blog "${blog.title}"?`
    );
    if (!confirmDelete) return;

    try {
      await adminClient.delete(blog._id);
      alert('Blog deleted successfully!');
      navigate('/');
    } catch (error) {
      console.error('Failed to delete blog:', error);
      alert('Error deleting blog.');
    }
  };

  if (!blog) return <p>Loading...</p>;

  return (
    <div className='delete-blog-container'>
      <label className='deletion-confirmation-text'>
        Type "<strong>{blog.title}</strong>" to confirm deletion:
      </label>
      <input
        type="text"
        className="deletion-confirmation-input"
        value={confirmationText}
        onChange={(e) => {
          setConfirmationText(e.target.value);
          setDeleteError(false);
        }}
      />
      {deleteError && (
        <p className="delete-match-error">Title did not match. Please type it exactly.</p>
      )}
      <button
        type="button"
        className="delete-blog-button"
        onClick={handleDelete}
      >
        Delete Blog
      </button>
    </div>
  );
};

export default DeleteBlog;
