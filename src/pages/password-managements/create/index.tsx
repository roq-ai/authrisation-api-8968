import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createPasswordManagement } from 'apiSdk/password-managements';
import { passwordManagementValidationSchema } from 'validationSchema/password-managements';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';
import { PasswordManagementInterface } from 'interfaces/password-management';

function PasswordManagementCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: PasswordManagementInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createPasswordManagement(values);
      resetForm();
      router.push('/password-managements');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<PasswordManagementInterface>({
    initialValues: {
      password_reset_token: '',
      password_reset_expires: new Date(new Date().toDateString()),
      password_updated_at: new Date(new Date().toDateString()),
      passwordless_token: '',
      multi_factor_auth_token: '',
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: passwordManagementValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Password Managements',
              link: '/password-managements',
            },
            {
              label: 'Create Password Management',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Password Management
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.password_reset_token}
            label={'Password Reset Token'}
            props={{
              name: 'password_reset_token',
              placeholder: 'Password Reset Token',
              value: formik.values?.password_reset_token,
              onChange: formik.handleChange,
            }}
          />

          <FormControl id="password_reset_expires" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Password Reset Expires
            </FormLabel>
            <DatePicker
              selected={formik.values?.password_reset_expires ? new Date(formik.values?.password_reset_expires) : null}
              onChange={(value: Date) => formik.setFieldValue('password_reset_expires', value)}
            />
          </FormControl>
          <FormControl id="password_updated_at" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Password Updated At
            </FormLabel>
            <DatePicker
              selected={formik.values?.password_updated_at ? new Date(formik.values?.password_updated_at) : null}
              onChange={(value: Date) => formik.setFieldValue('password_updated_at', value)}
            />
          </FormControl>

          <TextInput
            error={formik.errors.passwordless_token}
            label={'Passwordless Token'}
            props={{
              name: 'passwordless_token',
              placeholder: 'Passwordless Token',
              value: formik.values?.passwordless_token,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.multi_factor_auth_token}
            label={'Multi Factor Auth Token'}
            props={{
              name: 'multi_factor_auth_token',
              placeholder: 'Multi Factor Auth Token',
              value: formik.values?.multi_factor_auth_token,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/password-managements')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'password_management',
    operation: AccessOperationEnum.CREATE,
  }),
)(PasswordManagementCreatePage);
