import {
    Box,
    Center,
    useColorModeValue,
    Heading,
    Stack,
    Image,
    Button,
    Text,
    IconButton,
    Link,
    Tooltip,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    ModalBody,
    useDisclosure,
    ModalHeader,
    ModalFooter,
    Toast,
    useToast,
  } from '@chakra-ui/react';
  import { BsInfoCircle } from 'react-icons/bs'
  import { RiDeleteBin6Fill } from 'react-icons/ri'
  import {Link as link} from "react-router-dom"
  import axios from "axios"

  const DeleteModal = ({id}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()
    const handleDeleteBtn = async () => {
      onClose(true)
      await axios.delete("http://localhost:5000/lecteurs/"+id)
      .then(res => toast({
        title: "Suppression",
        description: res.data.message,
        status: "success",
        duration: 9000,
        isClosable: true,
      }))
      .catch(error => toast({
        title: "Suppression",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      }))
    }
    return (
      <>
        <IconButton
            colorScheme='pink'
            aria-label='Call Segun'
            size='lg'
            icon={<RiDeleteBin6Fill/> }
            values={id}
            onClick={onOpen}                
          />
  
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Êtes vous sûr de vouloir supprimer le lecteur
            </ModalBody>
            <ModalFooter>
              <Button onClick={handleDeleteBtn} colorScheme="red" m={1}>Oui</Button>
              <Button onClick={onClose} colorScheme="green">Non</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

  export default function Card({info}) {

    return (
      <Center py={12}>
        <Box
          role={'group'}
          p={6}
          maxW={'333px'}
          minH={"333px"}
          margin="1.5"
          w={'full'}
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow={'2xl'}
          rounded={'lg'}
          pos={'relative'}
          zIndex={1}>
          <Box
            rounded={'lg'}
            mt={-12}
            pos={'relative'}
            height={'230px'}
            _after={{
              transition: 'all .3s ease',
              content: '""',
              w: 'full',
              h: 'full',
              pos: 'absolute',
              top: 5,
              left: 0,
              backgroundImage: `url(./uploads/${info.lecteurImage})`,
              filter: 'blur(15px)',
              zIndex: -1,
            }}
            _groupHover={{
              _after: {
                filter: 'blur(20px)',
              },
            }}>
            <Image
              rounded={'lg'}
              height={230}
              width={282}
              objectFit={'cover'}
              src={"./uploads/"+ info.lecteurImage}
            />
          </Box>
          <Stack pt={10} align={'center'}>
            <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
              {info.prenom}
            </Text>
            <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
              {info.nom}
            </Heading>
            <Stack direction={'row'} align={'center'}>
              <Tooltip label={"Information du lecteur N° " + info.numero}>
                <Link as={link} to={`/Lecteurs/${info._id}`}>
                  <IconButton
                      colorScheme='facebook'
                      aria-label='Call Segun'
                      size='lg'
                      icon={<BsInfoCircle />}
                    />
                </Link>
              </Tooltip>
                <DeleteModal id={info._id}/>
            </Stack>
          </Stack>
        </Box>
      </Center>
    );
  }