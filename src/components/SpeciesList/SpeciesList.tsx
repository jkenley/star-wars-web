import React, { FC, useEffect, useCallback } from "react";
import { SimpleGrid, Box, Flex, Text, Avatar } from "@chakra-ui/react";
import useSpeciesStore from "@store/species";
import { getSpeciesPicture } from "@utils/shared";
import Link from "next/link";
import { toTitleCase } from "@utils/shared";
import { LeftLoading } from "@components/Loading";

type SpeciesListProps = {
  speciesIds: string[] | number[];
  [props: string]: any;
};

const SpeciesList: FC<SpeciesListProps> = ({ speciesIds, ...props }) => {
  const { filmSpecies, getFilmSpecies, loading } = useSpeciesStore(
    (state: any) => ({
      filmSpecies: state.filmSpecies,
      getFilmSpecies: state.getFilmSpecies,
      loading: state.loading
    })
  );

  const onItemIdChange = useCallback(
    (speciesIds) => {
      if (speciesIds) {
        getFilmSpecies(speciesIds);
      }
    },
    [speciesIds]
  );

  useEffect(() => {
    onItemIdChange(speciesIds);
  }, [speciesIds]);

  return (
    <Box {...props}>
      {loading.page === "filmPage" && loading.status ? (
        <LeftLoading />
      ) : (
        <SimpleGrid minChildWidth="250px" spacing={8}>
          {filmSpecies?.map(({ name, id }) => (
            <Box height="100px" key={id}>
              <Flex direction="column" justify="center" align="center">
                <Link href="#" passHref>
                  <a>
                    <Avatar
                      size="md"
                      title={name}
                      border="2px solid #ffc107"
                      name={name}
                      src={`${getSpeciesPicture(id)}`}
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

export default SpeciesList;
