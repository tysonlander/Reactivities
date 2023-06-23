import { Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Button, Form, Grid, Header, Tab } from "semantic-ui-react";
import MyTextArea from "../../app/common/form/MyTextArea";
import MyTextInput from "../../app/common/form/MyTextInput";
import { Profile } from "../../app/models/profile";
import { useStore } from "stores/store";
import * as Yup from 'yup';

interface Props {
    profile: Profile;
}

export default observer(function ProfileAbout({ profile }: Props) {
    const { profileStore: { isCurrentUser, updateProfile } } = useStore();
    const [editProfileMode, setEditProfileMode] = useState(false);

    const validationSchema = Yup.object({
        displayName: Yup.string().required('The display name is required'),
        bio: Yup.string().nullable(),
    });

    function handleFormSubmit(profile: Profile) {
        updateProfile(profile).then(() => setEditProfileMode(false));
    }

    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width={16}>
                    <Header floated="left" icon='user' content={`About ${profile.displayName}`} />
                    {isCurrentUser && (
                        <Button floated="right" basic
                            content={editProfileMode ? 'Cancel' : 'Edit Profile'}
                            onClick={() => setEditProfileMode(!editProfileMode)} />
                    )}

                </Grid.Column>
                <Grid.Column width={16}>
                    {!editProfileMode && (<span style={{ whiteSpace: 'pre-wrap' }}>{profile?.bio}</span>)}
                    {editProfileMode && (
                        <>
                            <Formik
                                validationSchema={validationSchema}
                                enableReinitialize
                                initialValues={profile} onSubmit={values => handleFormSubmit(values)}>
                                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                                    <Form className='ui form' onSubmit={handleSubmit} >
                                        {/* <FormField>
                            <Field placeholder="Title" name="title" />
                            <ErrorMessage name='title' render={error => <Label basic color='red' content={error}/>}/>
                        </FormField> */}
                                        <MyTextInput placeholder="Display Name" name="displayName" />
                                        <MyTextArea
                                            rows={3}
                                            placeholder="Bio"
                                            name="bio"

                                        />
                                        <Button
                                            disabled={isSubmitting || !dirty || !isValid}
                                            loading={isSubmitting}
                                            floated="right"
                                            positive
                                            type="submit"
                                            content="Submit"
                                        />
                                        <Button
                                            floated="right"
                                            type="button"
                                            content="Cancel"
                                        />
                                    </Form>
                                )}
                            </Formik>
                        </>
                    )}
                </Grid.Column>
            </Grid>
        </Tab.Pane>

    );
});