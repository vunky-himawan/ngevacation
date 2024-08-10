import { Textarea } from "@/components/TextArea";
import Tiptap from "@/components/TipTap";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useAuth } from "@/context/authContext";
import useGetTags from "@/hooks/useGetTags";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import UsePostArticle from "@/hooks/usePostArticle";
import { UseValidationArticle } from "@/hooks/useValidationArticle";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type ArticlePayload = {
  title: string;
  content: string;
  cover: File;
  tags: string[];
};

type ArticleResponse = {
  title: string;
  status: "success" | "failed";
  message: string;
};

const WriteArticle = () => {
  const { user, logout } = useAuth();
  const tagData: string[] | undefined = useGetTags();
  const [tags, setTags] = useState<string[]>([]);
  const [content, setContent] = useState<string>("");
  const [newTag, setNewTag] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [listOpen, setListOpen] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [cover, setCover] = useState<string>("");
  const [coverError, setCoverError] = useState<string>("");
  const [titleError, setTitleError] = useState<string>("");
  const [contentError, setContentError] = useState<string>("");
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);

  const { toast } = useToast();

  const handleAddCover = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setCoverError("");
    const file: File | undefined = evt.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setCover(reader.result as string);
      };
    }
  };

  const handleTitleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = evt.target?.value;

    setTitle(val);
    setTitleError("");
  };

  const handleLogout = () => {
    logout();
    setIsOpenModal(false);
    navigate("/");
  };

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const validation = UseValidationArticle();

    if (validation.validateTitle(title) !== "") {
      setTitleError(validation.validateTitle(title));
      toast({
        title: "Oops!",
        description: validation.validateTitle(title),
        className: "bg-red-500 text-white border-none",
        duration: 3000,
      });
      return;
    }

    if (validation.validateCover(cover) !== "") {
      setCoverError(validation.validateCover(cover));
      toast({
        title: "Oops!",
        description: validation.validateCover(cover),
        className: "bg-red-500 text-white border-none",
        duration: 3000,
      });
      return;
    }

    if (validation.validateContent(content) !== "") {
      setContentError(validation.validateContent(content));
      toast({
        title: "Oops!",
        description: validation.validateContent(content),
        className: "bg-red-500 text-white border-none",
        duration: 3000,
      });
      return;
    }

    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const file: FormDataEntryValue | null = formData.get("image");

      const articlePayload: ArticlePayload = {
        title: title,
        content: content,
        cover: file as File,
        tags: selectedTags,
      };

      const message: ArticleResponse = await UsePostArticle(articlePayload);

      if (message.status === "success") {
        toast({
          title: message.title,
          description: message.message,
          className: "bg-green-500 text-white border-none",
          duration: 1000,
        });
      } else {
        toast({
          title: message.title,
          description:
            message.message == "File is required"
              ? "Please upload cover"
              : "Something went wrong",
          className: "bg-red-500 text-white border-none",
          duration: 1000,
        });
      }

      localStorage.removeItem("images");

      navigate("/");
    }
  };

  useEffect(() => {
    if (tagData) {
      setTags(tagData);
    }
  }, [tagData]);

  return (
    <>
      <main>
        <header className="py-5 px-8 w-screen flex justify-between items-center border-b fixed top-0 left-0 bg-white z-50">
          <Link to="/" className="text-3xl font-bold">
            Logo
          </Link>
          <button
            onClick={() => setIsOpenModal(!isOpenModal)}
            className="relative"
          >
            <img
              src={user?.profile}
              alt=""
              className="h-10 w-10 rounded-full"
            />
            <div
              className={`absolute top-16 border right-0 bg-white rounded-md w-[14rem]  before:content-[''] before:absolute before:w-7 before:h-7 before:rotate-45 before:right-3 before:-top-2 before:-z-20 before:border before:bg-white before:rounded-md ${
                isOpenModal ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
              } transition-all duration-300 ease-in-out`}
            >
              <div className="bg-white p-5 flex flex-col gap-5 text-left">
                <Link to={`/traveler/write`} className="text-black">
                  <span className="flex items-center gap-5">
                    <div className="icon-[iconamoon--edit-thin] w-6 h-6" />
                    Write
                  </span>
                </Link>
                <Link to={`/traveler/create/event`} className="text-black">
                  <span className="flex items-center gap-5">
                    <div className="icon-[iconamoon--ticket-thin] w-6 h-6" />
                    Create Event
                  </span>
                </Link>
                <hr />
                <Link to={`/traveler/articles`} className="text-black">
                  <span className="flex items-center gap-5">
                    <div className="icon-[iconamoon--news-thin] w-6 h-6" />
                    Your Articles
                  </span>
                </Link>
                <Link to={`/traveler/events`} className="text-black">
                  <span className="flex items-center gap-5">
                    <div className="icon-[iconamoon--star-thin] w-6 h-6" />
                    Your Events
                  </span>
                </Link>
                <Link to={`/traveler/plans`} className="text-black">
                  <span className="flex items-center gap-5">
                    <div className="icon-[iconamoon--calendar-add-thin] w-6 h-6" />
                    Planning
                  </span>
                </Link>
                <hr />
                <div onClick={handleLogout} className="text-red-500">
                  <span className="flex items-center gap-5">
                    <div className="icon-[iconamoon--exit-thin] w-6 h-6" />
                    Logout
                  </span>
                </div>
              </div>
            </div>
          </button>
        </header>
        <section className="mx-auto min-w-screen">
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="pt-28 pb-10 px-5 w-full h-full flex flex-col gap-5 max-w-7xl mx-auto"
          >
            <div>
              <Textarea
                name="title"
                value={title}
                onChange={handleTitleChange}
                placeholder="Title"
                style={`text-5xl leading-[4rem] w-full resize-none focus:outline-none p-2.5 text-gray font-cabinet`}
              />
              {titleError && (
                <p className="text-red-500 text-xs">{titleError}</p>
              )}
            </div>
            <div>
              <input
                type="file"
                name="image"
                id="image"
                className="hidden"
                onChange={handleAddCover}
              />
              <label
                htmlFor="image"
                className={`flex items-center gap-5 ${
                  coverError && "border border-red-500"
                } border border-dashed rounded-md min-h-[12rem] md:min-h-[17rem] text-gray-400 cursor-pointer`}
              >
                <img src={cover} alt="" className="rounded-3xl" />
                {cover == "" && (
                  <div className="flex flex-col items-center justify-center w-full h-full gap-3">
                    <div className="flex items-center justify-center w-full h-full gap-3">
                      <div className="icon-[iconamoon--upload-thin] w-5 h-5" />
                      <p className="text-center text-xs">Upload Cover</p>
                    </div>
                    {coverError && (
                      <p className="text-red-500 text-xs">{coverError}</p>
                    )}
                  </div>
                )}
              </label>
            </div>
            <div className="prose max-w-none z-10">
              <Tiptap
                setError={setContentError}
                content={content}
                setContent={setContent}
              />
              {contentError && (
                <p className="text-red-500 text-xs">{contentError}</p>
              )}
            </div>
            <hr />
            <div className="p-2.5 flex flex-col gap-2">
              <h1 className="text-2xl font-bold">Tags</h1>
              <div className="flex flex-wrap gap-2">
                {selectedTags.length > 0 &&
                  selectedTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant={"secondary"}
                      className="mr-2 font-normal flex items-center gap-1"
                    >
                      #{tag}{" "}
                      <span
                        onClick={() => {
                          setSelectedTags((prevTags) =>
                            prevTags.filter((prevTag) => prevTag !== tag)
                          );
                          setTags((prevTags) => [...prevTags, tag].sort());
                          setListOpen(false);
                        }}
                        className="icon-[iconamoon--close-light] w-5 h-5"
                      ></span>
                    </Badge>
                  ))}
              </div>
              <div>
                {tags && (
                  <TagList
                    tags={tags}
                    setSelectedTags={setSelectedTags}
                    newTag={newTag}
                    setNewTag={setNewTag}
                    setTags={setTags}
                    listOpen={listOpen}
                    setListOpen={setListOpen}
                  />
                )}
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Dialog>
                <DialogTrigger>
                  <Button className="w-fit rounded-full bg-transparent shadow-none text-black hover:bg-gray-100 hover:text-black">
                    Save Draft
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Cooming Soon</DialogTitle>
                    <DialogDescription>
                      We are working on this feature. Stay tuned for updates.
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
              <Button className="w-fit rounded-full bg-yellow-500">
                Publish
              </Button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
};

