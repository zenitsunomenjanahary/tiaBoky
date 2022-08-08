import { Box, Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from "@chakra-ui/react"

import {GoDiffAdded} from "react-icons/go"
import {VscSave} from "react-icons/vsc"
import {GiCancel} from "react-icons/gi"
import React from "react"
import { useState } from "react"
import axios from "axios";

export const FormLecteur = ({onSubmit}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    const [numero, setNumero] = useState("")
    const [nom, setNom] = useState("")
    const [prenom, setPrenom] = useState("")
    const [adresse, setAdresse] = useState("")
    const [dateNaissance, setDateNaissance] = useState("")
    const [tel, setTel] = useState("")
    const [lecteurImage, setLecteurImage] = useState("")
    const toast = useToast();

    const handleSubmit = async(e) => {
      e.preventDefault();

      const formData = new FormData();

      formData.append("numero",numero)
      formData.append("nom",nom)
      formData.append("prenom",prenom)
      formData.append("adresse",adresse)
      formData.append("tel",tel);
      formData.append("dateNaissance",dateNaissance);
      formData.append("lecteurImage",lecteurImage);

      await axios.post("http://localhost:5000/lecteurs", formData)
        .then(response => {
          setNumero("");
          setNom("");
          setPrenom("");
          setAdresse("");
          setDateNaissance("");
          setTel("");
          setLecteurImage("");
          onClose(true);
          onSubmit(true)
        })
        .catch(error => toast({
          title: "Une erreur s'est produit",
          description: error.message,
          status: 'error',
          duration: 9000,
          isClosable: true,
        }))
      
    }
  
    return (
      <>
       <Button marginTop={2} onClick={onOpen} colorScheme="purple" leftIcon={<GoDiffAdded/>}>Nouveau membre</Button>
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
            <ModalHeader>Create your account</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Numero</FormLabel>
                <Input ref={initialRef} value={numero} onChange={(e)=> setNumero(e.target.value)} placeholder='Numero' isRequired={true}/>
              </FormControl>
              <FormControl mt={1}>
                <FormLabel>Nom</FormLabel>
                <Input placeholder='Nom' value={nom} onChange={(e)=> setNom(e.target.value)} isRequired={true}/>
              </FormControl>
              <FormControl mt={1}>
                <FormLabel>Prenom</FormLabel>
                <Input placeholder='Prenom' value={prenom} onChange={(e)=> setPrenom(e.target.value)} isRequired={true}/>
              </FormControl>
              <FormControl mt={1}>
                <FormLabel>Adresse</FormLabel>
                <Input placeholder='Adresse' value={adresse} onChange={(e)=> setAdresse(e.target.value)} isRequired={true}/>
              </FormControl>
              <FormControl mt={1}>
                <FormLabel>Telephone</FormLabel>
                <Input placeholder='Telephone' value={tel} onChange={(e)=> setTel(e.target.value)} isRequired={true} />
              </FormControl>
              <FormControl mt={1}>
                <FormLabel>Date de Naissance</FormLabel>
                <Input placeholder='Ex: 11/11/2002' value={dateNaissance} onChange={(e)=> setDateNaissance(e.target.value)} isRequired={true}/>
              </FormControl>
              <FormControl mt={1}>
                <FormLabel>Image</FormLabel>
                <Input type="file" filename="lecteurImage" onChange={(e) => setLecteurImage(e.target.files[0])} isRequired={true}/>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" colorScheme='purple' mr={3} leftIcon={<VscSave/>} >
                Enregistrer
              </Button>
              <Button variant="outline" colorScheme="red" onClick={onClose} leftIcon={<GiCancel/>}>Annuler</Button>
            </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      </>
    )
  }