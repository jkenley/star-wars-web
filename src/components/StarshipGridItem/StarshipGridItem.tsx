import React, { FC } from 'react'
import { Text, Card, Heading, CardBody, Stack, StackDivider, Box, LinkBox, LinkOverlay, Center } from '@chakra-ui/react'
import Link from 'next/link'
import { toTitleCase } from '@utils/shared'
import StarRating from '@components/StarRating'
import type { Starship } from '../../types/starship'

type StarshipGridItemProps = {
  starship: Starship
}

const StarshipGridItem: FC<StarshipGridItemProps> = ({ starship }) => {
  const url = starship.url
  const id = url.split('/').at(-2)

  return (
    <LinkBox>
      <Link href={`/starships/${id}`} passHref>
        <LinkOverlay>
          <Card
            py={4}
            px={2}
            bg="hsla(208, 31%, 12%, 70%)"
            minHeight="440px"
            height="620px"
            borderRadius="8px"
            backgroundImage="radial-gradient(circle, hsla(0, 0%, 100%, 10%), hsla(0, 0%, 100%, 10%) 1px, hsla(208, 31%, 12%, 70%) 1px, hsla(208, 31%, 12%, 70%))"
            backgroundSize="48px 48px"
            overflow="hidden">
            <CardBody>
              <Center
                height="150px"
                borderRadius="10px"
                backgroundImage={`linear-gradient(hsl(0, 0%, 0%, 0%), hsl(0, 0%, 0%, 0%), hsla(45, 100%, 51%, 10%)), url(https://ik.imagekit.io/p4ls2huzsz/belifkutlu/starships/${id}.png)`}
                backgroundRepeat="no-repeat"
                backgroundSize="cover"
              />

              <Stack mt={6} divider={<StackDivider borderColor="hsla(0, 0%, 100%, 65%)" />} spacing={4}>
                <Box>
                  <Heading size="xs" textTransform="uppercase" color="white">
                    Name
                  </Heading>
                  <Text pt="2" fontSize="sm" color="hsla(0, 0%, 100%, 90%)">
                    {toTitleCase(starship?.name)}
                  </Text>
                </Box>
                <Box>
                  <Heading size="xs" textTransform="uppercase" color="white">
                    Model
                  </Heading>
                  <Text pt="2" fontSize="sm" color="hsla(0, 0%, 100%, 90%)">
                    {toTitleCase(starship?.model)}
                  </Text>
                </Box>
                <Box>
                  <Heading size="xs" textTransform="uppercase" color="white">
                    Manufacturer
                  </Heading>
                  <Text pt="2" fontSize="sm" color="hsla(0, 0%, 100%, 90%)">
                    {toTitleCase(starship?.manufacturer)}
                  </Text>
                </Box>
                <Box>
                  <Heading size="xs" textTransform="uppercase" color="white">
                    Starship class
                  </Heading>
                  <Text pt="2" fontSize="sm" color="hsla(0, 0%, 100%, 90%)">
                    {toTitleCase(starship?.starship_class)}
                  </Text>
                </Box>
                <Box>
                  <Heading size="sm" textTransform="uppercase" color="white">
                    Hyperdrive rating
                  </Heading>
                  <StarRating value={starship?.hyperdrive_rating} />
                </Box>
              </Stack>
            </CardBody>
          </Card>
        </LinkOverlay>
      </Link>
    </LinkBox>
  )
}

export default StarshipGridItem
