'use client'
import withSusepnse from '@/hook/withSuspense'
import React from 'react'
import Text from '../shared/Text'
import useCard from './hooks/useCard';
import ListRow from '../shared/ListLow';
import Badge from '../shared/Badge';
import Button from '../shared/Button';

function CardList() {
  const { data } = useCard();

  const isShowMoreButton = data?.items.length ?? 0 > 5

  return (
    <div style={{padding : "24px 0"}} >
      <Text style = {{padding : "12px 24px", display : "inline-block"}}>추천 카드</Text>
      <ul>
        {
          data?.items.slice(0, 5).map((card, index) => (
          <ListRow 
            key = {card.id} 
            contents = {<ListRow.Texts title = {`${index + 1}위`} subTitle = {card.name} />} 
            right = {card.payback != null ? <Badge label = {card.payback} /> : null}
            withArrow = {true}
          />))
        }
      </ul>
      {
        isShowMoreButton 
        ? 
          <div style={{padding : "12px 24px 0 24px"}}>
            <Button full = {true} weak = {true} size = "medium">
              더보기
            </Button> 
          </div>
        : null
      }
    </div>
  )
}

export default withSusepnse(CardList, {fallback : null})