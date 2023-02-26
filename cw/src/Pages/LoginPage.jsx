import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Image,
  useToast,
  Grid,
  Box,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import { Navigate } from "react-router-dom";
import Footer from "../Components/Footer";
import Slidercard from "../Components/Slidercard"
export default function LoginPage() {
  const { login, isAuth } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toast = useToast();

  const a = () => {
    toast({
      title: "Invalid credentials",
      status: "error",
      duration: 2000,
      isClosable: true,
    });
  };

  const b = () => {
    toast({
      title: "Login Succesfull",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };
  const handleLogin = (e) => {
    e.preventDefault();

    axios({
      method: "post",
      url: "https://reqres.in/api/login",
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        if (res.data.token) {
          login(res.data.token);
          console.log(res.data.token);
          b();
        }
      })
      .catch((error) => {
        console.log(error);
        a();
      });
  };
  if (isAuth) {
    return <Navigate to="/cart" />;
  }

  return (
    <Box minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"2xl"}>Sign in to your account</Heading>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input
              value={email}
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
                console.log(email);
              }}
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              value={password}
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
                console.log(password);
              }}
            />
          </FormControl>
          <Stack spacing={6}>
            <Stack
              direction={{ base: "column", sm: "row" }}
              align={"start"}
              justify={"space-between"}
            >
              <Checkbox>Remember me</Checkbox>
              <Link color={"blue.500"}>Forgot password?</Link>
            </Stack>
            <Button
              onClick={handleLogin}
              colorScheme={"blue"}
              variant={"solid"}
            >
              Sign in
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1} gap={2}>
        {/* <Image
          alt={"Login Image"}
          objectFit={"cover"}
          height={"95%"}
          width={"50%"}
          src={
            "https://i.pinimg.com/originals/22/e2/4b/22e24b3b179ec2cb69d13bf22ef6b5e2.gif"
          }
        /> */}

        <Image
          alt={"Login Image"}
          objectFit={"cover"}
          height={"500px"}
          width={"100%"}
          src={
                 "https://as2.ftcdn.net/v2/jpg/04/23/97/69/1000_F_423976976_rkejQnlTV1sLgiMbLjJzYeHi8KyVf1EN.jpg"
           } 
        />
      </Flex>
      

      <Footer />
    </Box>
  );
}
