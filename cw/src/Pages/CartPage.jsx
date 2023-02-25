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
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useReducer, useState } from "react";

// import { CartProductMeta } from './CartProductMeta';
import Second from "../Tempelates/Second"

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

  const getData = () => {
    dispatch({ type: "Request" });

    axios
      .get(`http://localhost:${process.env.REACT_APP_JSON_SERVER_PORT}/cart`)
      .then((res) => {
        dispatch({ type: "Sucess", payload: res.data });
        console.log(res.data);
        // setLength(res.data.length)
      })
      .catch((err) => {
        dispatch({ type: "Failure", payload: err.message });
      });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    let Total = 0;
    data?.forEach((el) => (Total += +el.price * el.Quantity));

    setTotal(Total);
    console.log(Total);
  }, [data]);

  const Handleadd = (id, Quantity, val) => {
    data.map((el) => (el.id === id ? (Quantity = Quantity + val) : Quantity));
    axios
      .patch(`http://localhost:8080/cart/${id}`, {
        Quantity: Quantity,
      })
      .then(() => getData());
  };

  const handleDelete = (id) => {
    axios
      .delete(
        `http://localhost:${process.env.REACT_APP_JSON_SERVER_PORT}/cart/${id}`
      )
      .then((res) => {
        getData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box
      maxW={{
        base: "3xl",
        lg: "7xl",
      }}
      mx="auto"
      px={{
        base: "4",
        md: "8",
        lg: "12",
      }}
      py={{
        base: "6",
        md: "8",
        lg: "12",
      }}
    >
      <Stack
        direction={{
          base: "column",
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
        <Stack
          spacing={{
            base: "8",
            md: "10",
          }}
          flex="2"
        >
          <Heading fontSize="2xl" fontWeight="extrabold">
            Total Items In Cart : {data.length}
          </Heading>

          <Stack borderWidth="1px"
            rounded="lg"
            padding="8"
            width="full">
            
              {data.map((el) => (
                <Flex gap={5} direction={"column"} align="center" flex="1">
                  {/* <Text>{el.id}</Text> */}
                  <Image width={"50%"} src={el.image} />
                  <Center fontSize="lg" fontWeight="semibold">{el.category}</Center>
                  <Center>
                    <Button
                      bg={"green.400"}
                      mr={"5px"}
                      onClick={() => Handleadd(el.id, el.Quantity, 1)}
                    >
                      +
                    </Button>
                    <Text fontSize="lg" fontWeight="semibold">{el.Quantity}</Text>
                    <Button
                      bg={"red"}
                      ml={"5px"}
                      isDisabled={el.Quantity === 1}
                      onClick={() => Handleadd(el.id, el.Quantity, -1)}
                    >
                      -
                    </Button>
                  </Center>

                  <Center>
                    <Text fontSize="lg" fontWeight="semibold">${el.price * el.Quantity} </Text>
                  </Center>

                  <Center>
                    <Button
                      onClick={() => {
                        handleDelete(el.id);
                      }}
                    >
                      Remove From Cart
                    </Button>
                  </Center>
                </Flex>
              ))}

             
          
          </Stack>
        </Stack>

        <Flex direction="column" align="center" flex="1">
          {/* <CartOrderSummary /> */}
          {/* <Text>SubTotal : {total}</Text>   */}
          <Stack
            spacing="8"
            borderWidth="1px"
            rounded="lg"
            padding="8"
            width="full"
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
            <Button colorScheme="blue" size="lg" fontSize="md">
              Checkout
            </Button>
          </Stack>
          <Second/>
        </Flex>
       
      

      </Stack>
    </Box>
  );
};

export default CartPage;
