import React, { FC, useEffect, useCallback } from "react";
import { SimpleGrid, Box, Flex, Text, Avatar } from "@chakra-ui/react";
import useStarshipStore from "@store/starship";
import { getStarship2Picture } from "@utils/shared";
import Link from "next/link";
import { toTitleCase } from "@utils/shared";
import { LeftLoading } from "@components/Loading";

type StarshipListProps = {
  starshipIds: string[] | number[];
  [props: string]: any;
};

const StarshipList: FC<StarshipListProps> = ({
  starshipIds,
  ...props
}): JSX.Element => {
  const { filmStarships, getFilmStarships, loading } = useStarshipStore(
    (state: any) => ({
      filmStarships: state.filmStarships,
      getFilmStarships: state.getFilmStarships,
      loading: state.loading
    })
  );

  const onItemIdChange = useCallback(
    (starshipIds) => {
      if (starshipIds) {
        getFilmStarships(starshipIds);
      }
    },
    [starshipIds]
  );

  useEffect(() => {
    onItemIdChange(starshipIds);
  }, [starshipIds]);

  return (
    <Box {...props}>
      {loading.page === "filmPage" && loading.status ? (
        <LeftLoading />
      ) : (
        <SimpleGrid minChildWidth="250px" spacing={8}>
          {filmStarships?.map(({ name, id }) => (
            <Box height="100px" key={id}>
              <Flex direction="column" justify="center" align="center">
                <Link href={`/starships/${id}`} passHref>
                  <a>
                    <Avatar
                      size="md"
                      title={name}
                      border="2px solid #ffc107"
                      name={name}
                      src={`${getStarship2Picture(id)}`}
                    />
                  </a>
                </Link>
                <Box mt={3}>
                  <Link href={`/starships/${id}`} passHref>
                    <a>
                      <Text
                        fontWeight="500"
                        fontSize=".95rem"
                        textAlign="center"
                      >
                        {toTitleCase(name)}
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

export default StarshipList;
