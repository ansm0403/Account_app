'use client'
import withSusepnse from '@/hook/withSuspense'
import React, { useState } from 'react'
import Text from '../shared/Text'
import useCard from './hooks/useCard';
import ListRow from '../shared/ListLow';
import Badge from '../shared/Badge';
import Button from '../shared/Button';
import Skeleton from '../shared/Skeletion';
import { useRouter } from 'next/navigation';
import Loading from '../shared/Loading';


function CardList() {
  const { data } = useCard()
  const navigate = useRouter()
  const [loading, setLoading] = useState(false);

  const isShowMoreButton = data?.items.length ?? 0 > 5

  return (
    <div style={{ padding: '24px 0' }}>
      <Text
        bold={true}
        style={{ padding: '12px 24px', display: 'inline-block' }}
      >
        추천 카드
      </Text>
      <ul>
        {data?.items.slice(0, 5).map((card, index) => (
          <ListRow
            key={card.id}
            contents={
              <ListRow.Texts title={`${index + 1}위`} subTitle={card.name} />
            }
            right={card.payback != null ? <Badge label={card.payback} /> : null}
            withArrow={true}
            onClick={() => {
              setLoading(true);
              navigate.push(`/card/${card.id}`)
            }}
          />
        ))}
      </ul>
      {isShowMoreButton ? (
        <div style={{ padding: '12px 24px 0 24px' }}>
          <Button
            full={true}
            weak={true}
            size="medium"
            onClick={() => {
              setLoading(true);
              navigate.push('/card')
            }}
          >
            더보기
          </Button>
        </div>
      ) : null}
      {
        loading && <Loading />
      }
    </div>
  )
}

export function CardListSkeleton() {
  return (
    <div style={{ padding: '24px 0' }}>
      <Text
        bold={true}
        style={{ padding: '12px 24px', display: 'inline-block' }}
      >
        추천 카드
      </Text>
      {[...new Array(5)].map((_, idx) => (
        <ListRow
          key={idx}
          contents={
            <ListRow.Texts
              title={<Skeleton width={30} height={25} />}
              subTitle={<Skeleton width={45} height={20} />}
            />
          }
        />
      ))}
    </div>
  )
}

export default withSusepnse(CardList, { fallback: <CardListSkeleton /> })