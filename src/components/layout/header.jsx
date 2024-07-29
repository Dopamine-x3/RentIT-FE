import styled, { keyframes, css } from "styled-components";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import bell from "../../assets/imgs/bell.svg";
import chat1 from "../../assets/imgs/chat1.svg";
import search from "../../assets/imgs/search.svg";
import userIcon from "../../assets/imgs/userIcon.png";
import loginImage from "../../assets/imgs/loginImage.svg";
import close from "../../assets/imgs/close.svg";
import logo from "../../assets/imgs/logo.png";

const slideUp = keyframes`
  0% {
    transform: translateY(100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const slideDown = keyframes`
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(100%);
    opacity: 0;
  }
`;

// Styled Components
const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 12px;
`;

const HeaderMenu = styled.div`
  display: flex;
  align-items: center;
`;

const IconButton = styled.div`
  margin: 0 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background-color: #efefef;
  }
`;

const WriteButton = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 82.29px;
  height: 32px;
  margin: 0 12px;
  border-radius: 15px;
  border: 1px solid black;
  color: black;
  text-align: center;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    background-color: black;
    color: #ffffff;
  }
`;

const UserIcon = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const LoginButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 32px;
  background-color: black;
  color: white;
  margin: 0 12px;
  border-radius: 15px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    opacity: 0.5;
  }
`;

const ModalBackground = styled.div`
  z-index: 10;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
`;

const ModalContent = styled.div.attrs((props) => ({
  "data-is-closing": props.isClosing,
}))`
  display: flex;
  width: 600px;
  height: 540px;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  animation: ${({ isClosing }) =>
    isClosing
      ? css`
          ${slideDown} 0.3s ease-out
        `
      : css`
          ${slideUp} 0.3s ease-out
        `};
`;

const ModalLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 35%;
  height: 100%;
  background-color: #f8f9fa;
  padding: 1em;
`;

const ModalRight = styled.div`
  width: 65%;
  height: 100%;
  padding: 1.5em;
`;

const CloseButton = styled.img`
  cursor: pointer;
`;

const LoginTitle = styled.h2`
  font-size: 2rem;
  font-weight: bold;
`;

const InputLabel = styled.h4`
  margin: 16px 0;
  font-size: 1.5rem;
  color: #868e96;
  font-weight: bold;
`;

const TextInput = styled.input`
  width: 100%;
  height: 45px;
  padding: 0 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SubmitButton = styled.button`
  width: 100%;
  height: 45px;
  background-color: #12b886;
  border-radius: 5px;
  margin: 16px 0;
  color: white;
  cursor: pointer;
  font-size: 1.5rem;
`;

const SignupLink = styled.span`
  color: #12b886;
  cursor: pointer;
`;

const LogoImage = styled.img`
  width: auto;
  height: 40px;
`;

const Header = () => {
  const [login, setLogin] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const modalBackground = useRef(null);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setModalOpen(false);
      setIsClosing(false);
    }, 300);
  };

  return (
    <HeaderContainer>
      <Link to="/">
        <LogoImage src={logo} alt="logo" />
      </Link>
      {login ? (
        <HeaderMenu>
          <IconButton>
            <img src={bell} alt="bell icon" />
          </IconButton>
          <IconButton>
            <img src={chat1} alt="chat icon" />
          </IconButton>
          <IconButton>
            <img src={search} alt="search icon" />
          </IconButton>
          <WriteButton to="/write">새 글 작성</WriteButton>
          <UserIcon src={userIcon} alt="유저 아이콘" />
        </HeaderMenu>
      ) : (
        <HeaderMenu>
          <IconButton>
            <img src={bell} alt="bell icon" />
          </IconButton>
          <IconButton>
            <img src={chat1} alt="chat icon" />
          </IconButton>
          <IconButton>
            <img src={search} alt="search icon" />
          </IconButton>
          <LoginButton onClick={() => setModalOpen(true)}>로그인</LoginButton>
          {modalOpen && (
            <ModalBackground
              ref={modalBackground}
              onClick={(e) => {
                if (e.target === modalBackground.current) {
                  handleClose();
                }
              }}
            >
              <ModalContent isClosing={isClosing}>
                <ModalLeft>
                  <img
                    src={loginImage}
                    alt="로그인 일러스트"
                    style={{ width: "100%" }}
                  />
                  <p
                    style={{
                      fontSize: "2rem",
                      fontWeight: "bold",
                      color: "#424242",
                    }}
                  >
                    환영합니다 !
                  </p>
                </ModalLeft>
                <ModalRight>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      marginBottom: "32px",
                    }}
                  >
                    <CloseButton src={close} alt="x" onClick={handleClose} />
                  </div>
                  <div>
                    <LoginTitle>로그인</LoginTitle>
                    <div>
                      <InputLabel>이메일</InputLabel>
                      <TextInput
                        type="text"
                        placeholder="이메일을 입력하세요."
                      />
                    </div>
                    <div>
                      <InputLabel>비밀번호</InputLabel>
                      <TextInput
                        type="password"
                        placeholder="비밀번호를 입력하세요."
                      />
                    </div>
                    <SubmitButton>로그인</SubmitButton>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <span style={{ color: "#868e96" }}>
                        아직 회원이 아니신가요?&nbsp;
                      </span>
                      <SignupLink>
                        <Link to="/join" onClick={() => setModalOpen(false)}>
                          회원가입
                        </Link>
                      </SignupLink>
                    </div>
                  </div>
                </ModalRight>
              </ModalContent>
            </ModalBackground>
          )}
        </HeaderMenu>
      )}
    </HeaderContainer>
  );
};

export default Header;
