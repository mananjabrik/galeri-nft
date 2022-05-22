import { Wrap, WrapItem } from '@chakra-ui/react';
import React from 'react';
import { Card } from './Card';

export interface ListCardProps {
  id: string;
  name: string;
  image: string;
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
