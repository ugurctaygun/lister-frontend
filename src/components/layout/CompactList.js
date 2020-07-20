import React from "react";
import AddToFav from "../layout/AddToFav";
import { connect } from "react-redux";
import { deleteList } from "../../actions/list";
import { addBookmark, removeBookmark } from "../../actions/auth";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import TextsmsOutlinedIcon from "@material-ui/icons/TextsmsOutlined";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    WebkitColumnBreakInside: "avoid",
    pageBreakInside: "avoid",
    breakInside: "avoid",
    display: "flex",
    alignItems: "center",
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
    "@media (max-width: 767px)": {
      flexDirection: "column",
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
    marginRight: "16px",
    color: "white",
    filter: "drop-shadow(2px 1px 1px black)",
  },
}));
const List = ({ listItem, auth, addBookmark, removeBookmark }) => {
  const classes = useStyles();

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

  const currDateFormat = moment(new Date(listItem.date)).format(
    "MMMM Do YYYY, h:mm:ss a"
  );

  return (
    <Card className={classes.root}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <CardHeader
          classes={{ subheader: classes.subheader }}
          avatar={<AddToFav user={auth.user} list={listItem} />}
          title={listItem.title}
          subheader={`${listItem.name}, ${currDateFormat}`}
        />
        <Chip
          className={classes.tag}
          label={listItem.tag}
          style={{ backgroundColor: `${tagColor(listItem.tag)}` }}
          variant="outlined"
        />
      </div>

      <CardActions disableSpacing style={{}}>
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

          <Typography
            className={classes.showMore}
            style={{ marginLeft: "15px" }}
          >
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
