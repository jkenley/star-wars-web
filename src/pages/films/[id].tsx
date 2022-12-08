import React, { useEffect } from "react";
import {
  Box,
  Card,
  CardBody,
  Heading,
  Stack,
  Text,
  Center,
  StackDivider
} from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Layout from "@components/Layout";
import Loading from "@components/Loading";
import { getFilmCover } from "@utils/shared";
import useFilmStore from "@store/film";
import PlanetList from "@components/PlanetList";
import PeopleList from "@components/PeopleList";
import StarshipList from "@components/StarshipList";
import VehicleList from "@components/VehicleList";
import SpeciesList from "@components/SpeciesList";
import BackButton from "@components/BackButton";

const FilmDetailsPage: NextPage = (): JSX.Element => {
  const router = useRouter();
  const { id } = router.query;

  const { film, getFilmById, loading } = useFilmStore((state: any) => ({
    film: state.film,
    getFilmById: state.getFilmById,
    loading: state.loading
  }));

  const characterIds = film?.characters?.map((character: string) =>
    Number(character.split("/").at(-2))
  );

  const planetIds = film?.planets?.map((planet: string) =>
    Number(planet.split("/").at(-2))
  );

  const starshipIds = film?.starships?.map((starship: string) =>
    Number(starship.split("/").at(-2))
  );

  const vehicleIds = film?.vehicles?.map((vehicle: string) =>
    Number(vehicle.split("/").at(-2))
  );

  const speciesIds = film?.species?.map((species: string) =>
    Number(species.split("/").at(-2))
  );

  useEffect(() => {
    if (router.isReady) {
      getFilmById(id);
    }
  }, [id]);

  if (!id) return null;

  return (
    <>
      <BackButton href="/" />

      <Layout maxWidth="960px">
        <Box mt={8} mb={32}>
          <Card
            py={4}
            px={1}
            bg="hsla(208, 31%, 12%, 70%)"
            borderRadius="8px"
            backgroundImage="radial-gradient(circle, hsla(0, 0%, 100%, 10%), hsla(0, 0%, 100%, 10%) 1px, hsla(208, 31%, 12%, 70%) 1px, hsla(208, 31%, 12%, 70%))"
            backgroundSize="48px 48px"
            overflow="hidden"
          >
            {loading.page === "filmPage" && loading.status ? (
              <Loading />
            ) : (
              <CardBody>
                <Center
                  height="350px"
                  borderRadius="10px"
                  backgroundImage={`linear-gradient(hsl(0, 0%, 0%, 0%), hsl(0, 0%, 0%, 0%), hsla(45, 100%, 51%, 10%)), url(${getFilmCover(
                    Number(id)
                  )})`}
                  backgroundSize="cover"
                  backgroundPosition="50% 50%"
                />
                <Stack
                  divider={
                    <StackDivider borderColor="hsla(0, 0%, 100%, 65%)" />
                  }
                  spacing={6}
                  color="white"
                >
                  <Box mt={8} mb={2}>
                    <Heading
                      size="lg"
                      textTransform="uppercase"
                      color="#ffc107"
                      textAlign="center"
                    >
                      {film.title}
                    </Heading>
                  </Box>

                  <Box>
                    <Heading size="sm" textTransform="uppercase">
                      Episode
                    </Heading>

                    <Text pt="2" fontSize="md">
                      {film?.episode_id}
                    </Text>
                  </Box>

                  <Box>
                    <Heading size="sm" textTransform="uppercase">
                      Released date
                    </Heading>

                    <Text pt="2" fontSize="md">
                      {new Date(film?.release_date).toDateString()}
                    </Text>
                  </Box>

                  <Box>
                    <Heading size="sm" textTransform="uppercase">
                      Director
                    </Heading>

                    <Text pt="2" fontSize="md">
                      {film?.director}
                    </Text>
                  </Box>

                  <Box>
                    <Heading size="sm" textTransform="uppercase">
                      Producer(s)
                    </Heading>

                    <Text pt="2" fontSize="md">
                      {film?.producer}
                    </Text>
                  </Box>

                  <Box>
                    <Heading size="sm" textTransform="uppercase">
                      Opening crawl
                    </Heading>

                    <Text pt="2" fontSize="md">
                      {film?.opening_crawl}
                    </Text>
                  </Box>

                  <Box>
                    <Heading size="sm" textTransform="uppercase" mb={12}>
                      Characters
                    </Heading>
                    <PeopleList people={characterIds} mb={8} />
                  </Box>

                  <Box>
                    <Heading size="sm" textTransform="uppercase" mb={12}>
                      Planets
                    </Heading>
                    <PlanetList planetIds={planetIds} mb={8} />
                  </Box>

                  <Box>
                    <Heading size="sm" textTransform="uppercase" mb={12}>
                      Starships
                    </Heading>
                    <StarshipList starshipIds={starshipIds} mb={8} />
                  </Box>

                  <Box>
                    <Heading size="sm" textTransform="uppercase" mb={12}>
                      Vehicles
                    </Heading>
                    <VehicleList vehicleIds={vehicleIds} mb={8} />
                  </Box>

                  <Box>
                    <Heading size="sm" textTransform="uppercase" mb={12}>
                      Species
                    </Heading>
                    <SpeciesList speciesIds={speciesIds} mb={8} />
                  </Box>
                </Stack>
              </CardBody>
            )}
          </Card>
        </Box>
      </Layout>
    </>
  );
};

export default FilmDetailsPage;
