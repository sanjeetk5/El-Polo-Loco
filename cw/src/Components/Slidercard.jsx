import React, { Component } from "react";
import Slider from "react-slick";

export default class Responsive extends Component {
  render() {
    var settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 4,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 420,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    return (
      <div>
       
        <Slider {...settings}>
          <div>
           <img src="https://www.elpolloloco.com/content/img/menu/menu-sides_1280.webp" alt="slider" />
           <h1 style={{fontSize : "30px"}} > <a href="#">Sides,Drinks & SALSAS  </a>   &#8594; </h1>
          
          </div>
          <div>
            <img src="https://www.elpolloloco.com/content/img/menu/tacos_tacoalcarbon_two_1160x870.webp" alt="slider" />
          </div>
          <div>
           <img src="https://www.elpolloloco.com/content/img/menu/M3-DblChickenTostada-1160x870.webp" alt="slider" />
          </div>
          <div>
            <img src="https://www.elpolloloco.com/content/img/menu/menu-family-dinners_1280.webp" alt="slider" />
          </div>
          <div>
           <img src="https://www.elpolloloco.com/content/img/menu/tacos_tacoalcarbon_two_1160x870.webp" alt="slider" />
          </div>
          <div>
           <img src="https://www.elpolloloco.com/content/img/menu/menu-kids-meals_1280.webp" alt="slider" />
          </div>
          <div>
           <img src="https://www.elpolloloco.com/content/img/menu/M3-ChickenAvoTaco-1160x870.webp" alt="slider" />
          </div>
          <div>
            <img src="https://www.elpolloloco.com/content/img/menu/OrigPolloBowlThigh-1160x870.webp" alt="slider" />
          </div>
        </Slider>
      </div>
    );
  }
}