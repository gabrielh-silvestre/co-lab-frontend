import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { Favorite } from '@pages/Favorite/Favorite';
import { MakeHome } from '@pages/Home';
import { RegisterEvaluation } from '@pages/RegisterEvaluation/RegisterEvaluation';
import { FiCheck, FiHeart, FiMapPin } from 'react-icons/fi';

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
          <MakeHome />
        </TabPanel>
        <TabPanel className="container">
          <Favorite />
        </TabPanel>
        <TabPanel className="container">
          <RegisterEvaluation />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
