import { Box, Container, HStack, Radio, RadioGroup, VStack,Text,Image, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Badge } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {server} from '../index'
import ErrorComponent from './ErrorComponent';

function CoinDetails() {

  const [coin, setCoin]=useState({});
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [currency, setCurrency]=useState('inr')
  const params=useParams()
  const currencySymbol= currency==="inr"?"₹":currency==="eur"?"€":"$";

  useEffect(()=> {
    const fetchCoin = async () => {
      try {
        const {data} = await axios.get(`${server}/coins/${params.id}`)
        setCoin(data)
        console.log(data)
        setLoading(false)
      } catch (error) {
        setError(true)
        setLoading(false)
      }
    };
    fetchCoin();

  }, [params.id]);
  if(error) return <ErrorComponent message={"Error while fetching Coin detail"} />
  return (
    <Container maxW={'container.xl'}>
      {
        loading?<Loader /> : <>

          <Box w={'full'} borderWidth={1}>
            {coin.market_data.current_price.inr}
          </Box>
          {/* Button */}
          <RadioGroup value={currency} onChange={setCurrency} p={'8'}>
            <HStack spacing={'4'}>
              <Radio value='inr'>INR</Radio>
              <Radio value='usd'>USD</Radio>
              <Radio value='eur'>EUR</Radio>
            </HStack>
          </RadioGroup>
          <VStack spacing={'4'} p={'16'} alignItems={'flex-start'} >
            <Text fontSize={'small'} alignSelf={'center'} opacity={0.7} >
              Last updated on {Date(coin.market_data.last_updated).split('G')[0]}
            </Text>

            <Image w={'16'} h={'16'} objectFit={'contain'} src={coin.image.large} />

            <Stat>
              <StatLabel>{coin.name}</StatLabel>
              <StatNumber>{currencySymbol}{coin.market_data.current_price[currency]}</StatNumber>
              <StatHelpText>
                <StatArrow type={coin.market_data.price_change_percentage_24h>0?"increase":"decrease"} />
                {coin.market_data.price_change_percentage_24h}%
              </StatHelpText>
            </Stat>
            <Badge fontSize={'2xl'}  >{`#${coin.market_cap_rank}`}</Badge>

          </VStack>
        </>
      }
    </Container>
  )
}

export default CoinDetails