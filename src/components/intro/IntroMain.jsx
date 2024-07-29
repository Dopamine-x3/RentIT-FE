import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
    background-color: #f8f9fa;
    margin-top: 50px;
`;

const Container = styled.div`
    padding-left: 3rem;
    padding-right: 3rem;
`;

const Row = styled.div`
    display: flex;
    align-items: center;
`;

const Column = styled.div`
    flex: ${(props) => props.size || 1};
    text-align: ${(props) => (props.center ? 'center' : 'left')};
`;

const Title = styled.h1`
    font-size: 4rem;
    line-height: 1;
    margin-bottom: 1.5rem;
`;

const Text = styled.p`
    font-weight: 400;
    color: #6c757d;
    margin-bottom: 3rem;
`;

const Button = styled.a`
    background-color: #ffc107;
    color: #fff;
    padding: 1rem 2rem;
    text-transform: uppercase;
    text-decoration: none;
    font-size: 1.25rem;
    font-weight: 700;
    border-radius: 0.3rem;
    display: inline-block;

    &:hover {
        background-color: #e0a800;
    }
`;

const Image = styled.img`
    width: 100%;
    max-width: 700px;
    height: auto;
`;

const IntroMain= () => {
    return (
        <HeaderContainer>
            <Container>
                <Row>
                    <Column size={6} center>
                        <div>
                            <Title>세상의 모든 것을 렌트하자!<br /> Rent IT!</Title>
                            <Text>서랍속에 안 쓰는 물건들이 있는지<br />확인하러 가보죠!</Text>
                            <Button href="main">메인 페이지로 가기</Button>
                        </div>
                    </Column>
                    <Column size={6}>
                        <Image src="#" alt="대충 사진" />
                    </Column>
                </Row>
            </Container>
        </HeaderContainer>
    );
};

export default IntroMain;
