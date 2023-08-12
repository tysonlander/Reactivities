import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, Grid, InputLabel, MenuItem, Stack, TextField, Typography, FormHelperText, OutlinedInput } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

// project import
import MainCard from 'components/MainCard';
import AnimateButton from 'components/@extended/AnimateButton';
import LoadingButton from 'components/@extended/LoadingButton';

// third party
import * as yup from 'yup';
import { Formik, useFormik, Form, FormikProvider, FormikValues } from 'formik';
import { v4 as uuid } from 'uuid';

// types
import { CompanyFormValues } from 'app/models/company';
import agent from 'api/agent';



// ==============================|| Company - CREATE ||============================== //

const CreateCompanyPage = () => {
    const navigate = useNavigate();
    const [company, setCompany] = useState<CompanyFormValues>(new CompanyFormValues());
    const [submitting, setSubmitting] = useState(true);

    const validationSchema = yup.object({
        name: yup.string().required('The company name is required'),
    });

    const handleFormSubmit = async (company: CompanyFormValues) => {
        try {
            let newCompany = { ...company, id: uuid() };
            await agent.Company.create(newCompany);
            navigate(`/service-hub/company/${newCompany.id}`);
        } catch (error) {
            console.log(error);
            setSubmitting(false);
        }
    };

    const handleCancel = () => {
        navigate(`service-hub/company/list`); // @todo: implement cancel
    };

    return (
        <>
            <Formik
                initialValues={company}
                validationSchema={validationSchema}
                onSubmit={value => handleFormSubmit(value)}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <MainCard>

                        <form noValidate onSubmit={handleSubmit}>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <Stack spacing={1}>
                                        <InputLabel sx={{ mb: 1, mt: 2 }} required>Company Name</InputLabel>
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
                                        <Button variant="outlined" color="secondary" onClick={handleCancel}>
                                            Cancel
                                        </Button>
                                        <LoadingButton
                                            type='submit'
                                            loading={isSubmitting}
                                            variant="contained"
                                            loadingIndicator="Creating..."
                                        >
                                            Create Company
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
};

export default CreateCompanyPage;