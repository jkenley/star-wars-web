import React, { FC, useEffect, useCallback } from "react";
import { SimpleGrid, Box, Flex, Text, Avatar } from "@chakra-ui/react";
import usePlanetStore from "@store/planet";
import { getPlanetPicture } from "@utils/shared";
import Link from "next/link";
import { toTitleCase } from "@utils/shared";
import { LeftLoading } from "@components/Loading";

type PlanetListProps = {
  planetIds: string[] | number[];
  [props: string]: any;
};

const PlanetList: FC<PlanetListProps> = ({ planetIds, ...props }) => {
  const { filmPlanets, getFilmPlanets, loading } = usePlanetStore(
    (state: any) => ({
      filmPlanets: state.filmPlanets,
      getFilmPlanets: state.getFilmPlanets,
      loading: state.loading
    })
  );

  const onItemIdChange = useCallback(
    (planetIds) => {
      if (planetIds) {
        getFilmPlanets(planetIds);
      }
    },
    [planetIds]
  );

  useEffect(() => {
    onItemIdChange(planetIds);
  }, [planetIds]);

  return (
    <Box {...props}>
      {loading.page === "filmPage" && loading.status ? (
        <LeftLoading />
      ) : (
        <SimpleGrid minChildWidth="250px" spacing={8}>
          {filmPlanets?.map(({ name, id }) => (
            <Box height="100px" key={id}>
              <Flex direction="column" justify="center" align="center">
                <Link href="#" passHref>
                  <a>
                    <Avatar
                      size="md"
                      title={name}
                      border="2px solid #ffc107"
                      name={name}
                      src={`${getPlanetPicture(id)}`}
                    />
                  </a>
                </Link>
                <Box mt={3}>
                  <Link href="#" passHref>
                    <a>
                      <Text fontWeight="500" fontSize=".95rem">
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

export default PlanetList;
