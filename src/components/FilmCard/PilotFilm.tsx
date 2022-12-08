import React, { FC, useEffect, useCallback } from "react";
import { Box, Text, Spinner, ListItem, UnorderedList } from "@chakra-ui/react";
import Emoji from "@components/Emoji";
import useFilmsStore from "@store/film";

type FilmCardProps = {
  filmsIds: number[];
  component: string;
  [props: string]: any;
};

const PilotFilmCard: FC<FilmCardProps> = ({
  filmsIds,
  component,
  ...props
}): JSX.Element => {
  const { pilotFilms, getPilotFilms, loading } = useFilmsStore(
    (state: any) => ({
      pilotFilms: state.pilotFilms,
      getPilotFilms: state.getPilotFilms,
      loading: state.loading
    })
  );

  const onItemIdChange = React.useCallback(
    (filmsIds) => {
      if (filmsIds) {
        getPilotFilms(filmsIds);
      }
    },
    [filmsIds]
  );

  useEffect(() => {
    onItemIdChange(filmsIds);
  }, [filmsIds]);

  return (
    <Box {...props}>
      {loading.type === "pilotFilm" && loading.status ? (
        <Spinner
          emptyColor="hsla(208, 31%, 12%, 100%)"
          color="#ffc107"
          thickness="3px"
          speed="0.65s"
          size="sm"
        />
      ) : (
        <>
          {pilotFilms?.length === 0 ? (
            <Text>
              <Emoji label="Film emoji" symbol="🎬" mr=".5rem" />
              No films
            </Text>
          ) : (
            <UnorderedList listStyleType="none" ml="-0.1rem" spacing={1}>
              {pilotFilms?.map((film: any) => (
                <ListItem key={film.id}>
                  <Text>
                    <Text as="span" mr={2} role="img" aria-label="sheep">
                      🎬
                    </Text>
                    {film.title}
                  </Text>
                </ListItem>
              ))}
            </UnorderedList>
          )}
        </>
      )}
    </Box>
  );
};

export default PilotFilmCard;
