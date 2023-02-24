import React, { ReactNode, useContext } from "react";
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

import {  BsPersonCircle } from "react-icons/bs"
import { IconType } from "react-icons";
import { ReactText } from "react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import Picwithtext from "./Picwithtext";
// interface LinkItemProps {
//   name: string;
//   icon: IconType;
// }
const LinkItems = [
  { name: "Home", icon: FiHome, path: "/" , image: "https://www.elpolloloco.com/content/img/chicken-leg_1280.webp" },
  { name: "Our Food", icon: FiTrendingUp, path: "/product" , image : "https://olo-images-live.imgix.net/25/250b35cd407b4d1ca16560ee905ef78a.jpg?auto=format%2Ccompress&q=60&cs=tinysrgb&w=528&h=352&fit=fill&fm=png32&bg=transparent&s=f8e810555acf3015b276b447774aa3aa" },
  { name: "Our Story", icon: FiCompass, path: "/story", image:"https://www.jotform.com/blog/wp-content/uploads/2018/07/photos-with-story-featured-15.jpg" },
  { name: "Careers", icon: FiStar, path: "/career" , image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSG545aZz-C-PiQpj9SSJ0hDDVsfEaNTmYTw&usqp=CAU" },
  
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
      <MobileNav onOpen={onOpen} />

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
        <Image
          src="https://img.freepik.com/premium-vector/grill-time-handdrawn-inscription-slogan-food-court-logo-menu-restaurant-bar-cafe-vector-hot-dog_414360-2157.jpg"
          width={"200px"}
          height={"100%"}
        />

        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((e) => (
        <RouterLink key={e.path} to={e.path}>
        
        
          <Heading key={e.path}>{e.name}</Heading>
        
        </RouterLink>
      ))}
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
  const {isAuth ,  setIsAuth} = useContext(AuthContext) 
  const { colorMode, toggleColorMode } = useColorMode();
  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/product`; 
    
    navigate(path);
    
  }


  const sign = () => {
    let signup =  `/login`
    navigate(signup)
  }

  
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
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
        src="https://img.freepik.com/premium-vector/grill-time-handdrawn-inscription-slogan-food-court-logo-menu-restaurant-bar-cafe-vector-hot-dog_414360-2157.jpg"
        width={"200px"}
        height={"100%"}
      />

      <HStack spacing={{ base: "0", md: "6" }}>
        {/* <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        /> */}

        <Button onClick={toggleColorMode}>
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>

        <Button colorScheme='linkedin'  onClick={routeChange} backgroundColor={"red.800"} color={"white"} >Order Now</Button>
       
     
        {isAuth ? <Button colorScheme='linkedin' backgroundColor={"red.800"} onClick={()=>{setIsAuth(false); navigate("/") }}>Signout</Button> : <Button onClick={ sign  }>Sign In</Button>}
      </HStack>
    </Flex>
  );
};
