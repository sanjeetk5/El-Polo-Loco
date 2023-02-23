import React from 'react'
import {Box , Image} from "@chakra-ui/react"
import Sliders from "../Components/Sliders"
import Slidercard from "../Components/Slidercard"
import Picwithtext from "../Components/Picwithtext"
import Footer from "../Components/Footer";
const Home = () => {
  return (
    <Box ml={{ base: 0, md: 60 }} p="0">
       <Sliders/>
       <div >
        <Image src="https://www.elpolloloco.com/content/img/chicken-leg_1280.webp"  />
        </div>
        
        <div style={{marginTop:"5px"}}>
        <Slidercard />
        </div>
        <div >
        <Image src="https://www.elpolloloco.com/content/img/our-food_1280.webp" />
        </div>
       <div style={{marginTop:"5px"}}>
       <Image
          src="https://www.elpolloloco.com/content/img/catering_768.webp"
          width={"100%"}
        />
       </div>
       
        <Picwithtext/> */
        
        <Footer />
    </Box>
  )
}

export default Home