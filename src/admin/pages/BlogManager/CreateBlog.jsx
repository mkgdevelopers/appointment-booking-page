import React, { useState } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { adminClient } from '../../../sanityClient';
import './CreateBlog.css';

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // ✅ Declare editor first
  const editor = useEditor({
    extensions: [StarterKit],
    content: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      if (!editor) {
        throw new Error('Editor not ready');
      }

      let imageAsset = null;

      // ✅ Upload image if selected
      if (imageFile) {
        const upload = await adminClient.assets.upload('image', imageFile);
        imageAsset = {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: upload._id,
          },
        };
      }

      const slug = title
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
        .slice(0, 96);

      const doc = {
        _type: 'blog',
        title,
        content: {
  content: JSON.stringify(editor.getJSON())
},
        image: imageAsset,
        slug: { _type: 'slug', current: slug },
        createdAt: new Date().toISOString(),
      };

      await adminClient.create(doc);

      setSuccessMsg('✅ Blog post created successfully!');
      setTitle('');
      editor.commands.setContent('');
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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <div className="editor-toolbar">
  <button type="button" onClick={() => editor.chain().focus().toggleBold().run()}>
    Bold
  </button>
  <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()}>
    Italic
  </button>
  <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()}>
    Strike
  </button>
  <button type="button" onClick={() => editor.chain().focus().setParagraph().run()}>
    Paragraph
  </button>
  <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
    H1
  </button>
   <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
    H2
  </button>
   <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
    H3
  </button>
   <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}>
    H4
  </button>
   <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}>
    H5
  </button>
   <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}>
    H6
  </button>
  <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()}>
    Bullet List
  </button>
</div>

        {editor && <EditorContent editor={editor} className="editor" />}

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
        />

        <button type="submit" disabled={loading || !editor}>
          {loading ? 'Publishing...' : 'Publish Blog'}
        </button>

        {successMsg && <p className="success">{successMsg}</p>}
        {errorMsg && <p className="error">{errorMsg}</p>}
      </form>
    </div>
  );
};

export default CreateBlog;
