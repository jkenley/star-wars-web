import React, { FC } from "react";
import { SimpleGrid } from "@chakra-ui/react";
import StarshipGridItem from "@components/StarshipGridItem";

type StarshipGridProps = {
  starships: any;
};

const StarshipGrid: FC<StarshipGridProps> = ({ starships }) => {
  return (
    <SimpleGrid
      marginTop={12}
      spacing={6}
      templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
    >
      {starships.map((starship: any) => (
        <StarshipGridItem
          key={starship.name.toLowerCase().replaceAll(" ", "-")}
          starship={starship}
        />
      ))}
    </SimpleGrid>
  );
};

export default StarshipGrid;
