import {
  Box,
  Flex,
  Heading,
  HStack,
  Link,
  Stack,
  Image,
  Text,
  useColorModeValue as mode,
  Center,
  Grid,
  Select,
  Button,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  AlertDialogCloseButton,
  Spacer,
  chakra,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useReducer, useRef, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";



// import { CartProductMeta } from './CartProductMeta';
import Second from "../Tempelates/Second";

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "Request":
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case "Sucess":
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        error: false,
      };
    case "Failure":
      return {
        ...state,
        data: [],
        isLoading: false,
        error: false,
      };

    default:
      throw new Error();
  }
};

const CartPage = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { data, isLoading, error } = state;
  const [total, setTotal] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [totalcart, setTotalCart] = useState(0);

  const [open, setOpen] = useState(false);
  const toggleButton = () => {
    setOpen(!open);
    console.log("button");
  };

  const cancelRef = useRef();
  const toast = useToast();

  const a = () => {
    toast({
      title: "Item Deleted",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const b = () => {
    toast({
      title: "One more item added and price updated",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const c = () => {
    toast({
      title: "One item deleted and price updated",
      status: "error",
      duration: 2000,
      isClosable: true,
    });
  };

  const getData = () => {
    dispatch({ type: "Request" });

    axios
      .get(`https://json-server-example-ma0w.onrender.com/cart`)
      .then((res) => {
        dispatch({ type: "Sucess", payload: res.data });
        console.log(res.data);
        // setLength(res.data.length)
        // setTotalCart(res.data.length);
        // console.log(res.data.length)
      })
      .catch((err) => {
        dispatch({ type: "Failure", payload: err.message });
      });
  };

  useEffect(() => {
    getData();
  }, [data]);

  useEffect(() => {
    let Total = 0;
    data?.forEach((el) => (Total += +el.price * el.Quantity));

    setTotal(Total);
    // console.log(Total);
  }, [data]);

  const Handleadd = (id, Quantity, val) => {
    data.map((el) => (el.id === id ? (Quantity = Quantity + val) : Quantity));
    axios
      .patch(`https://json-server-example-ma0w.onrender.com/cart/${id}`, {
        Quantity: Quantity,
      })
      .then(() => getData());
  };

  const handleDelete = (id) => {
    axios
      .delete(`https://json-server-example-ma0w.onrender.com/cart/${id}`)
      .then((res) => {
        getData();
        a();
        setTotalCart(res.data.length);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box
    
    >
      <Stack
        direction={{
          base: "column",
          md: "row",
          lg: "row",
        }}
        align={{
          lg: "flex-start",
        }}
        spacing={{
          base: "8",
          md: "16",
        }}
      >
        <Box ml={{ base: 0, md: 60 }} p="0">
         
         <Heading  fontSize="2xl" fontWeight="extrabold" key={data.now} >
            Total Items In Cart : {data.length}
          </Heading>
         

          <Stack borderWidth="1px" rounded="lg" padding="8" width="full">
            {data.map((el) => (
              <Flex gap={5} direction={"column"} align="center" flex="1">
                {/* <Text>{el.id}</Text> */}
                <Image width={"100%"} src={el.image} />
                <Center fontSize="lg" fontWeight="semibold">
                  {el.category}
                </Center>
                <Center>
                  <Button
                    bg={"green.400"}
                    mr={"5px"}
                    // eslint-disable-next-line no-sequences
                    onClick={() => Handleadd(el.id, el.Quantity, 1, b())}
                  >
                    +
                  </Button>
                  <Text fontSize="lg" fontWeight="semibold">
                    {el.Quantity}
                  </Text>
                  <Button
                    bg={"red"}
                    ml={"5px"}
                    isDisabled={el.Quantity === 1}
                    onClick={() => Handleadd(el.id, el.Quantity, -1, c())}
                  >
                    -
                  </Button>
                </Center>

                <Center>
                  <Text fontSize="lg" fontWeight="semibold">
                    ${el.price * el.Quantity}{" "}
                  </Text>
                </Center>

                <Center>
                  <Button onClick={onOpen}>Delete Item</Button>
                  <AlertDialog
                    motionPreset="slideInBottom"
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                    isOpen={isOpen}
                    isCentered
                  >
                    <AlertDialogOverlay />

                    <AlertDialogContent>
                      <AlertDialogHeader>Delete Item</AlertDialogHeader>
                      <AlertDialogCloseButton />
                      <AlertDialogBody>
                        Are you sure you want to delete. Product will be deleted
                        from Cart.
                      </AlertDialogBody>
                      <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                          No
                        </Button>
                        <Button
                          colorScheme="red"
                          ml={3}
                          onClick={() => {
                            handleDelete(el.id);
                            onClose();
                          }}
                        >
                          Yes
                        </Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </Center>
              </Flex>
            ))}
          </Stack>
        </Box>

        <Flex direction="column" align="center" flex="1">
          {/* <CartOrderSummary /> */}
          {/* <Text>SubTotal : {total}</Text>   */}
          <Stack
            spacing="8"
            borderWidth="1px"
            rounded="lg"
            padding="8"
            width="full"
            mt={"30px"}
          >
            <Heading size="md">Order Summary</Heading>

            <Stack spacing="6">
              <Flex justify="space-between">
                <Text fontSize="lg" fontWeight="semibold">
                  SubTotal :
                </Text>
                <Text fontSize="xl" fontWeight="extrabold">
                  ${total}
                </Text>
              </Flex>
            </Stack>
            <Text>Delivery Within 30 minutes</Text>

            <Center>
              <RouterLink to="/payment">
                <Button colorScheme="linkedin" backgroundColor={"red.800"}>
                  CheckOut
                </Button>
              </RouterLink>
            </Center>
          </Stack>
          <Image src="https://cdn.dribbble.com/users/43602/screenshots/4289148/food-app-animation.gif" />

         
        </Flex>
        
      </Stack>

      <Footer />
    </Box>
  );
};

export default CartPage;

{
  /* <Button
onClick={() => {
  handleDelete(el.id);
}}
>
Remove From Cart
</Button> */
}
