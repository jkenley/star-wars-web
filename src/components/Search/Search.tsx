import React, { FC } from "react";
import { Box, Input } from "@chakra-ui/react";
import { css } from "@emotion/react";

type SearchBoxProps = {
  value: string;
  onChange: (event: {
    target: { value: React.SetStateAction<string> };
  }) => void;
};

const SearchBox: FC<SearchBoxProps> = ({ value, onChange }): JSX.Element => (
  <Box css={styles}>
    <Box marginTop={8}>
      <Input
        value={value}
        onChange={onChange}
        type="text"
        placeholder="Search starship by name or model"
      />
    </Box>
  </Box>
);

const styles = css`
  input {
    height: 48px;
    color: white;
    background: hsla(208, 31%, 12%, 70%);
    border: 1px solid transparent;
    border-radius: 5px;
    font-weight: 450;
    font-size: 1rem;
    padding: 0 15px 0;
    transition: 0.3s ease;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);

    &:hover {
      border-color: transparent;
    }
    &:focus {
      outline: none;
      border-color: #ffc107;
      box-shadow: 0 0 0 2px #ffc107;
    }
    &::placeholder {
      color: #aaa;
      opacity: 0.8;
    }
  }
`;

export default SearchBox;
