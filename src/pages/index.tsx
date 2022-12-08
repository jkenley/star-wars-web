import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import { Heading, Center, Box, Text } from "@chakra-ui/react";
import { matchSorter } from "match-sorter";
import Layout from "@components/Layout/Layout";
import Logo from "@components/Logo";
import SearchBox from "@components/Search";
import StarshipList from "@components/StarshipGrid";
import Loading from "@components/Loading";
import useStarshipsStore from "@store/starship";
import Emoji from "@components/Emoji";

const IndexPage: NextPage = (): JSX.Element => {
  const [value, setValue] = useState<string>("");

  const handleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setValue(event.target.value);
  };

  const { count, starships, getStarships, loading } = useStarshipsStore(
    (state: any) => ({
      count: state.count,
      starships: state.starships,
      getStarships: state.getStarships,
      loading: state.loading
    })
  );

  useEffect(() => {
    // call API only once when count == 0
    if (count === 0) {
      getStarships();
    }
  }, [count]);

  let starshipResults = [];

  if (value.length === 0) {
    starshipResults = starships;
  } else {
    starshipResults = matchSorter(starships, value, {
      keys: ["name", "model", "max_atmosphering_speed", "starship_class"],
      threshold: matchSorter.rankings.CONTAINS,
      keepDiacritics: true
    });
  }

  return (
    <Layout maxWidth="1200px">
      <Center
        as="header"
        marginTop={16}
        aria-label=""
        aria-describedby=""
        aria-details=""
      >
        <Heading>
          <Logo />
        </Heading>
      </Center>
      <Box as="section" aria-label="" aria-describedby="" aria-details="">
        <SearchBox value={value} onChange={handleChange} />
      </Box>
      <Box as="section" aria-label="" aria-describedby="" aria-details="">
        {loading.page === "homePage" && loading.status && <Loading />}

        {starshipResults.length > 0 && (
          <StarshipList starships={starshipResults} />
        )}

        {starshipResults.length === 0 && !loading.status && (
          <Center mt={12}>
            <Text
              color="white"
              textAlign="center"
              fontSize="lg"
              fontWeight="600"
            >
              No results found
              <Emoji label="Starship" symbol="🛸" ml={2} />
            </Text>
          </Center>
        )}
      </Box>
      <Box mb={16} />
    </Layout>
  );
};

export default IndexPage;
