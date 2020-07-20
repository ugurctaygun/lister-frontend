import React, { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { setAlert } from "../../../actions/alert";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
//ICONS
import AddIcon from "@material-ui/icons/Add";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  listContainer: {
    border: "1px solid #ddd",
    padding: "15px",
  },
}));

const BookList = ({ handleBook, setAlert, handleBookRemove }) => {
  const classes = useStyles();
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [bookData, setBookData] = useState([]);
  const [error, setError] = useState(false);

  const getBookData = async (id) => {
    try {
      const res = await axios.get(
        `https://cors-anywhere.herokuapp.com/https://www.googleapis.com/books/v1/volumes?q=${id}/&key=AIzaSyBdogkYurpBuST6o80MpwUTTXhscMYqYp0`
      );

      console.log(res.data.items.map((item) => item.volumeInfo).slice(0, 6));
      setSearchResults(
        res.data.items.map((item) => item.volumeInfo).slice(0, 6)
      );
      setError(false);
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  const sendProp = () => {
    setAlert("Item saved", "success");
    handleBook(bookData);
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
          onKeyPress={(e) => e.key === "Enter" && getBookData(query)}
          style={{ display: "flex", width: "100%" }}
        >
          <TextField
            className="textfield-mq"
            onChange={(e) => {
              const query = e.target.value;
              setQuery(query);
            }}
            label="Search Books or Authors"
          />

          <Button
            style={{ marginLeft: "5px" }}
            type="submit"
            variant="outlined"
            onClick={(e) => {
              e.preventDefault();
              console.log(query);
              getBookData(query);
            }}
            onKeyPress={(e) => {
              e.key === "Enter" && console.log(query);
            }}
          >
            <SearchIcon />
          </Button>
        </div>

        {error ? (
          <div>Book or Author not found</div>
        ) : (
          <div className="custom-api-search">
            {searchResults.map((item) => {
              return (
                <React.Fragment>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flex: "1",
                      margin: "10px",
                    }}
                  >
                    <img
                      src={item.imageLinks && item.imageLinks.thumbnail}
                      alt={item.title}
                      style={{ width: "100px", height: "150px" }}
                    />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginLeft: "10px",
                      }}
                    >
                      {item.title} - {item.authors}
                      {item.title && (
                        <Button
                          required
                          style={{ margin: "15px", width: "90px" }}
                          variant="contained"
                          color="primary"
                          startIcon={<AddIcon style={{ marginRight: "5px" }} />}
                          onClick={() => {
                            const title = item.title;
                            const poster = item.imageLinks.smallThumbnail;
                            const author = item.authors;
                            const desc = item.description;
                            setBookData(() => [
                              ...bookData,
                              {
                                id: Math.random(),
                                author: author,
                                title: title,
                                poster: poster,
                                desc: desc,
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
                </React.Fragment>
              );
            })}
          </div>
        )}

        {bookData.map((item) => {
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
                <React.Fragment>
                  {item.poster && (
                    <img
                      src={item.poster}
                      alt="video"
                      style={{ width: "100px" }}
                    />
                  )}
                  <div style={{ marginLeft: "25px" }}>
                    {item.title && <p>{item.title}</p>}
                    {item.authors && <p>{item.authors}</p>}
                    {item.desc && <p>{item.desc.substring(0, 150) + "..."}</p>}
                  </div>
                </React.Fragment>

                {item.title && (
                  <IconButton
                    style={{ margin: "15px" }}
                    variant="outlined"
                    onClick={(e) => {
                      e.preventDefault();
                      handleBookRemove(e);
                      setBookData((currentData) =>
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

export default connect(mapStateToProps, { setAlert })(BookList);
