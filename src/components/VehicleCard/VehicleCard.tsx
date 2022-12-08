import React, { FC, useEffect } from "react";
import {
  Text,
  Box,
  Heading,
  Stack,
  StackDivider,
  Spinner,
  ListItem,
  UnorderedList
} from "@chakra-ui/react";
import Emoji from "@components/Emoji";
import useVechiclesStore from "@store/vehicles";

type FilmCardProps = {
  vehicleIds: number[];
  [props: string]: any;
};

const VehicleCard: FC<FilmCardProps> = ({
  vehicleIds,
  ...props
}): JSX.Element => {
  const { vehicles, getVehicleNameById, loading } = useVechiclesStore(
    (state: any) => ({
      vehicles: state.vehicles,
      getVehicleNameById: state.getVehicleNameById,
      loading: state.loading
    })
  );

  useEffect(() => {
    // Call getVehicleNameById to get pilots info
    if (vehicleIds) {
      getVehicleNameById(vehicleIds);
    }
  }, [vehicleIds]);

  return (
    <Box {...props}>
      {loading ? (
        <Spinner
          emptyColor="hsla(208, 31%, 12%, 100%)"
          color="#ffc107"
          thickness="3px"
          speed="0.65s"
          size="sm"
        />
      ) : (
        <>
          {vehicles?.length === 0 ? (
            <Text>
              <Emoji label="Vehicle emoji" symbol="🚘" mr=".5rem" />
              No vehicles
            </Text>
          ) : (
            <UnorderedList listStyleType="none" ml="-0.1rem" spacing={1}>
              {vehicles?.map((vehicle: any) => (
                <ListItem key={vehicle.id}>
                  <Text>
                    <Text as="span" mr={2} role="img" aria-label="sheep">
                      🚘
                    </Text>
                    {vehicle.name}
                  </Text>
                </ListItem>
              ))}
            </UnorderedList>
          )}
        </>
      )}
    </Box>
  );
};

export default VehicleCard;
