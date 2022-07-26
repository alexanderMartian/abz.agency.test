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
import {useDispatch} from 'react-redux';
import Preloader from "../Preloader/Preloader";
import {yupValidationSchema} from "./yupValidationSchema/yupValidationSchema"

const RegistrationForm = () => {
  const [positions, setPositions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const [uploadFileName, setUploadFileName] = useState("Upload your photo");
  const dispatch = useDispatch();

  useEffect( () => {
    (async () => {
      try {
        const tokenResult = await instance.get("token");
        instance.defaults.headers.common['Token'] = tokenResult.data.token;
        const positionResult = await instance.get("positions");
        setPositions(positionResult.data.positions);
      } catch (e) {
        console.error(e);
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

  const formReset = (actions) => {
    actions.resetForm();
    setSelectedValue("Lawyer");
    setUploadFileName("Upload your photo");
  }

  const handleSubmit = async(values, actions) => {
      try {
        setIsLoading(true);
        const result = await instance.post("users", values);
        result.status === 201 && dispatch(switchState());
        formReset(actions);
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        formReset(actions);
      }
  };

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
                  <Form className={styles.form}>
                    {isLoading && <Preloader />}
                    <CustomField name="name" label="Your name" type="text" />
                    <CustomField name="email" label="Email" type="text" />
                    <CustomField name="phone" label="Phone" type="text" />
                    <RadioContainer
                      setFieldValue={setFieldValue}
                      positions={positions}
                      setSelectedValue={setSelectedValue}
                      selectedValue={selectedValue}/>
                    <UploadContainer
                      name="photo"
                      setFieldValue={setFieldValue}
                      uploadFileName={uploadFileName}
                      setUploadFileName={setUploadFileName}
                    />
                    <Button
                      text={"Sign up"}
                      type={'submit'}
                      disabled={!(dirty && isValid) || isSubmitting}
                    >Sign In</Button>
                  </Form>
                </>
              );
            }}
          </Formik>
    </div>
  );
}

export default RegistrationForm;