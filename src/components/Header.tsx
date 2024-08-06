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
      <header className="w-full h-24 bg-white/2 flex justify-between items-center lg:px-20 p-5 fixed top-0 z-9999 left-0 right-0 text-white">
        <div>
          <h1>Logo</h1>
        </div>
        <nav className="flex gap-15 max-lg:hidden">
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
            <img src={user.profile} alt="" className="h-13 w-13 rounded-full" />
            <div
              className={`absolute top-18 right-0 bg-white rounded-md p-5 w-10rem flex flex-col gap-5 text-left before:content-[''] before:absolute before:w-7 before:h-7 before:bg-black before:rotate-45 before:right-3 before:-top-2 before:bg-white before:rounded-md ${
                isOpenModal ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
              } transition-all duration-300 ease-in-out`}
            >
              <Link to={`/${role}/dashboard`} className="text-black">
                Dashboard
              </Link>
              <div onClick={handleLogout} className="text-black">
                Logout
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
        className={`w-screen h-screen bg-yellow-4 fixed px-5 py-25 top-0 left-0 right-0 z-999 transition-all duration-500 ease-in-out ${
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
          <Link to="/" className="font-semibold">
            Events
          </Link>
          <Link to="/" className="font-semibold">
            Hidden Gems
          </Link>
          <Link to="/" className="font-semibold">
            Articles
          </Link>
          <Link to="/" className="font-semibold">
            Community
          </Link>
          {isAuthenticated && (
            <>
              <Link to={`/${role}/dashboard`} className="font-semibold">
                Dashboard
              </Link>
              <button className="font-semibold text-left" onClick={logout}>
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
