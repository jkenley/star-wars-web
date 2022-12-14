import React, { useEffect } from 'react'
import { Box, Card, CardBody, Heading, Stack, Text, Center, StackDivider } from '@chakra-ui/react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Layout from '@components/Layout'
import Loading from '@components/Loading'
import { getFilmCover } from '@utils/shared'
import useFilmStore from '@store/film'
import PlanetList from '@components/PlanetList'
import PeopleList from '@components/PeopleList'
import StarshipList from '@components/StarshipList'
import VehicleList from '@components/VehicleList'
import SpeciesList from '@components/SpeciesList'
import BackButton from '@components/BackButton'
import PageHead from '@components/PageHead'
import { BASE_URL, ROUTE } from '@utils/constants'

const FilmDetailsPage: NextPage = (): JSX.Element => {
  const router = useRouter()
  const { id } = router.query

  // Load state from film store
  const { film, getFilmById, loading } = useFilmStore((state: any) => ({
    film: state.film,
    getFilmById: state.getFilmById,
    loading: state.loading,
  }))

  const characterIds = film?.characters?.map((character: string) => Number(character.split('/').at(-2)))

  const planetIds = film?.planets?.map((planet: string) => Number(planet.split('/').at(-2)))

  const starshipIds = film?.starships?.map((starship: string) => Number(starship.split('/').at(-2)))

  const vehicleIds = film?.vehicles?.map((vehicle: string) => Number(vehicle.split('/').at(-2)))

  const speciesIds = film?.species?.map((species: string) => Number(species.split('/').at(-2)))

  useEffect(() => {
    if (router.isReady) {
      getFilmById(id)
    }
  }, [getFilmById, id, router.isReady])

  if (!id) return null

  return (
    <>
      <BackButton />

      <PageHead
        title="Star Wars - Films"
        description="Films Page Description"
        url={`${BASE_URL}${ROUTE.FILMS}/${id}`}
      />

      <Layout maxWidth="960px">
        <Box mt={8} mb={32}>
          <Card
            pt={4}
            px={1}
            pb={10}
            bg="hsla(208, 31%, 12%, 70%)"
            borderRadius="8px"
            backgroundImage="radial-gradient(circle, hsla(0, 0%, 100%, 10%), hsla(0, 0%, 100%, 10%) 1px, hsla(208, 31%, 12%, 70%) 1px, hsla(208, 31%, 12%, 70%))"
            backgroundSize="48px 48px"
            overflow="hidden">
            {loading.page === 'filmPage' && loading.status ? (
              <Center mt={8}>
                <Loading size="lg" />
              </Center>
            ) : (
              <CardBody>
                <Center
                  height="350px"
                  borderRadius="10px"
                  backgroundImage={`linear-gradient(hsl(0, 0%, 0%, 0%), hsl(0, 0%, 0%, 0%), hsla(45, 100%, 51%, 10%)), url(${getFilmCover(
                    Number(id),
                  )})`}
                  backgroundSize="cover"
                  backgroundPosition="50% 50%"
                />
                <Stack divider={<StackDivider borderColor="hsla(0, 0%, 100%, 65%)" />} spacing={6} color="white">
                  <Box mt={8} mb={2}>
                    <Heading size="lg" textTransform="uppercase" color="#ffc107" textAlign="center">
                      {film.title}
                    </Heading>
                  </Box>

                  <Box>
                    <Heading size="sm" textTransform="uppercase">
                      Episode
                    </Heading>

                    <Text pt={2} fontSize="md">
                      {film?.episode_id}
                    </Text>
                  </Box>

                  <Box>
                    <Heading size="sm" textTransform="uppercase">
                      Released date
                    </Heading>

                    <Text pt={2} fontSize="md">
                      {new Date(film?.release_date).toDateString()}
                    </Text>
                  </Box>

                  <Box>
                    <Heading size="sm" textTransform="uppercase">
                      Director
                    </Heading>

                    <Text pt={2} fontSize="md">
                      {film?.director}
                    </Text>
                  </Box>

                  <Box>
                    <Heading size="sm" textTransform="uppercase">
                      Producer(s)
                    </Heading>

                    <Text pt={2} fontSize="md">
                      {film?.producer}
                    </Text>
                  </Box>

                  <Box>
                    <Heading size="sm" textTransform="uppercase">
                      Opening crawl
                    </Heading>

                    <Text pt={2} fontSize="md">
                      {film?.opening_crawl}
                    </Text>
                  </Box>

                  <Box>
                    <Heading size="sm" textTransform="uppercase" mb={12}>
                      Characters
                    </Heading>
                    <Box mb={8}>
                      <PeopleList people={characterIds} />
                    </Box>
                  </Box>

                  <Box>
                    <Heading size="sm" textTransform="uppercase" mb={12}>
                      Planets
                    </Heading>
                    <Box mb={8}>
                      <PlanetList planetIds={planetIds} />
                    </Box>
                  </Box>

                  <Box>
                    <Heading size="sm" textTransform="uppercase" mb={12}>
                      Starships
                    </Heading>
                    <Box mb={8}>
                      <StarshipList starshipIds={starshipIds} />
                    </Box>
                  </Box>

                  <Box>
                    <Heading size="sm" textTransform="uppercase" mb={12}>
                      Vehicles
                    </Heading>
                    <Box mb={8}>
                      <VehicleList vehicleIds={vehicleIds} />
                    </Box>
                  </Box>

                  <Box>
                    <Heading size="sm" textTransform="uppercase" mb={12}>
                      Species
                    </Heading>
                    <Box mb={8}>
                      <SpeciesList speciesIds={speciesIds} />
                    </Box>
                  </Box>
                </Stack>
              </CardBody>
            )}
          </Card>
        </Box>
      </Layout>
    </>
  )
}

export default FilmDetailsPage
