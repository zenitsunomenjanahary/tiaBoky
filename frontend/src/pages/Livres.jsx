import { Container, Heading, Box } from '@chakra-ui/react'
import React from 'react'
import { FormLivre } from '../components/livres/FormLivre'
import { useEffect, useState } from 'react'
import axios from "axios";
import { Input, Wrap , FormControl,  Center, Image, Circle, Badge, Link, IconButton} from '@chakra-ui/react';
import { BsInfoCircle } from 'react-icons/bs'
import { Tooltip } from '@chakra-ui/react';
import { Link as link } from 'react-router-dom';

const Livres = () => {

  const [query, setQuery] = useState("")
  const [livres, setLivres] = useState([])
  const [errors,setErrors] = useState()
  
  useEffect(()=>{
      const getLivres = async() =>{
          await axios.get(`http://localhost:5000/livres`)
              .then((res)=> setLivres(res.data))
              .catch(errors => setErrors(errors))
      }
      getLivres()
  },[query])

  return (
    <Container maxW={"7xl"} p="12">
        <Heading as="h1" marginTop="7">Livres</Heading>
        <FormLivre/>
        <Box
            marginTop={{ base: '1',sm: '5'}}
            display="flex"
            flexDirection={{ base: "column", sm:"row"}}
            justifyContent='space-between'>
                    <Box>
      {
        errors && (
        <Center padding={10} bg="pink" >
          Une Erreur s'est produit lors du chargement de la page
        </Center>
        )
      }

      <FormControl>
        <Input placeholder='rechercher un livre par titre, auteur, numero' minW={600} onChange={(e) => setQuery(e.target.value.toLowerCase())}/>
      </FormControl>
      <Wrap marginTop={3}>
        {
          livres.filter((livre) => livre.titre.toLowerCase().includes(query) || livre.autheur.toLowerCase().includes(query) ).map((livre) => (
            <Box    
              key={livre._id}  
              maxW="sm"
              maxH="md"
              marginTop="2"
              borderWidth="1px"
              rounded="lg"
              shadow="lg"
              position="relative">
                {!livre.disponible && (
                    <Circle
                      size="30px"
                      position="absolute"
                      top={2}
                      right={2}
                      bg="red.200"
                      colorScheme="green"
                    />
                )}

              <Image boxSize='200px' src={'./uploads/' + livre.livreImage} alt='Dan Abramov' />
              <Box p="6">
                  <Box d="flex" alignItems="center" justifyContent="center">
                    {
                      !livre.disponible && (
                        <Badge rounded="full" p="2" fontSize="0.9em" colorScheme="red">
                          En pret
                        </Badge>
                      )
                    }
                    {
                      livre.disponible && (
                        <Badge rounded="lg" p="2" fontSize="0.9em" colorScheme="green">
                          Disponible
                        </Badge>
                      )
                    }
                    <Tooltip label="Information sur le livre">
                      <Link as={link} to={`/Livres/${livre._id}`}>
                      <IconButton
                      marginLeft="1"
                      colorScheme='facebook'
                      aria-label='Call Segun'
                      size='sm'
                      icon={<BsInfoCircle />}
                      /> 
                      </Link>
                    </Tooltip>
                  </Box>
              </Box>
            </Box>
          ))
        }
      </Wrap>
    </Box>
        </Box>
    </Container>
  )
}

export default Livres