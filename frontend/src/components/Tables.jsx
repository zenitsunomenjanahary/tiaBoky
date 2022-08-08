import React, { useState } from 'react'
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Badge,
    Button,
    useToast,
    Container,
    Flex,
    Grid,
    Box,
    Select,
    RadioGroup,
    Stack,
    Radio,
  } from '@chakra-ui/react'

import axios from "axios"
import { useEffect } from 'react';

const Tables = () => {
    const [prets, setPrets] = useState();
    const [message, setMessage] = useState();
    const [filterBy,setFilterBy] = useState("encours");

    const toast = useToast();
    
    useEffect(()=>{
        const GET_PRETS = async ()=>{
            await axios.get("http://localhost:5000/prets").then((res) =>{
                setPrets(res.data)
            })
        }
        GET_PRETS();
    },[prets,filterBy])
    
    const handleClick = async (e) => {
        const id = e.target.value
        await axios.put(`http://localhost:5000/prets/${id}`).then((res)=> {
            setMessage(res.message)
            toast({
                title: 'Livre rendue, pret update',
                description: "Livre rendue, pret mis a jour!!",
                status: 'success',
                duration: 9000,
                isClosable: true,
              })
        })
    }
    const handleRadioFilter = (e) => {
        setFilterBy(e)
    }
  return (
    <>
        <Box margin={2}>
            filtre
            <RadioGroup defaultValue={filterBy} onChange={handleRadioFilter}>
                <Stack spacing={5} direction='row'>
                    <Radio colorScheme='red' value='encours'>
                    En cours
                    </Radio>
                    <Radio colorScheme='green' value='rendu'>
                    Rendu
                    </Radio>
                </Stack>
        </RadioGroup>
        </Box>
        <TableContainer>
            <Table variant={"simple"}>
                <Thead>
                    <Tr>
                        <Th>N° pret</Th>
                        <Th>N° Lecteur </Th>
                        <Th>N° Livre </Th>
                        <Th>Date de pret</Th>
                        <Th>Date de retour</Th>
                        <Th>Status</Th>
                        <Th></Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        prets && prets.map((pret) =>(
                            filterBy == "rendu" && (
                                pret.rendu && <Tr key={pret._id}>
                                    <Td>{pret.numero}</Td>
                                    <Td>{pret.numeroLecteur}</Td>
                                    <Td>{pret.numeroLivre}</Td>
                                    <Td>{(new Date(pret.datePret)).toLocaleDateString("fr")}</Td>
                                    <Td>{(new Date(pret.dateRetour)).toLocaleDateString("fr")}</Td>
                                    <Td>
                                        {pret.rendu && <Badge colorScheme={"green"}>rendue</Badge>}
                                    </Td>
                                </Tr>  
                            )
                        ))
                    }
                    {
                        prets && prets.map((pret) =>(
                            filterBy == "encours" && (
                                !pret.rendu && <Tr key={pret._id}>
                                    <Td>{pret.numero}</Td>
                                    <Td>{pret.numeroLecteur}</Td>
                                    <Td>{pret.numeroLivre}</Td>
                                    <Td>{(new Date(pret.datePret)).toLocaleDateString("fr")}</Td>
                                    <Td>{(new Date(pret.dateRetour)).toLocaleDateString("fr")}</Td>
                                    <Td>
                                        {!pret.rendu && <Badge colorScheme={"red"}>En Cours</Badge>}
                                    </Td>
                                    <Td>
                                         {!pret.rendu && <Button colorScheme={"green"} value={pret._id} onClick={handleClick}>Rendre</Button>}
                                    </Td>
                                </Tr>  
                            )
                        ))
                    }
                </Tbody>
            </Table>
        </TableContainer>
    </>
  )
}

export default Tables