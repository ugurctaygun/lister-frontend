import React, { useEffect } from "react";
import List from "../layout/List";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { loadList } from "../../actions/list";
import Filter from "../layout/Filter";

const Home = ({ loadList, list: { lists, filteredLists }, list }) => {
  useEffect(() => {
    loadList();
  }, [loadList]);

  if (list.loading || typeof lists === "string") {
    return <Spinner />;
  }

  console.log(lists);

  const filterActive = filteredLists.map((listItem, i) => (
    <List key={i} listItem={listItem} />
  ));

  const noFilter = lists.map((listItem, i) => (
    <List key={i} listItem={listItem} />
  ));

  return (
    <React.Fragment>
      <Filter lists={lists} />
      <div className="home">
        {filteredLists.length ? filterActive : noFilter}
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  list: state.list,
  auth: state.auth,
});

export default connect(mapStateToProps, { loadList })(Home);
