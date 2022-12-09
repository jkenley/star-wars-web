import React, { FC, useEffect, useCallback } from 'react'
import { SimpleGrid, Box, Flex, Text, Avatar, Center } from '@chakra-ui/react'
import useStarshipStore from '@store/starship'
import { getStarship2Picture } from '@utils/shared'
import Link from 'next/link'
import { toTitleCase } from '@utils/shared'
import Loading from '@components/Loading'
import Squircle from '@components/Squircle'

type StarshipListProps = {
  starshipIds: string[] | number[]
  [props: string]: any
}

const StarshipList: FC<StarshipListProps> = ({ starshipIds, ...props }): JSX.Element => {
  // Load state from starship store
  const { filmStarships, getFilmStarships, loading } = useStarshipStore((state: any) => ({
    filmStarships: state.filmStarships,
    getFilmStarships: state.getFilmStarships,
    loading: state.loading,
  }))

  const onItemIdChange = useCallback(
    starshipIds => {
      if (starshipIds) {
        getFilmStarships(starshipIds)
      }
    },
    [getFilmStarships],
  )

  useEffect(() => {
    onItemIdChange(starshipIds)
  }, [onItemIdChange, starshipIds])

  return (
    <Box {...props}>
      {loading.page === 'filmPage' && loading.status ? (
        <Center>
          <Loading size="md" />
        </Center>
      ) : (
        <SimpleGrid minChildWidth="250px" spacing={4}>
          {filmStarships?.map(({ name, id }) => (
            <Box height="150px" key={`${name}-${id}`}>
              <Flex direction="column" justify="center" align="center">
                <Link href={`/starships/${id}`} passHref>
                  <a>
                    <Squircle url={getStarship2Picture(id)} label={name} />
                  </a>
                </Link>
                <Box mt={3}>
                  <Link href={`/starships/${id}`} passHref>
                    <a>
                      <Text fontWeight="500" fontSize=".95rem" textAlign="center">
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

export default StarshipList
