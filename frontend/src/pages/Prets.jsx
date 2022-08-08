import { Box, Container, Heading } from '@chakra-ui/react'
import React from 'react'
import { FormPret } from '../components/FormPret'
import Tables from '../components/Tables'

const Prets = () => {
  return (
    <Container maxW={"7xl"} p="12">
    <Heading as="h1" marginTop="7">Prets</Heading>
    <Box
        marginTop={{ base: '1',sm: '5'}}
        display="flex"
        flexDirection={{ base: "column", sm:"row"}}
        justifyContent='space-between'>
    </Box>
    <FormPret/>
    <Tables/>
</Container>
  )
}

export default Prets