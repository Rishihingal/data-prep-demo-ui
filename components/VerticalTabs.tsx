'use client'
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Input } from '@mui/material';
import Upload from './Upload';
import Eda from './Eda';
import ModelSelection from './ModelSelection';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
        <Box
        sx={{ flexGrow: 1, bgcolor: 'background.default', display: 'flex', alignContent: 'center', justifyContent: 'center' }}
        >
        <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: 'divider', color: 'text.primary' }}
        >
            <Tab label="Upload Data" {...a11yProps(0)} />
            <Tab label="Exploratory Data Analysis (EDA)" {...a11yProps(1)} />
            <Tab label="Model Selection and Training" {...a11yProps(2)} />
            <Tab label= "Prediction"  {...a11yProps(3)}/>
            <Tab label="Model Management" {...a11yProps(4)} />
        </Tabs>
        <TabPanel value={value} index={0} children={<Upload />}/>
        <TabPanel value={value} index={1}>
          <Eda />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <ModelSelection />
        </TabPanel>
        <TabPanel value={value} index={3}>
        Prediction 
        </TabPanel>
        <TabPanel value={value} index={4}>
        Model Management
        </TabPanel>
        </Box>
  );
}