import React, { FC, useEffect } from 'react'
import { useRouter } from 'next/router'
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
  StackDivider,
  Center,
} from '@chakra-ui/react'
import { NextPage } from 'next'
import FilmList from '@components/FilmList'
import StarshipList from '@components/StarshipList'
import VehicleList from '@components/VehicleList'
import SpeciesList from '@components/SpeciesList'
import BackButton from '@components/BackButton'
import Loading from '@components/Loading'
import Layout from '@components/Layout'
import PageHead from '@components/PageHead'
import { BASE_URL, ROUTE } from '@utils/constants'
import { getPeoplePicture, toTitleCase } from '@utils/shared'
import usePeopleStore from '@store/people'

type CardContainerProps = {
  children: React.ReactNode
}

const CardContainer: FC<CardContainerProps> = ({ children }) => (
  <Card
    mt={4}
    border="none"
    bg="hsla(208, 31%, 12%, 50%)"
    borderRadius="5px"
    backgroundImage="radial-gradient(circle, hsla(0, 0%, 100%, 10%), hsla(0, 0%, 100%, 10%) 1px, hsla(208, 31%, 12%, 70%) 1px, hsla(208, 31%, 12%, 70%))"
    backgroundSize="48px 48px"
    variant="outline"
    overflow="hidden">
    <CardBody>
      <Stack divider={<StackDivider />} spacing={4} color="white">
        {children}
      </Stack>
    </CardBody>
  </Card>
)

const CharacterDetailsPage: NextPage = (): JSX.Element => {
  const router = useRouter()
  const { id } = router.query

  // Load state from people store
  const { person, getCharacterById, loading } = usePeopleStore((state: any) => ({
    person: state.person,
    getCharacterById: state.getCharacterById,
    loading: state.loading,
  }))

  const filmsIds = person?.films?.map((film: string) => Number(film.split('/').at(-2)))

  const speciesIds = person?.species?.map((species: string) => Number(species.split('/').at(-2)))

  const starshipIds = person?.starships?.map((starship: string) => Number(starship.split('/').at(-2)))

  const vehicleIds = person?.vehicles?.map((vehicle: string) => Number(vehicle.split('/').at(-2)))

  useEffect(() => {
    if (router.isReady) {
      getCharacterById(id)
    }
  }, [getCharacterById, id, router.isReady])

  if (!id) return null

  return (
    <>
      <BackButton />

      <PageHead
        title="Star Wars - Characters"
        description="Characters Page Description"
        url={`${BASE_URL}${ROUTE.PEOPLE}/${id}`}
      />

      <Layout maxWidth="960px">
        <Box mt={12} mb={32}>
          {loading.page === 'characterPage' && loading.status ? (
            <Center mt={8}>
              <Loading size="lg" />
            </Center>
          ) : (
            <>
              <Card
                border="none"
                bg="hsla(208, 31%, 12%, 50%)"
                borderRadius="5px"
                direction={{ base: 'column', sm: 'row' }}
                variant="outline"
                backgroundImage="radial-gradient(circle, hsla(0, 0%, 100%, 10%), hsla(0, 0%, 100%, 10%) 1px, hsla(208, 31%, 12%, 70%) 1px, hsla(208, 31%, 12%, 70%))"
                backgroundSize="48px 48px"
                overflow="hidden">
                <Image
                  objectFit="cover"
                  maxW={{ base: '100%', sm: '200px' }}
                  src={`${getPeoplePicture(Number(id))}`}
                  alt={person?.name}
                />

                <Stack>
                  <CardBody ml={2}>
                    <Heading mt={2} size="lg" color="#ffc107">
                      {person?.name}
                    </Heading>

                    <UnorderedList color="white" mt={4} ml=".1rem" listStyleType="none" spacing={4}>
                      <ListItem>
                        <HStack spacing={2}>
                          <Text as="span" fontWeight="600">
                            Birth Year:
                          </Text>{' '}
                          <Text>{person?.birth_year}</Text>
                        </HStack>

                        <HStack spacing={2}>
                          <Text as="span" fontWeight="600">
                            Height:
                          </Text>{' '}
                          <Text>{person?.height} cm</Text>
                        </HStack>

                        <HStack spacing={2}>
                          <Text as="span" fontWeight="600">
                            Mass:
                          </Text>{' '}
                          <Text>{person?.mass} kg</Text>
                        </HStack>

                        <HStack spacing={2}>
                          <Text as="span" fontWeight="600">
                            Gender:
                          </Text>{' '}
                          <Text>{toTitleCase(person?.gender)}</Text>
                        </HStack>

                        <HStack spacing={2}>
                          <Text as="span" fontWeight="600">
                            Hair Color:
                          </Text>{' '}
                          <Text>{toTitleCase(person?.hair_color)}</Text>
                        </HStack>

                        <HStack spacing={2}>
                          <Text as="span" fontWeight="600">
                            Skin Color:
                          </Text>{' '}
                          {person?.skin_color?.toLowerCase() === 'unknown' ? (
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
                          </Text>{' '}
                          <Text>{toTitleCase(person?.eye_color)}</Text>
                        </HStack>
                      </ListItem>
                    </UnorderedList>
                  </CardBody>
                </Stack>
              </Card>

              {filmsIds?.length > 0 && (
                <CardContainer>
                  <Heading size="sm" textTransform="uppercase">
                    Films
                  </Heading>

                  <Box mt={8} mb={4}>
                    <FilmList filmsIds={filmsIds} />
                  </Box>
                </CardContainer>
              )}

              {starshipIds?.length > 0 && (
                <CardContainer>
                  <Heading size="sm" textTransform="uppercase">
                    Starships
                  </Heading>
                  <Box mt={8} mb={4}>
                    <StarshipList starshipIds={starshipIds} />
                  </Box>
                </CardContainer>
              )}

              {vehicleIds?.length > 0 && (
                <CardContainer>
                  <Heading size="sm" textTransform="uppercase">
                    Vehicles
                  </Heading>
                  <Box mt={8} mb={4}>
                    <VehicleList vehicleIds={vehicleIds} />
                  </Box>
                </CardContainer>
              )}

              {speciesIds?.length > 0 && (
                <CardContainer>
                  <Heading size="sm" textTransform="uppercase">
                    Species
                  </Heading>
                  <Box mt={8} mb={4}>
                    <SpeciesList speciesIds={speciesIds} />
                  </Box>
                </CardContainer>
              )}
            </>
          )}
        </Box>
      </Layout>
    </>
  )
}

export default CharacterDetailsPage
