'use client'

import TransactionForm from '@/components/test/TransactionForm'
import React from 'react'
import styled from '@emotion/styled'

export default function page() {
  return (
    <Container>
        <TransactionForm />
    </Container>
  )
}

const Container = styled.div`
    display : flex;
    justify-content : center;
`
