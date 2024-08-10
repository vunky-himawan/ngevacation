import { useAuth } from "@/context/authContext";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { token, user, role, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    setIsOpenModal(false);
    setIsMenuOpen(false);
    navigate("/");
  };

  return (
    <>
      <header className="w-full h-24 bg-white/2 flex justify-between items-center lg:px-20 p-5 fixed top-0 z-50 left-0 right-0 text-white">
        <div>
          <Link to={`/`}>Logo</Link>
        </div>
        <nav className="flex gap-14 max-lg:hidden">
          <Link to="/">Events</Link>
          <Link to="/">Hidden Gems</Link>
          <Link to="/">Articles</Link>
          <Link to="/">Community</Link>
        </nav>
        <div className="lg:hidden">
          <button onClick={toggleMenu}>{isMenuOpen ? "Close" : "Menu"}</button>
        </div>
        {token && user ? (
          <button
            onClick={() => setIsOpenModal(!isOpenModal)}
            className="max-lg:hidden relative"
          >
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
          </button>
        ) : (
          <Link to="/auth/login" className="max-lg:hidden">
            <button className="border py-2 px-7 rounded-md">Login</button>
          </Link>
        )}
      </header>

      <div
        className={`w-screen h-screen bg-yellow-400 fixed px-5 py-24 top-0 left-0 right-0 z-[40] transition-all duration-500 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <Menu isAuthenticated={token !== null} role={role} logout={logout} />
      </div>
    </>
  );
};

const Menu = ({
  isAuthenticated,
  role,
  logout,
}: {
  isAuthenticated: boolean;
  role: string;
  logout: () => void;
}) => {
  return (
    <>
      <nav className="flex flex-col justify-between h-full">
        <div className="flex flex-col gap-10">
          <Link to="/" className="font-medium">
            Events
          </Link>
          <Link to="/" className="font-medium">
            Hidden Gems
          </Link>
          <Link to="/" className="font-medium">
            Articles
          </Link>
          <Link to="/" className="font-medium">
            Community
          </Link>
          {isAuthenticated && (
            <>
              <Link to={`/traveler/write`} className="font-medium">
                Write
              </Link>
              <button className="font-medium text-left" onClick={logout}>
                Logout
              </button>
            </>
          )}
        </div>
        {!isAuthenticated && (
          <Link to="/auth/login" className="w-full">
            <button className="border py-2 px-7 rounded-md w-full font-medium bg-white">
              Login
            </button>
          </Link>
        )}
      </nav>
    </>
  );
};

export default Header;
