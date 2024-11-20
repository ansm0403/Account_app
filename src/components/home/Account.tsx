'use client'

import Button from "@shared/Button"
import Flex from "@shared/Flex"
import Text from "@shared/Text"
import Spacing from "@shared/Spacing"
import Image from "next/image"
import useAccout from "@/hook/useAccout"
import useUser from "@/hook/useUser"
import addDelimiter from "@/utils/addDelimiter"
import Link from "next/link"

export default function Account(){
    
    const { data : account } = useAccout();

    const user = useUser();

    if(account == null){
        return (
            <div style = {{padding : 24}}>
                <Flex justify="space-between">
                    <Flex direction="column">
                        <Text style= {{whiteSpace : "pre-wrap"}} bold = {true}>
                            {"계좌개설이 더 쉽고 빨라졌어요."}
                        </Text>
                        <Spacing size = {8} />
                        <Link href = {"/account"}>
                            <Button>{"3분만에 개설하기"}</Button>
                        </Link>
                    </Flex>
                    <Image 
                        src = "https://cdn2.iconfinder.com/data/icons/geest-travel-kit/128/travel_journey-18-1024.png"
                        alt = "cash"
                        width = {80}
                        height = {80}  
                    />
                </Flex>
            </div>
        )
    }

    // 계좌 개설 심사 중

    if(account.status === "READY"){
        return (
            <div style = {{padding : 24}}>
                    <Flex justify="space-between">
                        <Flex direction="column">
                            <Text style= {{whiteSpace : "pre-wrap"}} bold = {true}>
                                계좌 개설 심사중입니다.
                            </Text>
                            <Spacing size = {8} />
                        </Flex>
                        <Image 
                            src = "https://cdn2.iconfinder.com/data/icons/geest-travel-kit/128/travel_journey-18-1024.png"
                            alt = "cash"
                            width = {80}
                            height = {80}  
                        />
                    </Flex>
            </div>
        )
    }

    // 계좌 보유하고 있지 않음.

    return (
        <div style = {{padding : 24}}>
            <Flex justify="space-between" align = "center">
                <Flex direction="column">
                    <Text typography = "t6" color="gray600">
                        {`${user?.name}님의 자산`}
                    </Text>
                    <Spacing size = {2}/>
                    <Text typography = "t3">
                        {addDelimiter(account.balance)}원
                    </Text>
                </Flex>
                <Link href = "/account">
                    <Button>분석</Button>
                </Link>
            </Flex>
        </div>
    )
}