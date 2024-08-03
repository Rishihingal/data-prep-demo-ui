import React, { useEffect, useState } from 'react';
import { Tabs, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Card } from '@mui/material';
import axios from 'axios';

interface SummaryStatistics {
    [key: string]: Record<string, number>;
}

interface DataTableProps {
    data: Record<string, number>;
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
    const columns = Object.keys(data);
    const values = Object.values(data);

    return (
        <TableContainer component={Paper} className="max-h-64 mt-5 bg-white rounded-lg overflow-auto">
            <Table size="medium" sx={{ bgcolor: 'Background.default' }}>
                <TableHead>
                    <TableRow sx={{ bgcolor: 'Background.default' }}>
                        {columns.map((column, index) => (
                            <TableCell key={index}>{column}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody sx={{ bgcolor: 'Background.default' }}>
                    <TableRow sx={{ bgcolor: 'Background.default' }}>
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
    const [tableData, setTableData] = useState<Record<string, number>>({});
    const [summaryStatistics, setSummaryStatistics] = useState<SummaryStatistics>({});

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const response = await axios.get('http://3.108.249.79:5000/stats', {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setSummaryStatistics(response.data['summary_statistics']);
            setTableData(response.data['summary_statistics'].mean);
        } catch (error) {
            console.log('Error getting data:', error);
        }
    };

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
        <Box className="flex flex-col items-center p-8 bg-white min-h-screen">
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
