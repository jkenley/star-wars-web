import React, { FC, useEffect, useCallback } from 'react'
import { SimpleGrid, Box, Flex, Text, Center } from '@chakra-ui/react'
import Link from 'next/link'
import Loading from '@components/Loading'
import Squircle from '@components/Squircle'
import { toTitleCase, getPlanetPicture } from '@utils/shared'
import usePlanetStore from '@store/planet'

type PlanetListProps = {
  planetIds: string[] | number[]
  [props: string]: any
}

const PlanetList: FC<PlanetListProps> = ({ planetIds, ...props }) => {
  // Load state from planet store
  const { filmPlanets, getFilmPlanets, loading } = usePlanetStore((state: any) => ({
    filmPlanets: state.filmPlanets,
    getFilmPlanets: state.getFilmPlanets,
    loading: state.loading,
  }))

  const onItemIdChange = useCallback(
    planetIds => {
      if (planetIds) {
        getFilmPlanets(planetIds)
      }
    },
    [getFilmPlanets],
  )

  useEffect(() => {
    onItemIdChange(planetIds)
  }, [onItemIdChange, planetIds])

  return (
    <Box {...props}>
      {loading.page === 'filmPage' && loading.status ? (
        <Center>
          <Loading size="md" />
        </Center>
      ) : (
        <SimpleGrid minChildWidth="250px" spacing={4}>
          {filmPlanets?.map(({ name, id }) => (
            <Box height="150px" key={`${name}-${id}`}>
              <Flex direction="column" justify="center" align="center">
                <Link href="#" passHref>
                  <a>
                    <Squircle url={getPlanetPicture(id)} label={name} />
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
  )
}

export default PlanetList
