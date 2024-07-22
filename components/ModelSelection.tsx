import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, MenuItem, Select, Box, Typography, Tab, Tabs, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';

const ModelSelection = () => {
  const [selectedModel, setSelectedModel] = useState('');
  const [modelData, setModelData] = useState(null);
  const [accuracy, setAccuracy] = useState(null);
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    if (selectedModel === 'SVG') {
      getModelsData();
    }
  }, [selectedModel]);

  const getModelsData = async () => {
    try {
      const response = await axios.get('http://3.108.249.79:5000/train_model', {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = response.data['model_report'];
      setAccuracy(data.accuracy);
      delete data.accuracy;
      setModelData(data);
    } catch (error) {
      console.log('Error getting data:', error);
    }
  };

  const handleModelChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setSelectedModel(event.target.value);
  };

  const handleTabChange = (event: any, newValue: React.SetStateAction<number>) => {
    setSelectedTab(newValue);
  };

  const renderTable = (data: { [s: string]: unknown; } | ArrayLike<unknown> | null) => {
    if (typeof data !== 'object' || data === null) return null;
    console.log(data);
    return (
      <TableContainer component={Paper} sx={{ backgroundColor: '#1e1e1e', color: '#e0e0e0', marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              {Object.keys(data).map((key, index) => (
                <TableCell key={index} sx={{ color: '#e0e0e0' }}>{key}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              {Object.values(data).map((value, index) => (
                <TableCell key={index} sx={{ color: '#e0e0e0' }}>
                    {value!.toString()}
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <Box sx={{ marginTop: '20px' }}>
      <FormControl variant="filled" fullWidth>
        <InputLabel id="model-select-label" sx={{ color: '#e0e0e0' }}>Select a Model</InputLabel>
        <Select
          labelId="model-select-label"
          id="model-select"
          value={selectedModel}
          onChange={handleModelChange}
          sx={{ color: '#e0e0e0', width: '200px' }}
        >
          <MenuItem value="SVG">SVG</MenuItem>
        </Select>
      </FormControl>
      {accuracy !== null && (
        <Typography variant="h6" sx={{ color: '#e0e0e0', marginTop: '10px' }}>
          Accuracy: {accuracy}
        </Typography>
      )}
      {selectedModel === 'SVG' && modelData && (
        <>
          <Tabs value={selectedTab} onChange={handleTabChange} sx={{ marginTop: '20px', borderBottom: 1, borderColor: 'divider' }}>
            {Object.keys(modelData).map((key, index) => (
              <Tab key={index} label={key} sx={{ color: '#e0e0e0' }} />
            ))}
          </Tabs>
          {renderTable(modelData[Object.keys(modelData)[selectedTab]])}
        </>
      )}
    </Box>
  );
};

export default ModelSelection;
