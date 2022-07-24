import {useField} from 'formik';
import styles from './CustomField.module.scss';
import {TextField} from "@mui/material";

const CustomField = (props) => {
  const [field, meta] = useField(props);
  const {label, type, name} = props;
  const isError = meta.error && meta.touched;

  return (
    <div className={styles.container}>
      <TextField
        className={styles.field}
        {...field}
        label={label}
        type={type}
        color={isError ? "error" : "primary"}/>
      {name === "phone" && !isError ?
        <span className={styles.phoneInfo}>+38 (XXX) XXX - XX - XX</span>
        :
        <span className={styles.errorMessage}>{isError ? meta.error : '\u00A0'}</span>
      }
    </div>
  );
}

export default CustomField;