const TagList = ({
  tags,
  setSelectedTags,
  setNewTag,
  setTags,
  newTag,
  listOpen,
  setListOpen,
}: {
  tags: string[];
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
  setNewTag: React.Dispatch<React.SetStateAction<string>>;
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  listOpen: boolean;
  setListOpen: React.Dispatch<React.SetStateAction<boolean>>;
  newTag: string;
}) => {
  return (
    <Command>
      <CommandInput
        placeholder="Add a tag"
        onFocus={() => {
          setListOpen(true);
        }}
        onChangeCapture={(e) => {
          const target = e.target as HTMLInputElement;
          const value = target.value;
          if (value) {
            setNewTag(value);
          }
        }}
        onBlur={() => setTimeout(() => setListOpen(false), 200)}
      />
      {listOpen && (
        <CommandList>
          <CommandEmpty
            className="text-left px-3 py-1"
            onClick={() => {
              setSelectedTags((prevTags) => [...prevTags, newTag]);
              setNewTag("");
              setListOpen(false);
            }}
          >
            <div className="flex items-center gap-2">
              <div className="icon-[iconamoon--sign-plus-light] w-5 h-5" />
              <p>{newTag}</p>
            </div>
          </CommandEmpty>
          <CommandGroup>
            {tags.map((tag) => (
              <CommandItem
                key={tag}
                value={tag}
                onSelect={(value) => {
                  setSelectedTags((prevTags) => [...prevTags, value]);
                  setTags((prevTags) =>
                    prevTags.filter((prevTag) => prevTag !== value)
                  );
                }}
              >
                #{tag}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      )}
    </Command>
  );
};

export default WriteArticle;
