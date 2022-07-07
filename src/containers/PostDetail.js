import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Container, Header, Image } from "semantic-ui-react";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useParams } from "react-router-dom";

const PostDetail = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { postSlug } = useParams();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/api/posts/${postSlug}`
        );
        setPost(res.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  return (
    <Container text>
      {error && <Message negative message={error} />}
      {loading && <Loader />}
      {post && (
        <div>
          <Image src={post.thumbnail} />
          <Header as="h1">{post.title}</Header>
          <Header as="h4">
            Last updated:{` ${new Date(post.updated_at).toLocaleDateString()}`}
          </Header>
          <p>{post.content}</p>
        </div>
      )}
    </Container>
  );
};

export default PostDetail;
