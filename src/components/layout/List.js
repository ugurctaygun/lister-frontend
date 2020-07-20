import React, { useState } from "react";
import AddToFav from "../layout/AddToFav";
import { connect } from "react-redux";
import { deleteList } from "../../actions/list";
import { addBookmark, removeBookmark } from "../../actions/auth";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import TextsmsOutlinedIcon from "@material-ui/icons/TextsmsOutlined";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import HTMLReactParser from "html-react-parser";
import moment from "moment";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme) => ({
  root: {
    WebkitColumnBreakInside: "avoid",
    pageBreakInside: "avoid",
    breakInside: "avoid",
    display: "flex",
    flexDirection: "column",
    minWidth: 400,
    margin: "10px 0",
    position: "relative",
    backgroundColor: "#1a1a1b",
    border: "1px solid #343536",
    color: "white",
    "&:hover": {
      border: "1px solid white",
    },
    "&:first-child": {
      marginTop: 0,
    },
  },
  media: {
    width: "100%",
    height: 250,
    marginTop: 30,
  },
  subheader: {
    color: "#afaaaa",
  },
  tag: {
    width: "fit-content",
    marginLeft: "16px",
    color: "white",
    filter: "drop-shadow(2px 1px 1px black)",
  },
}));
const List = ({ listItem, deleteList, auth, addBookmark, removeBookmark }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteHandler = () => {
    deleteList(listItem._id);
    setAnchorEl(null);
  };

  const tagColor = (str) => {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var color = "#";
    for (var j = 0; j < 3; j++) {
      var value = (hash >> (j * 1)) & 0xff;
      color += ("00" + value.toString(8)).substr(-2);
    }
    return color;
  };

  const avatarColor = (str) => {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var color = "#";
    for (var j = 0; j < 3; j++) {
      var value = (hash >> (j * 8)) & 0xff;
      color += ("00" + value.toString(8)).substr(-2);
    }
    return color;
  };

  const currDateFormat = moment(new Date(listItem.date)).format(
    "MMMM Do YYYY, h:mm:ss a"
  );

  return (
    <Card className={classes.root}>
      <CardHeader
        classes={{ subheader: classes.subheader }}
        avatar={
          <Avatar
            aria-label="recipe"
            style={{ backgroundColor: `${avatarColor(listItem.name)}` }}
          >
            {listItem.name.charAt(0).toUpperCase()}
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
              {auth.user !== null && auth.user._id === listItem.user ? (
                <div>
                  <MenuItem onClick={deleteHandler}>Delete</MenuItem>
                  <MenuItem onClick={handleClose}>Edit</MenuItem>
                  <MenuItem onClick={handleClose}>Report</MenuItem>
                </div>
              ) : (
                <MenuItem onClick={handleClose}>Report</MenuItem>
              )}
            </Menu>
          </React.Fragment>
        }
        title={listItem.title}
        subheader={`${listItem.name}, ${currDateFormat}`}
      />
      <Chip
        className={classes.tag}
        label={listItem.tag}
        style={{ backgroundColor: `${tagColor(listItem.tag)}` }}
        variant="outlined"
      />
      <CardContent
        style={{ minHeight: "250px", marginBottom: "10px" }}
        className="card-content"
      >
        {typeof listItem.content === "string" ? (
          HTMLReactParser(listItem.content)
        ) : (
          <div style={{ marginBottom: "60px" }}>
            <ol className="api-list" style={{ paddingLeft: "0" }} reversed>
              {Array.isArray(listItem.content) === true &&
                listItem.content.slice(0, 3).map((item) => {
                  return (
                    <li style={{ marginBottom: "25px" }} key={item.id}>
                      <a
                        rel="noopener noreferrer"
                        target="_blank"
                        href={item.url || item.imdbId}
                        style={{
                          color: "inherit",
                          textDecoration: "none",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                          }}
                        >
                          <img
                            src={item.thumbnail || item.poster}
                            alt={item.title}
                            style={{ width: "100px" }}
                          />
                          <div style={{ marginLeft: "25px" }}>
                            <p>
                              {item.title} {item.author && `- ${item.author}`}
                            </p>
                            <p style={{ fontWeight: "bold" }}>
                              {item.year || item.channel}
                            </p>
                            {item.desc && (
                              <p style={{ paddingTop: "15px" }}>
                                {item.desc.substring(0, 150) + "..."}
                              </p>
                            )}
                          </div>
                        </div>
                      </a>
                    </li>
                  );
                })}
            </ol>
            {listItem.content.length > 3 && (
              <Link
                to={`lists/${listItem._id}`}
                style={{
                  fontWeight: "bold",
                  color: "white",
                  textDecoration: "none",
                }}
              >
                And {listItem.content.length - 3} More
              </Link>
            )}
          </div>
        )}
      </CardContent>
      <CardActions disableSpacing style={{ width: "100%" }}>
        <AddToFav user={auth.user} list={listItem} />

        <Link
          to={`lists/${listItem._id}`}
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
            color: "white",
            textDecoration: "none",
          }}
        >
          <IconButton aria-label="share" style={{ color: "white" }}>
            <Badge badgeContent={listItem.comments.length} color="secondary">
              <TextsmsOutlinedIcon />
            </Badge>
          </IconButton>

          <Typography className={classes.showMore}>
            Read All
            <IconButton style={{ color: "white" }} aria-label="show more">
              <ArrowForwardIosIcon style={{ width: "15px", height: "15px" }} />
            </IconButton>
          </Typography>
        </Link>
      </CardActions>
    </Card>
  );
};

const mapStateToProps = (state) => ({
  list: state.list,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  deleteList,
  addBookmark,
  removeBookmark,
})(List);
