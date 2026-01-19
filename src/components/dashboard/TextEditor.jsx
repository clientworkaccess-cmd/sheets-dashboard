"use client";

import { useEffect, useRef, useId } from "react";
import _ from "lodash";
import htmlToBlocks from "../../lib/htmlToBlocks";

const TextEditor = ({ data = "", onChange }) => {
    const uniqueId = useId();
    const holderRef = useRef(null);
    const editorRef = useRef(null);
    const lastSavedHtml = useRef(data);
    const parserRef = useRef(null);

    // 🔹 Debounced save (Supabase-safe)
    const debouncedSave = useRef(
        _.debounce(async () => {
            if (!editorRef.current || !parserRef.current) return;

            try {
                const savedData = await editorRef.current.save();

                const parsed = parserRef.current.parse(savedData);
                const html = Array.isArray(parsed)
                    ? parsed.join("")
                    : Object.values(parsed).join("");

                if (html !== lastSavedHtml.current) {
                    lastSavedHtml.current = html;
                    onChange?.(html);
                }
            } catch (err) {
                console.error("Editor save failed:", err);
            }
        }, 100)
    ).current;

    useEffect(() => {
        let isMounted = true;

        const initEditor = async () => {
            if (!holderRef.current || editorRef.current) return;

            const EditorJS = (await import("@editorjs/editorjs")).default;
            const Header = (await import("@editorjs/header")).default;
            const List = (await import("@editorjs/list")).default;
            const Paragraph = (await import("@editorjs/paragraph")).default;
            const edjsHTML = (await import("editorjs-html")).default;

            parserRef.current = edjsHTML();

            const editor = new EditorJS({
                holder: holderRef.current,
                placeholder: "Type content here...",
                data: htmlToBlocks(data),
                tools: {
                    header: { class: Header, inlineToolbar: true },
                    list: { class: List, inlineToolbar: true },
                    paragraph: { class: Paragraph, inlineToolbar: true },
                },
                onReady: () => {
                    if (isMounted) {
                        editorRef.current = editor;
                        lastSavedHtml.current = data;
                    }
                },
                onChange: () => {
                    debouncedSave();
                },
            });
        };

        initEditor();

        return () => {
            isMounted = false;
            debouncedSave.cancel();

            if (editorRef.current) {
                editorRef.current.destroy();
                editorRef.current = null;
            }
        };
    }, []);

    return (
        <div
            ref={holderRef}
            className="border rounded p-3 min-h-[150px] max-h-[400px] overflow-y-auto bg-white text-black"
        />
    );
};

export default TextEditor;
