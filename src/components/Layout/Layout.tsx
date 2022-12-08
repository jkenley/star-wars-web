import React, { FC } from "react";
import { Box } from "@chakra-ui/react";

// Implement type for Layout
type LayoutProps = {
  children: React.ReactNode;
  maxWidth: string;
  [key: string]: any;
};

const Layout: FC<LayoutProps> = ({ children, maxWidth, ...props }): JSX.Element => {
  return (
    <Box margin="0 auto" maxWidth={maxWidth} {...props}>
      {children}
    </Box>
  );
};

export default Layout;
