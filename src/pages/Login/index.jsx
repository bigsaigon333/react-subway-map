import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useInput } from "../../components/@shared/Input/hooks";
import membersAPI from "../../api/members";
import PATH from "../../constants/path";
import Main from "../../components/@shared/Main";
import Input from "../../components/@shared/Input";
import Button from "../../components/@shared/Button";

const Login = () => {
  const history = useHistory();
  const [email, handleEmailChange] = useInput(null);
  const [password, handlePasswordChange] = useInput(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // TODO: accessToken 저장
    const accessToken = await membersAPI.login({ email, password });

    if (accessToken) {
      history.push(PATH.STATIONS);
    }
  };

  return (
    <Main>
      <section className="m-auto pb-8 w-120 border-t-8 border-yellow-300 rounded-sm shadow-md">
        <h2 className="mb-4 mt-6 p-4 text-center text-gray-700 text-2xl font-medium">
          로그인
        </h2>
        <form className="flex flex-col px-8 space-y-8" onSubmit={handleSubmit}>
          <label className="sr-only" htmlFor="email">
            이메일 입력란
          </label>
          <Input
            id="email"
            type="email"
            placeholder="✉️ 이메일을 입력해주세요"
            value={email}
            onChange={handleEmailChange}
            isValid
          />
          <label className="sr-only" htmlFor="password">
            비밀번호 입력란
          </label>
          <Input
            id="password"
            type="password"
            placeholder="🔒 비밀번호를 입력해주세요"
            value={password}
            onChange={handlePasswordChange}
            isValid
          />
          <Button type="submit" disabled={false}>
            로그인
          </Button>
          <Link to={PATH.SIGNUP} className="mt-8 text-center text-gray-700">
            <span>아직 회원이 아니신가요?</span>
          </Link>
        </form>
      </section>
    </Main>
  );
};

export default Login;
