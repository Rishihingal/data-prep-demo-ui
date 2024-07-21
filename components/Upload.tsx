'use client';
import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import DataTable from './DataTable';
import { FaEye, FaEyeSlash, FaUpload } from 'react-icons/fa';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

const Upload: React.FC = () => {
  var [file, setFile] = useState<File | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [tableVisible, setTableVisible] = useState<boolean>(false);
  const [tableData, setTableData] = useState<string[][]>([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files![0];
    if (event.target.files) {
      setFile(event.target.files[0]);
      setDropdownOpen(false);
    }
    const reader = new FileReader();
        reader.onload = (e) => {
            const contents = e.target!.result;
            const rows = contents!.toString().split('\n');
            const data = rows.map(row => row.split(','));
            setTableData(data);
        };
        reader.readAsText(selectedFile);
  };
  const handleDrop = (event: any) => {
    const selectedFile = event.dataTransfer.files[0];
    event.preventDefault();
    if (event.dataTransfer.files) {
      setFile(event.dataTransfer.files[0]);
    }
    const reader = new FileReader();
        reader.onload = (e) => {
            const contents = e.target!.result;
            const rows = contents!.toString().split('\n');
            const data = rows.map(row => row.split(','));
            setTableData(data);
        };
        reader.readAsText(selectedFile);
  };

  const handleDragOver = (event: any) => {
    event.preventDefault();
  };

  const handleSubmit = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await axios.post('http://3.108.249.79:5000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'POST'
          },
        });
        console.log('File uploaded successfully:', response.data);
        setSnackbarMessage('File uploaded successfully!');
        setOpenSnackbar(true);
    } catch (error) {
        setSnackbarMessage('Error uploading file.');
        setOpenSnackbar(true);
    }
} else {
    setSnackbarMessage('Please select a file first.');
    setOpenSnackbar(true);
}
};

const handleCloseSnackbar = () => {
setOpenSnackbar(false);
};

  return (
    <>
      <div className="relative flex flex-col items-center bg-gray-900 p-6 rounded-lg shadow-lg">
        <div
          className="relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <input
            type="file"
            onChange={handleFileChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
          <div className="flex flex-col items-center">
            <FaUpload className="w-10 h-10 text-gray-400" />
            <span className="mt-2 text-sm text-gray-400">
              {file ? file.name : 'Drag & drop a file here or click to select a file'}
            </span>
          </div>
        </div>
{!openSnackbar && (<button
          onClick={handleSubmit}
          className="mt-4 bg-purple-700 text-purple-100 px-4 py-2 rounded-lg hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
        >
          Submit
        </button>)}

        {tableData.length !== 0 && (
          <button
            onClick={() => setTableVisible(!tableVisible)}
            className="mt-4 bg-purple-700 text-purple-100 px-4 py-2 rounded-lg hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 flex items-center"
          >
            {tableVisible ? <FaEyeSlash className="mr-2" /> : <FaEye className="mr-2" />}
            {tableVisible ? 'Hide Preview' : 'Show Preview'}
          </button>
        )}

        {tableVisible && <DataTable data={tableData} />}
      </div>

      {/* Snackbar for success message */}
      <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                action={
                    <Button color="inherit" onClick={handleCloseSnackbar}>
                        Close
                    </Button>
                }
            >
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
    </>
    
  );
};

export default Upload;
