import { toast } from "react-toastify";
import agent from "api/agent";
import useQuery from "../../app/util/hooks";
import { error } from "console";
import { Button, Header, Icon, Segment } from "semantic-ui-react";

export default function RegisterSuccess() {
    const email = useQuery().get('email') as string;

    function handleConfirmEmailResend() {
        agent.Account.resendEmailConfirm(email).then(() => {
            toast.success('Verification email resent - please chech your email');
        }).catch(error => console.log(error));
    }

    return (
        <Segment>
            <Header icon color="green">
                <Icon name="check" />
                Successfully registered!
            </Header>
            <p>Plese check your email (including junk email) for the verification email</p>
            {email && <>
                <p>Didn't receive the email? Click the below button to resend</p>
                <Button primary onClick={handleConfirmEmailResend} content='Resend email' size="huge" />
            </>}
        </Segment>
    );
}