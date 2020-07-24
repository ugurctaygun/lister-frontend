import React, { useState, useCallback } from "react";
import { connect } from "react-redux";
import { createList } from "../../actions/list";
import YouTubeList from "../layout/Apis/YouTubeList";
import MovieList from "../layout/Apis/MovieList";
import BookList from "../layout/Apis/BookList";

import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextEditor from "../layout/TextEditor/TextEditor";
import Button from "@material-ui/core/Button";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "50px",
    border: "1px solid",
    borderRadius: "25px",
    boxShadow:
      "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
    width: "80%",
    margin: "50px auto",
    backgroundColor: "white",
    "@media (max-width: 767px)": {
      width: "100%",
      padding: "10px",
      margin: "25px auto",
    },
  },
  root: {
    "& .MuiTextField-root": {
      margin: 0,
      width: "100%",
    },
  },
  formContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },
  titleTag: {
    width: "50%",
    "@media (max-width: 767px)": {
      width: "90%",
    },
  },
}));

const CreateList = ({ createList, auth: { user } }) => {
  const classes = useStyles();

  const [value, setValue] = useState(0);
  const [formData, setFormData] = useState({
    title: "",
    tag: "",
    content: "",
    name: "",
  });

  const getUserName = useCallback(() => {
    if (user !== null) {
      setFormData({ ...formData, name: user.name });
    }
  }, [formData, user]);

  const { title, tag, content, name } = formData;

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

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("form submitted");
    getUserName();
    createList({ title, tag, content, name });
    setFormData({ title: "", tag: "", content: "", name: "" });
  };

  const handleEditor = (e) => {
    setFormData({ ...formData, content: e });
  };

  const handleYouTube = (e) => {
    setFormData({ ...formData, content: e });
  };

  const handleMovie = (e) => {
    setFormData({ ...formData, content: e });
  };

  const handleBook = (e) => {
    setFormData({ ...formData, content: e });
  };

  const handleBookRemove = (e) => {
    setFormData({ ...formData, content: content.filter((x) => x.id !== e.id) });
  };

  const handleTabs = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="background">
      <div className={classes.container}>
        <form
          className={classes.root}
          autoComplete="off"
          onSubmit={(e) => onSubmit(e)}
          onKeyPress={(e) => {
            e.key === "Enter" && e.preventDefault();
          }}
        >
          <div className={classes.formContainer}>
            <TextField
              required
              id="standard-required"
              label="Title"
              name="title"
              value={title}
              className={classes.titleTag}
              onChange={(e) => onChange(e)}
              helperText="Enter a title for your list"
            />
            <TextField
              required
              select
              label="Tag"
              name="tag"
              className={classes.titleTag}
              style={{ paddingBottom: "50px" }}
              value={tag}
              onChange={(e) => onChange(e)}
              helperText="Please select a tag for your list"
            >
              {tags.map((option) => (
                <MenuItem key={option.tag} value={option.tag}>
                  {option.tag}
                </MenuItem>
              ))}
            </TextField>

            <div>
              <Tabs
                value={value}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleTabs}
                aria-label="disabled tabs example"
              >
                <Tab label="Custom List" />
                <Tab label="Book List" />

                <Tab label="Movie List" />
                <Tab label="Youtube Video List" />
              </Tabs>
            </div>

            <TabPanel value={value} index={0}>
              <TextEditor handleEditor={handleEditor} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <BookList
                handleBook={handleBook}
                handleBookRemove={handleBookRemove}
              />
            </TabPanel>

            <TabPanel value={value} index={2}>
              <MovieList handleMovie={handleMovie} />
            </TabPanel>
            <TabPanel value={value} index={3}>
              <YouTubeList handleYouTube={handleYouTube} />
            </TabPanel>

            <Button
              variant="outlined"
              type="submit"
              style={{ marginTop: "30px" }}
            >
              Create New List
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { createList })(CreateList);
