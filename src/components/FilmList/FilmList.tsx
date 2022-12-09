import React, { FC, useEffect, useCallback } from 'react'
import { Box, Flex, SimpleGrid, Text, Center } from '@chakra-ui/react'
import Link from 'next/link'
import useFilmsStore from '@store/film'
import { getSpeciesPicture, toTitleCase } from '@utils/shared'
import Loading from '@components/Loading'
import Squircle from '@components/Squircle'

type FilmListProps = {
  filmsIds: string[] | number[]
  [props: string]: any
}

const FilmList: FC<FilmListProps> = ({ filmsIds, ...props }): JSX.Element => {
  const { starshipFilms, getStarshipFilms, loading } = useFilmsStore((state: any) => ({
    starshipFilms: state.starshipFilms,
    getStarshipFilms: state.getStarshipFilms,
    loading: state.loading,
  }))

  const onItemIdChange = useCallback(
    filmsIds => {
      if (filmsIds) {
        getStarshipFilms(filmsIds)
      }
    },
    [getStarshipFilms],
  )

  useEffect(() => {
    onItemIdChange(filmsIds)
  }, [filmsIds, onItemIdChange])

  return (
    <Box {...props}>
      {loading.page === 'filmPage' && loading.status ? (
        <Center>
          <Loading size="md" />
        </Center>
      ) : (
        <SimpleGrid minChildWidth="250px" spacing={4}>
          {starshipFilms?.map(({ title, id }) => (
            <Box height="150px" key={`${title}-${id}`}>
              <Flex direction="column" justify="center" align="center">
                <Link href={`/films/${id}`} passHref>
                  <a>
                    <Squircle url={getSpeciesPicture(id)} label={title} />
                  </a>
                </Link>
                <Box mt={3}>
                  <Link href={`/films/${id}`} passHref>
                    <a>
                      <Text fontWeight="500" fontSize=".95rem">
                        {toTitleCase(title)}
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

export default FilmList
