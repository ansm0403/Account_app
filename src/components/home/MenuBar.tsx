'use client'

import React, { useState } from 'react'
import styled from '@emotion/styled'
import { colors } from '@/styles/colorPalette'
import { FaRegCreditCard } from "react-icons/fa";
import { RiMoneyDollarBoxFill } from "react-icons/ri";
import { BsGraphUpArrow } from "react-icons/bs";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import Link from 'next/link';
import Loading from '../shared/Loading';

export default function MenuBar() {

  const [ loading, setLoading ] = useState(false);
  
  return (
    <Container>
      <Link href = "/transfer" onClick = {()=>{setLoading(true)}}>
        <Menu>
          <MenuButton>
            <FaMoneyBillTransfer />
          </MenuButton>
          <MenuTitle>이체</MenuTitle>
        </Menu>
      </Link>
      <Link href = "/account" onClick = {()=>{setLoading(true)}}>
        <Menu>
          <MenuButton>
            <BsGraphUpArrow />
          </MenuButton>
          <MenuTitle>분석</MenuTitle>
        </Menu>
      </Link>
      <Link href = "/deposit-withdraw" onClick = {()=>{setLoading(true)}}>
        <Menu>
          <MenuButton>
            <RiMoneyDollarBoxFill />
          </MenuButton>
          <MenuTitle>입출금</MenuTitle>
        </Menu>
      </Link>
      <Link href="/card" onClick = {()=>{setLoading(true)}}>
        <Menu>
          <MenuButton>
            <FaRegCreditCard />
          </MenuButton>
          <MenuTitle>카드 신청</MenuTitle>
        </Menu>
      </Link>
      {
        loading && <Loading />
      }
    </Container>
  )
}

const Container = styled.div`
    display : flex;
    flex-direction : row;
    justify-content : center;
    items-align : center;
`
const Menu = styled.div`
    display : flex;
    flex-direction : column;
    justify-content : center;
    items-align : center;
    text-align : center;
    margin : 1rem;
`
const MenuButton = styled.div`
    display : flex;
    align-items : center;
    justify-content : center;
    color : white;
    font-size : 2rem;
    padding : 0.5rem;
    background-color : ${colors.blue980};
    margin-bottom : 1rem;
    border-radius : 0.3rem;
    width : 2.4rem;
    height : 2.4rem;
    transition : 0.3s transform;
    &:hover {
      transform : scale(1.2)
    }
`
const MenuTitle = styled.div`
  color : ${colors.gray800};
  font-size : 0.8rem;
`