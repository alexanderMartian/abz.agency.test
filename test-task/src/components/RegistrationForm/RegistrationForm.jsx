import styles from "./RegistrationForm.module.scss";
import axios from 'axios';
import {useEffect, useState} from 'react';
import {Form, Formik, Field} from 'formik';
import * as yup from 'yup';
import CustomField from "../CustomField/CustomField";
import Button from "../Button/Button";
import RadioItem from "../RadioItem/RadioItem";
import { Radio } from '@mui/material';
import RadioContainer from "../RadioContainer/RadioContainer";
import UploadContainer from "../UploadContainer/UploadContainer";
import instance from "../../api/instance";


const RegistrationForm = () => {
  const url = "https://frontend-test-assignment-api.abz.agency/api/v1/positions";
  const [positions, setPositions] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [token, setToken] = useState("");


  useEffect( () => {
    (async () => {
        try {
          const result = await axios.get(url);
          setPositions(result.data.positions)

        } catch (e) {
          console.error(e);
        }
      }
    )()
  }, [])

  useEffect( () => {
    (async () => {
      try {
        const result = await instance.get("token");
        console.log(result, "result")
        setToken(result.data.token)
        instance.defaults.headers.common['Token'] = result.data.token;
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

  const handleSubmit = (values) => {

        (async () => {
      try {
        // setIsLoading(true);
        console.log(values)
        // const config = {
        //   headers: { Token: `${token}` }
        // };

        // console.log(config,  "config")

        console.log(instance.defaults.headers.common['Token'], "token")
        const result = await instance.post("users", values);
        console.log(result, "result")
        // if (payload) {
        //   setIsCorrect(true);
        //   setIsLoading(false);
        //   closeModal();
        // }
        // setIsLoading(false);
        // setIsCorrect(false);
      } catch (e) {
        console.log(e)
        // setIsLoading(false);
        // dispatch(
        //   showMessage({text: 'Something went wrong, please try to reload page', type: 'error'}),
        // );
      }
    })();
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
            { ({dirty, isValid, setFieldValue}) => {

              return (
                <>
                  {/*{isLoading && <Preloader />}*/}
                  <Form className={styles.form}>
                    <CustomField name="name" label="Your name" type="text" />
                    <CustomField name="email" label="Email" type="text" />
                    <CustomField name="phone" label="Phone" type="text" />
                    <RadioContainer setFieldValue={setFieldValue} positions={positions}/>
                    {/*/!*<div className={styles.wrapper}>*!/*/}
                    {/*/!*  <span className={styles.incorrect}>*!/*/}
                    {/*/!*    {!isCorrect && 'Incorrect login or password'}*!/*/}
                    {/*/!*  </span>*!/*/}
                    {/*/!*</div>*!/*/}
                    <UploadContainer name="photo" setFieldValue={setFieldValue}/>
                    <Button text={"Sign up"} type={'submit'} disabled={!(dirty && isValid)}>Sign In</Button>
                  </Form>
                </>
              );
            }}
          </Formik>
    </div>
  );
}

export default RegistrationForm;

// const SignIn = ({closeModal}) => {
//   const dispatch = useDispatch();
//
//   const [isCorrect, setIsCorrect] = useState(true);
//   const [isLoading, setIsLoading] = useState(false);
//
//   const initialValues = {
//     loginOrEmail: '',
//     password: '',
//   };
//
//   const handleSubmit = (values) => {
//     (async () => {
//       try {
//         setIsLoading(true);
//         const {payload} = await dispatch(newLogin(values));
//         if (payload) {
//           setIsCorrect(true);
//           setIsLoading(false);
//           closeModal();
//         }
//         setIsLoading(false);
//         setIsCorrect(false);
//       } catch (e) {
//         setIsLoading(false);
//         dispatch(
//           showMessage({text: 'Something went wrong, please try to reload page', type: 'error'}),
//         );
//       }
//     })();
//   };
//
//   const yupValidationSchema = yup.object().shape({
//     loginOrEmail: yup.string().required('Field is required'),
//     password: yup
//       .string()
//       .required('Field is required ')
//       .matches(/[0-9A-Za-z]/, 'Wrong password format'),
//   });
//
//   useEffect(() => {
//     return () => {
//       setIsCorrect(false);
//       setIsLoading(false);
//     };
//   }, []);
//
//   return (
//     <Formik
//       initialValues={initialValues}
//       onSubmit={handleSubmit}
//       validationSchema={yupValidationSchema}>
//       {() => {
//         return (
//           <>
//             {isLoading && <Preloader />}
//             <Form className={styles.form}>
//               <CustomField name="loginOrEmail" label="Email / Username" type="text" />
//               <CustomField name="password" label="Password" type="password" />
//               <div className={styles.wrapper}>
//                 <span className={styles.incorrect}>
//                   {!isCorrect && 'Incorrect login or password'}
//                 </span>
//               </div>
//               <Button type={'submit'}>Sign In</Button>
//             </Form>
//           </>
//         );
//       }}
//     </Formik>
//   );
// };