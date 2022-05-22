import { useRef, useState } from 'react';
import type { NextPage } from 'next';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Text,
} from '@chakra-ui/react';

const Home: NextPage = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [state, setState] = useState('');

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState(inputRef.current?.value!);
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
    </Container>
  );
};

export default Home;
