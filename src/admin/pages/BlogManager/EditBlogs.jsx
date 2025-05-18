import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { client, adminClient } from '../../../sanityClient';
import './EditBlog.css';

export default function EditBlog() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const editor = useEditor({
    extensions: [StarterKit],
    content: '',
  });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blogDoc = await adminClient.fetch(
          `*[_type == "blog" && slug.current == $slug][0]{_id, title, content}`,
          { slug }
        );

        if (!blogDoc) {
          setErrorMsg('❌ No blog found.');
          setLoading(false);
          return;
        }

        setBlog(blogDoc);
        setTitle(blogDoc.title || '');

        const tiptapContent = blogDoc.content || { type: 'doc', content: [] }; // fallback if null
        editor?.commands.setContent(tiptapContent);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching blog:', err);
        setErrorMsg('❌ Failed to fetch blog.');
        setLoading(false);
      }
    };

    if (editor) fetchBlog();
  }, [slug, editor]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!blog || !editor) return;

    try {
      const tiptapJSON = editor.getJSON();

      await adminClient
        .patch(blog._id)
        .set({
          title: title,
          content: tiptapJSON,
        })
        .commit();

      alert('✅ Blog updated successfully!');
      navigate('/admin/all-blogs');
    } catch (err) {
      console.error('Error updating blog:', err);
      alert('❌ Failed to update blog.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (errorMsg) return <p>{errorMsg}</p>;

  return (
    <form onSubmit={handleSubmit} className="edit-blog-form">
      <input
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Blog Title"
        className="edit-blog-title"
      />

      <div className="editor-toolbar">
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()}>Bold</button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()}>Italic</button>
        <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()}>Strike</button>
        <button type="button" onClick={() => editor.chain().focus().setParagraph().run()}>Paragraph</button>
        {[1, 2, 3, 4, 5, 6].map((level) => (
          <button
            key={level}
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
          >
            H{level}
          </button>
        ))}
        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()}>Bullet List</button>
      </div>

      {editor && <EditorContent editor={editor} className="editor" />}

      <button type="submit" className="edit-blog-button">Save Changes</button>
    </form>
  );
}
