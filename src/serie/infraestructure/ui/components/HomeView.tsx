import { Box, Tab, Tabs } from '@mui/material';
import { CustomTabPanel, TabIndex } from './CustomTabPanel';
import { SyntheticEvent, useState } from 'react';

import CharacterList from './Character/CharacterList';
import EpisodeList from './Episode/EpisodeList';
import { Helmet } from 'react-helmet-async';
import Layout from '../../../../layout/Layout';
import LocationList from './Location/LocationList';

const SerieTabs = () => {
  const [value, setValue] = useState(
    parseInt(localStorage.getItem('tab') ?? TabIndex.character.toString())
  );

  const handleChange = (event: SyntheticEvent, newValue: TabIndex) => {
    localStorage.setItem('tab', newValue.toString());
    setValue(newValue);
  };

  return (
    <>
      <Helmet>
        <title>RentApp | Home Page</title>
      </Helmet>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example">
          <Tab label="Character" />
          <Tab label="Location" />
          <Tab label="Episode" />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={TabIndex.character}>
        <CharacterList />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={TabIndex.location}>
        <LocationList />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={TabIndex.episode}>
        <EpisodeList />
      </CustomTabPanel>
    </>
  );
};

const HomeView = () => (
  <Layout>
    <SerieTabs />
  </Layout>
);
export default HomeView;
