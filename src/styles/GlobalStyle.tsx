'use client'

import { Global } from '@emotion/react'
import React from 'react'
import globalStyles from '@styles/globalStyles'

export default function GlobalStyle() {
  return (
    <Global styles = {globalStyles}/>
  )
}
