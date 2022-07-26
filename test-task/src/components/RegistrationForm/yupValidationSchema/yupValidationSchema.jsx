import * as yup from "yup";

 export const yupValidationSchema = yup.object().shape({
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