import { Box, Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"

import {GoDiffAdded} from "react-icons/go"
import {VscSave} from "react-icons/vsc"
import {GiCancel} from "react-icons/gi"
import React from "react"
import { useState } from "react"
import axios from "axios";
import {useNavigate} from "react-router-dom"

export const FormLivre = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const navigate = useNavigate();
    
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    const [numero, setNumero] = useState("")
    const [titre, setTitre] = useState("")
    const [autheur, setAutheur] = useState("")
    const [livreImage, setLivreImage] = useState("")
    const [dateEdition, setDateEdition] = useState("")

    const [error,setErrors] = useState();

    const handleSubmit = async(e) => {
      e.preventDefault();

      const formData = new FormData();

      formData.append("numero",numero)
      formData.append("titre",titre)
      formData.append("autheur",autheur)
      formData.append("dateEdition",dateEdition)
      formData.append("livreImage",livreImage)

      await axios.post("http://localhost:5000/livres", formData)
        .then(response => {
          setNumero("");
          setTitre("");
          setAutheur("");
          setLivreImage("");
          setDateEdition("");
          navigate("/Livres", {replace: true});
        })
        .catch(error => {setErrors(error.message); onClose(true)})
      
    }
  
    return (
      <>
       <Button marginTop={2} onClick={onOpen} colorScheme="purple" leftIcon={<GoDiffAdded/>}>Nouveau livre</Button>
        {
          error && (
            <Box bg='tomato' w='100%' p={4} color='white'>
              Une Erreur s'est produit lors de l'enregistrement d'un nouveau livre,
              Veuiller réessayer
            </Box>
          )
        }
        
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
            <ModalHeader>Nouveau Livre</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Numero</FormLabel>
                <Input ref={initialRef} value={numero} onChange={(e)=> setNumero(e.target.value)} placeholder='Numero' isRequired={true}/>
              </FormControl>
              <FormControl mt={1}>
                <FormLabel>Titre</FormLabel>
                <Input placeholder='Titre' value={titre} onChange={(e)=> setTitre(e.target.value)} isRequired={true}/>
              </FormControl>
              <FormControl mt={1}>
                <FormLabel>Autheur</FormLabel>
                <Input placeholder='Autheur' value={autheur} onChange={(e)=> setAutheur(e.target.value)} isRequired={true}/>
              </FormControl>
              <FormControl mt={1}>
                <FormLabel>Edition</FormLabel>
                <Input placeholder='ex: Edition 2002' value={dateEdition} onChange={(e)=> setDateEdition(e.target.value)} isRequired={true}/>
              </FormControl>
              <FormControl mt={1}>
                <FormLabel>Image</FormLabel>
                <Input type="file" filename="livreImage" name="livreImage" onChange={(e) => setLivreImage(e.target.files[0])}/>
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