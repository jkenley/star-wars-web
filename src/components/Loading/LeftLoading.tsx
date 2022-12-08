import React from 'react'
import { Spinner } from "@chakra-ui/react";

const LeftLoading = (): JSX.Element => (
  <Spinner
    emptyColor="hsla(208, 31%, 12%, 100%)"
    color="#ffc107"
    thickness="3px"
    speed="0.65s"
    size="sm"
  />
);

export default LeftLoading;
