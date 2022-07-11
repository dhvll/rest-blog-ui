import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Header, Divider, Item } from "semantic-ui-react";
import { api } from "../api";
import Loader from "../components/Loader";
import Message from "../components/Message";

const PostList = () => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await axios.get(api.posts.list);
        setPosts(res.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <Header>Post List</Header>
      <Divider />
      {error && <Message negative message={error} />}
      {loading && <Loader />}
      <Item.Group>
        {posts?.map((post) => {
          return (
            <Item key={post.id}>
              <Item.Image size="small" src={post.thumbnail} />
              <Item.Content>
                <NavLink to={`/posts/${post.slug}`}>
                  <Item.Header as="span">{post.title}</Item.Header>
                </NavLink>
                <Item.Description>{post.content}</Item.Description>
              </Item.Content>
            </Item>
          );
        })}
      </Item.Group>
    </div>
  );
};

export default PostList;
