import React, { FC, useEffect, useCallback } from 'react'
import { SimpleGrid, Box, Flex, Text, Center } from '@chakra-ui/react'
import Link from 'next/link'
import Loading from '@components/Loading'
import Squircle from '@components/Squircle'
import useSpeciesStore from '@store/species'
import { getSpeciesPicture, toTitleCase } from '@utils/shared'

type SpeciesListProps = {
  speciesIds: string[] | number[]
  [props: string]: any
}

const SpeciesList: FC<SpeciesListProps> = ({ speciesIds, ...props }): JSX.Element => {
  // Load state from species store
  const { filmSpecies, getFilmSpecies, loading } = useSpeciesStore((state: any) => ({
    filmSpecies: state.filmSpecies,
    getFilmSpecies: state.getFilmSpecies,
    loading: state.loading,
  }))

  const onItemIdChange = useCallback(
    speciesIds => {
      if (speciesIds) {
        getFilmSpecies(speciesIds)
      }
    },
    [getFilmSpecies],
  )

  useEffect(() => {
    onItemIdChange(speciesIds)
  }, [onItemIdChange, speciesIds])

  return (
    <Box {...props}>
      {loading.page === 'filmPage' && loading.status ? (
        <Center>
          <Loading size="md" />
        </Center>
      ) : (
        <SimpleGrid minChildWidth="250px" spacing={4}>
          {filmSpecies?.map(({ name, id }) => (
            <Box height="150px" key={`${name}-${id}`}>
              <Flex direction="column" justify="center" align="center">
                <Link href="#" passHref>
                  <a>
                    <Squircle url={getSpeciesPicture(id)} label={name} />
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

export default SpeciesList
