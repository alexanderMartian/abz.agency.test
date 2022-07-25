import styles from "./RegistrationForm.module.scss";
import {useEffect, useState} from 'react';
import {Form, Formik} from 'formik';
import * as yup from 'yup';
import CustomField from "../CustomField/CustomField";
import Button from "../Button/Button";
import RadioContainer from "../RadioContainer/RadioContainer";
import UploadContainer from "../UploadContainer/UploadContainer";
import instance from "../../api/instance";
import {switchState} from "../../store/reducers/userReducer";
import {showMessage} from "../../store/reducers/messageReducer";
import {useDispatch} from 'react-redux';
import Preloader from "../Preloader/Preloader";

const RegistrationForm = () => {
  const [positions, setPositions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect( () => {
    (async () => {
      try {
        const tokenResult = await instance.get("token");
        instance.defaults.headers.common['Token'] = tokenResult.data.token;
        const positionResult = await instance.get("positions");
        setPositions(positionResult.data.positions)
      } catch (e) {
        console.error(e)
      }
    })();
  }, [])

  const initialValues = {
    name: '',
    email: '',
    phone: '',
    position_id: 0,
    photo: null,
  };

  const handleSubmit = async(values, actions) => {
      try {
        setIsLoading(true);
        const result = await instance.post("users", values);
        result.status === 201 && dispatch(switchState())
        actions.resetForm();
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        dispatch(
          showMessage({text: e.response.data.message, type: 'error'}),
        );
      }
  };

  const yupValidationSchema = yup.object().shape({
    name: yup.string()
      .required('Field is required')
      .min(2, 'Min. 2 characters required')
      .max(60, 'Too long name!'),
    email: yup.string()
      .required('Field is required')
      .email('Wrong email address entered'),
    phone: yup.string()
      .required('Field is required')
      .matches(/^[+]{0,1}380([0-9]{9})$/, "Incorrect phone format"),
    photo: yup
      .mixed()
      .required('You must to upload a file')
      .test("fileSize", "The file is too big", (value) => {
        return value && value.size <= 5242880;
      })
      .test("fileWidthHeight", "The file width and height must be 70px min", (value) => {
        if (value) {
          const url = window.URL || window.webkitURL;
          const img = new Image();
          img.src = url.createObjectURL(value);
          img.onload = function () {
            return (this.width > 70 && this.height > 70)
          };
        }
        return true;
      })
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Working with POST request</h1>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={yupValidationSchema}>
            { ({dirty, isValid, setFieldValue, isSubmitting}) => {

              return (
                <>
                  {isLoading && <Preloader />}
                  <Form className={styles.form}>
                    <CustomField name="name" label="Your name" type="text" />
                    <CustomField name="email" label="Email" type="text" />
                    <CustomField name="phone" label="Phone" type="text" />
                    <RadioContainer setFieldValue={setFieldValue} positions={positions}/>
                    <UploadContainer name="photo" setFieldValue={setFieldValue}/>
                    <Button text={"Sign up"} type={'submit'} disabled={!(dirty && isValid) || isSubmitting}>Sign In</Button>
                  </Form>
                </>
              );
            }}
          </Formik>
    </div>
  );
}

export default RegistrationForm;