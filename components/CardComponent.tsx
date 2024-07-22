import React from 'react';
import { Paper, Grid } from '@mui/material';

interface CardComponentProps {
    data: { [key: string]: any }[];
}

const CardComponent: React.FC<CardComponentProps> = ({ data }) => {
    return (
        <Grid container spacing={2}>
            {data.map((card, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        {Object.entries(card).map(([key, value], index) => (
                            <div key={index}>
                                <strong>{key}</strong>: {value}
                            </div>
                        ))}
                    </Paper>
                </Grid>
            ))}
        </Grid>
    );
};

export default CardComponent;