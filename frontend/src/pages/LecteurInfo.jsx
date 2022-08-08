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
    Avatar,
    AvatarBadge,
    Wrap,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    FormControl,
    Input,
    ModalFooter,
    FormLabel,
    useDisclosure,
    useToast,
  } from '@chakra-ui/react';

import { useParams } from 'react-router-dom'
import React, { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios';

const EditModal = ({lecteur}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const id = lecteur._id;
  const [numero,setNumero] = useState(lecteur.numero)
  const [nom, setNom] = useState(lecteur.nom)
  const [prenom, setPrenom] = useState(lecteur.prenom)
  const [adresse, setAdresse] = useState(lecteur.adresse)
  const [tel, setTel] = useState(lecteur.tel)
  const [dateNaissance, setDateNaissance] = useState(lecteur.dateNaissance)
  const toast = useToast()

  const initialRef = React.useRef(null)

  const handleSubmit = async () => {

    const lecteurObject = {
      numero: numero,
      nom: nom,
      prenom: prenom,
      adresse: adresse,
      tel: tel,
      dateNaissance: dateNaissance
    }

    await axios.put(`http://localhost:5000/lecteurs/${id}`,lecteurObject)
      .then(res =>{
          toast({
          title: 'Lecteur mis à jour',
          description: "Le lecteur a été mis à jour",
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
        onClose(true)
  })
      .catch(error => toast({
        title: 'Erreur',
        description: error.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      }))
  }
  return (
    <>
      <Button onClick={onOpen} colorScheme="facebook">Modifier le lecteur</Button>

      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modifier le lecteur</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Numero</FormLabel>
                <Input value={numero} isDisabled isReadOnly/>
              </FormControl>
              <FormControl>
                <FormLabel>Nom</FormLabel>
                <Input ref={initialRef} placeholder='Nom' value={nom} onChange={(e) => setNom(e.target.value)}/>
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Prenom</FormLabel>
                <Input placeholder='Prenom' value={prenom} onChange={(e) => setPrenom(e.target.value)} />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Adresse</FormLabel>
                <Input placeholder='Adresse' value={adresse} onChange={(e) => setAdresse(e.target.value)} />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Telephone</FormLabel>
                <Input placeholder='Telephone' value={tel} onChange={(e) => setTel(e.target.value)} />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Date Naissance</FormLabel>
                <Input placeholder='Ex: 01/01/2000' value={dateNaissance} onChange={(e) => setDateNaissance(e.target.value)} />
              </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

const Feature = ({ field, text }) => {
    return (
      <Stack direction={'row'} align={'center'}>
        <Text fontWeight={700}>{field}</Text>
        <Text fontWeight={400}>{text}</Text>
      </Stack>
    );
  };


const LecteurInfo = () => {
    const id = useParams().id;
    const [lecteur,setLecteur] = useState();
    const [livres,setLivres] = useState([])
    
    useEffect(()=>{
        const GET_LECTEUR = async() =>{
           await axios.get(`http://localhost:5000/lecteurs/${id}`)
            .then((res)=> {setLecteur(res.data); setLivres(res.data.livres)})
            .catch(error => console.log(error))
        }
        GET_LECTEUR();
    },[lecteur])
    
  return (
<Container maxW={'12xl'} py={12}>
      <SimpleGrid marginTop="16" columns={{ base: 1, md: 3 }} spacing={20} padding="16" shadow="2xl">
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
            Membre actif
          </Text>
          <Heading>
            Lecteur N° { lecteur && (lecteur.numero)}
            </Heading>
          <Stack
            spacing={4}
            divider={
              <StackDivider
                borderColor={useColorModeValue('gray.100', 'gray.700')}
              />
            }>
                { lecteur && (<Feature field="Nom" text={lecteur.nom}/>)}
                { lecteur && (<Feature field="Prenom" text={lecteur.prenom}/>)}
                { lecteur && (<Feature field="Adresse" text={lecteur.adresse}/>)}
                { lecteur && (<Feature field="Date de Naissance" text={lecteur.dateNaissance}/>)}
                { lecteur && (<Feature field="Telephone" text={lecteur.tel}/>)}
                { lecteur && (<Feature field="Nombre de Pret Actuel" text={lecteur.nbPretActuel}/>)}
                { lecteur && <EditModal lecteur={lecteur}/>}
          </Stack>
        </Stack>
        <Flex>
            {
                lecteur && (
                    <React.Fragment>
                    <Image
                      rounded={'full'}
                      boxSize="400px"
                      alt={'lecteur image'}
                      src={`/uploads/${lecteur.lecteurImage}`}
                      objectFit={'cover'}
                    />
                    <Avatar src={`/uploads/${lecteur.lecteurImage}`}>
                    <AvatarBadge boxSize='1.25em' bg='green.500' />
                  </Avatar></React.Fragment>
                )
            }
        </Flex>
        <Wrap>
            {
              livres && livres.map((livre) => {
                return (<Flex key={livre._id}>
                  <Image src={`/uploads/` + livre.livreImage} alt="livre image" boxSize={"100px"}/> 
                </Flex>)
              })
            }
        </Wrap>
      </SimpleGrid> 
    </Container>
  )
}

export default LecteurInfo