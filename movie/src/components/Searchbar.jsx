import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import Contextpage from "../Contextpage";
import { useNavigate } from "react-router-dom";
import slugify from "react-slugify";

function Searchbar() {
  const { filteredGenre, fetchSearch, setBackGenre, setGenres } =
    useContext(Contextpage);
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const [typingTimeout, setTypingTimeout] = useState(null);

  const handleSearch = () => {
    // Clear the previous timeout to prevent premature execution
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    // Set a new timeout
    const newTimeout = setTimeout(() => {
      onKeyUp(value);
    }, 500); // Adjust the timeout duration as needed (in milliseconds)

    setTypingTimeout(newTimeout);
  };

  const onKeyUp = (query) => {
    // console.log(query)
    if (query !== "") {
      query = query.trim();

      if (query === "") {
        navigate("/");
      } else {
        navigate(`/search/${slugify(query)}`);
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Movies</title>
      </Helmet>

      <div className="w-full bg-hero bg-cover bg-no-repeat bg h-[20rem] md:h-[22rem]">
        <div className="h-full w-full bg-black/30  flex flex-col justify-center items-center">
          <h1 className="text-xl md:text-4xl font-serif text-white py-6">
            Search for your favorite movies
          </h1>
          <input
            type="search"
            name="searchpanel"
            id="searchpanel"
            placeholder="Enter the movie name"
            className="p-3 w-full mx-5 md:mx-10 md:w-[45rem] text-xl font-semibold rounded-full outline-none"
            onKeyUp={(e) => handleSearch()}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
      </div>
    </>
  );
}

export default Searchbar;
