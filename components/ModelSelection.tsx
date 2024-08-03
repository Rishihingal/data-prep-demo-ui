import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, MenuItem, Select, Box, Typography, Tab, Tabs, Modal } from '@mui/material';
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
import { FaInfoCircle} from 'react-icons/fa';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ModelSelection = () => {
  const [selectedModel, setSelectedModel] = useState('logistic_regression');
  const [modelData, setModelData] = useState(null);
  const [accuracy, setAccuracy] = useState(null);
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
      getModelsData();
  }, [selectedModel]);

  const getModelsData = async () => {
    try {
      const response = await axios.get(`http://3.108.249.79:5000/train_model?model=${selectedModel}`, {
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
      <Box sx={{ marginTop: '20px', width: '100%', height: '60px', alignItems: 'center',  }}>
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
    // remove support from labels
    labels.splice(labels.indexOf('support'), 1);
    const values = Object.values(data as { [s: string]: unknown; }).map(value => (typeof value === 'object' ? JSON.stringify(value) : value));
    // remove support from values
    values.splice(values.indexOf((data as { [s: string]: undefined; })['support']), 1);

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

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <Box sx={{ marginTop: '20px', width: '400px' }}>
      <FormControl variant="filled" fullWidth>
        <InputLabel id="model-select-label" sx={{ color: 'black' }}>Select a Model</InputLabel>
        <Select
          labelId="model-select-label"
          id="model-select"
          value={selectedModel}
          onChange={handleModelChange}
          sx={{ color: 'black', width: '200px', height: '53px' }}
        >
          <MenuItem value="svm">Support Vector Machine</MenuItem>
          <MenuItem value="logistic_regression">Logistic Regression</MenuItem>
          <MenuItem value="random_forest">Random Forest</MenuItem>
        </Select>
        <FaInfoCircle
          style={{ position: 'absolute', right: '4px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}
          onClick={handleModalOpen}
        />
      </FormControl>
      {accuracy !== null && (renderAccuracyChart(accuracy, 'Accuracy'))}
      {selectedModel && modelData && (
        <>
          <Tabs value={selectedTab} onChange={handleTabChange} sx={{ marginTop: '20px', borderBottom: 1, borderColor: 'divider' }}>
            {Object.keys(modelData).map((key, index) => (
              <Tab key={index} label={key} sx={{ color: 'black' }} />
            ))}
          </Tabs>
          {renderBarChart(modelData[Object.keys(modelData)[selectedTab]])}
        </>
      )}
      {selectedModel === 'LR' && (
        <Typography variant="h6" component="h2" sx={{ marginTop: '20px' }}>
          Logistic Regression Model Selected
        </Typography>
      )}
      {selectedModel === 'RFC' && (
        <Typography variant="h6" component="h2" sx={{ marginTop: '20px' }}>
          Random Forest Classifier Model Selected
        </Typography>
      )}
      {isModalOpen && (
        <Modal open={isModalOpen} onClose={handleModalClose}>
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
            <Typography variant="h6" component="h2">
              Model Info
            </Typography>
            <Typography sx={{ mt: 2 }}>
            <p style={{ marginTop: '8px' }}>
            {selectedModel === 'logistic_regression' && (
              <>
                <b>Logistic Regression:</b>
                <br />
                <li>Why It Works Well: It's great for yes/no type questions (like whether someone will volunteer or not). Logistic Regression provides probabilities, which means it can tell you not just whether someone might volunteer, but how likely they are to do so. This is really useful if you want to measure how confident you are in your predictions.</li>
              </>
            )}
            {selectedModel === 'random_forest' && (
              <>
                <b>Random Forest Classifier:</b>
                <br />
                <li>Why It Works Well: This method uses multiple decision trees to make a decision, which generally gives more accurate results than using a single decision tree. It's good at dealing with different types of data and lots of features, and it can handle complex patterns that Logistic Regression might miss. Like Logistic Regression, it can also estimate the likelihood of someone volunteering, though it does this in a slightly more indirect way.</li>
              </>
            )}
            {selectedModel === 'svm' && (
              <>
                <b>Support Vector Machine (SVM):</b>
                <br />
                <li>Why It Works Well: SVM is effective for classification tasks like determining if a volunteer is suitable or not. It works by finding the best boundary (or hyperplane) that separates different classes in the dataset. One of SVM’s strengths is its ability to handle high-dimensional data (lots of features) well. It's particularly good when the distinction between the classes is clear and can be captured by the boundaries it calculates.</li>
              </>
            )}
          </p>
            </Typography>
          </Box>
        </Modal>
      )}
    </Box>
  );
};

export default ModelSelection;
