import { Textarea } from "@/components/TextArea";
import Tiptap from "@/components/TipTap";
import { useAuth } from "@/context/authContext";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const WriteArticle = () => {
  const { user, logout } = useAuth();
  const [title, setTitle] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);

  const handleTitleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = evt.target?.value;

    setTitle(val);
  };

  const handleLogout = () => {
    logout();
    setIsOpenModal(false);
    navigate("/");
  };

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
  };

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
        <section className="mx-auto h-screen min-w-screen">
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="pt-24 px-5 w-full h-full flex flex-col gap-5 max-w-7xl mx-auto"
          >
            <div>
              <input type="file" name="image" id="image" className="hidden" />
              <label
                htmlFor="image"
                className="flex items-center gap-5 border border-dashed rounded-md h-[12rem] text-gray-400 cursor-pointer"
              >
                <div className="flex items-center justify-center w-full h-full gap-3">
                  <div className="icon-[iconamoon--upload-thin] w-5 h-5" />
                  <p className="text-center text-xs">Upload Cover</p>
                </div>
              </label>
            </div>
            <hr />
            <div>
              <Textarea
                value={title}
                onChange={handleTitleChange}
                placeholder="Title"
                style="text-3xl w-full resize-none focus:outline-none p-2.5 text-gray font-cabinet"
              />
            </div>
            <div className="prose max-w-none z-10">
              <Tiptap />
            </div>
            <hr />
            <div>
              <h1>Tags</h1>
            </div>
          </form>
        </section>
      </main>
    </>
  );
};

export default WriteArticle;
