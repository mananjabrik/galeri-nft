import { useRef, useState } from 'react';
import type { NextPage } from 'next';
import { ethers } from 'ethers';
import axios from 'axios';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';
import { abi } from '../components/abi';
import { ListCard } from '../components';

const Home: NextPage = () => {
  const contracAddressRef = useRef<HTMLInputElement>(null);
  const apiUrl = useRef<HTMLInputElement>(null);
  const [state, setState] = useState('');
  const [nfts, setNfts] = useState<any>([]);
  const [myWallet, setMyWalet] = useState('');
  const provider = new ethers.providers.JsonRpcProvider(
    'https://bsc-dataseed1.ninicoin.io/'
  );

  const connectWallet = async () => {
    try {
      const detectProvider = new ethers.providers.Web3Provider(
        //@ts-ignore
        window.ethereum,
        'any'
      );
      const addressWallet = await detectProvider.send(
        'eth_requestAccounts',
        []
      );
      setMyWalet(addressWallet[0]);
    } catch {
      console.log;
    }
  };
  const useNftList = async (contract: string) => {
    const nftContract = new ethers.Contract(contract, abi, provider);
    try {
      const countNft = await nftContract.balanceOf(myWallet);
      if (countNft) {
        for (let i = 0; i < countNft; i++) {
          const nft = await nftContract.tokenOfOwnerByIndex(myWallet, i);
          const getApiUrl = apiUrl.current?.value!;
          const { data: metaData } = await axios.get(`${getApiUrl}${nft}`);
          setNfts((prev: any) => [...prev, metaData]);
        }
      }
    } catch {
      console.log;
    }
  };
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const address = contracAddressRef.current?.value!;
    setState(address);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useNftList(address);
    // e.currentTarget.reset();
  };

  return (
    <Box>
      <Button onClick={connectWallet}>{myWallet ? myWallet : 'Connect'}</Button>
      <Container maxW="container.md" py="1rem">
        <Heading textAlign="center">Galeri My NFTS</Heading>
        <Box py="1rem">
          <form onSubmit={submitHandler}>
            <Stack direction="row">
              <FormControl>
                <FormLabel>Address Contract</FormLabel>
                <Input
                  id="ContractAddress"
                  type="text"
                  ref={contracAddressRef}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Api Url</FormLabel>
                <Input id="ApiUrl" type="text" ref={apiUrl} />
              </FormControl>
            </Stack>

            <Box py="1rem">
              <Button type="submit">Submit</Button>
            </Box>
          </form>
        </Box>

        <Box py="1rem">
          <Heading>My NFT</Heading>
        </Box>
        {nfts.length > 0 && <ListCard nfts={nfts} />}
      </Container>
    </Box>
  );
};

export default Home;
