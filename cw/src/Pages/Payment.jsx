import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  Avatar,
  AvatarGroup,
  useBreakpointValue,
  IconProps,
  Icon,
  Image,
  FormControl,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure
} from "@chakra-ui/react";

import { useReducer, useEffect, useRef } from "react";
import axios from "axios";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Footer from "../Components/Footer"

// let Button = () => <div />;
// let FormControl = () => <div />;
// let Input = () => <div />;

const avatars = [
  {
    name: "Visa",
    url: "https://media.tenor.com/WEJDtZRsRoYAAAAM/visa-credit-card.gif",
  },
  {
    name: "mastercard",
    url: "https://i.pinimg.com/originals/f7/54/ef/f754ef05e2e46234a2f8f60b5ee80041.gif",
  },
  {
    name: "Kent Dodds",
    url: "https://cdn.dribbble.com/users/954572/screenshots/19914708/media/c80f04c9a9e9662ac71e1130c088ede1.gif",
  },
  {
    name: "Upi",
    url: "https://blog.bankbazaar.com/wp-content/uploads/2017/07/UPI-app.gif",
  },
  {
    name: "COD",
    url: "https://i.gifer.com/W9Sz.gif",
  },
];
const initialState = {
  name: "",
  email: "",
  phone: "",
  cardno: "",
  expirey: "",
  cvv: "",
  isDisabled : true
};

