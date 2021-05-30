import React from "react";
import { useDispatch } from "react-redux";
import { signup } from "../../pages/Signup/slice";
import { useInput } from "../@shared/Input/hooks";
import Input from "../@shared/Input";
import Button from "../@shared/Button";
import { useSignupAge, useSignupEmail, useSignupPassword } from "./hooks";

const SignupForm = () => {
  const dispatch = useDispatch();
  const [email, handleEmailChange, isEmailValid] = useSignupEmail();
  const [age, handleAgeChange, isAgeValid] = useSignupAge();
  const [password, handlePasswordChange, isPasswordValid] = useSignupPassword();
  const [passwordConfirm, handlePasswordConfirmChange, isPasswordConfirmValid] =
    useInput((value) => value === password);

  const isSubmitEnabled = [
    isEmailValid,
    isAgeValid,
    isPasswordValid,
    isPasswordConfirmValid,
  ].every(Boolean);

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(signup({ email, password, age }));
  };

  return (
    <form className="flex flex-col px-8 space-y-8" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="email">
        이메일 입력란
      </label>
      <Input
        id="email"
        type="email"
        placeholder="✉️ 이메일을 입력해주세요"
        value={email}
        isValid={isEmailValid}
        onChange={handleEmailChange}
      />
      <label className="sr-only" htmlFor="age">
        나이 입력란
      </label>
      <Input
        id="age"
        type="text"
        placeholder="👤 나이를 입력해주세요"
        value={age}
        isValid={isAgeValid}
        onChange={handleAgeChange}
      />
      <label className="sr-only" htmlFor="password">
        비밀번호 입력란
      </label>
      <Input
        id="password"
        type="password"
        placeholder="🔒 비밀번호를 입력해주세요"
        value={password}
        isValid={isPasswordValid}
        onChange={handlePasswordChange}
      />
      <label className="sr-only" htmlFor="password-confirm">
        비밀번호 확인 입력란
      </label>
      <Input
        id="password-confirm"
        type="password"
        placeholder="🔒 비밀번호를 한번 더 입력해주세요"
        value={passwordConfirm}
        isValid={isPasswordConfirmValid}
        onChange={handlePasswordConfirmChange}
      />
      <Button type="submit" disabled={!isSubmitEnabled}>
        회원가입
      </Button>
    </form>
  );
};

export default SignupForm;
