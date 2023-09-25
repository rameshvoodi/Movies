import React, { useState, useContext } from "react";
import logo2 from "../assets/images/logo2.png";
import { Link } from "react-router-dom";
import Contextpage from "../Contextpage";
import { motion } from "framer-motion";
import { HiMenuAlt1, HiX } from "react-icons/hi";
import User from "../assets/images/User.jpg";
import { auth } from "../firebase";
import { toast } from "react-toastify";
import { BsTelegram } from "react-icons/bs";
import { FaHome, FaFire, FaCalendarAlt, FaHeart } from "react-icons/fa";

const Navdata = [
  {
    id: 1,
    headername: "Home",
    Name: "Home",
    link: "/",
    icon: FaHome,
  },
  {
    id: 2,
    headername: "Trending Movies",
    Name: "Trending",
    link: "/trending",
    icon: FaFire,
  },
  {
    id: 3,
    headername: "Upcoming Movies",
    Name: "Upcoming",
    link: "/upcoming",
    icon: FaCalendarAlt,
  },
  {
    id: 4,
    headername: "Favorite Movies",
    Name: "Favorites",
    link: "/favorite",
    icon: FaHeart,
  },
];

function Navbar() {
  const { header, user } = useContext(Contextpage);
  const [activemobile, setActivemobile] = useState(false);

  return (
    <>
      {/* mobilebutton */}
      <button
        className="z-40 text-3xl text-black fixed right-0 bottom-0 m-6 p-4 duration-150 rounded-full active:scale-90 bg-white block md:hidden"
        onClick={() => setActivemobile(!activemobile)}
      >
        {activemobile ? <HiX /> : <HiMenuAlt1 />}
      </button>

      <nav
        className={`${
          activemobile ? "block" : "hidden"
        } fixed bg-black md:bg-black h-full w-full md:w-[15rem] z-30 md:block`}
      >
        <motion.div
          animate={{ scale: 1 }}
          initial={{ scale: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            to="/"
            className="logo flex flex-col justify-center items-center m-7 gap-2"
            onClick={() => setActivemobile(!activemobile)}
          >
            <img src={logo2} alt="logo" className="w-20" />
            <h1 className="text-white font-bold text-2xl text-center">
              Movies
            </h1>
          </Link>
        </motion.div>

        <ul className="text-white font-bold text-[16px] text-center px-5">
          {Navdata.map((data) => (
            <Link key={data.id} to={data.link}>
              <li
                className={`${
                  header === data.headername
                    ? "bg-blue-500/20 border-blue-600 text-white"
                    : "bg-gray-500/20 border-black text-gray-300"
                } p-2 my-2 rounded-[5px] border-2 flex items-center justify-center transition-all duration-300 hover:text-white hover:bg-blue-500/20 hover:border-blue-600`}
                onClick={() => setActivemobile(!activemobile)}
              >
                <data.icon className="mr-2 text-2xl" />
                <span className="text-lg font-sans">{data.Name}</span>
              </li>
            </Link>
          ))}
        </ul>

        <div className=" absolute bottom-0 w-full p-5 md:p-2 text-white">
          {user ? (
            <>
              <div
                className="cursor-pointer bg-red-600 hover:bg-red-800 flex flex-row justify-center items-center rounded-xl mt-2"
                onClick={() => auth.signOut(toast.error("Logout successfully"))}
              >
                <img
                  src={user.photoURL == null ? User : user.photoURL}
                  alt="user"
                  className="h-10 rounded-full mr-3"
                />
                <h1 className=" text-lg font-bold font-mono">Logout</h1>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className=" w-full  bg-blue-600 hover:bg-blue-800 py-2 gap-4 rounded-xl flex items-center justify-center font-semibold border-2 border-blue-100/10 cursor-pointer"
                onClick={() => setActivemobile(!activemobile)}
              >
                <h1 className=" font-semibold">Log in</h1>
              </Link>
            </>
          )}
        </div>

        <footer className="text-center md:text-left absolute bottom-25">
          <div className=" md:bottom-10 flex justify-center items-center text-white m-24 md:m-7 ">
            <div className="relative flex text-center flex-col gap-4 justify-center mx-auto md:mx-6">
              <h1>
                © 2023 <span className="font-bold ml-2">Movies</span>
              </h1>
              <h1 className=" font-sans">Check out our Telegram bot</h1>
              <Link
                to={"https://t.me/StreamXmoviesbot"}
                target="_blank"
                className="md:mx-11 mx-20"
              >
                <BsTelegram
                  className="text-[#0088cc] flex justify-center"
                  size={40}
                />
              </Link>
            </div>
          </div>
        </footer>
      </nav>
    </>
  );
}

export default Navbar;
