import React from "react";
import { Center, Spinner } from "@chakra-ui/react";

const Loading = (): JSX.Element => (
  <Center mt={8}>
    <Spinner
      emptyColor="hsla(208, 31%, 12%, 100%)"
      color="#ffc107"
      thickness="5px"
      speed="0.65s"
      size="lg"
    />
  </Center>
);

export default Loading;
