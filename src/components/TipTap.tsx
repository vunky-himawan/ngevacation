// src/Tiptap.tsx
import { useEditor, EditorContent } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import Blockquote from "@tiptap/extension-blockquote";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Heading from "@tiptap/extension-heading";
import ListKeyMap from "@tiptap/extension-list-keymap";
import Link from "@tiptap/extension-link";
import Toolbar from "./Toolbar";
import Highlight from "@tiptap/extension-highlight";
import axios from "axios";
import { API_BASE_URL } from "@/data/api";
import { useAuth } from "@/context/authContext";

const Tiptap = () => {
  const { token } = useAuth();
  const editor = useEditor({
    extensions: [
      StarterKit.configure(),
      Placeholder.configure({
        placeholder: "Write something …",
      }),
      Image,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Blockquote,
      Bold,
      Italic,
      Underline,
      Heading.configure({
        levels: [1, 2, 3],
      }),
      ListKeyMap,
      Link.configure({
        openOnClick: false,
        autolink: true,
        protocols: ["mailto", "tel", "https", "http", "ftp", "file"],
        linkOnPaste: true,
        defaultProtocol: "https",
      }),
      Highlight.configure({
        multicolor: true,
        HTMLAttributes: {
          class: "p-1 rounded-md text-white",
        },
      }),
    ],
    onUpdate: async ({ editor }) => {
      const tempImage: Array<string> = JSON.parse(
        localStorage.getItem("images") || "[]"
      );
      const activeImages =
        editor
          .getJSON()
          .content?.filter((node) => node.type === "image")
          .map((node) => node.attrs?.src) || [];

      const removedImages = tempImage.filter(
        (img) => !activeImages.includes(img)
      );

      if (removedImages.length > 0) {
        try {
          await Promise.all(
            removedImages.map((img) => {
              const filename = img.split("/").pop();
              axios.delete(`${API_BASE_URL}/storage/file-storage/${filename}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
            })
          );

          // Perbarui localStorage setelah penghapusan berhasil
          const updatedImages = tempImage.filter((img) =>
            activeImages.includes(img)
          );
          localStorage.setItem("images", JSON.stringify(updatedImages));
        } catch (error) {
          console.log(error);
        }
      }

      if (editor.isActive("image")) {
        const newImageSrc = editor.getAttributes("image").src;

        // Cek apakah URL gambar sudah ada di dalam array
        if (!tempImage.includes(newImageSrc)) {
          tempImage.push(newImageSrc);
          localStorage.setItem("images", JSON.stringify(tempImage));
        }
      }
    },
    editorProps: {
      attributes: {
        class:
          "focus:outline-none p-2.5 text-gray placeholder:text-gray-400 placeholder:text-xs",
      },
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <>
      <div>
        <Toolbar editor={editor} />

        <EditorContent editor={editor} />
      </div>
    </>
  );
};

export default Tiptap;
