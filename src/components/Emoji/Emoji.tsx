import React, { FC } from "react";
import { Text } from "@chakra-ui/react";

type EmojiProps = {
  label: string;
  symbol: string;
  [props: string]: any;
};

const Emoji: FC<EmojiProps> = ({ label, symbol, ...props }): JSX.Element => (
  <Text
    as="span"
    role="img"
    aria-label={label ? label : ""}
    aria-hidden={label ? "false" : "true"}
    {...props}
  >
    {symbol}
  </Text>
);

export default Emoji;
