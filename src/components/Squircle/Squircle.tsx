import React, { FC } from 'react'
import { Box } from '@chakra-ui/react'
import { css } from '@emotion/react'

type Squircle = {
  url: string
  label: string
}

const Squircle: FC<Squircle> = ({ url, label }): JSX.Element => {
  return (
    <Box css={styles}>
      <Box
        role="img"
        aria-label={label}
        className="avatar"
        backgroundImage={`linear-gradient(hsl(0, 0%, 0%, 0%), hsl(45, 100%, 51%, 20%)),
      url(${url})`}
      />
      <svg width="0" height="0">
        <defs>
          <clipPath id="squircle" clipPathUnits="objectBoundingBox">
            <path d="M .5,0 C .1,0 0,.1 0,.5 0,.9 .1,1 .5,1 .9,1 1,.9 1,.5 1,.1 .9,0 .5,0 Z" />
          </clipPath>
        </defs>
      </svg>
    </Box>
  )
}

const styles = css`
  .avatar {
    height: 90px;
    width: 90px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50% 20%;
    clip-path: url(#squircle);
    -webkit-clip-path: url(#squircle);
  }
`

export default Squircle
