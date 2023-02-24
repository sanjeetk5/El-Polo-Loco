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
  useToast ,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import axios from "axios"
import { AuthContext } from "../Context/AuthContext";
import { Navigate } from "react-router-dom";
export default function LoginPage() {
  const {login , isAuth} = useContext (AuthContext)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toast = useToast()

const a = () => {
  toast({
    title: "Invalid credentials",
    status: "error",
    duration : 2000,
    isClosable: true,
  });
}
  const handleLogin = (e) => {
    e.preventDefault()

    axios ({
      method : "post",
      url:"https://reqres.in/api/login",
      data : {
        email , 
        password
      }
    }).then((res) => {
      if(res.data.token) {
        login(res.data.token)
     console.log(res.data.token)
      }
    
    
    })
    .catch((error) => {
      console.log(error)
      a();
    })
  }
 if(isAuth){
  return <Navigate to= "/product" />
 }


  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
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
                console.log(password)
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
            <Button onClick={handleLogin} colorScheme={"blue"} variant={"solid"}>
              Sign in
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={"Login Image"}
          objectFit={"cover"}
          src={
            "https://www.pngfind.com/pngs/m/32-328784_fried-chicken-png-transparent-png.png"
          }
        />
      </Flex>
    </Stack>
  );
}
