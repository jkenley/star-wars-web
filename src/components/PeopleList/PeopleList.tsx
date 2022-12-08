import React, { FC, useEffect, useCallback } from "react";
import { SimpleGrid, Box, Flex, Text, Avatar, Spinner } from "@chakra-ui/react";
import Link from "next/link";
import { LeftLoading } from "@components/Loading";
import { toTitleCase } from "@utils/shared";
import usePeopleStore from "@store/people";
import { getPeoplePicture } from "@utils/shared";

type PeopleListProps = {
  people: string[] | number[];
  [props: string]: any;
};

const PeopleList: FC<PeopleListProps> = ({ people, ...props }) => {
  const characterIds = people;

  const { filmCharacters, getFilmCharacters, loading } = usePeopleStore(
    (state: any) => ({
      filmCharacters: state.filmCharacters,
      getFilmCharacters: state.getFilmCharacters,
      loading: state.loading
    })
  );

  const onItemIdChange = useCallback(
    (characterIds) => {
      if (characterIds) {
        getFilmCharacters(characterIds);
      }
    },
    [characterIds]
  );

  useEffect(() => {
    onItemIdChange(characterIds);
  }, [characterIds]);

  return (
    <Box {...props}>
      {loading.page === "filmPage" && loading.status ? (
        <LeftLoading />
      ) : (
        <SimpleGrid minChildWidth="250px" spacing={8}>
          {filmCharacters?.map(({ name, id }) => (
            <Box height="100px" key={id}>
              <Flex direction="column" justify="center" align="center">
                <Link href={`/characters/${id}`} passHref>
                  <a>
                    <Avatar
                      size="md"
                      title={name}
                      border="2px solid #ffc107"
                      name={name}
                      src={`${getPeoplePicture(id)}`}
                    />
                  </a>
                </Link>
                <Box mt={3}>
                  <Link href={`/characters/${id}`} passHref>
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

export default PeopleList;
