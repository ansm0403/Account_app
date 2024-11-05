import Flex from '@/components/shared/Flex'
import Spacing from '@/components/shared/Spacing'
import Text from '@/components/shared/Text'
import CardListButton from '@/components/test/CardListButton'
import EventBannerButton from '@/components/test/EventBannerButton'
import EventForm from '@/components/test/EventForm'
import React from 'react'

export default function TestPage() {
  return (
    <Flex direction='column'>
      <Text bold = {true}>배너</Text>
      <EventBannerButton></EventBannerButton>
      <Spacing 
        size = {8}
        backgroundColor='gray100'
        style={{margin : '20px 0'}}
      />
      <Text bold = {true}>카드</Text>
      <CardListButton />
      <Spacing 
        size={8}
        backgroundColor='gray100'
        style = {{margin : '20px 0'}}
      />
      <EventForm />
    </Flex>
  )
}
