import React, { useEffect } from "react";
import { useRouter } from "next/router";
import usePeopleStore from "@store/people";
import Loading from "@components/Loading";
import Layout from "@components/Layout";
import {
  Box,
  Text,
  Card,
  CardBody,
  Heading,
  HStack,
  ListItem,
  Stack,
  UnorderedList,
  Image,
  StackDivider
} from "@chakra-ui/react";
import { NextPage } from "next";
import { getPeoplePicture, toTitleCase } from "@utils/shared";
import FilmList from "@components/FilmList";
import StarshipList from "@components/StarshipList";
import VehicleList from "@components/VehicleList";
import SpeciesList from "@components/SpeciesList";
import BackButton from "@components/BackButton";

const CharacterDetailsPage: NextPage = (): JSX.Element => {
  const router = useRouter();
  const { id } = router.query;

  const { person, getCharacterById, loading } = usePeopleStore(
    (state: any) => ({
      person: state.person,
      getCharacterById: state.getCharacterById,
      loading: state.loading
    })
  );

  const filmsIds = person?.films?.map((film: string) =>
    Number(film.split("/").at(-2))
  );

  const speciesIds = person?.species?.map((species: string) =>
    Number(species.split("/").at(-2))
  );

  const starshipIds = person?.starships?.map((starship: string) =>
    Number(starship.split("/").at(-2))
  );

  const vehicleIds = person?.vehicles?.map((vehicle: string) =>
    Number(vehicle.split("/").at(-2))
  );

  useEffect(() => {
    if (router.isReady) {
      getCharacterById(id);
    }
  }, [id]);

  if (!id) return null;

  // const { data, error } = useSWR(
  //   id ? `https://swapi.dev/api/people/${id}` : null,
  //   fetcher
  // );

  // if (error) return <div>Failed to load</div>;
  // if (!data) return <div>Loading...</div>;

  return (
    <>
      <BackButton href="/" />
      <Layout maxWidth="960px">
        <Box mt={12} mb={32}>
          {loading.page === "characterPage" && loading.status ? (
            <Loading />
          ) : (
            <>
              <Card
                border="none"
                bg="hsla(208, 31%, 12%, 50%)"
                borderRadius="5px"
                direction={{ base: "column", sm: "row" }}
                variant="outline"
                backgroundImage="radial-gradient(circle, hsla(0, 0%, 100%, 10%), hsla(0, 0%, 100%, 10%) 1px, hsla(208, 31%, 12%, 70%) 1px, hsla(208, 31%, 12%, 70%))"
                backgroundSize="48px 48px"
                overflow="hidden"
              >
                <Image
                  objectFit="cover"
                  maxW={{ base: "100%", sm: "200px" }}
                  src={`${getPeoplePicture(Number(id))}`}
                  alt={person?.name}
                />

                <Stack>
                  <CardBody ml={2}>
                    <Heading mt={2} size="lg" color="#ffc107">
                      {person?.name}
                    </Heading>

                    <UnorderedList
                      color="white"
                      mt={4}
                      ml=".1rem"
                      listStyleType="none"
                      spacing={4}
                    >
                      <ListItem>
                        <HStack spacing={2}>
                          <Text as="span" fontWeight="600">
                            Birth Year:
                          </Text>{" "}
                          <Text>{person?.birth_year}</Text>
                        </HStack>

                        <HStack spacing={2}>
                          <Text as="span" fontWeight="600">
                            Height:
                          </Text>{" "}
                          <Text>{person?.height} cm</Text>
                        </HStack>

                        <HStack spacing={2}>
                          <Text as="span" fontWeight="600">
                            Mass:
                          </Text>{" "}
                          <Text>{person?.mass} kg</Text>
                        </HStack>

                        <HStack spacing={2}>
                          <Text as="span" fontWeight="600">
                            Gender:
                          </Text>{" "}
                          <Text>{toTitleCase(person?.gender)}</Text>
                        </HStack>

                        <HStack spacing={2}>
                          <Text as="span" fontWeight="600">
                            Hair Color:
                          </Text>{" "}
                          <Text>{toTitleCase(person?.hair_color)}</Text>
                        </HStack>

                        <HStack spacing={2}>
                          <Text as="span" fontWeight="600">
                            Skin Color:
                          </Text>{" "}
                          {person?.skin_color?.toLowerCase() === "unknown" ? (
                            <Text as="span" display="inline-block" mt="2">
                              &#8212;
                            </Text>
                          ) : (
                            <Text>{toTitleCase(person?.skin_color)}</Text>
                          )}
                        </HStack>

                        <HStack spacing={2}>
                          <Text as="span" fontWeight="600">
                            Eye Color:
                          </Text>{" "}
                          <Text>{toTitleCase(person?.eye_color)}</Text>
                        </HStack>
                      </ListItem>
                    </UnorderedList>
                  </CardBody>
                </Stack>
              </Card>

              {filmsIds?.length > 0 && (
                <>
                  <Box as="br" />
                  <Card
                    border="none"
                    bg="hsla(208, 31%, 12%, 50%)"
                    borderRadius="5px"
                    backgroundImage="radial-gradient(circle, hsla(0, 0%, 100%, 10%), hsla(0, 0%, 100%, 10%) 1px, hsla(208, 31%, 12%, 70%) 1px, hsla(208, 31%, 12%, 70%))"
                    backgroundSize="48px 48px"
                    variant="outline"
                    overflow="hidden"
                  >
                    <CardBody>
                      <Stack
                        divider={<StackDivider />}
                        spacing={4}
                        color="white"
                      >
                        <Heading size="sm" textTransform="uppercase">
                          Films
                        </Heading>

                        <FilmList filmsIds={filmsIds} mt={8} mb={4} />
                      </Stack>
                    </CardBody>
                  </Card>
                </>
              )}

              {starshipIds?.length > 0 && (
                <>
                  <Box as="br" />
                  <Card
                    border="none"
                    bg="hsla(208, 31%, 12%, 50%)"
                    borderRadius="5px"
                    backgroundImage="radial-gradient(circle, hsla(0, 0%, 100%, 10%), hsla(0, 0%, 100%, 10%) 1px, hsla(208, 31%, 12%, 70%) 1px, hsla(208, 31%, 12%, 70%))"
                    backgroundSize="48px 48px"
                    variant="outline"
                    overflow="hidden"
                  >
                    <CardBody>
                      <Stack
                        divider={<StackDivider />}
                        spacing={4}
                        color="white"
                      >
                        <Heading size="sm" textTransform="uppercase">
                          Starships
                        </Heading>
                        <StarshipList starshipIds={starshipIds} mt={8} mb={4} />
                      </Stack>
                    </CardBody>
                  </Card>
                </>
              )}

              {vehicleIds?.length > 0 && (
                <>
                  <Box as="br" />
                  <Card
                    border="none"
                    bg="hsla(208, 31%, 12%, 50%)"
                    borderRadius="5px"
                    backgroundImage="radial-gradient(circle, hsla(0, 0%, 100%, 10%), hsla(0, 0%, 100%, 10%) 1px, hsla(208, 31%, 12%, 70%) 1px, hsla(208, 31%, 12%, 70%))"
                    backgroundSize="48px 48px"
                    variant="outline"
                    overflow="hidden"
                  >
                    <CardBody>
                      <Stack
                        divider={<StackDivider />}
                        spacing={4}
                        color="white"
                      >
                        <Heading size="sm" textTransform="uppercase">
                          Vehicles
                        </Heading>

                        <VehicleList vehicleIds={vehicleIds} mt={8} mb={4} />
                      </Stack>
                    </CardBody>
                  </Card>
                </>
              )}

              {speciesIds?.length > 0 && (
                <>
                  <Box as="br" />
                  <Card
                    border="none"
                    bg="hsla(208, 31%, 12%, 50%)"
                    borderRadius="5px"
                    backgroundImage="radial-gradient(circle, hsla(0, 0%, 100%, 10%), hsla(0, 0%, 100%, 10%) 1px, hsla(208, 31%, 12%, 70%) 1px, hsla(208, 31%, 12%, 70%))"
                    backgroundSize="48px 48px"
                    variant="outline"
                    overflow="hidden"
                  >
                    <CardBody>
                      <Stack
                        divider={<StackDivider />}
                        spacing={4}
                        color="white"
                      >
                        <Heading size="sm" textTransform="uppercase">
                          Species
                        </Heading>
                        <SpeciesList speciesIds={speciesIds} mt={8} mb={4} />
                      </Stack>
                    </CardBody>
                  </Card>
                </>
              )}
            </>
          )}
        </Box>
      </Layout>
    </>
  );
};

export default CharacterDetailsPage;
