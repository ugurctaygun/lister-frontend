import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadList } from "../../actions/list";
import Spinner from "../layout/Spinner";
import CompactList from "../layout/CompactList";

const Bookmarks = ({ loadList, auth, list: { lists } }) => {
  const [bookmarkedLists, setBookmarkedLists] = useState(null);

  useEffect(() => {
    loadList();
    console.log("test2");
  }, [loadList]);

  useEffect(() => {
    if (auth.user && lists) {
      const bookmarked = auth.user.bookmarks.map((bookmark) => bookmark.list);
      const filtered = lists.filter((item) => {
        return bookmarked.indexOf(item._id) !== -1;
      });
      setBookmarkedLists(filtered);
    }
  }, [auth, lists]);

  if (auth.loading) {
    return <Spinner />;
  }

  return (
    <div className="background">
      <div style={{ width: "80%", margin: "50px auto" }}>
        {bookmarkedLists ? (
          bookmarkedLists.map((item, i) => (
            <CompactList key={i} listItem={item} />
          ))
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  list: state.list,
});

export default connect(mapStateToProps, { loadList })(Bookmarks);
