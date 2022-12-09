import React from 'react'
import { Box, Center, Heading, Text } from '@chakra-ui/react'
import Layout from '@components/Layout'
import Link from 'next/link'
import { ROUTE } from '@utils/constants'
import Emoji from '@components/Emoji'

const Custom404 = (): JSX.Element => {
  return (
    <Layout maxWidth="960px">
      <Center>
        <Box mt={32}>
          <Heading color="#ffc107" fontSize="9xl" textAlign="center">
            <Emoji label="Cry emoji" symbol="😭" />
            <br />
            <Text as="span">404</Text>
          </Heading>
          <Text color="hsl(0, 0%, 100%, 50%)" fontSize="1.2rem" textAlign="center">
            Oops, That page is gone !
          </Text>
          <Link href={`${ROUTE.HOME}`} passHref>
            <a>
              <Text mt={4} fontSize="1xl" textAlign="center" color="#ffc107">
                Go back home
              </Text>
            </a>
          </Link>
        </Box>
      </Center>
    </Layout>
  )
}

export default Custom404
