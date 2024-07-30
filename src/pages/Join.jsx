import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { postJoin } from "../apis/axios";

const Join = () => {
  const navigate = useNavigate();

  // 상태 관리
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 입력 변경 핸들러
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);
  const handleNicknameChange = (e) => setNickname(e.target.value);
  const handleIntroductionChange = (e) => setIntroduction(e.target.value);

  // 유효성 검사
  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = "이메일을 입력하세요.";
    if (!password) newErrors.password = "비밀번호를 입력하세요.";
    if (password !== confirmPassword)
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
    if (!nickname) newErrors.nickname = "사용자ID를 입력하세요.";
    if (!introduction) newErrors.introduction = "한줄 소개를 입력하세요.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 회원가입 핸들러
  const handleJoin = async (e) => {
    e.preventDefault(); // 기본 폼 제출 동작 방지

    if (!validate()) return; // 유효성 검사 실패 시 종료

    setIsSubmitting(true);
    try {
      await postJoin(email, password, nickname, introduction);
      alert("회원가입에 성공했습니다.");
      navigate("/");
    } catch (error) {
      console.error("회원가입 요청 실패:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 취소 핸들러
  const handleCancel = () => {
    navigate("/");
  };

  return (
    <JoinContainer>
      <InnerContainer>
        <HeaderSection>
          <Title>RentIT</Title>
          <Subtitle>회원가입</Subtitle>
        </HeaderSection>

        <Form onSubmit={handleJoin}>
          <FormGroup>
            <Label>이메일</Label>
            <Input
              type="text"
              placeholder="이메일을 입력하세요."
              value={email}
              onChange={handleEmailChange}
            />
            {errors.email && <Error>{errors.email}</Error>}
          </FormGroup>
          <FormGroup>
            <Label>비밀번호</Label>
            <Input
              type="password"
              placeholder="비밀번호를 입력하세요."
              value={password}
              onChange={handlePasswordChange}
            />
            {errors.password && <Error>{errors.password}</Error>}
          </FormGroup>
          <FormGroup>
            <Label>비밀번호 확인</Label>
            <Input
              type="password"
              placeholder="비밀번호를 다시 입력하세요."
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            {errors.confirmPassword && <Error>{errors.confirmPassword}</Error>}
          </FormGroup>
          <FormGroup>
            <Label>사용자ID</Label>
            <div style={{ display: "flex" }}>
              <Input
                type="text"
                placeholder="사용자ID를 입력하세요."
                value={nickname}
                onChange={handleNicknameChange}
              />
              <Button width="30%" $bgColor="#12B886" color="#ffffff" ml="10px">
                중복확인
              </Button>
            </div>
            {errors.nickname && <Error>{errors.nickname}</Error>}
          </FormGroup>
          <FormGroup>
            <Label>한줄 소개</Label>
            <Input
              type="text"
              placeholder="당신을 한줄로 소개해보세요."
              value={introduction}
              onChange={handleIntroductionChange}
            />
            {errors.introduction && <Error>{errors.introduction}</Error>}
          </FormGroup>
          <CheckboxContainer>
            <input type="checkbox" />
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
              $bgColor="#ffffff"
              color="#000000"
              border="1px"
              width="48%"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              취소하기
            </Button>
            <Button
              $bgColor="#12B886"
              color="#ffffff"
              width="48%"
              type="submit"
              disabled={isSubmitting}
            >
              가입하기
            </Button>
          </div>
        </Form>
      </InnerContainer>
    </JoinContainer>
  );
};

// Styled Components
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
  background-color: ${({ $bgColor }) => $bgColor || "#ffffff"};
  color: ${({ color }) => color || "#000000"};
  border: 1px solid #d7d7d7;
  border-radius: 30px;
  cursor: pointer;
  font-size: 12px;
  margin-left: ${({ ml }) => ml || "0"};
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
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

const Error = styled.p`
  color: red;
  font-size: 12px;
  margin-top: 4px;
`;

export default Join;
