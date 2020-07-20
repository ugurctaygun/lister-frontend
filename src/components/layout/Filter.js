import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import { connect } from "react-redux";
import { filterList } from "../../actions/list";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "85px auto 15px auto",
    backgroundColor: "#1a1a1b",
    border: "1px solid #343536",
    color: "white",
    "&:hover": {
      border: "1px solid white",
    },
  },
  subheader: {
    color: "#afaaaa",
  },
  tag: {
    margin: "5px",
    color: "white",
    backgroundColor: "#5966b9",
  },
  showMore: {
    width: "100%",
    textAlign: "right",
    cursor: "pointer",
  },
}));

const Filter = ({ lists, filteredLists, filterList }) => {
  const classes = useStyles();

  const tags = [
    { tag: "Movies" },
    { tag: "Books" },
    { tag: "Music" },
    { tag: "History" },
    { tag: "Gaming" },
    { tag: "Programming" },
    { tag: "Misc" },
    { tag: "Comics" },
    { tag: "Sports" },
  ];

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

  const clickHandler = (e) => {
    filterList(`${e.target.innerText}`);
  };

  return (
    <div style={{ width: "100%", display: "flex" }}>
      <Card className={classes.root}>
        <CardContent className="card-content">
          <Chip
            className={classes.tag}
            label="Show All"
            onClick={clickHandler}
            variant="outlined"
          />
          {tags.map((item) => (
            <Chip
              className={classes.tag}
              style={{ backgroundColor: `${tagColor(item.tag)}` }}
              label={item.tag}
              onClick={clickHandler}
              variant="outlined"
            />
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

const mapStateToProps = (state) => ({
  list: state.list,
});

export default connect(mapStateToProps, { filterList })(Filter);
