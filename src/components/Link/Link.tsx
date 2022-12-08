import React, { FC } from "react";
import NextLink from "next/link";

type LinkProps = {
  href: string;
  children: React.ReactNode;
};

const Link: FC<LinkProps> = ({ href, children }) => {
  return (
    <NextLink href={href} passHref>
      <a>{children}</a>
    </NextLink>
  );
};

export default Link;
