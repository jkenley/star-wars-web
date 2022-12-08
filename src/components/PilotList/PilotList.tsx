import React, { FC } from "react";
import {
  Heading,
  Image,
  Stack,
  Text,
  Button,
  Card,
  CardBody,
  CardFooter
} from "@chakra-ui/react";

type PilotListProps = {
  pilotsIds: string[] | number[];
  [props: string]: any;
};

const PilotList: FC<PilotListProps> = ({ pilotsIds }): JSX.Element => {
  console.log(pilotsIds);

  return <div>Hello</div>;
};

export default PilotList;
