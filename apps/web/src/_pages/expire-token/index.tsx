import { useState } from 'react';
import { useRouter } from 'next/router';
import { Stack, Title, Text, Button } from '@mantine/core';
import { accountApi } from 'features/resources/account';
import { handleError } from 'shared/utils';
import { RoutePath } from '_app/routes';
import { QueryParam } from 'types';

type ForgotPasswordParams = {
  email: QueryParam,
};

const ForgotPassword = () => {
  const router = useRouter();

  const { email } = router.query;

  const [isSent, setSent] = useState(false);

  const {
    mutate: resendEmail,
    isLoading: isResendEmailLoading,
  } = accountApi.useResendEmail<ForgotPasswordParams>();

  const onSubmit = () => resendEmail({ email }, {
    onSuccess: () => setSent(true),
    onError: (e) => handleError(e),
  });

  if (isSent) {
    return (
      <Stack w={328}>
        <Title order={2}>Reset link has been sent</Title>
        <Text fz={14}>Reset link sent successfully</Text>

        <Button onClick={() => router.push(RoutePath.SignIn)}>
          Back to Sign In
        </Button>
      </Stack>
    );
  }

  return (
    <Stack w={328}>
      <Title order={2}>Password reset link expired</Title>

      <Text mt={0}>
        Sorry, your password reset link has expired. Click the button below to get a new one.
      </Text>

      <Button
        loading={isResendEmailLoading}
        fullWidth
        onClick={onSubmit}
      >
        Resend link to
        {' '}
        {email}
      </Button>
    </Stack>
  );
};

export default ForgotPassword;
