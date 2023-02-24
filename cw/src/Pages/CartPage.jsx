import {
  Box,
  Flex,
  Heading,
  HStack,
  Link,
  Stack,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import { CartItem } from "./CartItem";
import { CartOrderSummary } from "./CartOrderSummary";
// import { CartProductMeta } from './CartProductMeta';

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

  const getData = () => {
    dispatch({ type: "Request" });

    axios
      .get(`http://localhost:${process.env.REACT_APP_JSON_SERVER_PORT}/cart`)
      .then((res) => {
        dispatch({ type: "Sucess", payload: res.data });
        console.log(res.data);
      })
      .catch((err) => {
        dispatch({ type: "Failure", payload: err.message });
      });
  };

  useEffect(() => {
    getData();
  }, []);

  // useEffect(() => {
  //   if (order) {
  //     if (order === "asc") {
  //       let arr = [...data].sort((a, b) => {
  //         return a.cost - b.cost;
  //       });
  //       getData(arr);
  //     }
  //     if (order === "desc") {
  //       let arr = [...data].sort((a, b) => b.cost - a.cost);
  //       getData(arr);
  //     }
  //   }
  // }, [order]);

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
          Shopping Cart (3 items)
        </Heading>

        <Stack spacing="6">
          {data.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
        </Stack>
      </Stack>

      <Flex direction="column" align="center" flex="1">
        <CartOrderSummary />
        <HStack mt="6" fontWeight="semibold">
          <p>or</p>
          <Link color={mode("blue.500", "blue.200")}>Continue shopping</Link>
        </HStack>
      </Flex>
    </Stack>
  </Box>;
};

export default CartPage;
