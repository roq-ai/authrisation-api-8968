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

import { createAuthToken } from 'apiSdk/auth-tokens';
import { authTokenValidationSchema } from 'validationSchema/auth-tokens';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';
import { AuthTokenInterface } from 'interfaces/auth-token';

function AuthTokenCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: AuthTokenInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createAuthToken(values);
      resetForm();
      router.push('/auth-tokens');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<AuthTokenInterface>({
    initialValues: {
      jwt_token: '',
      expires_at: new Date(new Date().toDateString()),
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: authTokenValidationSchema,
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
              label: 'Auth Tokens',
              link: '/auth-tokens',
            },
            {
              label: 'Create Auth Token',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Auth Token
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.jwt_token}
            label={'Jwt Token'}
            props={{
              name: 'jwt_token',
              placeholder: 'Jwt Token',
              value: formik.values?.jwt_token,
              onChange: formik.handleChange,
            }}
          />

          <FormControl id="expires_at" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Expires At
            </FormLabel>
            <DatePicker
              selected={formik.values?.expires_at ? new Date(formik.values?.expires_at) : null}
              onChange={(value: Date) => formik.setFieldValue('expires_at', value)}
            />
          </FormControl>
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
              onClick={() => router.push('/auth-tokens')}
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
    entity: 'auth_token',
    operation: AccessOperationEnum.CREATE,
  }),
)(AuthTokenCreatePage);
