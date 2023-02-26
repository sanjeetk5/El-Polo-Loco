import React, {
  ReactNode,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import Sliders from "./Sliders";
import Footer from "./Footer";
import Slidercard from "./Slidercard";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Image,
  View,
  ImageBackground,
  Button,
  useColorMode,
  Heading,
  chakra,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
} from "react-icons/fi";
import { AuthContext } from "../Context/AuthContext";

import { BsPersonCircle } from "react-icons/bs";
import { IconType } from "react-icons";
import { ReactText } from "react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import Picwithtext from "./Picwithtext";
import axios from "axios";
// interface LinkItemProps {
//   name: string;
//   icon: IconType;
// }
const LinkItems = [
  {
    name: "Home",
    icon: FiHome,
    path: "/",
    image: "https://www.elpolloloco.com/content/img/chicken-leg_1280.webp",
  },
  {
    name: "Our Food",
    icon: FiTrendingUp,
    path: "/product",
    image:
      "https://olo-images-live.imgix.net/25/250b35cd407b4d1ca16560ee905ef78a.jpg?auto=format%2Ccompress&q=60&cs=tinysrgb&w=528&h=352&fit=fill&fm=png32&bg=transparent&s=f8e810555acf3015b276b447774aa3aa",
  },
  {
    name: "Our Story",
    icon: FiCompass,
    path: "/story",
    image:
      "https://www.jotform.com/blog/wp-content/uploads/2018/07/photos-with-story-featured-15.jpg",
  },
  {
    name: "Careers",
    icon: FiStar,
    path: "/career",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSG545aZz-C-PiQpj9SSJ0hDDVsfEaNTmYTw&usqp=CAU",
  },
];

// const NavLink = ({ children }) => (
//   <Link
//     px={2}
//     py={1}
//     rounded={"md"}
//     _hover={{
//       textDecoration: "none",
//       bg: useColorModeValue("gray.200", "gray.700"),
//     }}
//     href={"#"}
//   >
//     {children}
//   </Link>
// );
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
export default function SidebarWithHeader({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />

      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
        
      </Drawer>

      

      {/* mobilenav */}
      <MobileNav onOpen={onOpen} onClose={onClose} />

      <Box ml={{ base: 0, md: 60 }} p="0">
        {children}
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
       <RouterLink to="/">
       <Image
          src="https://i.pinimg.com/originals/35/0f/cb/350fcb6529f030fb72213c88f3137394.gif"
          width={"150px"}
          height={"100%"}
        />
       </RouterLink>

        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((e) => (
        <RouterLink key={e.path} to={e.path}>
          <Heading  fontSize={"25px"} key={e.path}>{e.icon}{e.name}</Heading>
        </RouterLink>
      ))}
      <Image src="https://i.gifer.com/origin/ca/cacaa11091931d565bfab63f4303f2b4.gif"/>
      <Heading fontSize={"8px"}>Super Fast Deliver Within 30 Minutes</Heading>
      <br />
      <Image src="https://miro.medium.com/max/1400/1*XSXaAJ0P84ytMjQzKMPcPg.gif" />
      <Heading fontSize={"8px"}>Order From Your favoutites restaurants</Heading>
      <br />
      <Image src="https://images.milledcdn.com/2020-06-19/o3o-fvmbsDsQNRBF/wp_zYPj1mOyY.gif"/>
      <Heading fontSize={"8px"}>Your Food cart is here</Heading>
    </Box>
  );
};

// interface NavItemProps extends FlexProps {
//   icon: IconType;
//   children: ReactText;
// }
const NavItem = ({ icon, children, ...rest }) => {
  return (
    <Link
      href="#"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

// interface MobileProps extends FlexProps {
//   onOpen: () => void;
// }
const MobileNav = ({ onOpen, ...rest }) => {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const { colorMode, toggleColorMode } = useColorMode();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { data, isLoading, error } = state;
  
  const[totalcart , setTotalCart] = useState("")

  const getData = () => {
    dispatch({ type: "Request" });

    axios
      .get(`https://json-server-example-ma0w.onrender.com/cart`)
      .then((res) => {
        dispatch({ type: "Sucess", payload: res.data });
        // console.log(res.data);
        // console.log(res.data.length);
        setTotalCart(res.data.length)
      })
      .catch((err) => {
        dispatch({ type: "Failure", payload: err.message });
      });
  };
  //  const handlePost = async ()=> {
  //   try{
  //     return axios ({
  //       method : "post",
  //       url : `http://localhost:${process.env.REACT_APP_JSON_SERVER_PORT}/cart`,
  //     }).then (() => getData())
  //   } catch(error) {
  //     console.log(error)
  //   }
  //  }

  useEffect(() => {
    getData();
  }, [data]);


  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/product`;

    navigate(path);
  };

  const sign = () => {
    let signup = `/login`;
    navigate(signup);
  };

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-evenly", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Image
        display={{ base: "flex", md: "none" }}
        src="https://i.pinimg.com/originals/35/0f/cb/350fcb6529f030fb72213c88f3137394.gif"
        width={"150px"}
        height={"100%"}
      />

      <HStack justifyContent={"space-evenly"} spacing={{ base: "0", md: "4" }}>
        {/* <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        /> */}

        <Button onClick={toggleColorMode} cursor={"pointer"}>
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>

        {/* <Button
          colorScheme="linkedin"
          onClick={routeChange}
          backgroundColor={"red.800"}
          color={"white"}
        >
          Order Now
        </Button> */}

        {isAuth ? (
          <Button
            colorScheme="linkedin"
            backgroundColor={"red.800"}
            onClick={() => {
              setIsAuth(false);
              navigate("/");
            }}
          >
            Signout
          </Button>
        ) : (
          <Button onClick={sign}>Sign In</Button>
        )}

        <RouterLink to="/cart">
          <chakra.span pos="relative" display="inline-block" cursor={"pointer"}>
            <Icon
              boxSize={6}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </Icon>
            <chakra.span
              pos="absolute"
              top="-1px"
              right="-1px"
              px={2}
              py={1}
              fontSize="xs"
              fontWeight="bold"
              lineHeight="none"
              color="red.100"
              transform="translate(50%,-50%)"
              bg="red.600"
              rounded="full"
            >
              {data.length}
            </chakra.span>
          </chakra.span>
        </RouterLink>
      </HStack>
    </Flex>
  );
};
