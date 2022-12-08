import React, { FC, useEffect, useCallback } from "react";
import { SimpleGrid, Box, Flex, Text, Avatar } from "@chakra-ui/react";
import Link from "next/link";
import { LeftLoading } from "@components/Loading";
import useVehicleStore from "@store/vehicle";
import { getVehiclePicture } from "@utils/shared";
import { toTitleCase } from "@utils/shared";

type VehicleListProps = {
  vehicleIds: string[] | number[];
  [props: string]: any;
};

const VehicleList: FC<VehicleListProps> = ({
  vehicleIds,
  ...props
}): JSX.Element => {
  const { filmVehicles, getFilmVehicles, loading } = useVehicleStore(
    (state: any) => ({
      filmVehicles: state.filmVehicles,
      getFilmVehicles: state.getFilmVehicles,
      loading: state.loading
    })
  );

  const onItemIdChange = useCallback(
    (vehicleIds) => {
      if (vehicleIds) {
        getFilmVehicles(vehicleIds);
      }
    },
    [vehicleIds]
  );

  useEffect(() => {
    onItemIdChange(vehicleIds);
  }, [vehicleIds]);

  return (
    <Box {...props}>
      {loading.page === "filmPage" && loading.status ? (
        <LeftLoading />
      ) : (
        <SimpleGrid minChildWidth="250px" spacing={8}>
          {filmVehicles?.map(({ name, id }) => (
            <Box height="100px" key={id}>
              <Flex direction="column" justify="center" align="center">
                <Link href="#" passHref>
                  <a>
                    <Avatar
                      size="md"
                      title={name}
                      border="2px solid #ffc107"
                      name={name}
                      src={`${getVehiclePicture(id)}`}
                    />
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
  );
};

export default VehicleList;
