import React, { useState, useEffect } from 'react';
import { Div } from '../globalStyle';
import { FirstPreview, OtherPreview, PreviewContainer } from './RegistStyled';
import imageCompression from 'browser-image-compression';

const ImageBlock = ({ image, setImage }) => {
  const [imageURL, setImageURL] = useState([]);

  useEffect(() => {
    if (image && image.length > 0) {
      const imageURLs = image.map(file => URL.createObjectURL(file));
      setImageURL(imageURLs);
    } else {
      setImageURL([]);
    }

    return () => {
      imageURL.forEach(url => URL.revokeObjectURL(url));
    };
  }, [image]);

  const onImageChangeHandler = async (event) => {
    if (!event.target.files.length) return;

    const imageLists = Array.from(event.target.files);
    if (imageLists.length > 5) {
      return window.alert('물품 이미지는 최대 5장까지만 등록 가능합니다');
    }

    const ImageURLLists = [];
    for (let i = 0; i < imageLists.length; i++) {
      if (imageLists[i].size > 10000000) {
        return window.alert('10MB 미만의 이미지만 첨부해주세요!');
      }

      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      ImageURLLists.push(currentImageUrl);
    }
    setImageURL(ImageURLLists);

    const compressedImageList = [];
    for (let i = 0; i < imageLists.length; i++) {
      const compressedFile = await imageCompression(imageLists[i], {
        maxSizeMB: 1,
        maxWidthOrHeight: 567,
      });
      compressedImageList.push(compressedFile);
    }

    setImage(compressedImageList); // 압축된 이미지를 상위 컴포넌트에 전달
  };

  return (
    <Div width="100%" gap="1rem">
      <label htmlFor='file'>
        <FirstPreview>
          {imageURL[0] ? <img src={imageURL[0]} style={{ width: '567px', height: '500px', objectFit: 'contain' }} alt='' /> : null}
          <div style={{ position: 'absolute', top: '45%', left: '13%', color: 'white', fontSize: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span>여기를 클릭해서</span>
            <span>물품 이미지를 첨부해주세요(최대5장)</span>
          </div>
        </FirstPreview>
      </label>
      <PreviewContainer>
        {imageURL.slice(1, 5).map((url, index) => (
          <OtherPreview key={index} theme={'primary'}>
            <img src={url} style={{ width: '100%', height: '100%', objectFit: 'contain' }} alt='' />
          </OtherPreview>
        ))}
      </PreviewContainer>
      <input type='file' id='file' accept="image/*" multiple style={{ display: 'none' }} onChange={onImageChangeHandler} />
    </Div>
  );
};

export default ImageBlock;
