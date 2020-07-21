import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadListById, addComment, deleteComment } from "../../actions/list";
import Spinner from "../layout/Spinner";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import SendIcon from "@material-ui/icons/Send";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Chip from "@material-ui/core/Chip";
import HTMLReactParser from "html-react-parser";
import moment from "moment";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
    margin: "15px auto",
    backgroundColor: "#1a1a1b",
    border: "1px solid #343536",
    color: "white",
    "&:hover": {
      border: "1px solid white",
    },
    "@media (max-width: 767px)": {
      width: "95%",
      padding: "10px",
    },
  },
  subheader: {
    color: "#afaaaa",
  },
  tag: {
    width: "20%",
    marginLeft: "16px",
    color: "white",
    backgroundColor: "#5966b9",
  },
  showMore: {
    width: "100%",
    textAlign: "right",
    cursor: "pointer",
  },
  singleListContent: {
    display: "flex",
    "@media (max-width: 767px)": {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  singleListDescription: {
    marginLeft: "25px",
    marginRight: "15px",
    width: "80%",
    "@media (max-width: 767px)": {
      width: "100%",
      margin: "0",
      paddingTop: "5px",
    },
  },
  comments: {
    display: "flex",
    width: "70%",
    marginBottom: "30px",
    "@media (max-width: 767px)": {
      width: "100%",
    },
  },
}));

const SingleList = ({
  list,
  loadListById,
  match,
  addComment,
  deleteComment,
  auth,
}) => {
  const test = match.params.id;

  useEffect(() => {
    loadListById(test);
  }, [loadListById, test]);

  const classes = useStyles();
  const [text, setText] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const submitHandler = (e) => {
    e.preventDefault();
    addComment(list.list._id, { text });
    setText("");
  };

  const avatarColor = (str) => {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var color = "#";
    for (var j = 0; j < 3; j++) {
      var value = (hash >> (j * 8)) & 0xff;
      color += ("00" + value.toString(16)).substr(-2);
    }
    return color;
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (list.loading || !list.list) {
    return <Spinner />;
  }

  return (
    <div className="background">
      <Card className={classes.root}>
        <CardHeader
          classes={{ subheader: classes.subheader }}
          avatar={
            <Avatar
              aria-label="recipe"
              style={{ backgroundColor: `${avatarColor(list.list.name)}` }}
            >
              {list.list.name.charAt(0).toUpperCase()}
            </Avatar>
          }
          action={
            <React.Fragment>
              <IconButton
                aria-label="settings"
                style={{ color: "white" }}
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Report</MenuItem>
              </Menu>
            </React.Fragment>
          }
          title={list.list.title}
          subheader={`${list.list.name}, ${moment(
            new Date(list.list.date)
          ).format("MMMM Do YYYY, h:mm:ss a")}`}
        />
        <Chip
          className={classes.tag}
          label={list.list.tag}
          variant="outlined"
        />
        <CardContent style={{ minHeight: "250px" }} className="card-content">
          {typeof list.list.content === "string" ? (
            HTMLReactParser(list.list.content)
          ) : (
            <div>
              <ol
                className="api-list"
                style={{ paddingLeft: "0", marginBottom: "40px" }}
                reversed
              >
                {Array.isArray(list.list.content) === true &&
                  list.list.content.map((item, i) => {
                    return (
                      <li style={{ marginBottom: "25px" }} key={item.i}>
                        <a
                          rel="noopener noreferrer"
                          target="_blank"
                          href={item.url || item.imdbId}
                          style={{
                            color: "inherit",
                            textDecoration: "none",
                            width: "100%",
                          }}
                        >
                          <div className={classes.singleListContent}>
                            <img
                              src={item.thumbnail || item.poster}
                              alt={item.title}
                              style={{ width: "150px" }}
                            />
                            <div className={classes.singleListDescription}>
                              <p style={{ fontWeight: "bold" }}>
                                {item.title} {item.author && `- ${item.author}`}
                              </p>

                              {item.desc && (
                                <p style={{ paddingTop: "15px" }}>
                                  {item.desc}
                                </p>
                              )}
                              <p style={{ fontWeight: "bold" }}>
                                {item.year || item.channel}
                              </p>
                            </div>
                          </div>
                        </a>
                      </li>
                    );
                  })}
              </ol>
            </div>
          )}
          <React.Fragment>
            {!auth.user ? (
              <div
                style={{
                  margin: "25px 0",
                  display: "flex",
                  paddingTop: "15px",
                  borderTop: "1px solid",
                }}
              >
                <ErrorOutlineIcon style={{ marginRight: "5px" }} />
                Please log in to post a comment
              </div>
            ) : (
              <form onSubmit={submitHandler}>
                <div
                  style={{
                    display: "flex",
                    height: "110px",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    aria-label="recipe"
                    style={{
                      backgroundColor: `${avatarColor(auth.user.name)}`,
                    }}
                  >
                    {auth.user.name.charAt(0).toUpperCase()}
                  </Avatar>
                  <TextField
                    className="comment"
                    id="standard-basic"
                    label="Add Comment"
                    value={text}
                    autoComplete="off"
                    onChange={(e) => {
                      setText(e.target.value);
                    }}
                  />
                  <IconButton type="submit">
                    <SendIcon style={{ fill: "#ffffff" }} />
                  </IconButton>
                </div>
              </form>
            )}
          </React.Fragment>
          <React.Fragment>
            {list.list.comments.map((comment, i) => {
              return (
                <div key={comment.i} className={classes.comments}>
                  <Avatar
                    aria-label="recipe"
                    style={{
                      backgroundColor: `${avatarColor(comment.name)}`,
                    }}
                  >
                    {comment.name.charAt(0).toUpperCase()}
                  </Avatar>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginLeft: "15px",
                    }}
                    key={comment.i}
                  >
                    <div>
                      <b style={{ marginRight: "10px" }}>{comment.name}</b>
                      {moment(new Date(comment.date)).format(
                        "MMMM Do YYYY, h:mm:ss a"
                      )}
                    </div>

                    {comment.text}
                  </div>
                  {auth.user && auth.user._id === comment.user && (
                    <DeleteForeverIcon
                      style={{ marginLeft: "15px", cursor: "pointer" }}
                      onClick={() => deleteComment(list.list._id, comment._id)}
                    >
                      Delete
                    </DeleteForeverIcon>
                  )}
                </div>
              );
            })}
          </React.Fragment>
        </CardContent>
      </Card>
    </div>
  );
};

const mapStateToProps = (state) => ({
  list: state.list,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  loadListById,
  addComment,
  deleteComment,
})(SingleList);
