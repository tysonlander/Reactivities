import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { observer } from "mobx-react-lite";

// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, Grid, InputLabel, MenuItem, Stack, TextField, Typography, FormHelperText, OutlinedInput } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

// project import
import MainCard from 'components/MainCard';
import AnimateButton from 'components/@extended/AnimateButton';
import LoadingButton from 'components/@extended/LoadingButton';
import { useStore } from "stores/store";

// third party
import * as yup from 'yup';
import { Formik, useFormik, Form, FormikProvider, FormikValues } from 'formik';
import { enqueueSnackbar } from 'notistack';

// types
import { CompanyFormValues } from 'app/models/company';
import agent from 'api/agent';

// ==============================|| Company - View Details ||============================== //

const CompanyDetailsPage = observer(() => {
    const { companyId } = useParams();
    const { companyStore, snackbarStore } = useStore();
    const [company, setCompany] = useState<CompanyFormValues>(new CompanyFormValues());
    const [submitting, setSubmitting] = useState(true);

    useEffect(() => {
        const loadCompany = async () => {
            if (companyId) {
                await companyStore.loadCompany(companyId);
                setCompany(new CompanyFormValues(companyStore.company!));
            }

        };
        loadCompany();
    }, [companyId]);

    const validationSchema = yup.object({
        name: yup.string().required('The company name is required'),
    });

    const handleFormSubmit = async (company: any) => {
        await agent.Company.update(company);
        // snackbarStore.openSnackbar({
        //     open: true,
        //     message: 'Company successfully updated.',
        //     variant: 'alert',
        //     alert: {
        //         color: 'success'
        //     },
        //     // close: false
        // });
        enqueueSnackbar('Successfully updated.', { variant: 'success' });
    };


    if (companyStore.loading || !companyStore.company) return (<h1>loading...</h1>);

    return (
        <>
            <Formik
                initialValues={company}
                validationSchema={validationSchema}
                onSubmit={value => handleFormSubmit(value)}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <MainCard title='Company Details'>

                        <form noValidate onSubmit={handleSubmit}>
                            <Grid container spacing={1}>

                                <Grid item>
                                    <Typography >Company ID: {company.id}</Typography>

                                </Grid>
                                <Grid item xs={12}>

                                    <Stack>
                                        <InputLabel required sx={{ mb: .5 }}>Company Name</InputLabel>
                                        <TextField
                                            fullWidth
                                            id="name"
                                            value={values.name}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            error={Boolean(touched.name && errors.name)}
                                        />
                                        {touched.name && errors.name && (
                                            <FormHelperText error id="helper-text-name">
                                                {errors.name}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12}>
                                    <Stack direction="row" spacing={2} justifyContent="right" alignItems="center" sx={{ mt: 8 }}>
                                        <LoadingButton
                                            type='submit'
                                            loading={isSubmitting}
                                            variant="contained"
                                            loadingIndicator="Updating..."
                                        >
                                            Update
                                        </LoadingButton>
                                    </Stack>
                                </Grid>

                            </Grid>
                        </form>
                    </MainCard>
                )}
            </Formik >
        </>
    );
});

export default CompanyDetailsPage;