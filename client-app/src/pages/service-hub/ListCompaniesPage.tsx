import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';


// material-ui

import { alpha, useTheme } from '@mui/material/styles';
import {
    Button,
    Chip,
    Dialog,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow,
    Tooltip,
    Typography,
    useMediaQuery
} from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import agent from "api/agent";

// assets
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { WorkOutlined } from '@mui/icons-material';


const ListCompaniesPage = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

    const [companies, setCompanies] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [pagination, setPagination] = useState<any>({
        currentPage: 1,
        itemsPerPage: 10,
        totalItems: 0,
        totalPages: 0
    });

    useEffect(() => {
        const loadCompanies = async () => {
            const result: any = await agent.Company.list();
            console.log(result);
            setCompanies(result.data ? result.data : []);
            // set pagination
        };
        loadCompanies();
    }, []);


    const handleAddCompany = () => {
        navigate(`/service-hub/company/create`);
    };

    const handleEditCompany = (companyId: string) => {
        navigate(`/service-hub/company/${companyId}`);
    };

    function handleChangePage(page: any): void {
        throw new Error('Function not implemented.');
    }

    function handleChangeRowsPerPage(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void { }



    return (
        <MainCard content={false}>
            <Stack spacing={3}>
                <Stack
                    direction={matchDownSM ? 'column' : 'row'}
                    spacing={1}
                    justifyContent="flex-end"
                    alignItems="center"
                    sx={{ p: 3, pb: 0 }}
                >

                    <Button variant="contained" startIcon={<AddRoundedIcon />} onClick={handleAddCompany} size="small">
                        Add company
                    </Button>
                </Stack>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell >Company Name</TableCell>
                            <TableCell align='right'>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {companies.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align='right'>
                                    <Button variant="outlined" onClick={() => handleEditCompany(row.id)}>view</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                component="div"
                                rowsPerPageOptions={[10, 25, 100]}
                                count={companies.length}
                                rowsPerPage={pagination.itemsPerPage}
                                page={pagination.currentPage}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />

                        </TableRow>



                    </TableFooter>
                </Table>
            </Stack>

        </MainCard>
    );
};

export default ListCompaniesPage;