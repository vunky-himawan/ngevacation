import { useAuth } from "@/context/authContext";
import { Avatar, AvatarImage } from "../ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Button } from "../ui/button";

const Header = ({
  setIsMenuOpen,
  isMenuOpen,
}: {
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isMenuOpen: boolean;
}) => {
  const { user } = useAuth();

  return (
    <>
      <header className="p-5 border-b absolute w-full">
        <div className="flex justify-between items-center">
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
          <div>
            <Avatar className="w-8 h-8">
              <AvatarImage src={user?.profile} alt={user?.fullname} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
