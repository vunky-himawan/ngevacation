import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { User } from "@/types/User";

const Header = ({
  withSearch = false,
  searchPlaceholder,
  navigationLink,
}: {
  withSearch: boolean;
  searchPlaceholder: string;
  navigationLink?: string;
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { token, user, logout } = useAuth();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleLogout = () => {
    logout();
    setIsOpenModal(false);
    setIsMenuOpen(false);
    navigate("/");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchParams({ s: search });
    navigate(`${navigationLink}?s=${decodeURIComponent(search)}`);
  };

  return (
    <>
      <div className="w-full bg-white/2 flex justify-between items-center lg:px-20 md:p-5 fixed top-0 z-50 left-0 right-0 text-white">
        <header className="w-full max-w-7xl mx-auto top-0 left-0 flex justify-between items-center py-5 px-7 bg-white text-orange-500 md:rounded-3xl relative">
          <div>
            <Link to={`/`}>Logo</Link>
          </div>
          <nav className="flex gap-14 max-lg:hidden">
            <Link to="/events">Events</Link>
            <Link to="/hidden-gems">Hidden Gems</Link>
            <Link to="/articles">Articles</Link>
            <Link to="/">Community</Link>
          </nav>

          {/* Search Bar, Login/Logout Buttons, and Hamburger Menu Button */}
          <div className="flex gap-5 justify-center items-center ">
            {/* Search Bar */}
            {withSearch && (
              <>
                <div>
                  <Button
                    variant={"ghost"}
                    onClick={toggleSearch}
                    className="hover:bg-transparent hover:text-orange-500"
                  >
                    <span className="icon-[iconamoon--search-light] w-7 h-7"></span>
                  </Button>
                </div>

                <SearchMenu
                  placeholder={searchPlaceholder}
                  setIsSearchOpen={setIsSearchOpen}
                  isSearchOpen={isSearchOpen}
                  handleSubmit={handleSubmit}
                  setSearch={setSearch}
                />
              </>
            )}

            <div className="flex gap-5 justify-center items-center">
              <div className="relative">
                {/* Hamburger Menu Button */}
                <button
                  className={`lg:hidden relative flex items-center ${
                    isMenuOpen ? "text-white" : ""
                  }`}
                  onClick={toggleMenu}
                >
                  {isMenuOpen ? (
                    <span className="icon-[iconamoon--sign-plus-light] h-8 w-8 rotate-45 text-orange-500"></span>
                  ) : (
                    <span className="icon-[iconamoon--sign-equal-light] h-8 w-8"></span>
                  )}
                </button>

                {/* Modal Hamburger Menu */}
                <div
                  className={`absolute top-[4.6rem] -right-3 bg-white rounded-md p-5 w-[14rem] flex flex-col gap-5 text-left before:content-[''] before:absolute before:w-7 before:h-7 before:rotate-45 before:right-3 before:-top-2 before:bg-white before:rounded-md ${
                    isMenuOpen
                      ? "scale-y-100 opacity-100"
                      : "scale-y-0 opacity-0"
                  } transition-all duration-300 ease-in-out text-black`}
                >
                  <Menu />
                </div>
              </div>

              {/* Login Button for Mobile */}
              {!token && (
                <Link to="/auth/login" className="lg:hidden">
                  <button className="border py-2 px-5 rounded-full border-orange-500">
                    Login
                  </button>
                </Link>
              )}
            </div>

            {token && user ? (
              /* Modal Menu if Logged in */
              <AuthMenu
                user={user}
                setIsOpenModal={setIsOpenModal}
                isOpenModal={isOpenModal}
                handleLogout={handleLogout}
              />
            ) : (
              <Link to="/auth/login" className="max-lg:hidden">
                <button className="border py-2 px-7 rounded-full border-orange-500">
                  Login
                </button>
              </Link>
            )}
          </div>
        </header>
      </div>
    </>
  );
};

const Menu = () => {
  return (
    <>
      <nav className="flex flex-col justify-between h-fit">
        <div className="flex flex-col gap-10">
          <Link to="/events">
            <span className="flex items-center gap-5">
              <div className="icon-[iconamoon--star-thin] w-6 h-6" />
              Events
            </span>
          </Link>
          <Link to="/hidden-gems">
            <span className="flex items-center gap-5">
              <span className="icon-[iconamoon--flag-thin] w-6 h-6"></span>
              Hidden Gems
            </span>
          </Link>
          <Link to="/articles">
            <span className="flex items-center gap-5">
              <span className="icon-[iconamoon--file-document-thin] w-6 h-6"></span>
              Articles
            </span>
          </Link>
          <Link to="/">
            <span className="flex items-center gap-5">
              <span className="icon-[iconamoon--cheque-thin] w-6 h-6"></span>
              Community
            </span>
          </Link>
        </div>
      </nav>
    </>
  );
};

const AuthMenu = ({
  user,
  setIsOpenModal,
  isOpenModal,
  handleLogout,
}: {
  user: User;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  isOpenModal: boolean;
  handleLogout: () => void;
}) => {
  return (
    <>
      <button onClick={() => setIsOpenModal(!isOpenModal)} className="relative">
        <img src={user.profile} alt="" className="h-12 w-12 rounded-full" />
        <div
          className={`absolute top-20 right-0 bg-white rounded-md p-5 w-[14rem] flex flex-col gap-5 text-left before:content-[''] before:absolute before:w-7 before:h-7 before:rotate-45 before:right-3 before:-top-2 before:bg-white before:rounded-md ${
            isOpenModal ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
          } transition-all duration-300 ease-in-out`}
        >
          <Link to={`/traveler/write`} className="text-black">
            <span className="flex items-center gap-5">
              <div className="icon-[iconamoon--edit-thin] w-6 h-6" />
              Write
            </span>
          </Link>
          <Link to={`/event/post`} className="text-black">
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
          <Link to={`/traveler/hidden-gems`} className="text-black">
            <span className="flex items-center gap-5">
              <span className="icon-[mdi--mountain] w-6 h-6"></span>
              Your Hidden Gems
            </span>
          </Link>
          <Link to={`/traveler/events`} className="text-black">
            <span className="flex items-center gap-5">
              <div className="icon-[iconamoon--star-thin] w-6 h-6" />
              Your Events
            </span>
          </Link>
          <Link to={`/traveler/library`} className="text-black">
            <span className="flex items-center gap-5">
              <span className="icon-[lucide--book-marked] w-6 h-6 text-gray-500"></span>
              Library
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
      </button>
    </>
  );
};

const SearchMenu = ({
  handleSubmit,
  setSearch,
  isSearchOpen,
  setIsSearchOpen,
  placeholder,
}: {
  isSearchOpen: boolean;
  placeholder: string;
  setIsSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <>
      <div
        className={`w-full  bg-black/10 backdrop-blur-sm fixed top-0 left-0 h-fit z-30 p-5 ${
          isSearchOpen ? "translate-y-0" : "-translate-y-full"
        } transition-all duration-300 ease-in-out`}
      >
        <div className="flex justify-end items-center ">
          <Button
            variant={"ghost"}
            className="hover:bg-transparent"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <span className="icon-[iconamoon--sign-plus-light] text-white w-10 h-10 rotate-45"></span>
          </Button>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex w-full h-full items-center justify-center space-x-2 py-10 px-3 lg:px-10 max-w-7xl mx-auto"
        >
          <Input
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder={placeholder}
            className="text-white border-0 shadow-none text-2xl focus-visible:ring-0 placeholder:text-white"
          />
        </form>
      </div>
    </>
  );
};

export default Header;
