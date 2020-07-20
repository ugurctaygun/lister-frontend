import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import StarIcon from "@material-ui/icons/Star";
import StarBorderOutlined from "@material-ui/icons/StarBorderOutlined";
import { addBookmark, removeBookmark } from "../../actions/auth";
import IconButton from "@material-ui/core/IconButton";
import { setAlert } from "../../actions/alert";

const AddToFav = ({
  auth,
  user,
  list,
  addBookmark,
  removeBookmark,
  setAlert,
}) => {
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    if (auth.user) {
      if (auth.user.bookmarks.some((bookmark) => bookmark.list === list._id)) {
        setBookmarked(true);
      } else {
        setBookmarked(false);
      }
    }
  }, [auth, list._id]);

  const bookmarkHandler = (e) => {
    if (user === null) {
      setAlert("Please log in to use Favorites", "info");
    } else {
      if (!bookmarked) {
        addBookmark(user._id, { list: list._id });
        setBookmarked(true);
      } else {
        if (user.bookmarks) {
          removeBookmark(
            user._id,
            user.bookmarks.find((bookmark) => {
              return bookmark.list === list._id;
            })._id,
            list._id
          );
        }
        setBookmarked(false);
      }
    }
  };

  return (
    <IconButton
      aria-label="add to bookmarked"
      style={{ color: "white" }}
      onClick={bookmarkHandler}
    >
      {!bookmarked ? <StarBorderOutlined /> : <StarIcon />}
    </IconButton>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  removeBookmark,
  addBookmark,
  setAlert,
})(AddToFav);
