import { useAuth } from "@/context/AuthContext";
import { Button } from "../ui/button";
import { useMediaQuery } from "usehooks-ts";
import { useEffect, useState } from "react";
import { User } from "@/types/User";
import { useNavigate } from "react-router-dom";

const Header = ({
  setIsMenuOpen,
  isMenuOpen,
}: {
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isMenuOpen: boolean;
}) => {
  const { user, logout } = useAuth();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [loading, setLoading] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsOpenModal(false);
    setIsMenuOpen(false);
    navigate("/");
  };

  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  return (
    <>
      <header className="p-5 lg:p-7 border-b absolute w-full">
        <div
          className={`flex ${
            isDesktop ? "justify-end" : "justify-between"
          } items-center`}
        >
          {!isDesktop && (
            <Button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              variant={"ghost"}
              className="text-orange-500 p-0 relative z-50 hover:bg-transparent hover:text-orange-500"
            >
              {isMenuOpen ? (
                <span className="icon-[iconamoon--sign-plus-light] h-8 w-8 rotate-45"></span>
              ) : (
                <span className="icon-[iconamoon--sign-equal-light] h-8 w-8"></span>
              )}
            </Button>
          )}
          <div>
            {loading && (
              <div className="w-8 h-8 rounded-full bg-gray-200"></div>
            )}
            {!loading && user && (
              <Menu
                user={user}
                setIsOpenModal={setIsOpenModal}
                isOpenModal={isOpenModal}
                handleLogout={handleLogout}
              />
            )}
          </div>
        </div>
      </header>
    </>
  );
};

const Menu = ({
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
          className={`absolute top-20 right-0 border before:border-l before:border-t bg-white rounded-md p-5 w-[14rem] flex flex-col gap-5 text-left before:content-[''] before:absolute before:w-7 before:h-7 before:rotate-45 before:right-3 before:-top-3 before:bg-white before:rounded-md ${
            isOpenModal ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
          } transition-all duration-300 ease-in-out`}
        >
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

export default Header;
