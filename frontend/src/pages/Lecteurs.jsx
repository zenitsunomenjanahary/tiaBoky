import React, { useEffect, useState } from 'react'
import { Box, Container, FormControl, Heading, Input, Wrap } from '@chakra-ui/react'
import { FormLecteur } from '../components/FormLecteur'
import Card from '../components/Card';
import axios from 'axios';

const Lecteurs = () => {
  const [query, setQuery] = useState("")
  const [lecteurs, setLecteurs] = useState([])
  const [submit,setSubmit] = useState()

  useEffect(()=>{
    const getLecteurs = async() =>{
        await axios.get(`http://localhost:5000/lecteurs`)
            .then((res)=> setLecteurs(res.data))
            .catch(errors => console.log(errors))
    }
    if(query.length === 0 || query.length > 2) getLecteurs();
    if(submit) getLecteurs();
},[submit,lecteurs])

  return (
    <Container maxW={"7xl"} p="12">
        <Heading as="h1" marginTop="7" >Lecteurs</Heading>
        {/* FORMULAIRE */}
        <FormLecteur onSubmit={setSubmit}/>
        <Box
            marginTop={{ base: '1',sm: '5'}}
            display="flex"
            flexDirection={{ base: "column", sm:"row"}}
            justifyContent='space-between'>
                {/* LECTEURS */}
            <Box>
              <FormControl>
                <Input placeholder='rechercher un lecteur par nom, prenom, numero' onChange={(e) => setQuery(e.target.value.toLowerCase())}/>
              </FormControl>
              <Wrap>
              {
              lecteurs.filter((lecteur) => lecteur.nom.toLowerCase().includes(query) || lecteur.prenom.toLowerCase().includes(query) || lecteur.numero.toLowerCase().includes(query) ).map((lecteur)=>(
              <Card info={lecteur} key={lecteur._id}/>
              ))
              }
              </Wrap>
            </Box>

                {/* FIN LECTEURS */}
        </Box>
    </Container>
  )
}

export default Lecteurs