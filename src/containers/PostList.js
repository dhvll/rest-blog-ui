import React from "react";
import { NavLink } from "react-router-dom";
import { Header, Divider, Item } from "semantic-ui-react";
import { api } from "../api";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useFetch } from "../helpers";
import ReactMarkdown from "react-markdown";

const PostList = () => {
  const { data, loading, error } = useFetch(api.posts.list);
  return (
    <div>
      <Header>Post List</Header>
      <Divider />
      {error && <Message negative message={error} />}
      {loading && <Loader />}
      <Item.Group>
        {data?.map((post) => {
          return (
            <Item key={post.id}>
              <Item.Image size="small" src={post.thumbnail} />
              <Item.Content>
                <NavLink to={`/posts/${post.slug}`}>
                  <Item.Header as="span">{post.title}</Item.Header>
                </NavLink>
                {/* <ReactMarkdown children={post.content} />k */}
                {/* <Item.Description>{post.content}</Item.Description> */}
              </Item.Content>
            </Item>
          );
        })}
      </Item.Group>
    </div>
  );
};

export default PostList;
