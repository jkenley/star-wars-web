import React, { FC, useEffect, useCallback } from "react";
import { Box, Text, Spinner, ListItem, UnorderedList } from "@chakra-ui/react";
import Emoji from "@components/Emoji";
import useFilmsStore from "@store/film";
import Link from "next/link";

type FilmCardProps = {
  filmsIds: number[];
  component: string;
  [props: string]: any;
};

const StarshipFilmCard: FC<FilmCardProps> = ({
  filmsIds,
  component,
  ...props
}): JSX.Element => {
  const { starshipFilms, getStarshipFilms, loading } = useFilmsStore(
    (state: any) => ({
      starshipFilms: state.starshipFilms,
      getStarshipFilms: state.getStarshipFilms,
      loading: state.loading
    })
  );

  const onItemIdChange = useCallback(
    (filmsIds) => {
      if (filmsIds) {
        getStarshipFilms(filmsIds);
      }
    },
    [filmsIds]
  );

  useEffect(() => {
    onItemIdChange(filmsIds);
  }, [filmsIds]);

  return (
    <Box {...props}>
      {loading.type === "starshipFilm" && loading.status ? (
        <Spinner
          emptyColor="hsla(208, 31%, 12%, 100%)"
          color="#ffc107"
          thickness="3px"
          speed="0.65s"
          size="sm"
        />
      ) : (
        <>
          {starshipFilms?.length === 0 ? (
            <Text>
              <Emoji label="Film emoji" symbol="🎬" mr=".5rem" />
              No films
            </Text>
          ) : (
            <UnorderedList listStyleType="none" ml="-0.1rem" spacing={1}>
              {starshipFilms?.map(({ id, title }) => (
                <ListItem key={id}>
                  <Link href={`/films/${id}`} passHref>
                    <a>
                      <Text>
                        <Emoji label="Film emoji" symbol="🎬" mr=".5rem" />
                        {title}
                      </Text>
                    </a>
                  </Link>
                </ListItem>
              ))}
            </UnorderedList>
          )}
        </>
      )}
    </Box>
  );
};

export default StarshipFilmCard;
