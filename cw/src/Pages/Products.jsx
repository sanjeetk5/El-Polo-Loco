import React from "react";
import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import { PropsWithChildren, Fragment } from "react";
import Footer from "../Components/Footer"
import ProductCard from "../Components/ProductCard";
import {
  chakra,
  Box,
  Stack,
  VStack,
  HStack,
  Flex,
  Text,
  Image,
  Container,
  Icon,
  StackProps,
  Grid,
  SimpleGrid,
  Button,
} from "@chakra-ui/react";
// Here we have used react-icons package for the icons
import { AiOutlineHeart, AiOutlineExclamationCircle } from "react-icons/ai";
import { BsFillCartFill } from "react-icons/bs";
import SplitWithImage from "../Tempelates/SplitWithImage";
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

const Index = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { data, isLoading, error } = state;
  const [order, setOrder] = useState("");
  const [filter, setFilter] = useState(null);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const limit = 6;
  const getData = () => {
    dispatch({ type: "Request" });

    axios
      .get(
        `http://localhost:${process.env.REACT_APP_JSON_SERVER_PORT}/foods?_page=${page}&_limit=${limit}`,
        {
          params: {
            _sort: "price",
            _order: order,
          },
        }
      )
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
  }, [page]);

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
    <Box ml={{ base: 0, md: 60 }} p="0">
      <SplitWithImage key={Date.now} />
      <SimpleGrid spacing={4} columns={[1, 1, 2]}>
        {data.map((e) => (
          <ProductCard
           id = {e.id}
           image = {e.image}
           category = {e.category}
           price = {e.price}
           description = {e.description}
           calories = {e.calories}
           name = {e.name}
          />
        ))}
      </SimpleGrid>

    <br />

      <Box>
        <Button isDisabled={page === 1} onClick={() => setPage(page - 1)}>
          Pre
        </Button>
        <Button>{page}</Button>
        <Button  onClick={() => setPage(page + 1)}>
          Next
        </Button>
        <Button onClick={() => setPage(1)}>Reset</Button>
      </Box>
      <Second/>
      <Footer/>
    </Box>
  );
};

const IconButton = ({ children, ...props }) => {
  return (
    <HStack
      cursor="pointer"
      border="1px solid"
      borderColor="gray.300"
      px={2}
      py="0.15rem"
      alignItems="center"
      rounded="sm"
      spacing={2}
      {...props}
    >
      {children}
    </HStack>
  );
};

export default Index;
