import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { NavLink } from "react-router-dom";

//   const { id } = useParams();
//   const [data, setData] = useState([]);
//   console.log(id);

//   useEffect(() => {
//     axios.get(`http://localhost:8080/products/${id}`).then((res) => {
//       console.log(res);
//       setData(res.data);
//     });
//   }, [id]);
//   console.log(data)
//   const{image , price , title , category , description} = data
//   return (
//     <Box>
//       <Heading>SingleProduct</Heading>
//        <Image src = {image} />
//     </Box>
//   );
// };

// export default SingleProduct;
import { Routes, Route } from "react-router-dom";
import Private from "../Components/Private";
import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  VisuallyHidden,
  List,
  ListItem,
} from "@chakra-ui/react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";

export default function SingleProduct() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  console.log(id);

  useEffect(() => {
    axios.get(`http://localhost:8080/foods/${id}`).then((res) => {
      console.log(res);
      setData(res.data);
    });
  }, [id]);
  console.log(data);
  const { image, price, title, category, description, calories } = data;

  const handlePost = async () => {
    try {
      return axios({
        method: "post",
        url: `http://localhost:8080/cart`,
        data: {
          ...data,
          "Quantity": 1,
        },
      }).then((res) => console.log(res.data));
    } catch (error) {
      console.log("err");
    }
  };

  return (
    <Container maxW={"7xl"}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
      >
        <Flex>
          <Image
            rounded={"md"}
            alt={"product image"}
            src={image}
            fit={"cover"}
            align={"center"}
            w={"100%"}
            h={"100%"}
          />
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={"header"}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
            >
              {title}
            </Heading>
            <Text
              color={useColorModeValue("gray.900", "gray.400")}
              fontWeight={300}
              fontSize={"2xl"}
            >
              {price}
            </Text>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={"column"}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.200", "gray.600")}
              />
            }
          >
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text
                color={useColorModeValue("gray.500", "gray.400")}
                fontSize={"2xl"}
                fontWeight={"300"}
              >
                {category}
              </Text>
              <Text fontSize={"lg"}>{description}</Text>
            </VStack>
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={useColorModeValue("yellow.500", "yellow.300")}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                Features
              </Text>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                <List spacing={2}>
                  <ListItem>Best Quality</ListItem>
                  <ListItem>100% Fresh Food</ListItem>{" "}
                  <ListItem>On Time Delievery</ListItem>
                </List>
                <List spacing={2}>
                  <ListItem>Customizable Foods</ListItem>
                  <ListItem>No added Preservatives</ListItem>
                  <ListItem>Order From Your Nearby Restaurants</ListItem>
                </List>
              </SimpleGrid>
            </Box>
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={useColorModeValue("yellow.500", "yellow.300")}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                Product Details
              </Text>

              <List spacing={2}>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Customizable as per Your Choice -
                  </Text>{" "}
                  Large , Medium , Small
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Category -
                  </Text>{" "}
                  {category}
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Calories -
                  </Text>{" "}
                  {calories}
                </ListItem>
              </List>
            </Box>
          </Stack>
          <NavLink to="/cart"  onClick={handlePost}>
            <Button
             
              rounded={"none"}
              w={"full"}
              mt={8}
              size={"lg"}
              py={"7"}
              bg={useColorModeValue("gray.900", "gray.50")}
              color={useColorModeValue("white", "gray.900")}
              textTransform={"uppercase"}
              _hover={{
                transform: "translateY(2px)",
                boxShadow: "lg",
              }}
            >
              Add to cart
            </Button>
          </NavLink>
          <Stack direction="row" alignItems="center" justifyContent={"center"}>
            <MdLocalShipping />
            <Text>Delivery Within 30 Minutes</Text>
          </Stack>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}
