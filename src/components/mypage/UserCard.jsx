import React, { useState } from "react";
import axios from "axios";
// import { useMutation } from '@tanstack/react-query'
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Div } from "../layout/globalStyle";
// import { getCookie, setCookie } from '../../shared/Cookies'

function UserCard({ data, refetch }) {
  const navi = useNavigate();
  const [changeState, setChangeState] = useState(false);
  const [changedNickname, setChangedNickname] = useState("");

  // const changeNicknameHandler = () => {
  //   if(getCookie('nickname').includes('test')){
  //         window.alert('테스트계정은 닉네임을 변경하실 수 없습니다.')
  //     }else{
  //       setChangeState(!changeState);
  //     }
  // }

  const changeInputHandler = (e) => {
    setChangedNickname(e.target.value);
  };

  // const { mutate } = useMutation({
  //     mutationFn: async (payload) => {
  //       setCookie("nickname", payload.nickname, {path: "/"});
  //       const token = getCookie("token");
  //       return await axios.patch(`${process.env.REACT_APP_SERVER_URL}/users`, payload, {
  //         headers: {
  //           Authorization: `Bearer ${token}`
  //         }
  //       });
  //     },
  // onSuccess: ({data}) => {
  //   setChangeState(!changeState);
  //   alert(data.message);
  //   refetch();
  // },
  // onError: ({response}) => {
  //   setChangeState(!changeState);
  //   alert(response.data.message);
  // }
  //     onSuccess: ({data}) => {
  //       setChangeState(!changeState);
  //       alert(data.message);
  //       refetch();
  //     },
  //     onError: ({response}) => {
  //       setChangeState(!changeState);
  //       alert(response.data.message);
  //     }
  // });

  return (
    <Div marginTop="2rem" width="100%" height="300px" fDirection="row">
      <Div>
        <img
          src="src/assets/imgs/default.webp"
          alt="userProfileImg"
          style={{ width: "300px", height: "300px" }}
        />
      </Div>
      <Div
        width="100%"
        height="100%"
        jc="space-between"
        bgColor="#e6e6e6"
        padding="1rem"
        style={{ boxSizing: "border-box" }}
      >
        <Div
          width="100%"
          height="100%"
          fDirection="row"
          bgColor="#e6e6e6"
          padding="0 0 1rem 0"
          style={{ boxSizing: "border-box", borderBottom: "1px solid #767676" }}
        >
          <Div
            margin="auto 0 auto 0"
            width="100%"
            fDirection="row"
            gap="1rem"
            bgColor="#e6e6e6"
          >
            {/* src={data?.profile} 밑에 넣어요 데이터 입니다, */}
            <img
              src="data:image/webp;base64,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"
              alt="rankingIcon"
              style={{ width: "3rem", height: "3rem" }}
            />
            {/* {changeState
              ? <Input type="text" defaultValue={data?.nickname} maxLength={6} onChange={changeInputHandler}/>
              : <Span>{data?.nickname}</Span>
          } */}
            <Input
              type="text"
              defaultValue={"nickname"}
              maxLength={6}
              onChange={changeInputHandler}
            />
            <Span>{"닉네임 뭔데 이거"}</Span>
            {/* 위에는 임시로 넣은 것 입니다. 삼항 연산자 해야함 */}
          </Div>
          <Div width="50%" height="100%" gap="0.5rem" bgColor="#e6e6e6">
            <Button
              onClick={() => {
                navi("/regist");
              }}
            >
              대여물품 등록하기
            </Button>
            {/* <Button onClick={()=>{
              navi(`/chat/${getCookie('nickname')}`)
          }}>빌리지 채팅 관리</Button> */}
            {changeState ? (
              <Div
                width="100%"
                height="100%"
                fDirection="row"
                jc="space-between"
                gap="1rem"
                bgColor="#e6e6e6"
              >
                {/* onClick={changeNicknameHandler} 밑에 */}
                <Button bgColor="#767676" color="white">
                  취소
                </Button>
                {/* onClick={()=>{mutate({"nickname" : changedNickname})}} 밑에 */}
                <Button bgColor="#644AFF" color="white">
                  수정완료
                </Button>
              </Div>
            ) : (
              //   onClick={changeNicknameHandler}밑에!
              <Button>닉네임 변경</Button>
            )}
          </Div>
        </Div>
        <Div
          width="100%"
          height="100%"
          bgColor="#e6e6e6"
          padding="1rem 0 0 0"
          style={{ boxSizing: "border-box" }}
        >
          {/* 임시...공간? */}여기 활용을 어떻게 하는게 좋을까?
        </Div>
      </Div>
    </Div>
  );
}

export default UserCard;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ color }) => (color ? color : "black")};
  background-color: ${({ bgColor }) => (bgColor ? bgColor : "white")};
  border: none;
  border-radius: 5px;
  width: 100%;
  height: 100%;
  cursor: pointer;
  box-shadow: 1px 1px 5px rgb(0, 0, 0, 0.2);
  &:hover {
    box-shadow: 1px 1px 5px rgb(0, 0, 0, 0.5);
  }
  &:active {
    box-shadow: inset 1px 1px 5px rgb(0, 0, 0, 0.5);
  }
`;

const Span = styled.span`
  margin: auto 0 auto 0;
  font-size: 1.5rem;
  font-weight: 700;
`;

const Input = styled.input`
  margin: auto 0 auto 0;
  width: 50%;
  height: 2.5rem;
  border: 1px solid #e6e6e6;
  padding-left: 10px;
  font-size: 1.5rem;
`;
