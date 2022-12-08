import React, { FC, useEffect, useCallback } from "react";
import { Box, Text, Spinner, ListItem, UnorderedList } from "@chakra-ui/react";
import Emoji from "@components/Emoji";
import useStarshipStore from "@store/starship";

type StarshipCardProps = {
  starshipIds: number[];
  [props: string]: any;
};

const StarshipCard: FC<StarshipCardProps> = ({
  starshipIds,
  ...props
}): JSX.Element => {
  const { pilotStarships, getPilotStarships, loading } = useStarshipStore(
    (state: any) => ({
      pilotStarships: state.pilotStarships,
      getPilotStarships: state.getPilotStarships,
      loading: state.loading
    })
  );

  console.log("starshipIds");
  console.log(starshipIds);

  // const onItemIdChange = useCallback(
  //   (starshipIds) => {
  //     if (starshipIds) {
  //       getPilotStarships(starshipIds);
  //     }
  //   },
  //   [starshipIds]
  // );

  // useEffect(() => {
  //   onItemIdChange(starshipIds);
  // }, [starshipIds]);

  console.log('pilotStarships');
  console.log(pilotStarships);
  console.log(loading)

  return <div>Hello</div>;
};

export default StarshipCard;
