import Container from "@mui/material/Container";
import NavBar from "../src/components/NavBar";
import Header from "../src/components/Header";
import Box from "@mui/material/Box";
import { useState } from "react";
import PostList from "../src/components/PostList/PostList";

export default function Home() {
  return (
    <Container>
      <Box
        sx={{
          backgroundImage: `
            linear-gradient(
              rgba(0, 0, 0, 0.1),
              rgba(0, 0, 0, 0.1)
            ),
            url(../../background.jpg)`,
          backgroundSize: "cover",
        }}
      >
        <NavBar isFixed={true} />
        <Header />
      </Box>
      <PostList />
    </Container>
  );
}
