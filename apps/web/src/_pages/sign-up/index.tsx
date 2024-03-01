import { z } from 'zod';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Stack,
  TextInput,
  PasswordInput,
  Group,
  Title,
  Checkbox,
} from '@mantine/core';
import { accountApi } from 'features/resources/account';
import { handleError } from 'shared/utils';
import { RoutePath } from '_app/routes';
import { EMAIL_REGEX, PASSWORD_REGEX } from 'app-constants';
import { Link } from '_entities';

const schema = z.object({
  email: z.string().regex(EMAIL_REGEX, 'Email format is incorrect.'),
  password: z.string().regex(PASSWORD_REGEX, 'The password must contain 6 or more characters with at least one letter (a-z) and one number (0-9).'),
});

type SignUpParams = z.infer<typeof schema>;

const passwordRules = [
  {
    title: 'Must be at least 8 characters',
    done: false,
  },
  {
    title: 'Must contain lover case and capital letters',
    done: false,
  },
  {
    title: 'Must contain at least 1 number',
    done: false,
  },
];

const SignUp = () => {
  const [passwordRulesData, setPasswordRulesData] = useState(passwordRules);

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm<SignUpParams>({
    resolver: zodResolver(schema),
  });

  const passwordValue = watch('password', '');

  useEffect(() => {
    const updatedPasswordRulesData = [...passwordRules];
    updatedPasswordRulesData[0].done = passwordValue.length >= 8 && passwordValue.length <= 256;
    updatedPasswordRulesData[1].done = /(?=.*[A-Z])(?=.*[a-z])/.test(passwordValue);
    updatedPasswordRulesData[2].done = /\d/.test(passwordValue);

    setPasswordRulesData(updatedPasswordRulesData);
  }, [passwordValue]);

  const { mutate: signUp, isLoading: isSignUpLoading } = accountApi.useSignUp<SignUpParams>();

  const onSubmit = (data: SignUpParams) => signUp(data, {
    onError: (e) => handleError(e, setError),
  });

  return (
    <Stack w={408} gap={32}>
      <Stack gap={32}>
        <Title order={1}>Sign Up</Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack gap={20}>
            <TextInput
              {...register('email')}
              size="lg"
              label="Email Address"
              placeholder="Email Address"
              error={errors.email?.message}
            />

            <PasswordInput
              {...register('password')}
              size="lg"
              label="Password"
              placeholder="Enter password"
              error={errors.password?.message}
            />
            <Group gap={8}>
              {passwordRulesData.map((ruleData) => (
                <Checkbox
                  size="sm"
                  variant="outline"
                  key={ruleData.title}
                  checked={ruleData.done}
                  label={ruleData.title}
                />
              ))}
            </Group>
          </Stack>

          <Button
            type="submit"
            loading={isSignUpLoading}
            fullWidth
            mt={32}
            h={40}
            size="sm"
          >
            Create Account
          </Button>
        </form>
      </Stack>

      <Stack gap={32}>
        <Group fz={16} justify="center" gap={12}>
          Have an account?
          <Link
            type="router"
            href={RoutePath.SignIn}
            inherit
            underline={false}
          >
            Sign In
          </Link>
        </Group>
      </Stack>
    </Stack>
  );
};

export default SignUp;
