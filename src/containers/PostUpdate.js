import axios from "axios";
import MarkdownIt from "markdown-it";
import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Divider, Form, Header, Image } from "semantic-ui-react";
import { api } from "../api";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { history, useFetch } from "../helpers";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";

const PostUpdateForm = ({
  postSlug,
  initialTitle,
  initialContent,
  initialThumbnail,
}) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState(initialTitle);
  const [markdown, setMarkdown] = useState(initialContent);
  const [currentThumbnail, setCurrentThumbnail] = useState(initialThumbnail);
  const [thumbnail, setThumbnail] = useState(null);
  const mdParser = new MarkdownIt(/* Markdown-it options */);
  const fileInputRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }
    formData.append("title", title);
    formData.append("content", markdown);
    console.log(formData);
    axios
      .put(api.posts.update(postSlug), formData, {
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

  return (
    <div>
      <Header>Update post</Header>
      {error && <Message negative message={error} />}
      {loading && <Loader />}
      {currentThumbnail && <Image src={currentThumbnail} size="small" />}
      <Divider />
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Title</label>
          <input
            placeholder="Title of your post"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Field>
        <MdEditor
          value={markdown}
          style={{ height: "500px" }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={({ text }) => setMarkdown(text)}
        />
        <Form.Field>
          <Button
            type="button"
            fluid
            content="Choose a thumbnail"
            labelPosition="left"
            icon="file"
            onClick={() => fileInputRef.current.click()}
          />
          <input
            ref={fileInputRef}
            type="file"
            hidden
            onChange={(e) => setThumbnail(e.target.files[0])}
          />
        </Form.Field>
        <Button
          primary
          fluid
          loading={loading}
          disabled={loading}
          type="submit"
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};

const PostUpdate = () => {
  const { postSlug } = useParams();
  const { data, loading, error } = useFetch(api.posts.retrieve(postSlug));

  return (
    <>
      {error && <Message negative message={error} />}
      {loading && <Loader />}
      {data && (
        <PostUpdateForm
          postSlug={postSlug}
          initialTitle={data.title}
          initialContent={data.content}
          initialThumbnail={data.thumbnail}
        />
      )}
    </>
  );
};

export default PostUpdate;
