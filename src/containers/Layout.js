import React from "react";
import { Container } from "semantic-ui-react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Layout = ({ children }) => {
  return (
    <>
      (
      <Navbar />
      <Container text style={{ marginTop: "7em" }}>
        {children}
      </Container>
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
