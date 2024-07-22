import React from 'react';
import { Card, CardContent, Typography, Box, Grid } from '@mui/material';

const renderContent = (data: object | null, level = 0) => {
  if (typeof data === 'object' && data !== null) {
    return Object.entries(data).map(([key, value], index) => (
      <Box key={index} sx={{ marginLeft: `${level * 20}px` }}>
        <Typography variant="body2">
          <strong>{key}:</strong> {typeof value === 'object' ? '' : value!.toString()}
        </Typography>
        {typeof value === 'object' && renderContent(value, level + 1)}
      </Box>
    ));
}
    else {
        return (
            <Typography variant="body2">
            {data!.toString()}
            </Typography>
        );
        
    }
};

const DynamicCard = ({ title, data }: { title: string , data: any}) => {
  return (
        <Card variant="outlined" sx={{ marginBottom: '20px', backgroundColor: '#5d5dff', color: '#f4f4ff' }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        {renderContent(data)}
      </CardContent>
    </Card>

  );
};

export default DynamicCard;
