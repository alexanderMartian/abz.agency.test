import styles from "./UploadContainer.module.scss";
import {useField} from "formik";
import {useState} from "react";

const UploadContainer = (props) => {
  const {uploadFileName, setUploadFileName} = props;
  const [field, meta] = useField(props);
  const isError = meta.error && uploadFileName !== "Upload your photo";

  return (
    <>
      <div className={styles.uploadWrapper}>
        <input className={styles.uploadInput}
               type="file"
               name={props.photo}
               id="file"
               accept=".jpg, .jpeg"
               onChange={ ({ target}) => {
                 target.files[0].name && setUploadFileName(target.files[0].name)
                 props.setFieldValue("photo", target.files[0])}
               }
        />
        <label className={ isError ? styles.uploadTitleError : styles.uploadTitle} htmlFor="file">Upload</label>
        <label className={ isError ? styles.uploadInformationError : styles.uploadInformation} htmlFor="file">
          { !isError ? uploadFileName.substr(0, 17) : "Upload your photo"}
        </label>
      </div>
      <span className={styles.errorMessage}>{isError ? meta.error : '\u00A0'}</span>
    </>


  );
}

export default UploadContainer;