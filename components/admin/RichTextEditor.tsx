'use client';

import { useState, useEffect, useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import { FaBold, FaItalic, FaUnderline, FaListOl, FaList, FaLink, FaUnlink } from 'react-icons/fa';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  height?: string;
}

const RichTextEditor = ({ value, onChange, placeholder = 'Escribe aquí...', height = '300px' }: RichTextEditorProps) => {
  const [mounted, setMounted] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // Configurazione per mantenere gli a capo multipli
        paragraph: {
          HTMLAttributes: {
            class: 'paragraph',
          },
        },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-500 underline',
        },
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose focus:outline-none p-4',
        style: `min-height: ${height}; max-height: 500px; overflow-y: auto;`,
        placeholder: placeholder,
      },
    },
    onUpdate: ({ editor }) => {
      // Preserva gli a capo multipli nel HTML generato
      const html = editor.getHTML();
      onChange(html);
    },
  });

  // Update editor content when value prop changes
  useEffect(() => {
    if (editor && editor.getHTML() !== value) {
      editor.commands.setContent(value);
    }
  }, [editor, value]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleBold = useCallback(() => {
    editor?.chain().focus().toggleBold().run();
  }, [editor]);

  const toggleItalic = useCallback(() => {
    editor?.chain().focus().toggleItalic().run();
  }, [editor]);

  const toggleUnderline = useCallback(() => {
    editor?.chain().focus().toggleUnderline().run();
  }, [editor]);

  const toggleBulletList = useCallback(() => {
    editor?.chain().focus().toggleBulletList().run();
  }, [editor]);

  const toggleOrderedList = useCallback(() => {
    editor?.chain().focus().toggleOrderedList().run();
  }, [editor]);

  const setLink = useCallback(() => {
    const url = window.prompt('URL');
    if (url) {
      editor?.chain().focus().setLink({ href: url }).run();
    }
  }, [editor]);

  const removeLink = useCallback(() => {
    editor?.chain().focus().unsetLink().run();
  }, [editor]);

  if (!mounted) {
    return <div className="h-64 w-full bg-gray-100 rounded-lg"></div>;
  }

  return (
    <div className="rich-text-editor border rounded-lg overflow-hidden">
      <div className="toolbar bg-gray-50 p-2 border-b flex flex-wrap gap-1">
        <button
          type="button"
          onClick={toggleBold}
          className={`p-2 rounded hover:bg-gray-200 ${editor?.isActive('bold') ? 'bg-gray-200' : ''}`}
          title="Bold"
        >
          <FaBold />
        </button>
        <button
          type="button"
          onClick={toggleItalic}
          className={`p-2 rounded hover:bg-gray-200 ${editor?.isActive('italic') ? 'bg-gray-200' : ''}`}
          title="Italic"
        >
          <FaItalic />
        </button>
        <button
          type="button"
          onClick={toggleUnderline}
          className={`p-2 rounded hover:bg-gray-200 ${editor?.isActive('underline') ? 'bg-gray-200' : ''}`}
          title="Underline"
        >
          <FaUnderline />
        </button>
        <div className="border-r mx-1 h-6 my-auto"></div>
        <button
          type="button"
          onClick={toggleBulletList}
          className={`p-2 rounded hover:bg-gray-200 ${editor?.isActive('bulletList') ? 'bg-gray-200' : ''}`}
          title="Bullet List"
        >
          <FaList />
        </button>
        <button
          type="button"
          onClick={toggleOrderedList}
          className={`p-2 rounded hover:bg-gray-200 ${editor?.isActive('orderedList') ? 'bg-gray-200' : ''}`}
          title="Ordered List"
        >
          <FaListOl />
        </button>
        <div className="border-r mx-1 h-6 my-auto"></div>
        <button
          type="button"
          onClick={setLink}
          className={`p-2 rounded hover:bg-gray-200 ${editor?.isActive('link') ? 'bg-gray-200' : ''}`}
          title="Add Link"
        >
          <FaLink />
        </button>
        <button
          type="button"
          onClick={removeLink}
          className="p-2 rounded hover:bg-gray-200"
          title="Remove Link"
          disabled={!editor?.isActive('link')}
        >
          <FaUnlink />
        </button>
      </div>
      <EditorContent editor={editor} className="editor-content" />
      <style jsx global>{`
        .rich-text-editor .editor-content {
          background: white;
          font-family: inherit;
          min-height: ${height};
          max-height: 500px;
          overflow-y: auto;
        }
        .rich-text-editor .ProseMirror {
          min-height: ${height};
          outline: none;
          padding: 1rem;
        }
        .rich-text-editor .ProseMirror p {
          margin-bottom: 0.75rem;
          min-height: 1.2em; /* Assicura che i paragrafi vuoti abbiano altezza */
        }
        .rich-text-editor .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #adb5bd;
          pointer-events: none;
          height: 0;
        }
        /* Stili per gli elenchi nell'editor */
        .rich-text-editor .ProseMirror ul {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin-bottom: 0.75rem;
        }
        .rich-text-editor .ProseMirror ol {
          list-style-type: decimal;
          padding-left: 1.5rem;
          margin-bottom: 0.75rem;
        }
        .rich-text-editor .ProseMirror li {
          margin-bottom: 0.25rem;
        }
        .rich-text-editor .ProseMirror li p {
          margin: 0;
        }
        /* Stili per i link nell'editor */
        .rich-text-editor .ProseMirror a {
          color: #3b82f6;
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default RichTextEditor;
