import { Wrap, WrapItem } from '@chakra-ui/react';
import React from 'react';
import { Card } from './Card';

export interface MetaData {
  description?: string;
  external_url?: string;
  image: string;
  name: string;
  attributes?: [];
}

interface ListCardProps {
  nfts?: Array<MetaData>;
}

export const ListCard: React.FC<ListCardProps> = ({ nfts }) => {
  return (
    <Wrap>
      {nfts?.map((nft, idx) => (
        <WrapItem key={idx}>
          <Card image={nft.image} name={nft.name}></Card>
        </WrapItem>
      ))}
    </Wrap>
  );
};
