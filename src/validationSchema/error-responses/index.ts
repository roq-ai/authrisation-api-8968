import * as yup from 'yup';

export const errorResponseValidationSchema = yup.object().shape({
  error_code: yup.number().integer().required(),
  error_message: yup.string().required(),
  occurred_at: yup.date().required(),
  user_id: yup.string().nullable().required(),
});
