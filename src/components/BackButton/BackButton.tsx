import React from 'react'
import { Circle, Link } from '@chakra-ui/react'
import { useRouter } from 'next/router'

const BackButton = (): JSX.Element => {
  const router = useRouter()

  return (
    <Link href="#" onClick={() => router.back()}>
      <Circle
        title="Back to home page"
        position="fixed"
        left="30px"
        top="30px"
        textAlign="center"
        size="48px"
        backgroundColor="#ffc518"
        boxShadow="0 1px 3px rgb(0 0 0 / 40%)"
        borderRadius="50%"
        cursor="pointer"
        zIndex="200"
        transition="all 0.2s ease-in-out"
        _hover={{
          backgroundColor: '#f5b800',
        }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          strokeWidth="2.5"
          stroke="#0E141B"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <line x1="5" y1="12" x2="19" y2="12" />
          <line x1="5" y1="12" x2="11" y2="18" />
          <line x1="5" y1="12" x2="11" y2="6" />
        </svg>
      </Circle>
    </Link>
  )
}

export default BackButton
