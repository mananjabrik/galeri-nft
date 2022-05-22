import React from 'react';
import { Box, Text, Image, Heading, ListProps } from '@chakra-ui/react';
import { MetaData } from './ListCard';

interface CardProps extends MetaData {}

export const Card: React.FC<CardProps> = (props) => {
  const { name, description } = props;
  return (
    <Box p="3">
      <Box
        boxShadow="md"
        border="1px"
        borderColor="gray.100"
        rounded="lg"
        overflow="hidden"
      >
        <Image
          src="https://w.wallhaven.cc/full/1k/wallhaven-1ky369.jpg"
          alt="NFT"
        ></Image>
        <Box p="4">
          <Heading size="lg">{name}</Heading>
          <Text>{description}</Text>
        </Box>
      </Box>
    </Box>
  );
};
Card.defaultProps = {
  name: 'No Name',
  description: 'No description',
};
