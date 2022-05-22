import { useRef, useState } from 'react';
import type { NextPage } from 'next';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Text,
} from '@chakra-ui/react';
import { Card, ListCard } from '../components';

const Home: NextPage = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [state, setState] = useState('');
  const [nfts, setNfts] = useState([]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const address = inputRef.current?.value!;
    setState(address);

    e.currentTarget.reset();
  };

  return (
    <Container maxW="container.md">
      <Box py="1rem">
        <form onSubmit={submitHandler}>
          <FormControl>
            <FormLabel htmlFor="email">Address Contract</FormLabel>
            <Input id="wallet" type="text" ref={inputRef} />
            <FormHelperText>We&apos;ll never share your email.</FormHelperText>
          </FormControl>

          <Box py="1rem">
            <Button type="submit">Submit</Button>
          </Box>
        </form>

        <Text>{state}</Text>
      </Box>

      <Box py="1rem">
        <Heading>My NFT</Heading>
      </Box>
      {nfts.length > 0 && <ListCard nfts={nfts} />}
    </Container>
  );
};

export default Home;
