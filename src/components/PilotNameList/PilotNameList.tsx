import React, { FC, useState, useEffect } from "react";
import {
  ListItem,
  Link,
  Text,
  useDisclosure,
  UnorderedList
} from "@chakra-ui/react";
import PilotProfile from "@components/PilotProfile";
import usePilotsStore from "@store/pilots";
import Emoji from "@components/Emoji";

type PilotNameProps = {
  pilotsIds: string[];
};

const PilotNameList: FC<PilotNameProps> = ({ pilotsIds }): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [pilotId, setPilotId] = useState(null);

  const { pilots, getPilotNamesById, loading } = usePilotsStore(
    (state: any) => ({
      pilots: state.pilots,
      getPilotNamesById: state.getPilotNamesById,
      loading: state.loading
    })
  );

  useEffect(() => {
    // Call getPilotNamesById to get pilots info
    if (pilotsIds) {
      getPilotNamesById(pilotsIds);
    }
  }, [pilotsIds]);

  const openPilotProfile = (id: number) => {
    setPilotId(id);
    onOpen();
  };

  return (
    <>
      {loading && <Text mt={4}>Loading pilot names ...</Text>}

      {pilots && (
        <UnorderedList mt={6} spacing={2} listStyleType="none" ml="-.1rem">
          {pilots?.map(({ id, name }) => (
            <ListItem key={id}>
              <Emoji label="Pilot emoji" symbol="👩‍🚀" mr=".5rem" />
              <Link
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  openPilotProfile(id);
                }}
              >
                {name}
              </Link>
            </ListItem>
          ))}
        </UnorderedList>
      )}

      {/* {isOpen && (
        <PilotProfile pilotId={pilotId} isOpen={isOpen} onClose={onClose} />
      )} */}
    </>
  );
};

export default PilotNameList;
