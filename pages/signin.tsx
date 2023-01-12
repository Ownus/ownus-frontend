import tw, { css } from 'twin.macro';

import { useRouter } from 'next/router';
import Image from 'next/image';
import React from 'react';
import { useForm } from 'react-hook-form';
import background from '/public/images/background3.jpg';
import Link from 'next/link';
import AuthHeader from '@components/common/auth/AuthHeader';
import { FormInput } from '@components/common/formInput';
import { EmailInput, PasswordInput } from 'constants/auth';
import { useSignIn } from 'hooks/useSignIn';
//  FIXME: 공통 컴포넌트로 SIGNIN, SIGNUP 만들기?

export type SignFormInputs = {
  email: string;
  password: string;
};

const SignIn = () => {
  const onSign = useSignIn();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SignFormInputs>();

  const onSubmit = async (data: SignFormInputs) => {
    await new Promise((r) => setTimeout(r, 1000)); // 버튼 중복으로 누르는거 방지
    const { email, password } = data;
    onSign({ email, password });
  };

  return (
    <div css={[tw`flex`]}>
      <div
        css={[
          tw`flex mobile:flex-col mobile:items-center desktop:items-end desktop:w-1/2 h-screen w-full mobile:px-28`
        ]}
      >
        <div tw="w-full px-10 mobile:px-0 mobile:w-auto">
          <AuthHeader />
          <form css={formStyle} onSubmit={handleSubmit(onSubmit)}>
            <h2>이메일로 로그인</h2>
            <FormInput<SignFormInputs>
              id={EmailInput.id}
              type={EmailInput.type}
              name={'email'}
              label={EmailInput.label}
              placeholder={EmailInput.placeholder}
              register={register}
              rules={EmailInput.rules}
              errors={errors}
            />
            <FormInput<SignFormInputs>
              id={PasswordInput.id}
              type={PasswordInput.type}
              name={'password'}
              label={PasswordInput.label}
              placeholder={PasswordInput.placeholder}
              register={register}
              rules={PasswordInput.rules}
              errors={errors}
            />
            <button
              css={[
                tw`bg-primary3 my-2 text-white1 text-lg py-2 mt-6 hover:bg-primary2`
              ]}
              type="submit"
              disabled={isSubmitting}
            >
              로그인
            </button>
            <div>
              <p css={tw`text-sm mt-10 mb-2`}>아직 계정이 없으신가요?</p>
              <p css={tw`text-blue underline`}>
                <Link href={'/signup'}>회원가입</Link>
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

export default SignIn;

const formStyle = css`
  ${tw`flex flex-col mt-20 py-10 mobile:w-96`},

  input {
    border: solid 1px #ececec;
    outline: none;
    padding: 0.75rem 0.5rem;
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }

  label {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }
  h2 {
    margin-bottom: 4rem;
  }
`;
