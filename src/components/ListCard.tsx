import { Wrap, WrapItem } from '@chakra-ui/react';
import React from 'react';
import { Card } from './Card';

export interface ListCardProps {
  description: string;
  external_url: string;
  image: string;
  name: string;
  attributes: [];
}

interface MetaData {
  data: ListCardProps[];
}

export const ListCard: React.FC<MetaData> = (props) => {
  return (
    <Wrap>
      <WrapItem width="45%">
        <Card></Card>
      </WrapItem>
    </Wrap>
  );
};