const reducer = (state, action) => {
  switch (action.type) {
    case "name": {
      return {
        ...state,
        name: action.payload,
      };
    }
    case "email": {
      return {
        ...state,
        email: action.payload,
      };
    }
    case "phone": {
      return {
        ...state,
        phone: action.payload,
      };
    }
    case "cardno": {
      return {
        ...state,
        cardno: action.payload,
      };
    }
    case "expirey": {
      return {
        ...state,
        expirey: action.payload,
      };
    }

    case "cvv": {
      return {
        ...state,
        cvv: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default function JoinOurTeam() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const postd = () => {
    axios.post(`http://localhost:8080/card`, { ...state }).then((res) => {
      console.log(res.data);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postd();
    console.log(state);
  };
  return (
    <Box ml={{ base: 0, md: 60 }} p="0" position={"relative"}>
      <Container
        as={SimpleGrid}
        maxW={"7xl"}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 10, sm: 20, lg: 32 }}
      >
        <Stack spacing={{ base: 10, md: 20 }}>
          <Heading
            lineHeight={1.1}
            fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
          >
            Now You Can Add Your Card Details{" "}
            <Text
              as={"span"}
              bgGradient="linear(to-r, red.400,pink.400)"
              bgClip="text"
            >
              &
            </Text>{" "}
            Save It For Later Use..
          </Heading>
          <Stack direction={"row"} spacing={4} align={"center"}>
            <AvatarGroup>
              {avatars.map((avatar) => (
                <Avatar
                  key={avatar.name}
                  name={avatar.name}
                  src={avatar.url}
                  position={"relative"}
                  zIndex={2}
                  _before={{
                    content: '""',
                    width: "full",
                    height: "full",
                    rounded: "full",
                    transform: "scale(1.125)",
                    bgGradient: "linear(to-bl, red.400,pink.400)",
                    position: "absolute",
                    zIndex: -1,
                    top: 0,
                    left: 0,
                  }}
                />
              ))}
            </AvatarGroup>
            <Text fontFamily={"heading"} fontSize={{ base: "4xl", md: "6xl" }}>
              +
            </Text>
            <Flex
              align={"center"}
              justify={"center"}
              fontFamily={"heading"}
              fontSize={{ base: "sm", md: "lg" }}
              bg={"gray.800"}
              color={"white"}
              rounded={"full"}
              minWidth={useBreakpointValue({ base: "44px", md: "60px" })}
              minHeight={useBreakpointValue({ base: "44px", md: "60px" })}
              position={"relative"}
              _before={{
                content: '""',
                width: "full",
                height: "full",
                rounded: "full",
                transform: "scale(1.125)",
                bgGradient: "linear(to-bl, orange.400,yellow.400)",
                position: "absolute",
                zIndex: -1,
                top: 0,
                left: 0,
              }}
            >
              All Payments
            </Flex>
          </Stack>
        </Stack>
        <Stack
          bg={"gray.50"}
          rounded={"xl"}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          maxW={{ lg: "lg" }}
        >
          <Stack spacing={4}>
            <Heading
              color={"gray.800"}
              lineHeight={1.1}
              fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
            >
              Enjoy your Meal
              <Text
                as={"span"}
                bgGradient="linear(to-r, red.400,pink.400)"
                bgClip="text"
              >
                !
              </Text>
            </Heading>
            <Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
              Enter Your Card Details
            </Text>
          </Stack>

          <Box mt={10}>
            <Stack spacing={4}>
              <form onSubmit={handleSubmit}>
                <FormControl>
                  <Input
                    isRequired
                    placeholder="Name"
                    bg={"gray.100"}
                    border={0}
                    color={"gray.500"}
                    _placeholder={{
                      color: "gray.500",
                    }}
                    value={state.name}
                    onChange={(e) =>
                      dispatch({ type: "name", payload: e.target.value })
                    }
                  />

                  <Input
                  isRequired
                    placeholder="abc@mail.com"
                    bg={"gray.100"}
                    border={0}
                    color={"gray.500"}
                    _placeholder={{
                      color: "gray.500",
                    }}
                    value={state.email}
                    onChange={(e) =>
                      dispatch({ type: "email", payload: e.target.value })
                    }
                  />
                  <Input
                  isRequired
                    placeholder="Phone Number"
                    bg={"gray.100"}
                    border={0}
                    color={"gray.500"}
                    _placeholder={{
                      color: "gray.500",
                    }}
                    value={state.phone}
                    onChange={(e) =>
                      dispatch({ type: "phone", payload: e.target.value })
                    }
                  />

                  <Input
                  isRequired
                    placeholder="Card Number"
                    bg={"gray.100"}
                    border={0}
                    color={"gray.500"}
                    _placeholder={{
                      color: "gray.500",
                    }}
                    value={state.cardno}
                    onChange={(e) =>
                      dispatch({ type: "cardno", payload: e.target.value })
                    }
                  />

                  <Input
                  isRequired
                    placeholder="Expiry Year"
                    bg={"gray.100"}
                    border={0}
                    color={"gray.500"}
                    _placeholder={{
                      color: "gray.500",
                    }}
                    value={state.expirey}
                    onChange={(e) =>
                      dispatch({ type: "expirey", payload: e.target.value })
                    }
                  />

                  <Input
                  isRequired
                    placeholder="Cvv"
                    bg={"gray.100"}
                    border={0}
                    color={"gray.500"}
                    _placeholder={{
                      color: "gray.500",
                    }}
                    value={state.cvv}
                    onChange={(e) =>
                      dispatch({ type: "cvv", payload: e.target.value })

                    }
                  />

                  <Button isDisabled={state.cvv==="" || state.name === "" || state.email === ""} onClick={onOpen} type = "submit">Get Otp</Button>
                  <AlertDialog
                    motionPreset="slideInBottom"
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                    isOpen={isOpen}
                    isCentered
                  >
                    <AlertDialogOverlay />

                    <AlertDialogContent>
                      <AlertDialogHeader>Proceed To Payment</AlertDialogHeader>
                      <AlertDialogCloseButton />
                      <AlertDialogBody>
                       Your Otp Is Going To be Send On the Registered Mobile Number.
                      </AlertDialogBody>
                      <AlertDialogFooter>
                   
                      <RouterLink to="/otp">
                      <Button colorScheme="red" ml={3}>
                          Redirect to Otp
                        </Button>
                      </RouterLink>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </FormControl>
              </form>
            </Stack>
          </Box>
        </Stack>
      </Container>
      <Blur
        position={"absolute"}
        top={-10}
        left={-10}
        style={{ filter: "blur(70px)" }}
      />

      <Footer/>
    </Box>
  );
}

export const Blur = () => {
  return (
    <Icon
      width={useBreakpointValue({ base: "100%", md: "40vw", lg: "30vw" })}
      zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
      height="560px"
      viewBox="0 0 528 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="71" cy="61" r="111" fill="#F56565" />
      <circle cx="244" cy="106" r="139" fill="#ED64A6" />
      <circle cy="291" r="139" fill="#ED64A6" />
      <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" />
      <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B" />
      <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78" />
      <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" />
    </Icon>
  );
};

// <RouterLink to="/otp">
// <Button
//     fontFamily={"heading"}
//     mt={8}
//     w={"full"}
//     bgGradient="linear(to-r, red.400,pink.400)"
//     color={"white"}
//     _hover={{
//       bgGradient: "linear(to-r, red.400,pink.400)",
//       boxShadow: "xl",
//     }}
//     type="submit"
//   >
//     Send Otp
//   </Button>
// </RouterLink>
