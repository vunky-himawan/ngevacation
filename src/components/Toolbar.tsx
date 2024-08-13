import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { useCallback } from "react";
import { Editor } from "@tiptap/core";
import axios from "axios";
import { API_BASE_URL } from "@/data/api";
import { useAuth } from "@/context/authContext";

const Toolbar = ({ editor }: { editor: Editor }) => {
  const { token } = useAuth();
  if (!editor) {
    return null;
  }

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  const addImage = useCallback(() => {
    let url = "";
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.click();

    input.onchange = async (event: Event) => {
      const target = event.target as HTMLInputElement;
      const file: File | null = target.files ? target.files[0] : null;

      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        try {
          const response = await axios.post(
            `${API_BASE_URL}/storage/file-storage`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          url = response.data.data.url;

          editor.chain().focus().setImage({ src: url, title: file.name }).run();
        } catch (error) {
          console.log(error);
        }
      }
    };
  }, [editor]);

  return (
    <>
      <ToggleGroup
        type="multiple"
        className="flex flex-wrap sticky top-24 gap-5 px-5 py-3 border rounded-md mb-5 justify-start bg-white z-40 "
      >
        <ToggleGroupItem
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : ""}
          value="bold"
          aria-label="Toggle bold"
        >
          <span className="icon-[lucide--bold] w-5 h-5"></span>
        </ToggleGroupItem>
        <ToggleGroupItem
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is-active" : ""}
          value="italic"
          aria-label="Toggle italic"
        >
          <span className="icon-[lucide--italic] w-5 h-5"></span>
        </ToggleGroupItem>
        <ToggleGroupItem
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive("underline") ? "is-active" : ""}
          value="underline"
          aria-label="Toggle underline"
        >
          <span className="icon-[lucide--underline] w-5 h-5"></span>
        </ToggleGroupItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <ToggleGroupItem value="heading" aria-label="Toggle heading">
              <span className="icon-[lucide--heading] w-5 h-5"></span>
            </ToggleGroupItem>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <div className="flex gap-5 p-3 ">
              <ToggleGroupItem
                value="heading-1"
                aria-label="Toggle heading-1"
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
                className={
                  editor.isActive("heading", { level: 1 }) ? "is-active" : ""
                }
              >
                <span className="icon-[lucide--heading-1] w-5 h-5"></span>
              </ToggleGroupItem>
              <ToggleGroupItem
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
                className={
                  editor.isActive("heading", { level: 2 }) ? "is-active" : ""
                }
                value="heading-2"
                aria-label="Toggle heading-2"
              >
                <span className="icon-[lucide--heading-2] w-5 h-5"></span>
              </ToggleGroupItem>
              <ToggleGroupItem
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
                className={
                  editor.isActive("heading", { level: 3 }) ? "is-active" : ""
                }
                value="heading-3"
                aria-label="Toggle heading-3"
              >
                <span className="icon-[lucide--heading-3] w-5 h-5"></span>
              </ToggleGroupItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <ToggleGroupItem value="left" aria-label="Toggle left">
              <span className="icon-[lucide--align-left] w-5 h-5"></span>
            </ToggleGroupItem>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <div className="flex gap-5 p-3">
              <ToggleGroupItem
                onClick={() =>
                  editor.chain().focus().setTextAlign("left").run()
                }
                className={
                  editor.isActive({ textAlign: "left" }) ? "is-active" : ""
                }
                value="left"
                aria-label="Toggle left"
              >
                <span className="icon-[lucide--align-left] w-5 h-5"></span>
              </ToggleGroupItem>
              <ToggleGroupItem
                onClick={() =>
                  editor.chain().focus().setTextAlign("center").run()
                }
                className={
                  editor.isActive({ textAlign: "center" }) ? "is-active" : ""
                }
                value="center"
                aria-label="Toggle center"
              >
                <span className="icon-[lucide--align-center] w-5 h-5"></span>
              </ToggleGroupItem>
              <ToggleGroupItem
                onClick={() =>
                  editor.chain().focus().setTextAlign("right").run()
                }
                className={
                  editor.isActive({ textAlign: "right" }) ? "is-active" : ""
                }
                value="right"
                aria-label="Toggle right"
              >
                <span className="icon-[lucide--align-right] w-5 h-5"></span>
              </ToggleGroupItem>
              <ToggleGroupItem
                onClick={() =>
                  editor.chain().focus().setTextAlign("justify").run()
                }
                className={
                  editor.isActive({ textAlign: "justify" }) ? "is-active" : ""
                }
                value="justify"
                aria-label="Toggle justify"
              >
                <span className="icon-[lucide--align-justify] w-5 h-5"></span>
              </ToggleGroupItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button
          type="button"
          className="bg-transparent"
          variant={"ghost"}
          onClick={addImage}
        >
          <span className="icon-[iconamoon--file-image] w-5 h-5"></span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <ToggleGroupItem value="left" aria-label="Toggle left">
              <span className="w-5 h-5 border bg-white rounded-full"></span>
            </ToggleGroupItem>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top">
            <div className="flex gap-5 p-3">
              <ToggleGroupItem
                onClick={() =>
                  editor
                    .chain()
                    .focus()
                    .toggleHighlight({ color: "#4ade80" })
                    .run()
                }
                className={
                  editor.isActive("highlight", { color: "#4ade80" })
                    ? "is-active"
                    : ""
                }
                value="left"
                aria-label="Toggle left"
              >
                <span className="w-5 h-5 bg-green-400 rounded-full"></span>
              </ToggleGroupItem>
              <ToggleGroupItem
                onClick={() =>
                  editor
                    .chain()
                    .focus()
                    .toggleHighlight({ color: "#f87171" })
                    .run()
                }
                className={
                  editor.isActive("highlight", { color: "#f87171" })
                    ? "is-active"
                    : ""
                }
                value="center"
                aria-label="Toggle center"
              >
                <span className="w-5 h-5  bg-red-400 rounded-full"></span>
              </ToggleGroupItem>
              <ToggleGroupItem
                onClick={() =>
                  editor
                    .chain()
                    .focus()
                    .toggleHighlight({ color: "#facc15" })
                    .run()
                }
                className={
                  editor.isActive("highlight", { color: "#facc15" })
                    ? "is-active"
                    : ""
                }
                value="right"
                aria-label="Toggle right"
              >
                <span className="w-5 h-5  bg-yellow-400 rounded-full"></span>
              </ToggleGroupItem>
              <ToggleGroupItem
                onClick={() =>
                  editor
                    .chain()
                    .focus()
                    .toggleHighlight({ color: "#c084fc" })
                    .run()
                }
                className={
                  editor.isActive("highlight", { color: "#c084fc" })
                    ? "is-active"
                    : ""
                }
                value="justify"
                aria-label="Toggle justify"
              >
                <span className="w-5 h-5 bg-purple-400 rounded-full"></span>
              </ToggleGroupItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        <ToggleGroupItem
          onClick={setLink}
          value="link"
          aria-label="Toggle link"
        >
          <span className="icon-[iconamoon--link-light] w-5 h-5"></span>
        </ToggleGroupItem>
        <ToggleGroupItem
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "is-active" : ""}
          value="quote"
          aria-label="Toggle quote"
        >
          <span className="icon-[icon-park-outline--quote] w-5 h-5"></span>
        </ToggleGroupItem>
        <ToggleGroupItem
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is-active" : ""}
          value="list"
          aria-label="Toggle list"
        >
          <span className="icon-[lucide--list] w-5 h-5"></span>
        </ToggleGroupItem>
        <ToggleGroupItem
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is-active" : ""}
          value="list-ordered"
          aria-label="Toggle list-ordered"
        >
          <span className="icon-[lucide--list-ordered] w-5 h-5"></span>
        </ToggleGroupItem>
      </ToggleGroup>
    </>
  );
};

export default Toolbar;
