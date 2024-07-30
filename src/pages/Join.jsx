import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { postJoin } from "../apis/axios";

const JoinContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InnerContainer = styled.div`
  width: 460px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeaderSection = styled.div`
  width: 100%;
  height: 200px;
  padding-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 2px solid #c8c8c8;
  font-family: "Hack-Bold", sans-serif;
  font-size: 40px;
`;

const Subtitle = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  font-weight: 600;
`;

const Form = styled.form`
  width: 100%;
`;

const FormGroup = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

const Label = styled.p`
  color: #989898;
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  height: 45px;
  padding: 0 10px;
  border: 1px solid #d7d7d7;
  border-radius: 5px;
`;

const Button = styled.button`
  width: ${({ width }) => width || "auto"};
  height: 45px;
  background-color: ${({ bgColor }) => bgColor || "#ffffff"};
  color: ${({ color }) => color || "#000000"};
  border: 1px solid #d7d7d7;
  border-radius: 30px;
  cursor: pointer;
  font-size: 12px;
  margin-left: ${({ ml }) => ml || "0"};
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const CheckboxLabel = styled.span`
  color: #12b886;
  font-size: 12px;
  margin-left: 8px;
`;

const Join = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState("");

  const navi = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 기본 유효성 검사
    if (!email || !password || !confirmPassword || !username || !introduction) {
      setError("모든 필드를 입력해야 합니다.");
      return;
    }

    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (!agreeTerms) {
      setError("이용약관 및 개인정보취급방침에 동의해야 합니다.");
      return;
    }

    try {
      await postJoin(email, password, username, introduction);
      // 가입 완료 후 처리 (리디렉션 등)
      alert("회원가입이 완료되었습니다.");
      // 로그인 페이지로 리디렉션할 수 있습니다.
      navi("/");
    } catch (err) {
      console.error("회원가입 실패:", err);
      setError("회원가입에 실패했습니다. 다시 시도해주세요.");
    }
  };
  const hadleCancel = async (e) => navi("/");

  return (
    <JoinContainer>
      <InnerContainer>
        <HeaderSection>
          <Title>RentIT</Title>
          <Subtitle>회원가입</Subtitle>
        </HeaderSection>

        <Form>
          {error && (
            <div style={{ color: "red", marginBottom: "20px" }}>{error}</div>
          )}
          <FormGroup>
            <Label>이메일</Label>
            <Input
              type="email"
              placeholder="이메일을 입력하세요."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>비밀번호</Label>
            <Input
              type="password"
              placeholder="비밀번호를 입력하세요."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>비밀번호 확인</Label>
            <Input
              type="password"
              placeholder="비밀번호를 다시 입력하세요."
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>사용자ID</Label>
            <div style={{ display: "flex" }}>
              <Input
                type="text"
                placeholder="사용자ID를 입력하세요."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Button width="30%" bgColor="#12B886" color="#ffffff" ml="10px">
                중복확인
              </Button>
            </div>
          </FormGroup>
          <FormGroup>
            <Label>한줄 소개</Label>
            <Input
              type="text"
              placeholder="당신을 한줄로 소개해보세요."
              value={introduction}
              onChange={(e) => setIntroduction(e.target.value)}
            />
          </FormGroup>
          <CheckboxContainer>
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
            />
            <CheckboxLabel>
              <Link to="/policy/terms">이용약관</Link> 과
              <Link to="/policy/privacy" className="ml-1">
                {" "}
                개인정보취급방침
              </Link>
              에 동의합니다.
            </CheckboxLabel>
          </CheckboxContainer>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              bgColor="#ffffff"
              color="#000000"
              width="48%"
              onClick={hadleCancel}
            >
              취소하기
            </Button>
            <Button
              bgColor="#12B886"
              color="#ffffff"
              width="48%"
              onClick={handleSubmit}
            >
              가입하기
            </Button>
          </div>
        </Form>
      </InnerContainer>
    </JoinContainer>
  );
};

export default Join;
