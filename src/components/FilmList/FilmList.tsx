import React, { FC, useEffect, useCallback } from "react";
import { Avatar, Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import Link from "next/link";
import useFilmsStore from "@store/film";
import { getSpeciesPicture, toTitleCase } from "@utils/shared";

type FilmListProps = {
  filmsIds: string[] | number[];
  [props: string]: any;
};

const FilmList: FC<FilmListProps> = ({ filmsIds, ...props }): JSX.Element => {
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
      {loading.page === "filmPage" && loading.status ? (
        <Text>Loading...</Text>
      ) : (
        <SimpleGrid minChildWidth="250px" spacing={8}>
          {starshipFilms?.map(({ title, id }) => (
            <Box height="100px" key={id}>
              <Flex direction="column" justify="center" align="center">
                <Link href={`/films/${id}`} passHref>
                  <a>
                    <Avatar
                      size="md"
                      title={title}
                      border="2px solid #ffc107"
                      name={title}
                      src={`${getSpeciesPicture(id)}`}
                    />
                  </a>
                </Link>
                <Box mt={3}>
                  <Link href={`/films/${id}`} passHref>
                    <a>
                      <Text fontWeight="500" fontSize=".95rem">
                        {toTitleCase(title)}
                        Hello
                      </Text>
                    </a>
                  </Link>
                </Box>
              </Flex>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default FilmList;
