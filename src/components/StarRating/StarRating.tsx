import React, { useState, FC } from 'react'
import { Box } from '@chakra-ui/react'

type StarProps = {
  marked: boolean
  starId: number
}

type StarRatingProps = {
  value: string
}

const Star: FC<StarProps> = ({ marked, starId }) => {
  return (
    <Box as="span" data-star-id={starId} color="#ffc107" cursor="pointer" role="button">
      {marked ? '\u2605' : '\u2606'}
    </Box>
  )
}

const StarRating: FC<StarRatingProps> = ({ value }): JSX.Element => {
  const [rating] = useState(parseInt(value))
  const [selection] = useState(0)

  return (
    <Box mt={2}>
      {Array.from({ length: 5 }, (v, i) => (
        <Star starId={i + 1} key={`star_${i + 1}`} marked={selection ? selection >= i + 1 : rating >= i + 1} />
      ))}
    </Box>
  )
}

export default StarRating
