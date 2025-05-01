import useMyCards from '@/hook/useMyCards'
import { Account } from '@/model/account'
import { CheckCard } from '@/model/card'
import { colors } from '@/styles/colorPalette'
import styled from '@emotion/styled'
import React from 'react'
import 'swiper/css'
import SwiperNavigation from '../shared/SwiperNavigation'
import { SwiperSlide } from 'swiper/react'

export default function MyCard({
    account
} : {
    account : Account
}) {

    const { name, cardNumber, accountName, balance, validThru } = account
    const checkCard = { name, cardNumber, cardName : accountName, balance, validThru, type : "체크카드" }
    const { data } = useMyCards();
    const myCards = data ? [checkCard, ...data] : [checkCard];

    console.log("데이터 : ", data);

    console.log("cards : ", myCards);

    if(!myCards) return null;

    return (
        <SwiperNavigation>
            {myCards.map((card, idx) => {
                return(
                    <SwiperSlide key = {idx}>
                        <Container>     
                            <div style={{fontSize : "0.7rem", display : "flex", justifyContent : "space-between"}}>
                                <div>{card.name}</div>
                                <div>{card.cardName}</div>
                            </div>
                            <div style = {{marginBottom : "4rem"}}>
                                {convertCardNumber(cardNumber)}  
                            </div>
                            <div style = {{fontSize : "0.7rem", display : "flex", justifyContent : "space-between"}}>
                                {
                                    card.type === "체크카드" && (
                                        <div>잔액</div>
                                    )
                                }
                                <div>VALID THRU</div>
                            </div>
                            <div style={{ display : "flex", justifyContent : "space-between"}}>
                                {
                                    card.type === "체크카드" && (
                                        <div>{(card as CheckCard).balance}</div>
                                    )
                                }
                                <div>{validThru}</div>
                            </div>
                        </Container>
                    </SwiperSlide>    
                )
            })}
        </SwiperNavigation>
    )
}

function convertCardNumber(cardNumber : string) : string{
    const convertNumber = cardNumber.split("").map((number, index)=>{
        if(index !== 0 && index % 4 === 0) return `-${number}`;
        return number;
    }).join("");

    return convertNumber;
}

const Container = styled.div`
    display : flex;
    color : white;
    line-height : 120%;
    flex-direction : column;
    margin : 1.5rem auto;
    border-radius : 0.4rem;
    padding : 1rem 1rem;
    max-width : 300px;
    min-width : 150px;
    background-color : ${colors.blue980};
    cursor : pointer;
    &:hover{
        opacity : 90%
    }
`
