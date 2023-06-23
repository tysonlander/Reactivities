import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Header, Label } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useStore } from "stores/store";
import Button from '@mui/material/Button';

export default observer(function LoginForm() {
    const { userStore } = useStore();
    return (
        <Formik
            initialValues={{ email: '', password: '', error: null }}
            onSubmit={(values, { setErrors }) => userStore.login(values).catch(error => setErrors({ error: error.response.data }))}
        >
            {({ handleSubmit, isSubmitting, errors }) => (
                <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content='Login to Reactivities' color="teal" textAlign="center" />
                    <MyTextInput placeholder="Email" name='email' />
                    <MyTextInput placeholder="Password" name='password' type='password' />
                    <ErrorMessage name="error"
                        render={() => <Label style={{ marginBottom: 10 }} basic color="red" content={errors.error} />}
                    />
                    {/* <Button loading={isSubmitting} positive content='Login' type="submit" fluid /> */}
                    <Button variant="contained" disabled={isSubmitting} fullWidth>MUI Button</Button>
                </Form>
            )}

        </Formik>
    );
});