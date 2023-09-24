import * as yup from 'yup';

export const profileValidationSchema = yup.object().shape({
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  dob: yup.date().nullable(),
  address: yup.string().nullable(),
  phone_number: yup.string().nullable(),
  user_id: yup.string().nullable().required(),
});
