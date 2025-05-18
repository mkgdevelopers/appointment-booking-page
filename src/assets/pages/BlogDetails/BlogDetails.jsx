import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { client, urlFor } from '../../../sanityClient';
import './BlogDetails.css';
import Header from '../../components/Header/Header';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

const BlogDetails = () => {
  const [blog, setBlog] = useState(null);
  const { slug } = useParams();

  const editor = useEditor({
    extensions: [StarterKit],
    content: '',
    editable: false,
  });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await client.fetch(
          `*[_type == "blog" && slug.current == $slug][0]{title, image, content}`,
          { slug }
        );

        if (!response) {
          console.error('No blog found');
          return;
        }

        setBlog(response);
        const tiptapJSON = response.content || { type: 'doc', content: [] };
        editor?.commands.setContent(tiptapJSON);
      } catch (e) {
        console.error('Failed to load blog content', e);
      }
    };

    if (editor) fetchBlog();
  }, [slug, editor]);

  if (!blog) return <p>Blog not found!</p>;

  return (
    <>
      <Header />
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
            {editor && <EditorContent editor={editor} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetails;
