import React, { useState } from "react";
import { produce } from "immer";
import axios from "axios";
import { connect } from "react-redux";
import { setAlert } from "../../../actions/alert";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
//ICONS
import AddIcon from "@material-ui/icons/Add";
import SaveIcon from "@material-ui/icons/Save";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const useStyles = makeStyles((theme) => ({
  listContainer: {
    border: "1px solid #ddd",
    padding: "15px",
  },
}));

const YouTubeList = ({ handleYouTube, setAlert }) => {
  const classes = useStyles();

  const [ytData, setYtData] = useState([
    { id: "", url: "", title: "", channel: "", thumbnail: "" },
  ]);
  const [error, setError] = useState(false);
  const [saved, setSaved] = useState(false);

  const getYtData = async (id, index) => {
    try {
      const formatUrl = id.match("[\\?&]v=([^&#]*)");
      const videoUrl = formatUrl[1];
      const res = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoUrl}&fields=items(id%2Csnippet)&key=AIzaSyBdogkYurpBuST6o80MpwUTTXhscMYqYp0`
      );

      console.log(res.data.items[0].snippet);
      const title = res.data.items[0].snippet.title;
      const channel = res.data.items[0].snippet.channelTitle;
      const thumbnail = res.data.items[0].snippet.thumbnails.default.url;
      setYtData((currentData) =>
        produce(currentData, (v) => {
          v[index].title = title;
          v[index].channel = channel;
          v[index].thumbnail = thumbnail;
        })
      );
      setError(false);
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  const sendProp = (e) => {
    setSaved(true);
    setAlert("Item saved", "success");
    e.preventDefault();
    handleYouTube(ytData);
  };

  console.log(ytData);
  return (
    <div className={classes.listContainer}>
      {ytData.map((item, index) => {
        return (
          <div
            key={item.id}
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "25px 0",
            }}
          >
            <div style={{ display: "flex", width: "100%" }}>
              <TextField
                className="textfield-mq"
                onChange={(e) => {
                  const url = e.target.value;
                  setYtData((currentData) =>
                    produce(currentData, (v) => {
                      v[index].url = url;
                    })
                  );
                }}
                value={item.url}
                helperText="e.g. www.youtube.com/watch?v=kJQP7kiw5Fk"
                label="Enter Youtube Link Here"
              />
              <Button
                style={{ marginLeft: "5px" }}
                variant="outlined"
                onClick={(e) => {
                  e.preventDefault();
                  console.log(item.url);
                  getYtData(item.url, index, item.title);
                }}
              >
                <AddIcon />
              </Button>
            </div>

            {error ? (
              <div>Please enter a valid youtube video link</div>
            ) : (
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
                  href={item.url}
                  style={{
                    color: "inherit",
                    textDecoration: "none",
                    display: "flex",
                  }}
                >
                  {item.thumbnail && <img src={item.thumbnail} alt="video" />}
                  <div style={{ marginLeft: "25px" }}>
                    {item.channel && <p>{item.channel}</p>}
                    {item.title && <p>{item.title}</p>}
                  </div>
                </a>
                {item.title && (
                  <Button
                    required
                    style={{ margin: "15px" }}
                    variant="outlined"
                    onClick={sendProp}
                  >
                    <SaveIcon style={{ fill: "green", marginRight: "5px" }} />
                    {saved ? "Save item to your list" : "dasds"}
                  </Button>
                )}
                {item.title && (
                  <Button
                    style={{ margin: "15px" }}
                    variant="outlined"
                    onClick={(e) => {
                      e.preventDefault();
                      setYtData((currentData) =>
                        currentData.filter((x) => x.id !== item.id)
                      );
                      setSaved(false);
                      setAlert("Item removed from list", "warning");
                    }}
                  >
                    <DeleteForeverIcon
                      style={{ fill: "red", marginRight: "5px" }}
                    />
                    Delete Item
                  </Button>
                )}
              </div>
            )}
          </div>
        );
      })}
      <Button
        variant="outlined"
        onClick={(e) => {
          e.preventDefault();
          setYtData((currentData) => [
            ...currentData,
            {
              id: Math.random(),
              url: "",
              title: "",
              channel: "",
              thumbnail: "",
            },
          ]);
        }}
      >
        <AddIcon />
        Add new video item
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps, { setAlert })(YouTubeList);
