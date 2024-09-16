'use client'

import { SerializedStyles } from '@emotion/react'
import styled from '@emotion/styled'
import { CSSProperties } from 'react'

interface FlexProps {
    addCss? : SerializedStyles,
    align?: CSSProperties['alignItems']
    justify?: CSSProperties['justifyContent']
    direction?: CSSProperties['flexDirection']
}

const Flex = styled.div<FlexProps>(({ addCss, align, justify, direction }) => ({
  display: 'flex',
  alignItems: align,
  justifyContent: justify,
  flexDirection: direction,
  addCss
}))

export default Flex