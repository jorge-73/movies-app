import Link from "next/link";
import { FaGithub } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="navbar bg-info-content text-white">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-info-content text-white text-xl rounded-box w-52"
          >
            <li>
              <Link href={"/"}>Home</Link>
            </li>
            <li>
              <Link href={"/movies"}>Movies</Link>
            </li>
          </ul>
        </div>
        <Link href={"/"} className="btn btn-ghost text-2xl">
          Movies App
        </Link>
      </div>
      <div className="navbar-center bg-black hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-xl">
          <li>
            <Link href={"/"}>Home</Link>
          </li>
          <li>
            <Link href={"/movies"}>Movies</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <Link href={"https://github.com/jorge-73/movies-app"} target="_blank">
          <FaGithub className=" text-3xl mx-5" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
