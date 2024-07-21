import React, { useState } from 'react';
import { Tabs, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Card } from '@mui/material';

const summaryStatistics = {
    "mean": {
        "Age": 41.575,
        "Motivation_Score": 5.551,
        "Previous_Volunteer_Experience": 0.49,
        "Time_Availability": 10.834,
        "Volunteer_Suitability_Score": 0.496
    },
    "median": {
        "Age": 42.0,
        "Motivation_Score": 6.0,
        "Previous_Volunteer_Experience": 0.0,
        "Time_Availability": 11.0,
        "Volunteer_Suitability_Score": 0.0
    },
    "mode": {
        "Age": 43,
        "Motivation_Score": 6,
        "Previous_Volunteer_Experience": 0,
        "Time_Availability": 13,
        "Volunteer_Suitability_Score": 0
    },
    "standard_deviation": {
        "Age": 13.758792643251805,
        "Motivation_Score": 2.904375836561102,
        "Previous_Volunteer_Experience": 0.4998999899979995,
        "Time_Availability": 5.6528261958068375,
        "Volunteer_Suitability_Score": 0.4999839997439918
    }
};

interface DataTableProps {
    data: Record<string, number>;
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
    const columns = Object.keys(data);
    const values = Object.values(data);

    return (
        <TableContainer component={Paper} className="max-h-64 mt-5 bg-gray-900 rounded-lg overflow-auto">
            <Table size="medium" sx={{bgcolor:'Background.default'}}>
                <TableHead>
                    <TableRow sx={{bgcolor:'Background.default'}}>
                        {columns.map((column, index) => (
                            <TableCell key={index}>{column}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody sx={{bgcolor:'Background.default'}}>
                    <TableRow sx={{bgcolor:'Background.default'}}>
                        {values.map((value, index) => (
                            <TableCell key={index}>{value}</TableCell>
                        ))}
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
};

const Eda: React.FC = () => {
    const [value, setValue] = useState(0);
    const [tableData, setTableData] = useState<Record<string, number>>(summaryStatistics.mean);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        switch (newValue) {
            case 0:
                setTableData(summaryStatistics.mean);
                break;
            case 1:
                setTableData(summaryStatistics.median);
                break;
            case 2:
                setTableData(summaryStatistics.mode);
                break;
            case 3:
                setTableData(summaryStatistics.standard_deviation);
                break;
            default:
                setTableData(summaryStatistics.mean);
                break;
        }
    };

    return (
        <Box className="flex flex-col items-center p-8 bg-gray-900 min-h-screen">
            <Tabs value={value} onChange={handleTabChange} aria-label="summary statistics tabs">
                <Tab label="Mean" />
                <Tab label="Median" />
                <Tab label="Mode" />
                <Tab label="Standard Deviation" />
            </Tabs>
            <Box mt={2} width="100%">
                <DataTable data={tableData} />
            </Box>
        </Box>
    );
};

export default Eda;
