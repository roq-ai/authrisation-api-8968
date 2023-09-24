import * as yup from 'yup';

export const authTokenValidationSchema = yup.object().shape({
  jwt_token: yup.string().required(),
  expires_at: yup.date().required(),
  user_id: yup.string().nullable().required(),
});
