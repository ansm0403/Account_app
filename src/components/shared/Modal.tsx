
import { colors } from '@/styles/colorPalette'
import styled from '@emotion/styled'
import React from 'react'

interface ModalProps {
    onClose : () => void,
    title : string,
    buttonLabel : string
}

export default function Modal({ 
    onClose,
    title,
    buttonLabel
} : ModalProps
) {
  return (
    <ModalContainer>
        <ModalBox>
          {title}
          <ModalButton onClick={()=>onClose()}>
            {buttonLabel}
          </ModalButton>
        </ModalBox>
    </ModalContainer>
  )
}

const ModalContainer = styled.div`
    position : fixed;
    top : 0;
    left : 0;
    z-index : 99;
    background-color : ${colors.gray200};
    width : 100%;
    height : 100vh;
`

const ModalBox = styled.div`
    display : flex;
    position : relative;
    flex-direction : column;
    align-items : center;
    padding-top : 30px;
    top : 30%;
    width : 300px;
    height : 150px;
    border-radius : 0.5rem;
    background-color : white;
    margin : auto;
    font-weight : bold;
    font-size : 1.3rem;
`

const ModalButton = styled.button`
    position : relative;
    font-size : 1rem;
    top : 10%;
    width : 80%;
    margin : auto;
    padding : 5px;
    color : white;
    border-radius : 0.3rem;
    background-color : ${colors.blue980}
`