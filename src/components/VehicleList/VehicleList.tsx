import React, { FC, useEffect, useCallback } from 'react'
import { SimpleGrid, Box, Flex, Text, Center } from '@chakra-ui/react'
import Link from 'next/link'
import Loading from '@components/Loading'
import useVehicleStore from '@store/vehicle'
import { getVehiclePicture } from '@utils/shared'
import { toTitleCase } from '@utils/shared'
import Squircle from '@components/Squircle'

type VehicleListProps = {
  vehicleIds: string[] | number[]
  [props: string]: any
}

const VehicleList: FC<VehicleListProps> = ({ vehicleIds, ...props }): JSX.Element => {
  // Load state from vehicle store
  const { filmVehicles, getFilmVehicles, loading } = useVehicleStore((state: any) => ({
    filmVehicles: state.filmVehicles,
    getFilmVehicles: state.getFilmVehicles,
    loading: state.loading,
  }))

  const onItemIdChange = useCallback(
    vehicleIds => {
      if (vehicleIds) {
        getFilmVehicles(vehicleIds)
      }
    },
    [getFilmVehicles],
  )

  useEffect(() => {
    onItemIdChange(vehicleIds)
  }, [onItemIdChange, vehicleIds])

  return (
    <Box {...props}>
      {loading.page === 'filmPage' && loading.status ? (
        <Center>
          <Loading size="md" />
        </Center>
      ) : (
        <SimpleGrid minChildWidth="250px" spacing={4}>
          {filmVehicles?.map(({ name, id }) => (
            <Box height="150px" key={`${name}-${id}`}>
              <Flex direction="column" justify="center" align="center">
                <Link href="#" passHref>
                  <a>
                    <Squircle url={getVehiclePicture(id)} label={name} />
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

export default VehicleList
