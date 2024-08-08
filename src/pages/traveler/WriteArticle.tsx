import { useAuth } from "@/context/authContext";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const WriteArticle = () => {
  const { user, logout } = useAuth();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsOpenModal(false);
    navigate("/");
  };
  return (
    <>
      <main>
        <header className="p-5 flex justify-between items-center border-b">
          <h1 className="text-3xl font-bold">Logo</h1>
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
              className={`absolute top-18 border right-0 bg-white rounded-md w-14rem  before:content-[''] before:absolute before:w-7 before:h-7 before:rotate-45 before:right-3 before:-top-2 before:-z-20 before:border before:bg-white before:rounded-md ${
                isOpenModal ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
              } transition-all duration-300 ease-in-out`}
            >
              <div className="bg-white p-5 flex flex-col gap-5 text-left">
                <Link to={`/traveler/write`} className="text-black">
                  <span className="flex items-center gap-5">
                    <div className="i-iconamoon:edit-thin w-6 h-6" />
                    Write
                  </span>
                </Link>
                <Link to={`/traveler/create/event`} className="text-black">
                  <span className="flex items-center gap-5">
                    <div className="i-iconamoon:ticket-thin w-6 h-6" />
                    Create Event
                  </span>
                </Link>
                <hr />
                <Link to={`/traveler/articles`} className="text-black">
                  <span className="flex items-center gap-5">
                    <div className="i-iconamoon:news-thin w-6 h-6" />
                    Your Articles
                  </span>
                </Link>
                <Link to={`/traveler/events`} className="text-black">
                  <span className="flex items-center gap-5">
                    <div className="i-iconamoon:star-thin w-6 h-6" />
                    Your Events
                  </span>
                </Link>
                <Link to={`/traveler/plans`} className="text-black">
                  <span className="flex items-center gap-5">
                    <div className="i-iconamoon:calendar-add-thin w-6 h-6" />
                    Planning
                  </span>
                </Link>
                <hr />
                <div onClick={handleLogout} className="text-red-5">
                  <span className="flex items-center gap-5">
                    <div className="i-iconamoon:exit-thin w-6 h-6" />
                    Logout
                  </span>
                </div>
              </div>
            </div>
          </button>
        </header>
        <section className="max-w-[1400px] mx-auto min-h-screen flex flex-col">
          <form action="" className="pt-20">
            <div>
              
            </div>
          </form>
        </section>
      </main>
    </>
  );
};

export default WriteArticle;
