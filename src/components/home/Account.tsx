'use client'

import Button from "@shared/Button"
import Flex from "@shared/Flex"
import Text from "@shared/Text"
import Spacing from "@shared/Spacing"
import Image from "next/image"
import useAccount from "@/hook/useAccount"
import Link from "next/link"
import { useState } from "react"
import styled from "@emotion/styled"
import { colors } from "@/styles/colorPalette"
import { keyframes } from "@emotion/react"
import Loading from "../shared/Loading"
import { useSetRecoilState } from "recoil"
import { accountState } from "@/atom/account"


function Account(){
    
    const { data : accounts } = useAccount();
    const setAccount = useSetRecoilState(accountState);
    setAccount(accounts);
    
    // const [accounts, setaccount] = useState<AccountSnapshot[] | null>(null)
    // const user = useUser();

    // useEffect(()=>{
    
    //     const accountQuery = query(
    //           collection(store, COLLECTION.ACCOUNT),
    //           where("userId", "==", user?.id)
    //     )
    
    //     const unsubscribe = onSnapshot(accountQuery, (snapshot) => {
    //         if(snapshot.empty) return;
    //         const account = snapshot.docs.map((doc)=>({
    //               id : doc.id,
    //               ...(doc.data() as Account)
    //           })
    //         )
    //         console.log("snapshot : ", account);
    //         setaccount(account as AccountSnapshot[]);
    //     })
    
    //     return () => unsubscribe();
        
    // },[])

    const [ loading, setLoading ] = useState(false);


    if(accounts == null){
        return (
            <div style = {{padding : 24}}>
                <Flex justify="space-between">
                    <Flex direction="column">
                        <Text style= {{whiteSpace : "pre-wrap"}} bold = {true}>
                            {"계좌개설이 더 쉽고 빨라졌어요."}
                        </Text>
                        <Spacing size = {8} />
                        <Link href = {"/account/new"} >
                            <Button onClick = {()=>{ setLoading(true) }}>{"3분만에 개설하기"}</Button>
                        </Link>
                    </Flex>
                    <Image 
                        src = "https://cdn2.iconfinder.com/data/icons/geest-travel-kit/128/travel_journey-18-1024.png"
                        alt = "cash"
                        width = {80}
                        height = {80}  
                    />
                </Flex>
                {
                    loading && <Loading />
                }
            </div>
        )
    }

    const account = accounts[0];

    // 계좌 개설 심사 중

    if(account?.status === "READY"){
        return (
            <div style = {{padding : 24}}>
                    <Flex direction = "column" align = "center" justify="center">
                            <div style = {{position : "relative", top : "50%"}}>
                                <div style = {{position : "absolute", top : "45%", left : "25%"}}>
                                    <Flex direction="column">
                                        <Text style= {{whiteSpace : "pre-wrap", "margin" : "auto 0"}} bold = {true}>
                                            계좌 개설 심사중입니다.
                                        </Text>
                                        <Spacing size = {15} />
                                    </Flex>
                                </div>
                                {/* <Image 
                                    src = "https://cdn2.iconfinder.com/data/icons/geest-travel-kit/128/travel_journey-18-1024.png"
                                    alt = "cash"
                                    width = {80}
                                    height = {80}  
                                /> */}
                                <CardSkeleton />
                            </div>
                    </Flex>
            </div>
        )
    }

    // 계좌 보유하고 있지 않음.

    if(account) return null;

    // return (
    //     <div style = {{padding : 24}}>
    //         <Flex justify="space-between" align = "center">
    //             <Flex direction="column">
    //                 <Text typography = "t6" color="gray600">
    //                     {`${user?.name}님의 자산`}
    //                 </Text>
    //                 <Spacing size = {2}/>
    //                 <Text typography = "t3">
    //                     {addDelimiter(account.balance)}원
    //                 </Text>
    //             </Flex>
    //             {/* <Link href = "/account"> */}
    //                 <Button onClick = {()=>{
    //                     setLoading(true);
    //                     router.push("/account")
    //                 }}>분석</Button>
    //             {/* </Link> */}
    //         </Flex>
    //         {
    //             loading && <Loading />
    //         }
    //     </div>
    // )
}

const skeletonAnimation = keyframes`
    from, to {
        opacity : 10%
    }
    50% {
        opacity : 100%
    }
`

const CardSkeleton = styled.div`
    
    border-radius : 0.4rem;
    padding : 1rem 1rem;
    width : 300px;
    height : 140px;
    max-width : 300px;
    min-width : 150px;
    background-color : ${colors.gray200};
    opacity : 10%;
    animation-name : ${skeletonAnimation};
    animation-iteration-count : infinite;
    animation-duration : 2s;
`




export default Account;