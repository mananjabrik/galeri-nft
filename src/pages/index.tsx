import { useEffect, useRef, useState } from 'react';
import type { NextPage } from 'next';
import { ethers } from 'ethers';
// import abi from '../components/abi.json';
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
  const abi = [
    {
      inputs: [
        {
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'index',
          type: 'uint256',
        },
      ],
      name: 'tokenOfOwnerByIndex',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
  ];

  const inputRef = useRef<HTMLInputElement>(null);
  const [state, setState] = useState('');
  const [nfts, setNfts] = useState([]);
  const provider = new ethers.providers.JsonRpcProvider(
    'https://bsc-dataseed1.ninicoin.io/'
  );
  const useNftList = async (contract: string) => {
    const wallet = provider;

    const nftContract = new ethers.Contract(contract, abi, wallet);
    try {
      const countNft = await nftContract.balanceOf(
        '0x664FD97eBB060ab4C02C90C6d8772D80A846C7F3'
      );
      console.log('hi', countNft.toString());
    } catch {
      console.log;
    }
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const address = inputRef.current?.value!;
    setState(address);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useNftList(address);
    // e.currentTarget.reset();
  };

  console.log(abi);

  useEffect(() => {
    const nftContract = new ethers.Contract(
      '0x6c6ee9b4ee43e18e7c418f00efc0868347939f53',
      abi,
      provider
    );
    window['nftContract'] = nftContract;
  }, []);

  return (
    <Container maxW="container.md" py="1rem">
      <Heading textAlign="center">Galeri My NFTS</Heading>
      <Box py="1rem">
        <form onSubmit={submitHandler}>
          <FormControl>
            <FormLabel htmlFor="email">Address Contract</FormLabel>
            <Input id="wallet" type="text" ref={inputRef} />
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
      {/* {nfts.length > 0 && <ListCard nfts={nfts} />} */}
    </Container>
  );
};

export default Home;
