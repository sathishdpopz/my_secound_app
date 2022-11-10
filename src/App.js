import { useEffect, useState } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";
//b60413d3
//http://www.omdbapi.com/?i=tt3896198&apikey=b60413d3

const API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=b60413d3";

// const movie1 = {
//   Title: "Fighting, Flying and Driving: The Stunts of Spiderman 3",
//   Year: "2007",
//   imdbID: "tt1132238",
//   Type: "movie",
//   Poster:
//     "https://m.media-amazon.com/images/M/MV5BNTI3NDE1ZmEtMTRiMS00YTY4LTk0OGItNjY4YmI0MDM4OGM4XkEyXkFqcGdeQXVyODE2NDgwMzM@._V1_SX300.jpg",
// };

const App = () => {
  //using state for get movies details and seting to the card
  const [movies, setMovies] = useState([]);
  //this state will used to search the specific movie in the searchbar
  const [searchTerm, setSearchTerm] = useState("");

  //getting the movies in the api from the title
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    //get the movies details in json format and asign into variable
    const data = await response.json();
    // using set function to assing the value in Movies array
    setMovies(data.Search);
  };

  //The boot time auto matically show the movies to use useEffect
  useEffect(() => {
    searchMovies("Batman");
  }, []);

  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
