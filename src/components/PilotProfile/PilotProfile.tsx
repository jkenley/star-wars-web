import React, { FC, useEffect } from "react";
import {
  Text,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Card,
  CardBody,
  Heading,
  Stack,
  ListItem,
  UnorderedList,
  HStack,
  SimpleGrid,
  Box,
  StackDivider
} from "@chakra-ui/react";
import usePilotsStore from "@store/pilots";
import Loading from "@components/Loading";
import { PilotFilmCard } from "@components/FilmCard";
import VehicleCard from "@components/VehicleCard";
import StarshipCard from "@components/StarshipCard";

type PilotProfileProps = {
  pilotId: number;
  isOpen: boolean;
  onClose: () => void;
};

const PilotProfile: FC<PilotProfileProps> = ({ pilotId, isOpen, onClose }) => {
  const { pilot, getOnePilot, loading } = usePilotsStore((state: any) => ({
    pilot: state.pilot,
    getOnePilot: state.getOnePilot,
    loading: state.loading
  }));

  useEffect(() => {
    // Call getOnePilot to get one pilot info
    if (pilotId) {
      getOnePilot(pilotId);
    }
  }, [pilotId]);

  const filmsIds = pilot?.films?.map((film: string) => {
    const id = film.match(/\/([0-9]*)\/$/);
    return id && Number(id[1]);
  });

  const vehicleIds = pilot?.vehicles?.map((vehicle: string) => {
    const id = vehicle.match(/\/([0-9]*)\/$/);
    return id && Number(id[1]);
  });

  const starshipIds = pilot?.starships?.map((starship: string) => {
    const id = starship.match(/\/([0-9]*)\/$/);
    return id && Number(id[1]);
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl">
      <ModalOverlay bg="hsl(45, 100%, 51%, 30%)" backdropFilter="blur(3px)" />

      <ModalContent bg="#0E141B">
        <ModalHeader>Pilot</ModalHeader>
        <ModalCloseButton />

        <ModalBody pt={4} pb={6} px={6}>
          {loading ? (
            <Loading />
          ) : (
            <>
              <Card
                border="none"
                bg="hsla(208, 31%, 12%, 50%)"
                borderRadius="5px"
                direction={{ base: "column", sm: "row" }}
                variant="outline"
                backgroundImage="radial-gradient(circle, hsla(0, 0%, 100%, 10%), hsla(0, 0%, 100%, 10%) 1px, hsla(208, 31%, 12%, 70%) 1px, hsla(208, 31%, 12%, 70%))"
                backgroundSize="48px 48px"
                overflow="hidden"
              >
                <Image
                  objectFit="cover"
                  maxW={{ base: "100%", sm: "200px" }}
                  src={`https://starwars-visualguide.com/assets/img/characters/${pilotId}.jpg`}
                  alt=""
                />

                <Stack>
                  <CardBody ml={2}>
                    <Heading mt={2} size="lg" color="#ffc107">
                      {pilot?.name}
                    </Heading>

                    <UnorderedList
                      color="white"
                      mt={4}
                      ml=".1rem"
                      listStyleType="none"
                      spacing={4}
                    >
                      <ListItem>
                        <HStack spacing={2}>
                          <Text as="span" fontWeight="600">
                            Birth Year:
                          </Text>{" "}
                          <Text>{pilot?.birth_year}</Text>
                        </HStack>

                        <HStack spacing={2}>
                          <Text as="span" fontWeight="600">
                            Height:
                          </Text>{" "}
                          <Text>{pilot?.height} cm</Text>
                        </HStack>

                        <HStack spacing={2}>
                          <Text as="span" fontWeight="600">
                            Mass:
                          </Text>{" "}
                          <Text>{pilot?.mass} kg</Text>
                        </HStack>

                        <HStack spacing={2}>
                          <Text as="span" fontWeight="600">
                            Gender:
                          </Text>{" "}
                          <Text>{pilot?.gender}</Text>
                        </HStack>

                        <HStack spacing={2}>
                          <Text as="span" fontWeight="600">
                            Hair Color:
                          </Text>{" "}
                          <Text>{pilot?.hair_color}</Text>
                        </HStack>

                        <HStack spacing={2}>
                          <Text as="span" fontWeight="600">
                            Skin Color:
                          </Text>{" "}
                          <Text>{pilot?.skin_color}</Text>
                        </HStack>

                        <HStack spacing={2}>
                          <Text as="span" fontWeight="600">
                            Eye Color:
                          </Text>{" "}
                          <Text>{pilot?.eye_color}</Text>
                        </HStack>
                      </ListItem>
                    </UnorderedList>
                  </CardBody>
                </Stack>
              </Card>

              <br />

              <Card
                border="none"
                bg="hsla(208, 31%, 12%, 50%)"
                borderRadius="5px"
                direction={{ base: "column", sm: "row" }}
                variant="outline"
                backgroundImage="radial-gradient(circle, hsla(0, 0%, 100%, 10%), hsla(0, 0%, 100%, 10%) 1px, hsla(208, 31%, 12%, 70%) 1px, hsla(208, 31%, 12%, 70%))"
                backgroundSize="48px 48px"
                overflow="hidden"
              >
                <CardBody>
                  <SimpleGrid columns={3} spacingX="20px" spacingY="20px">
                    {filmsIds && (
                      <Stack
                        divider={<StackDivider />}
                        spacing={4}
                        color="white"
                      >
                        <Box>
                          <Heading size="xs" textTransform="uppercase">
                            Films
                          </Heading>
                        </Box>

                        <PilotFilmCard
                          component="pilotFilm"
                          filmsIds={filmsIds}
                        />
                      </Stack>
                    )}
                    {vehicleIds && (
                      <Stack
                        divider={<StackDivider />}
                        spacing={4}
                        color="white"
                      >
                        <Box>
                          <Heading size="xs" textTransform="uppercase">
                            Vehicles
                          </Heading>
                        </Box>

                        <VehicleCard vehicleIds={vehicleIds} />
                      </Stack>
                    )}
                    {starshipIds && (
                      <Stack
                        divider={<StackDivider />}
                        spacing={4}
                        color="white"
                      >
                        <Box>
                          <Heading size="xs" textTransform="uppercase">
                            Starships
                          </Heading>
                        </Box>

                        <StarshipCard starshipIds={starshipIds} />
                      </Stack>
                    )}
                  </SimpleGrid>
                </CardBody>
              </Card>
            </>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PilotProfile;
