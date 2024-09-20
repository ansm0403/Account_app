import Button from "@shared/Button"
import Flex from "@shared/Flex"
import Text from "@shared/Text"
import Spacing from "@shared/Spacing"
import Image from "next/image"

export default function Account(){
    const hasAccount = true
    
    // 계좌 보유중
    if(hasAccount) {
        return (
            <div style = {{padding : 24}}>
                <Flex justify="space-between" align = "center">
                    <Flex direction="column">
                        <Text typography = "t6" color="gray600">회원님의 자산</Text>
                        <Spacing size = {2}/>
                        <Text typography = "t3">12,000원</Text>
                    </Flex>
                    <Button>분석</Button>
                </Flex>
            </div>
        )
    }

    // 계좌 보유하고 있지 않음.
    // 계좌 개설중일 수도 있음.
    const accountMakeState = ""
    const title = accountMakeState === "READY" ? "개설중인 계좌가 있습니다." : "계좌개설이 더 쉽고 빨라졌어요." 
    const buttonLabel = accountMakeState === "READY" ? "이어만들기" : "3분만에 가입하기"

    return(
        <div style = {{padding : 24}}>
            <Flex justify="space-between">
                <Flex direction="column">
                    <Text style= {{whiteSpace : "pre-wrap"}} bold = {true}>{title}</Text>
                    <Spacing size = {8} />
                    <Button>{buttonLabel}</Button>
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