import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { Favorite } from '@pages/Favorite/Favorite';
import { FiCheck, FiHeart, FiMapPin } from 'react-icons/fi';

import { Home } from '../Home/Home';

export function Landing() {
  return (
    <Tabs
      variant="enclosed"
      size="lg"
      isFitted
      defaultIndex={0}
      colorScheme="blackAlpha"
    >
      <TabList>
        <Tab>
          <FiMapPin className="text-3xl" />
        </Tab>
        <Tab>
          <FiHeart className="text-3xl" />
        </Tab>
        <Tab>
          <FiCheck className="text-3xl" />
        </Tab>
      </TabList>

      <TabPanels>
        <TabPanel className="container">
          <Home />
        </TabPanel>
        <TabPanel className="container">
          <Favorite />
        </TabPanel>
        <TabPanel>Cadastrar avaliação</TabPanel>
      </TabPanels>
    </Tabs>
  );
}
