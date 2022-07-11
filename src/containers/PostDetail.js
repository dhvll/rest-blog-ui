import React, { useState } from "react";
import {
  Button,
  Container,
  Divider,
  Header,
  Image,
  Modal,
} from "semantic-ui-react";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useParams } from "react-router-dom";
import { api } from "../api";
import { history, useFetch } from "../helpers";
import axios from "axios";

const DeleteModal = ({ title, postSlug, thumbnail }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleSubmit() {
    setLoading(true);

    axios
      .delete(api.posts.delete(postSlug), {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Token b93129c3e3eff41b52044cb2e25686172194abca",
        },
      })
      .then((res) => {
        setLoading(false);
        history.push("/");
        window.location.reload();
        // redirect back to the post list
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message || err);
      });
  }

  const [open, toggle] = useState(false);

  return (
    <Modal
      trigger={
        <Button secondary floated="right" onClick={() => toggle(true)}>
          Delete post
        </Button>
      }
      open={open}
      onClose={() => toggle(false)}
      size="small"
    >
      <Modal.Header>Delete post</Modal.Header>
      <Modal.Content image>
        <Image size="medium" src={thumbnail} wrapped />
        <Modal.Description>
          <Header>{title}</Header>
          {error && <Message negative message={error} />}

          <p>Are you sure you want to delete this post?</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => toggle(false)}>
          No
        </Button>
        <Button
          icon="checkmark"
          labelPosition="right"
          content="Confirm delete"
          positive
          onClick={handleSubmit}
          loading={loading}
          disabled={loading}
        >
          Confirm Delete
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

const PostDetail = () => {
  const { postSlug } = useParams();
  const { data, loading, error } = useFetch(api.posts.retrieve(postSlug));

  return (
    <Container text>
      {error && <Message negative message={error} />}
      {loading && <Loader />}
      {data && (
        <div>
          <Image src={data.thumbnail} />
          <Header as="h1">{data.title}</Header>
          <Header as="h4">
            Last updated:{` ${new Date(data.updated_at).toLocaleDateString()}`}
          </Header>
          <p>{data.content}</p>
          <Divider />
          <DeleteModal
            title={data.title}
            thumbnail={data.thumbnail}
            postSlug={postSlug}
          />
        </div>
      )}
    </Container>
  );
};

export default PostDetail;
