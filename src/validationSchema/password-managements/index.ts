import * as yup from 'yup';

export const passwordManagementValidationSchema = yup.object().shape({
  password_reset_token: yup.string().nullable(),
  password_reset_expires: yup.date().nullable(),
  password_updated_at: yup.date().nullable(),
  passwordless_token: yup.string().nullable(),
  multi_factor_auth_token: yup.string().nullable(),
  user_id: yup.string().nullable().required(),
});
