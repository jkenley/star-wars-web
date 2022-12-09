import React, { FC } from 'react'
import { Spinner } from '@chakra-ui/react'

type LoadingProps = {
  [props: string]: any
}

const Loading: FC<LoadingProps> = ({ ...props }): JSX.Element => (
  <Spinner emptyColor="hsla(208, 31%, 12%, 100%)" color="#ffc107" thickness="3px" speed="0.65s" {...props} />
)

export default Loading
