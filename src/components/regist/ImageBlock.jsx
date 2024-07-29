import React, { useState, useEffect } from 'react'
import { Div } from '../globalStyle'
import { FirstPreview, OtherPreview, PreviewContainer } from './RegistStyled';

const ImageBlock = ({ image, id }) => {

  const [imageURL, setImageURL] = useState([]);

  useEffect(() => {
    if (image) {
      setImageURL(image);
    }
    return () => {
      setImageURL([]);
    }
  }, [id, image])

  return (
    <Div width="100%" gap="1rem">
      <label htmlFor='file'>
        <FirstPreview>
          {imageURL[0] ? <img src={imageURL[0]} style={{ width: '567px', height: '500px', objectFit: 'contain' }} alt='' /> : <></>}
          <div style={{ position: 'absolute', top: '45%', left: '13%', color: 'white', fontSize: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span>여기를 클릭해서</span>
            <span>물품 이미지를 첨부해주세요(최대5장)</span>
          </div>
        </FirstPreview>
      </label>
      <PreviewContainer>

        <OtherPreview theme={'primary'} children={
          imageURL[1] ? <img src={imageURL[1]} style={{ width: '100%', height: '100%', objectFit: 'contain' }} alt='' /> : <></>
        } />
        <OtherPreview children={
          imageURL[2] ? <img src={imageURL[2]} style={{ width: '100%', height: '100%', objectFit: 'contain' }} alt='' /> : <></>
        } />
        <OtherPreview children={
          imageURL[3] ? <img src={imageURL[3]} style={{ width: '100%', height: '100%', objectFit: 'contain' }} alt='' /> : <></>
        } />
        <OtherPreview children={
          imageURL[4] ? <img src={imageURL[4]} style={{ width: '100%', height: '100%', objectFit: 'contain' }} alt='' /> : <></>
        } />
      </PreviewContainer>
      <input type={'file'} id='file' accept="image/*" multiple style={{ display: 'none' }} /> {/* onChange={onImageChangeHandler} */}

    </Div>
  )
}

export default ImageBlock
