import { Box, IconButton } from '@chakra-ui/react';
import React from 'react';
// Here we have used react-icons package for the icons
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
// And react-slick as our Carousel Lib
import Slider from 'react-slick';

// Settings for the slider
const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: false,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1
};

export type CarouselProps = {
  children: React.ReactNode;
  className?: string;
};

export function Carousel({ children, className }: CarouselProps) {
  // As we have used custom buttons, we need a reference variable to
  // change the state
  const [slider, setSlider] = React.useState<Slider | null>(null);

  return (
    <Box
      position="relative"
      height="fit-content"
      width="full"
      overflow="hidden"
    >
      {/* CSS files for react-slick */}
      <link
        rel="stylesheet"
        type="text/css"
        charSet="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      {/* Left Icon */}
      <IconButton
        aria-label="left-arrow"
        colorScheme="transparent"
        color="primary"
        position="absolute"
        left="10px"
        top="50%"
        transform={'translate(0%, -50%)'}
        zIndex={2}
        onClick={() => slider?.slickPrev()}
      >
        <FiChevronLeft className="text-4xl" />
      </IconButton>
      {/* Right Icon */}
      <IconButton
        aria-label="right-arrow"
        colorScheme="transparent"
        color="primary"
        position="absolute"
        right="10px"
        top="50%"
        transform={'translate(0%, -50%)'}
        zIndex={2}
        onClick={() => slider?.slickNext()}
      >
        <FiChevronRight className="text-4xl" />
      </IconButton>
      {/* Slider */}
      <Slider
        {...settings}
        ref={(slider) => setSlider(slider)}
        className={className ?? ''}
      >
        {children}
      </Slider>
    </Box>
  );
}
