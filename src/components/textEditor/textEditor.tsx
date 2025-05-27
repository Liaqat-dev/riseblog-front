import {EditorContent, useEditor} from '@tiptap/react'
import {StarterKit} from "@tiptap/starter-kit";


import {FaBold, FaCode, FaItalic, FaRedo, FaStrikethrough, FaUndo} from "react-icons/fa";
import {LuTextQuote} from "react-icons/lu";

import {MdFormatListBulleted, MdFormatListNumbered} from "react-icons/md";
import {LuHeading1, LuHeading2, LuHeading3} from "react-icons/lu";

import './styles.scss'
import React, {useEffect} from "react";


interface Props {
    content?: string,
    setContent: React.Dispatch<React.SetStateAction<string>>;
}

const TextEditor = ({content, setContent}: Props) => {


    const editor = useEditor({
        extensions: [
            StarterKit,

        ],
        content: undefined,
        autofocus: true,
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
            },

        },
        onUpdate: ({editor}) => {
            const Json = editor.getJSON();
            setContent(JSON.stringify(Json));
        }
    })
    if (!editor) {
        return null
    }


    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        if (editor && content) {
            try {

                editor.commands.setContent(JSON.parse(content));
            } catch (error) {
                console.error("Invalid JSON content:", error);
            }
        }
    }, [editor, content]);


    const isActive = `bg-white text-blue rounded-xs`;
    const isInactive = `text-white`

    return (
        <div className="w-[100%] mx-auto min-h-[500px] bg-blue   h-fit pb-5 border-2 border-blue-600 rounded-md">
            <div className="control-group  ">
                <div className="flex h-4 gap-1.5 items-center flex flex-wrap h-fit  px-2" style={{margin: 10}}>
                    <button type={"button"}
                            onClick={() => editor.chain().focus().toggleBold().run()}
                            disabled={!editor.can().chain().focus().toggleBold().run()}
                            className={editor.isActive('bold') ? isActive : isInactive}>
                        <FaBold style={{padding: 1}}/>
                    </button>

                    <button type={"button"}
                            onClick={() => editor.chain().focus().toggleItalic().run()}
                            disabled={!editor.can().chain().focus().toggleItalic().run()}
                            className={editor.isActive('italic') ? isActive :isInactive}>
                        <FaItalic/>
                    </button>
                    <button type={"button"}
                            onClick={() => editor.chain().focus().toggleHeading({level: 1}).run()}
                            className={editor.isActive('heading', {level: 1}) ? isActive : isInactive}
                    >
                        <LuHeading1 style={{fontSize: 20}}/>
                    </button>
                    <button type={"button"}
                            onClick={() => editor.chain().focus().toggleHeading({level: 2}).run()}
                            className={editor.isActive('heading', {level: 2}) ? isActive : isInactive}
                    >
                        <LuHeading2 style={{fontSize: 20}}/>
                    </button>
                    <button type={"button"}
                            onClick={() => editor.chain().focus().toggleHeading({level: 3}).run()}
                            className={editor.isActive('heading', {level: 3}) ? isActive : isInactive}
                    >
                        <LuHeading3 style={{fontSize: 20}}/>
                    </button>
                    <button type={"button"}
                            onClick={() => editor.chain().focus().toggleStrike().run()}
                            disabled={!editor.can().chain().focus().toggleStrike().run()}
                            className={editor.isActive('strike') ? isActive : isInactive}>
                        <FaStrikethrough/>
                    </button>
                    <button type={"button"}
                            onClick={() => editor.chain().focus().toggleBlockquote().run()}
                            disabled={!editor.can().chain().focus().toggleBlockquote().run()}
                            className={editor.isActive('blockquote') ? isActive : isInactive}>
                        <LuTextQuote/>
                    </button>

                    <button type={"button"}
                            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                            className={editor.isActive('codeBlock') ? isActive : isInactive}>
                        <FaCode/>
                    </button>

                    <button type={"button"}
                            onClick={() => editor.chain().focus().toggleBulletList().run()}
                            className={editor.isActive('bulletList') ? isActive : isInactive}
                    >
                        <MdFormatListBulleted/>
                    </button>

                    <button type={"button"}
                            onClick={() => editor.chain().focus().toggleOrderedList().run()}
                            className={editor.isActive('orderedList') ? isActive : isInactive}>
                        <MdFormatListNumbered/>
                    </button>


                    <button
                        type={"button"}
                        className={isInactive}
                        onClick={() => editor.chain().focus().undo().run()}
                        disabled={!editor.can().chain().focus().undo().run()}>
                        <FaUndo/>
                    </button>
                    <button type={"button"}
                            className={isInactive}
                            onClick={() => editor.chain().focus().redo().run()}
                            disabled={!editor.can().chain().focus().redo().run()}>
                        <FaRedo/>
                    </button>

                </div>
            </div>
            <div className={'w-1 bg-black'}/>

            <hr/>

            {/* Add scrolling inside this */}
            <EditorContent className="w-full min-h-[400px] h-[96.5%] bg-white  " editor={editor}
                           style={{padding: 5}}/>
        </div>


    )
}
export default TextEditor