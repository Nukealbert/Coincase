import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {server} from '../index'
import { Container, HStack, VStack,Image } from '@chakra-ui/react';
import Loader from './Loader'

function Exchanges() {
  const [exchanges, setExchanges]=useState([]);
  const [loading, setLoading] = useState(true)
  useEffect(()=> {
    const fetchExchanges = async () => {
      const {data} = await axios.get(`${server}/exchanges`)
      console.log(data)
      setExchanges(data)
      setLoading(false)
    };
    fetchExchanges();

  }, []);


  return (
    <Container maxW={'container.xl'}>
      {
        loading ? <Loader/>:<>
        
          <HStack wrap={'wrap'}>
            {
             exchanges.map((i) => (

                <ExchangeCard 
                key={i.id}
                name={i.name} 
                img={i.image} 
                rank={i.trust_score_rank} 
                url={i.url} />
              ))
            }
          </HStack>
        </>
      }
      
    </Container>
  )
};
const ExchangeCard=({name,img,rank,url})=>(
  <a href={url} target='blank'>
      <VStack>
        <Image src={img} w={'10'} h={'10'} objectFit={'contain'} alt={name} />
      </VStack>
  </a>
)
  


export default Exchanges