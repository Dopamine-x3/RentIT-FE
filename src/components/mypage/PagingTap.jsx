import React, { lazy, Suspense } from 'react'
import { nanoid } from 'nanoid'
import styled from 'styled-components'
import { Div } from '../globalStyle';
import MyProducts from './Myproducts';
const MyRents = lazy(()=>import('./MyRents'))
// const MyZzims = lazy(()=>import('./MyZzims'))

function PagingTap({data, btnInfo, currentBtn, buttonClickHandler}) {

  return (
    <Div width="100%" marginTop="3rem" gap="3rem">
        <Div fDirection="row" width="100%" borderBottom="1px solid #e6e6e6" gap="5rem">
            {btnInfo.map((item) => 
                <LPBtn
                key={nanoid()}
                focused={currentBtn}
                name={item.name}
                onClick={buttonClickHandler}
                >{item.title}</LPBtn>
            )}
     
        </Div>
        <Div width="100%">
        {(()=>{
            switch(currentBtn) {
                case "products":
                    // components/mypage
                    return <MyProducts data={data}/>
                
                    case "rents":
                    // components/mypage
                    return <Suspense>
                                <MyRents data={data}/>
                            </Suspense>
               
                default:
                    return null
            }
        })()}
        </Div>
    </Div>
  )
}

export default PagingTap

const LPBtn = styled.button`
    width: 100%;
    border: none;
    font-size: 1rem;
    padding-bottom: 8px;
    border-bottom: ${({ focused, name }) => focused === name ? `2px solid #EA5414` : `white`};
    background-color: white;
    color: ${({ focused, name }) => focused === name ? `black` : `#616161`};
    font-weight: ${({ focused, name }) => focused === name ? 800 : 400};
`