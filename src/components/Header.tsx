import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header className="w-full h-24 bg-white/2 flex justify-between items-center px-20 fixed top-0 z-9999 left-0 right-0 text-white">
        <div>
          <h1>Logo</h1>
        </div>
        <nav className="flex gap-15">
          <Link to="/">Events</Link>
          <Link to="/">Hidden Gems</Link>
          <Link to="/">Articles</Link>
          <Link to="/">Community</Link>
        </nav>
        <div>
          <button className="border py-2 px-7 rounded-md">Login</button>
        </div>
      </header>
    </>
  );
};

export default Header;
