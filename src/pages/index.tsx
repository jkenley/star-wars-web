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
import PageHead from "@components/PageHead";
import { BASE_URL, ROUTE } from "@utils/constants";

const IndexPage: NextPage = (): JSX.Element => {
  const [value, setValue] = useState<string>("");
  const [starshipResults, setStarshipResults] = useState([]);

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

  useEffect(() => {
    if (value.length > 0) {
      setStarshipResults(
        matchSorter(starships, value, {
          keys: ["name", "model"],
          threshold: matchSorter.rankings.CONTAINS,
          keepDiacritics: true
        })
      );
    } else {
      setStarshipResults(starships);
    }
  }, [value, starships]);

  return (
    <>
      <PageHead
        title="Welcome to Star Wars Web App"
        description="Star Wars Home Page Description"
        url={`${BASE_URL}${ROUTE.HOME}`}
      />

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

          {value.length > 0 && (
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
    </>
  );
};

export default IndexPage;
