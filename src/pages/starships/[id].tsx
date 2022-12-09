import React, { useEffect } from 'react'
import { Box, Card, CardBody, Heading, Stack, Text, Center, StackDivider } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { NextPage } from 'next'
import useStarshipsStore from '@store/starship'
import Layout from '@components/Layout'
import StarRating from '@components/StarRating'
import BackButton from '@components/BackButton'
import Loading from '@components/Loading'
import { getStarshipPicture, toTitleCase } from '@utils/shared'
import FilmList from '@components/FilmList'
import PeopleList from '@components/PeopleList'
import PageHead from '@components/PageHead'
import { BASE_URL, ROUTE } from '@utils/constants'

const StarshipPage: NextPage = (): JSX.Element => {
  const router = useRouter()
  const { id } = router.query

  // Load state from starship store
  const { starship, getStarshipById, loading } = useStarshipsStore((state: any) => ({
    starship: state.starship,
    getStarshipById: state.getStarshipById,
    loading: state.loading,
  }))

  const pilotsIds = starship?.pilots?.map((pilot: string) => Number(pilot.split('/').at(-2)))

  const filmsIds = starship?.films?.map((film: string) => Number(film.split('/').at(-2)))

  useEffect(() => {
    if (router.isReady) {
      getStarshipById(id)
    }
  }, [getStarshipById, id, router.isReady])

  if (!id) return null

  return (
    <>
      <BackButton />

      <PageHead
        title="Star Wars - Starships"
        description="Starships Page Description"
        url={`${BASE_URL}${ROUTE.STARSHIPS}/${id}`}
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
            {loading.page === 'starshipPage' && loading.status ? (
              <Center mt={8}>
                <Loading size="lg" />
              </Center>
            ) : (
              <CardBody>
                <Center
                  height="350px"
                  borderRadius="10px"
                  backgroundImage={`linear-gradient(hsl(0, 0%, 0%, 0%), hsl(0, 0%, 0%, 0%), hsla(45, 100%, 51%, 10%)), url(${getStarshipPicture(
                    Number(id),
                  )})`}
                />
                <Stack divider={<StackDivider borderColor="hsla(0, 0%, 100%, 65%)" />} spacing={6} color="white">
                  <Box mt={8} mb={2}>
                    <Heading size="lg" textTransform="uppercase" color="#ffc107" textAlign="center">
                      {starship.name}
                    </Heading>
                  </Box>

                  <Box>
                    <Heading size="sm" textTransform="uppercase">
                      Model
                    </Heading>

                    <Text pt="2" fontSize="md">
                      {starship?.model}
                    </Text>
                  </Box>

                  <Box>
                    <Heading size="sm" textTransform="uppercase">
                      Manufacturer
                    </Heading>
                    <Text pt="2" fontSize="md">
                      {starship?.manufacturer}
                    </Text>
                  </Box>

                  <Box>
                    <Heading size="sm" textTransform="uppercase">
                      Hyperdrive rating
                    </Heading>

                    <StarRating value={starship.hyperdrive_rating} />

                    <Text pt="2" fontSize="md">
                      {starship?.hyperdrive_rating}
                    </Text>
                  </Box>

                  <Box>
                    <Heading size="sm" textTransform="uppercase">
                      Cost in credits
                    </Heading>

                    <Text pt="2" fontSize="md">
                      {starship?.cost_in_credits} credits
                    </Text>
                  </Box>

                  <Box>
                    <Heading size="sm" textTransform="uppercase">
                      Length
                    </Heading>
                    <Text pt="2" fontSize="md">
                      {starship?.length}
                    </Text>
                  </Box>

                  <Box>
                    <Heading size="sm" textTransform="uppercase">
                      Max Atmosphering Speed
                    </Heading>

                    {starship?.max_atmosphering_speed?.toLowerCase() === 'n/a' ? (
                      <Text as="span" display="inline-block" mt="2">
                        &#8212;
                      </Text>
                    ) : (
                      <Text pt="2" fontSize="md">
                        {starship?.max_atmosphering_speed} km/h
                      </Text>
                    )}
                  </Box>

                  <Box>
                    <Heading size="sm" textTransform="uppercase">
                      Mimimum crew
                    </Heading>

                    <Text pt="2" fontSize="md">
                      {starship?.crew}
                    </Text>
                  </Box>

                  <Box>
                    <Heading size="sm" textTransform="uppercase">
                      Number of passengers
                    </Heading>

                    {starship?.passengers?.toLowerCase() === 'n/a' ? (
                      <Text as="span" display="inline-block" mt="2">
                        &#8212;
                      </Text>
                    ) : (
                      <Text pt="2" fontSize="md">
                        {starship?.passengers}
                      </Text>
                    )}
                  </Box>

                  <Box>
                    <Heading size="sm" textTransform="uppercase">
                      Cargo Capacity
                    </Heading>

                    <Text pt="2" fontSize="md">
                      {starship?.cargo_capacity} metric tons
                    </Text>
                  </Box>

                  <Box>
                    <Heading size="sm" textTransform="uppercase">
                      Consumables
                    </Heading>

                    <Text pt="2" fontSize="md">
                      {starship?.consumables}
                    </Text>
                  </Box>

                  <Box>
                    <Heading size="sm" textTransform="uppercase">
                      MGLT
                    </Heading>
                    <Text pt="2" fontSize="md">
                      {starship?.MGLT}
                    </Text>
                  </Box>

                  <Box>
                    <Heading size="sm" textTransform="uppercase">
                      Starship Class
                    </Heading>

                    <Text pt="2" fontSize="md">
                      {toTitleCase(starship?.starship_class)}
                    </Text>
                  </Box>

                  <Box>
                    <Heading size="sm" textTransform="uppercase">
                      Pilots
                    </Heading>

                    {pilotsIds?.length === 0 ? (
                      <Text as="span" display="inline-block" mt="2">
                        &#8212;
                      </Text>
                    ) : (
                      <PeopleList people={pilotsIds} mt={12} mb={8} />
                    )}
                  </Box>

                  <Box>
                    <Heading size="sm" textTransform="uppercase">
                      Films
                    </Heading>

                    {filmsIds?.length === 0 ? (
                      <Text as="span" display="inline-block" mt="2">
                        &#8212;
                      </Text>
                    ) : (
                      <FilmList filmsIds={filmsIds} mt={12} />
                    )}
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

export default StarshipPage
