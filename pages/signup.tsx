import tw, { css } from 'twin.macro';
import Header from '@components/common/auth/header';
import Image from 'next/image';
import React from 'react';
import { useForm } from 'react-hook-form';
import background from '/public/images/background4.jpg';
import Link from 'next/link';
import { FormInput } from '@components/common/input/formInput';
import WithAuth from '@components/hoc/withAuth';
import { Signup } from 'types/user';
import {
  EmailInput,
  PasswordInput,
  UsernameInput,
  PasswordConfirmInput
} from '@lib/constants/auth';
import { useSignup } from 'queries/hooks/auth/useSignUp';

const SignUp = () => {
  const onSignup = useSignup();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting }
  } = useForm<Signup>();

  const passwordConfirmRules = {
    ...PasswordConfirmInput.rules,
    validate: {
      matchPassword: (value: string) => {
        const { password } = getValues();
        return password === value || '비밀번호가 일치하지 않습니다.';
      }
    }
  };

  const onSubmit = async (formData: Signup) => {
    await new Promise((r) => setTimeout(r, 1000));
    const { username, email, password } = formData;
    onSignup({ username, email, password });
    alert(JSON.stringify(formData));
  };

  return (
    <div css={[tw`flex`]}>
      <div
        css={[
          tw`flex mobile:flex-col mobile:items-center desktop:items-end desktop:w-1/2 h-screen w-full mobile:px-28`
        ]}
      >
        <div tw="w-full px-10 mobile:px-0 mobile:w-auto">
          <Header />
          <form css={formStyle} onSubmit={handleSubmit(onSubmit)}>
            <h2>이메일로 가입하기</h2>
            <FormInput<Signup>
              id={UsernameInput.id}
              type={UsernameInput.type}
              name={'username'}
              label={UsernameInput.label}
              placeholder={UsernameInput.placeholder}
              register={register}
              rules={UsernameInput.rules}
              errors={errors}
            />
            <FormInput<Signup>
              id={EmailInput.id}
              type={EmailInput.type}
              name={'email'}
              label={EmailInput.label}
              placeholder={EmailInput.placeholder}
              register={register}
              rules={EmailInput.rules}
              errors={errors}
            />
            <FormInput<Signup>
              id={PasswordInput.id}
              type={PasswordInput.type}
              name={'password'}
              label={PasswordInput.label}
              placeholder={PasswordInput.placeholder}
              register={register}
              rules={PasswordInput.rules}
              errors={errors}
            />
            <FormInput<Signup>
              id={PasswordConfirmInput.id}
              type={PasswordConfirmInput.type}
              name={'passwordConfirm'}
              label={PasswordConfirmInput.label}
              placeholder={PasswordConfirmInput.placeholder}
              register={register}
              rules={passwordConfirmRules}
              errors={errors}
            />
            <button
              css={[
                tw`bg-primary3 my-2 text-white1 text-lg py-2 mt-6 hover:bg-primary2`
              ]}
              type="submit"
              disabled={isSubmitting}
            >
              가입하기
            </button>
            <div>
              <p css={tw`text-sm mt-10 mb-2`}>이미 계정이 있으신가요?</p>
              <p css={tw`text-blue underline`}>
                <Link href={'/signin'}>로그인</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      <div css={tw`w-1/2 h-screen relative hidden desktop:block`}>
        <Image
          src={background}
          alt="background"
          layout="fill"
          objectFit="cover"
          objectPosition="bottom"
        />
      </div>
    </div>
  );
};

export default WithAuth(SignUp);

const formStyle = css`
  ${tw`flex flex-col mt-16 py-10 w-96`},
  input {
    border: solid 1px #ececec;
    outline: none;
    padding: 0.75rem 0.5rem;
    font-size: 0.9rem;
  }
  label {
    font-size: 1rem;
  }
  h2 {
    margin-bottom: 3rem;
  }
`;
