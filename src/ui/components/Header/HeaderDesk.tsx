import logo from '@assets/logo-header.svg';
import { Box, Image } from '@chakra-ui/react';
import { FiHeart } from 'react-icons/fi';
import { Link } from 'react-router-dom';

type HeaderDeskProps = {
  location: 'home' | 'companies' | 'contribute';
};

export function HeaderDesk({ location }: HeaderDeskProps) {
  return (
    <Box
      as="header"
      className="w-full px-16 py-4 flex justify-between items-center bg-primary"
    >
      <div>
        <Image
          w={105}
          h={51}
          objectFit="cover"
          src={logo}
          alt="Emilia logo"
          fallbackSrc="https://via.placeholder.com/50"
        />
      </div>

      <div>
        <nav className="flex text-xl font-bold">
          <Box textColor={location === 'home' ? 'background' : 'black'}>
            <Link to="/">Home</Link>
          </Box>
          <Box
            textColor={location === 'companies' ? 'background' : 'black'}
            className="ml-3"
          >
            <Link to="/companies/search">Empresas</Link>
          </Box>
          <Box
            textColor={location === 'contribute' ? 'background' : 'black'}
            className="ml-3"
          >
            Contribuir
          </Box>
        </nav>
      </div>

      <div className="flex items-center">
        <button type="button">
          <FiHeart className="text-backgorund w-8 h-8 mr-4" />
        </button>
        <button
          type="button"
          className="bg-backgorund rounded-full text-primary text-xs py-1 px-4"
        >
          Entrar
        </button>
      </div>
    </Box>
  );
}
