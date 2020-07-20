import React, { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { setAlert } from "../../../actions/alert";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
//ICONS
import AddIcon from "@material-ui/icons/Add";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  listContainer: {
    border: "1px solid #ddd",
    padding: "15px",
  },
}));

const MovieList = ({ handleMovie, setAlert }) => {
  const classes = useStyles();
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [movieData, setMovieData] = useState([]);
  const [error, setError] = useState(false);

  const getMovieData = async (id) => {
    try {
      const res = await axios.get(
        `https://cors-anywhere.herokuapp.com/https://www.omdbapi.com/?apikey=756abb2f&s=${id}&plot=full`
      );

      console.log(res.data);
      setSearchResults(res.data.Search.slice(0, 6));
      setError(false);
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  const sendProp = () => {
    handleMovie(movieData);
  };

  return (
    <div className={classes.listContainer}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "25px 0",
        }}
      >
        <div
          style={{ display: "flex", width: "100%" }}
          onKeyPress={(e) => e.key === "Enter" && getMovieData(query)}
        >
          <TextField
            className="textfield-mq"
            onChange={(e) => {
              const query = e.target.value;
              setQuery(query);
            }}
            label="Search Movies"
          />

          <Button
            style={{ marginLeft: "5px" }}
            variant="outlined"
            onClick={(e) => {
              e.preventDefault();
              getMovieData(query);
            }}
          >
            <SearchIcon />
          </Button>
        </div>

        {error ? (
          <div>Movie Not Found</div>
        ) : (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              marginTop: "15px",
              border: "1px solid #ddd",
              padding: "15px ",
            }}
          >
            {searchResults.map((item, i) => {
              return (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flex: "1",
                    margin: "10px",
                  }}
                  key={i}
                >
                  <img
                    src={item.Poster}
                    alt={item.Title}
                    style={{ width: "100px", height: "150px" }}
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginLeft: "10px",
                    }}
                  >
                    {item.Title}({item.Year})
                    {item.Title && (
                      <Button
                        required
                        style={{ margin: "15px" }}
                        color="primary"
                        variant="outlined"
                        startIcon={<AddIcon style={{ marginRight: "5px" }} />}
                        onClick={() => {
                          const title = item.Title;
                          const imdbId = `https://www.imdb.com/title/${item.imdbID}`;
                          const poster = item.Poster;
                          const year = item.Year;
                          setMovieData(() => [
                            ...movieData,
                            {
                              id: Math.random(),
                              imdbId: imdbId,
                              title: title,
                              year: year,
                              poster: poster,
                            },
                          ]);
                          sendProp();
                          setAlert("Item added to the list", "success");
                        }}
                      >
                        Add
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {movieData.map((item) => {
          return (
            <React.Fragment>
              <div
                className="yt-list-item-mq"
                style={{
                  display: "flex",
                  marginTop: "15px",
                  border: "1px solid #ddd",
                  padding: "15px ",
                }}
              >
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href={item.imdbID}
                  style={{
                    color: "inherit",
                    textDecoration: "none",
                    display: "flex",
                  }}
                >
                  {item.poster && (
                    <img
                      src={item.poster}
                      alt="video"
                      style={{ width: "100px" }}
                    />
                  )}
                  <div style={{ marginLeft: "25px" }}>
                    {item.title && <p>{item.title}</p>}
                    {item.year && <p>{item.year}</p>}
                  </div>
                </a>

                {item.title && (
                  <IconButton
                    style={{ margin: "15px" }}
                    variant="outlined"
                    onClick={(e) => {
                      e.preventDefault();
                      setMovieData((currentData) =>
                        currentData.filter((x) => x.id !== item.id)
                      );
                      setAlert("Item removed from list", "warning");
                    }}
                  >
                    <DeleteForeverIcon
                      style={{ fill: "red", marginRight: "5px" }}
                    />
                  </IconButton>
                )}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps, { setAlert })(MovieList);
