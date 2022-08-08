import {  Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from "@chakra-ui/react"
import { Select } from '@chakra-ui/react'
import {GoDiffAdded} from "react-icons/go"
import {VscSave} from "react-icons/vsc"
import {GiCancel} from "react-icons/gi"
import React from "react"
import { useState } from "react"
import axios from "axios";
import { useEffect } from "react"
import {useNavigate} from "react-router-dom"

export const FormPret = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const navigate = useNavigate()
    
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    const [numero, setNumero] = useState("")
    const [numeroLecteur, setNumeroLecteur] = useState("")
    const [numeroLivre, setNumeroLivre] = useState("")
    const [datePret, setDatePret] = useState("")

    const [lecteurs, setLecteurs] = useState([])
    const [livres, setLivres] = useState([])

    const toast = useToast();

    useEffect(()=>{
        getInformationLecteurs();
        getInformationLivres();
    },[])

    const getInformationLecteurs = async() => {
        await axios.get("http://localhost:5000/lecteurs").then((res) => setLecteurs(res.data)).catch(error => console.log(error))
    }
    const getInformationLivres = async() => {
        await axios.get("http://localhost:5000/livres").then((res) => setLivres(res.data)).catch(error => console.log(error))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const pretObject = {
          numero: numero,
          numeroLecteur: numeroLecteur,
          numeroLivre: numeroLivre,
          datePret: new Date(datePret)
        }

        await axios.post("http://localhost:5000/prets",pretObject)
          .then((res) => {
            setNumero("")
            setDatePret("")
            setNumeroLecteur("")
            setNumeroLivre("")
            toast({
              title: 'Pret information',
              description: "Nouveau pret enregistrer",
              status: 'success',
              duration: 9000,
              isClosable: true,
            })
            onClose(true)
          }).catch(error => toast({
            title: 'Pret information',
            description: "Une erreur s'est produit lors de l'enregistrement d'un nouveau pret",
            status: 'error',
            duration: 9000,
            isClosable: true,
          }))
    }
  
    return (
      <>
       <Button marginTop={2} onClick={onOpen} colorScheme="purple" leftIcon={<GoDiffAdded/>}>Nouveau Pret</Button>        
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Nouveau Pret</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Numero</FormLabel>
                <Input ref={initialRef} value={numero} onChange={(e)=> setNumero(e.target.value)} placeholder='Numero Pret' isRequired={true}/>
              </FormControl>
              <FormControl>
                <FormLabel>Date de pret</FormLabel>
                <Input type="date" value={datePret} onChange={(e)=> setDatePret(e.target.value)} placeholder='Numero Pret'/>
              </FormControl>
              <FormControl>
                <FormLabel>Lecteur</FormLabel>
                <Select placeholder="Lecteur" name="numeroLecteur" onChange={(e) => setNumeroLecteur(e.target.value)}>
                    {
                        lecteurs.map(lecteur => (
                            lecteur.nbPretActuel <= 3 && <option key={lecteur._id} value={lecteur.numero} >{lecteur.numero} - {lecteur.nom}</option>
                        ))
                    }
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Livre</FormLabel>
                <Select placeholder="Livre" name="numeroLivre" onChange={(e) => setNumeroLivre(e.target.value)}>
                    {
                       livres.map(livre => (
                           livre.disponible && <option key={livre._id} value={livre.numero} >{livre.numero} - {livre.titre}</option>
                        ))
                    }
                </Select>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" colorScheme='purple' onClick={handleSubmit} mr={3} leftIcon={<VscSave/>} >
                Enregistrer
              </Button>
              <Button variant="outline" colorScheme="red" onClick={onClose} leftIcon={<GiCancel/>}>Annuler</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }