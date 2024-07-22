import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, MenuItem, Select, Box, Typography, Tab, Tabs } from '@mui/material';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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

  const renderAccuracyChart = (accuracy: number, title: string) => {
    const chartData = {
      labels: ['Accuracy'],
      datasets: [
        {
          label: 'Accuracy',
          backgroundColor: '#6200ea',
          borderColor: '#6200ea',
          borderWidth: 1,
          data: [accuracy],
        },
      ],
    };

    return (
      <Box sx={{ marginTop: '20px', width: '100%', height: '60px' }}>
        <Bar
          data={chartData}
          options={{
            indexAxis: 'y',
            scales: {
              x: {
                min: 0,
                max: 1,
                title: {
                  display: true,
                  text: 'Accuracy',
                  padding: { top: 20, bottom: 20 },
                },
              },
              y: {
                display: false,
              },
            },
            plugins: {
              legend: {
                display: false,
                position: 'left',
              },
              tooltip: {
                callbacks: {
                  label: (context: any) => `Accuracy: ${context.raw.toFixed(2)}`,
                },
              },
            },
          }}
        />
      </Box>
    );
  };

  const handleModelChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setSelectedModel(event.target.value);
  };

  const handleTabChange = (event: any, newValue: React.SetStateAction<number>) => {
    setSelectedTab(newValue);
  };

  const renderBarChart = (data: { [s: string]: unknown; } | ArrayLike<unknown> | null) => {
    if (typeof data !== 'object' || data === null) return null;

    const labels = Object.keys(data);
    const values = Object.values(data).map(value => (typeof value === 'object' ? JSON.stringify(value) : value));

    const chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Values',
          backgroundColor: '#6200ea',
          borderColor: '#6200ea',
          borderWidth: 1,
          hoverBackgroundColor: '#3700b3',
          hoverBorderColor: '#3700b3',
          data: values,
        },
      ],
    };

    return (
      <Box sx={{ marginTop: '30px', height: '400px', marginBottom: '30px' }}>
        <Bar data={chartData} options={{ maintainAspectRatio: false }} />
      </Box>
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
          sx={{ color: '#e0e0e0' }}
        >
          <MenuItem value="SVG">SVG</MenuItem>
        </Select>
      </FormControl>
      {accuracy !== null && ( renderAccuracyChart(accuracy, 'Accuracy')
      )}
      {selectedModel === 'SVG' && modelData && (
        <>
          <Tabs value={selectedTab} onChange={handleTabChange} sx={{ marginTop: '20px', borderBottom: 1, borderColor: 'divider' }}>
            {Object.keys(modelData).map((key, index) => (
              <Tab key={index} label={key} sx={{ color: '#e0e0e0' }} />
            ))}
          </Tabs>
          {renderBarChart(modelData[Object.keys(modelData)[selectedTab]])}
        </>
      )}
    </Box>
  );
};

export default ModelSelection;
