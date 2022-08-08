import React from 'react'
import {
    Tr,
    Td,
    Badge,
    Button,
  } from '@chakra-ui/react'

const PretRow = ({pret}) => {
    const handleClick = (e) => {
        const id = e.target.value;
        console.log(id);
    }
  return (
    <Tr key={pret._id}>
    <Td>{pret.numero}</Td>
    <Td>{pret.numeroLecteur}</Td>
    <Td>{pret.numeroLivre}</Td>
    <Td>{(new Date(pret.datePret)).toLocaleDateString("fr")}</Td>
    <Td>{(new Date(pret.dateRetour)).toLocaleDateString("fr")}</Td>
    <Td>
        {!pret.rendu && <Badge colorScheme={"red"}>En cours</Badge>}
    </Td>
    {pret.datePret && (
        <Td>
            <Button colorScheme={"green"} value={pret._id} onClick={handleClick}>Rendre</Button>
        </Td>) 
    }
</Tr>
  )
}

export default PretRow