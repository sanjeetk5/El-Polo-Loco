import React from "react";
import axios from "axios";
import { useEffect, useReducer, useState } from "react";
// import { PropsWithChildren, Fragment } from 'react';
// import {
//   chakra,
//   Box,
//   Stack,
//   VStack,
//   HStack,
//   Flex,
//   Text,
//   Image,
//   Container,
//   Icon,
//   StackProps
// } from '@chakra-ui/react';

import {
  chakra,
  Box,
  Stack,
  Text,
  Image,
  Container,
  Button,
  ButtonProps,
  useColorModeValue,
  Wrap,
  Grid,
  Center,
  Flex,
} from "@chakra-ui/react";
import { BsFillCartFill } from "react-icons/bs";
import { PropsWithChildren } from "react";

// // Here we have used react-icons package for the icons
// import { AiOutlineHeart, AiOutlineExclamationCircle } from 'react-icons/ai';
// import { BsFillCartFill } from 'react-icons/bs';
import SplitWithImage from "../Tempelates/SplitWithImage";
// // import Sidebar from "../Components/Sidebar"

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
const CustomButton = ({ children, ...props }) => {
  return (
    <Button
      textTransform="uppercase"
      lineHeight="inherit"
      rounded="md"
      {...props}
    >
      {children}
    </Button>
  );
};

const Products = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { data, isLoading, error } = state;
  const [order, setOrder] = useState("");
  const [filter, setFilter] = useState(null);
  const getData = () => {
    dispatch({ type: "Request" });

    axios
      .get(`http://localhost:${process.env.REACT_APP_JSON_SERVER_PORT}/foods`, {
        params: {
          _sort: "price",
          _order: order,
          q: filter,
        },
      })
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
  }, [filter]);

  useEffect(() => {
    if (order) {
      if (order === "asc") {
        let arr = [...data].sort((a, b) => {
          return a.cost - b.cost;
        });
        getData(arr);
      }
      if (order === "desc") {
        let arr = [...data].sort((a, b) => b.cost - a.cost);
        getData(arr);
      }
    }
  }, [order]);


  return (
    
    

    <Grid pl={"20%"} templateColumns={"repeat(2,1fr)"}>
      
      {data.map((el, i) => (
        <Box
          borderWidth="1px"
          _hover={{ shadow: "lg" }}
          rounded="md"
          overflow="hidden"
          key={el.id}
          textAlign={"center"}
         mt={2}
         
        >
          <Image align={"center"}  src={el.image} objectFit="cover"  />
          <Box p={{ base: 3, sm: 5 }}>
            <Box mb={6}>
              <chakra.h3
                fontSize={{ base: "lg", sm: "2xl" }}
                fontWeight="bold"
                lineHeight="1.2"
                mb={2}
              >
                {el.name}
              </chakra.h3>
              <Text fontSize={{ base: "md", sm: "lg" }} noOfLines={2} textAlign={"center"}>
                {el.description}
              </Text>
              <CustomButton>{el.category}</CustomButton>
            </Box>
            <Stack
              justify="space-evenly"
              direction={{ base: "column", sm: "row" }}
              spacing={{ base: 2, sm: 0 }}
            >
              <CustomButton variant="outline">{el.price}</CustomButton>

              <CustomButton colorScheme="teal" variant="solid">
                <BsFillCartFill />
                ..Buy Now
              </CustomButton>
            </Stack>
          </Box>
        </Box>
      ))}
    </Grid>

  );
};

export default Products;
