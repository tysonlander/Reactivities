import { useField } from "formik";
import ReactDatePicker, { ReactDatePickerProps } from "react-datepicker";
import { Form, Label } from "semantic-ui-react";

// interface Props {
//     placeholder: string;
//     name: string;
//     label?: string;
// }


export default function MyDateInput(props: Partial<ReactDatePickerProps>) {


    const [field, meta, helpers] = useField(props.name!);

    // double !! makes field into a boolean
    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <ReactDatePicker
                {...field}
                {...props}
                selected={(field.value && new Date(field.value)) || null}
                onChange={value => helpers.setValue(value)}
            />
            {meta.touched && meta.error ? (
                <Label basic color="red" >{meta.error}</Label>
            ) : null}
        </Form.Field>
    );
}