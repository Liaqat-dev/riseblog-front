
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {useEffect} from "react";


interface Props {
    content: string
    className?: string
}

const RenderContent = ({ content,className }: Props) => {

    // const editor = useEditor({
    //     extensions: [StarterKit],
    //     editable: false, // read-only mode
    //     content: JSON.parse(content),
    // })
    //
    //
    // if (!editor) return null
    //

    const editor = useEditor({
        extensions: [StarterKit],
        editable: false,
    })

    useEffect(() => {
        if (editor && content) {
            try {
                editor.commands.setContent(JSON.parse(content))
            } catch (error) {
                console.error('Invalid JSON content:', error)
            }
        }
    }, [editor, content])

    return (
        <div className={`w-[95%] mx-auto min-h-[200px]   p-4 ${className}`}>
            <EditorContent editor={editor} />
        </div>
    )
}

export default RenderContent

