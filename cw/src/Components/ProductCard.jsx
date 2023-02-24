import React from "react";
import { Center, Box, Image, Stack, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import {
  chakra,
  VStack,
  HStack,
  Flex,
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
const ProductCard = ({
  id,
  category,
  description,
  image,
  price,
  name,
  calories,
}) => {
  return (
    <Center>
      <RouterLink to={`/product/${id}`}>
        <Box>
          <Stack
            key={id}
            spacing={{ base: 0, md: 4 }}
            direction={{ base: "column", md: "row" }}
            p={2}
            rounded="md"
            w={{ base: "auto", md: "1xl" }}
            overflow="hidden"
            pos="relative"
            boxShadow={"rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;"}
          >
            {id.isFeatured && (
              <Flex
                alignItems="center"
                p={1}
                bg="red.400"
                pos="absolute"
                fontSize="xs"
                fontWeight="500"
                color="white"
                top={0}
                left={0}
              >
                <Text>FEATURED</Text> &nbsp;{" "}
                <Icon as={AiOutlineExclamationCircle} h={4} w={4} />
              </Flex>
            )}
            <Flex ml="0 !important">
              <Image
                rounded="md"
                w={{ base: "100%", md: "18rem" }}
                h="auto"
                objectFit="cover"
                src={image}
                alt="product image"
              />
            </Flex>
            <Stack
              direction="column"
              spacing={2}
              w="100%"
              mt={{ base: "5px !important", sm: 0 }}
            >
              <Flex justify="space-evenly">
                <chakra.h3
                  fontSize={{ base: "lg", md: "xl" }}
                  fontWeight="bold"
                >
                  {name}
                </chakra.h3>
                <chakra.h3
                  fontSize={{ base: "lg", md: "xl" }}
                  fontWeight="bold"
                >
                  {price}
                </chakra.h3>

                <chakra.h3
                  fontSize={{ base: "lg", md: "xl" }}
                  fontWeight="bold"
                >
                  {category}
                </chakra.h3>
              </Flex>
              <Box>
                <Text fontSize="lg" fontWeight="500">
                  {calories}
                </Text>

                <Text fontSize="lg" fontWeight="500">
                  {description}
                </Text>
              </Box>

              <Stack
                direction={{ base: "column-reverse", sm: "row" }}
                justify="space-evenly"
                alignItems={{ base: "flex-start", sm: "center" }}
              >
                <Text fontSize="sm" mt={{ base: 1, sm: 0 }}>
                  Updated Few Minutes Ago
                </Text>
                <Stack direction="row" spacing={1} mb="0 !important">
                  <IconButton>
                    <Icon as={AiOutlineHeart} w={4} h={4} />
                  </IconButton>
                  <IconButton spacing={2} bg="green.500" color="white">
                    <Icon as={BsFillCartFill} w={4} h={4} />
                    <Text fontSize="sm">Buy Now</Text>
                  </IconButton>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </RouterLink>
    </Center>
  );
};

export default ProductCard;
