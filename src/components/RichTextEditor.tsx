'use client'
import { useEditor, EditorContent, BubbleMenu, Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline' // added Underline extension import
import { useState, useEffect } from 'react'
import { IconType } from 'react-icons'
import { 
  RiBold, RiItalic, RiUnderline, RiStrikethrough, 
  RiH1, RiH2, RiH3, RiParagraph,
  RiListOrdered, RiListUnordered, 
  RiDoubleQuotesL, RiLink,
  RiImageAddLine,
  RiAlignLeft, RiAlignCenter, RiAlignRight, RiAlignJustify,
  RiArrowGoBackLine, RiArrowGoForwardLine,
  RiFormatClear, RiCodeBoxLine
  // Removed: RiLinkUnlink, RiImageLine, RiSeparator, RiSubscript, RiSuperscript, RiListCheck2
} from 'react-icons/ri'

interface ToolbarButtonProps {
  icon: IconType;
  isActive?: boolean;
  onClick: () => void;
  label: string;
}

const ToolbarButton = ({ icon: Icon, isActive, onClick, label }: ToolbarButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    className={`p-2 rounded-md hover:bg-slate-800 tooltip-trigger ${
      isActive ? 'bg-slate-800 text-emerald-400' : 'text-slate-300'
    }`}
    title={label}
  >
    <Icon className="w-5 h-5" />
  </button>
)

const EDITOR_GROUPS = [
  {
    id: 'history',
    label: 'History',
    buttons: [
      { icon: RiArrowGoBackLine, action: 'undo', label: 'Undo' },
      { icon: RiArrowGoForwardLine, action: 'redo', label: 'Redo' },
      { icon: RiFormatClear, action: 'clearFormat', label: 'Clear Formatting' }
    ]
  },
  {
    id: 'formatting',
    label: 'Text Formatting',
    buttons: [
      { icon: RiBold, action: 'toggleBold', label: 'Bold' },
      { icon: RiItalic, action: 'toggleItalic', label: 'Italic' },
      { icon: RiUnderline, action: 'toggleUnderline', label: 'Underline' },
      { icon: RiStrikethrough, action: 'toggleStrike', label: 'Strike' }
    ]
  },
  {
    id: 'headings',
    label: 'Text Style',
    buttons: [
      { icon: RiParagraph, action: 'setParagraph', label: 'Paragraph' },
      { icon: RiH1, action: 'toggleH1', label: 'Heading 1' },
      { icon: RiH2, action: 'toggleH2', label: 'Heading 2' },
      { icon: RiH3, action: 'toggleH3', label: 'Heading 3' }
    ]
  },
  {
    id: 'lists',
    label: 'Lists',
    buttons: [
      { icon: RiListUnordered, action: 'toggleBulletList', label: 'Bullet List' },
      { icon: RiListOrdered, action: 'toggleOrderedList', label: 'Numbered List' }
    ]
  },
  {
    id: 'alignment',
    label: 'Alignment',
    buttons: [
      { icon: RiAlignLeft, action: 'alignLeft', label: 'Align Left' },
      { icon: RiAlignCenter, action: 'alignCenter', label: 'Align Center' },
      { icon: RiAlignRight, action: 'alignRight', label: 'Align Right' },
      { icon: RiAlignJustify, action: 'alignJustify', label: 'Justify' }
    ]
  },
  {
    id: 'extras',
    label: 'Extra Elements',
    buttons: [
      { icon: RiDoubleQuotesL, action: 'toggleBlockquote', label: 'Blockquote' },
      { icon: RiCodeBoxLine, action: 'toggleCodeBlock', label: 'Code Block' },
      { icon: RiLink, action: 'setLink', label: 'Add Link' },
      { icon: RiImageAddLine, action: 'addImage', label: 'Add Image' }
    ]
  }
]

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;

  const handleAction = (action: string) => {
    switch(action) {
      case 'undo':
        editor.chain().focus().undo().run();
        break;
      case 'redo':
        editor.chain().focus().redo().run();
        break;
      case 'clearFormat':
        editor.chain().focus().clearNodes().unsetAllMarks().run();
        break;
      case 'toggleBold':
        editor.chain().focus().toggleBold().run();
        break;
      case 'toggleItalic':
        editor.chain().focus().toggleItalic().run();
        break;
      case 'toggleUnderline':
        editor.chain().focus().toggleUnderline().run();
        break;
      case 'toggleStrike':
        editor.chain().focus().toggleStrike().run();
        break;
      case 'setParagraph':
        editor.chain().focus().setParagraph().run();
        break;
      case 'toggleH1':
        editor.chain().focus().toggleHeading({ level: 1 }).run();
        break;
      case 'toggleH2':
        editor.chain().focus().toggleHeading({ level: 2 }).run();
        break;
      case 'toggleH3':
        editor.chain().focus().toggleHeading({ level: 3 }).run();
        break;
      case 'toggleBulletList':
        editor.chain().focus().toggleBulletList().run();
        break;
      case 'toggleOrderedList':
        editor.chain().focus().toggleOrderedList().run();
        break;
      case 'alignLeft':
        editor.chain().focus().setTextAlign('left').run();
        break;
      case 'alignCenter':
        editor.chain().focus().setTextAlign('center').run();
        break;
      case 'alignRight':
        editor.chain().focus().setTextAlign('right').run();
        break;
      case 'alignJustify':
        editor.chain().focus().setTextAlign('justify').run();
        break;
      case 'toggleBlockquote':
        editor.chain().focus().toggleBlockquote().run();
        break;
      case 'toggleCodeBlock':
        editor.chain().focus().toggleCodeBlock().run();
        break;
      case 'setLink': {
        const url = window.prompt('Enter URL');
        if (url) {
          editor.chain().focus().setLink({ href: url }).run();
        } else {
          editor.chain().focus().unsetLink().run();
        }
        break;
      }
      case 'addImage': {
        const url = window.prompt('Enter image URL');
        if (url) {
          editor.chain().focus().setImage({ src: url }).run();
        }
        break;
      }
      default:
        break;
    }
  }

  return (
    <div className="sticky top-0 z-10 bg-slate-900/80 backdrop-blur-sm border-b border-slate-800">
      <div className="max-w-[90%] xl:max-w-8xl mx-auto px-4 py-2 flex flex-wrap gap-4">
        {EDITOR_GROUPS.map((group) => (
          <div key={group.id} className="flex flex-col">
            <span className="text-xs text-slate-500 mb-1">{group.label}</span>
            <div className="flex gap-1 bg-slate-800/50 rounded-md p-1">
              {group.buttons.map((button) => (
                <ToolbarButton
                  key={button.action}
                  icon={button.icon}
                  onClick={() => handleAction(button.action)}
                  isActive={editor.isActive(button.action)}
                  label={button.label}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const FloatingMenu = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;

  return (
    <BubbleMenu 
      editor={editor} 
      tippyOptions={{ duration: 100 }}
      className="bg-slate-900 rounded-lg shadow-lg border border-slate-800 flex overflow-hidden"
    >
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-2 hover:bg-slate-800 ${editor.isActive('bold') ? 'text-emerald-400' : 'text-slate-300'}`}
      >
        B
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-2 hover:bg-slate-800 ${editor.isActive('italic') ? 'text-emerald-400' : 'text-slate-300'}`}
      >
        I
      </button>
      <button
        type="button"
        onClick={() => {
          const url = window.prompt('Enter URL');
          if (url) {
            editor.chain().focus().setLink({ href: url }).run();
          } else if (editor.isActive('link')) {
            editor.chain().focus().unsetLink().run();
          }
        }}
        className={`p-2 hover:bg-slate-800 ${editor.isActive('link') ? 'text-emerald-400' : 'text-slate-300'}`}
      >
        🔗
      </button>
    </BubbleMenu>
  );
}

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

const EditorContainer = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="w-full bg-slate-900">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
      <FloatingMenu editor={editor} />
    </div>
  );
};

function RichTextEditorContent({ value, onChange, placeholder }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline, // added underline extension
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-emerald-400 hover:text-emerald-500',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-lg shadow-lg max-w-full',
        },
      }),
      Placeholder.configure({
        placeholder: placeholder || 'Start writing your story...',
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-lg prose-invert max-w-none focus:outline-none min-h-[500px] max-w-[90%] xl:max-w-8xl mx-auto px-4 py-8 text-slate-300',
      },
    },
  })

  return <EditorContainer editor={editor} />;
}

// Export a wrapped version that handles client-side mounting
export default function RichTextEditor(props: RichTextEditorProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="w-full">
      {isMounted ? (
        <RichTextEditorContent {...props} />
      ) : (
        <div className="w-full bg-slate-900 min-h-[500px] animate-pulse">
          <div className="h-12 bg-slate-800/50 mb-4" />
          <div className="h-96 bg-slate-800/30" />
        </div>
      )}
    </div>
  );
}
