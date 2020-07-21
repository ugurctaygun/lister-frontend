import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import { connect } from "react-redux";
import { filterList } from "../../actions/list";
import Typography from "@material-ui/core/Typography";

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

  const [smallScreen, setSmallScreen] = useState({
    matches: window.matchMedia("(min-width: 768px)").matches,
  });

  useEffect(() => {
    const handler = (e) => setSmallScreen({ matches: e.matches });
    window.matchMedia("(min-width: 768px)").addListener(handler);
  }, []);

  console.log(smallScreen.matches);

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

  const changeHandler = (e) => {
    filterList(`${e.target.value}`);
  };

  return (
    <div style={{ width: "100%", display: "flex" }}>
      {smallScreen.matches ? (
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
      ) : (
        <div
          style={{
            margin: "80px auto 20px auto",
          }}
        >
          <Typography style={{ color: "white", marginBottom: "5px" }}>
            Filter Topics
          </Typography>
          <select onChange={changeHandler}>
            {tags.map((item) => (
              <option key={item.tag} value={item.tag}>
                {item.tag}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  list: state.list,
});

export default connect(mapStateToProps, { filterList })(Filter);
