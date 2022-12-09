import React, { FC, useEffect, useCallback } from 'react'
import { SimpleGrid, Box, Flex, Text, Center } from '@chakra-ui/react'
import Link from 'next/link'
import Loading from '@components/Loading'
import { toTitleCase } from '@utils/shared'
import usePeopleStore from '@store/people'
import { getPeoplePicture } from '@utils/shared'
import Squircle from '@components/Squircle'

type PeopleListProps = {
  people: string[] | number[]
  [props: string]: any
}

const PeopleList: FC<PeopleListProps> = ({ people, ...props }) => {
  // Load state from people store
  const { filmCharacters, getFilmCharacters, loading } = usePeopleStore((state: any) => ({
    filmCharacters: state.filmCharacters,
    getFilmCharacters: state.getFilmCharacters,
    loading: state.loading,
  }))

  const characterIds = people

  const onItemIdChange = useCallback(
    characterIds => {
      if (characterIds) {
        getFilmCharacters(characterIds)
      }
    },
    [getFilmCharacters],
  )

  useEffect(() => {
    onItemIdChange(characterIds)
  }, [characterIds, onItemIdChange])

  return (
    <Box {...props}>
      {loading.page === 'filmPage' && loading.status ? (
        <Center>
          <Loading size="md" />
        </Center>
      ) : (
        <SimpleGrid minChildWidth="250px" spacing={4}>
          {filmCharacters?.map(({ name, id }) => (
            <Box height="150px" key={`${name}-${id}`}>
              <Flex direction="column" justify="center" align="center">
                <Link href={`/characters/${id}`} passHref>
                  <a>
                    <Squircle url={getPeoplePicture(id)} label={name} />
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
  )
}

export default PeopleList
