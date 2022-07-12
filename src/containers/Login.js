import React from "react";
import { useState } from "react";
import { Header, Button, Form, Container } from "semantic-ui-react";
import Message from "../components/Message";
import { history } from "../helpers";
import { authenticationService } from "../services";
import { Navigate } from "react-router-dom";

const Login = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    authenticationService
      .login(username, email, password)
      .then((res) => {
        localStorage.setItem("token", res.data.key);
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

  if (authenticationService.isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <Container>
      <Header>Login to your account</Header>
      {error && <Message danger message={error} />}

      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Username</label>
          <input
            placeholder="Username"
            value={username}
            type="text"
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Email</label>
          <input
            placeholder="Email"
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input
            placeholder="Password"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Field>
        <Button
          primary
          fluid
          loading={loading}
          disabled={loading}
          type="submit"
        >
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
