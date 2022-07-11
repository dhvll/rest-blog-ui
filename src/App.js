import React from "react";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PostList from "./containers/PostList";
import PostDetail from "./containers/PostDetail";
import PostCreate from "./containers/PostCreate";
import PostUpdate from "./containers/PostUpdate";
import PostDelete from "./containers/PostDelete";
import Layout from "./containers/Layout";
import { history } from "./helpers";

function App() {
  return (
    <BrowserRouter history={history}>
      <Layout>
        <Routes>
          <Route exact path="/" element={<PostList />} />
          <Route path="/create" element={<PostCreate />} />
          <Route exact path="/posts/:postSlug" element={<PostDetail />} />
          <Route path="/posts/:postSlug/update" element={<PostUpdate />} />
          <Route path="/posts/:postSlug/delete" element={<PostDelete />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
