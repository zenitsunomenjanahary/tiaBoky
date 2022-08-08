import {
    Container,
    SimpleGrid,
    Image,
    Flex,
    Heading,
    Text,
    Stack,
    StackDivider,
    useColorModeValue,
  } from '@chakra-ui/react';

import { useParams } from 'react-router-dom'
import React, { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios';

const Feature = ({ field, text }) => {
    return (
      <Stack direction={'row'} align={'center'}>
        <Text fontWeight={700}>{field}</Text>
        <Text fontWeight={400}>{text}</Text>
      </Stack>
    );
  };


const LivreInfo = () => {
    const id = useParams().id;
    const [livre,setLivre] = useState()

    useEffect(()=>{
        const GET_LIVRE = async() =>{
           await axios.get(`http://localhost:5000/livres/${id}`)
            .then((res)=> setLivre(res.data))
            .catch(error => console.log(error))
        }
        GET_LIVRE()
    },[])

  return (
<Container maxW={'12xl'} py={12}>
      <SimpleGrid marginTop="16" columns={{ base: 1, md: 2 }} spacing={20} padding="16" shadow="2xl">
        <Stack spacing={4}>
          <Text
            textTransform={'uppercase'}
            color={'blue.400'}
            fontWeight={600}
            fontSize={'sm'}
            bg={useColorModeValue('blue.50', 'blue.900')}
            p={2}
            alignSelf={'flex-start'}
            rounded={'md'}>
                {
                    livre && livre.disponible ? "Disponible" :  "EN PRET "
                }
          </Text>
          <Heading>
            Livre N° { livre && (livre.numero)}
            </Heading>
          <Stack
            spacing={4}
            divider={
              <StackDivider
                borderColor={useColorModeValue('gray.100', 'gray.700')}
              />
            }>
                { livre && (<Feature field="Titre" text={livre.titre}/>)}
                { livre && (<Feature field="Autheur" text={livre.autheur}/>)}
                { livre && (<Feature field="Date Edition" text={livre.dateEdition}/>)}
                { livre && (<Feature field="Nombre de Pret" text={livre.nbFoisPret}/>)}                
          </Stack>
        </Stack>
        <Flex>
            {
                livre && (
                    <Image
                      rounded={'lg'}
                      boxSize="400px"
                      alt={'lecteur image'}
                      src={`/uploads/${livre.livreImage}`}
                     
                    />
                )
            }
        </Flex>
      </SimpleGrid>
    </Container>
  )
}

export default LivreInfo