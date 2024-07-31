import React, { useState } from 'react';
import axios from 'axios';
import HeaderNav from '../components/layout/header';
import Footer from '../components/layout/footer';
import Maps from '../components/regist/Map';
import { Div, FlexDiv, MaxWidthDiv } from '../components/globalStyle';
import { DescInput, PriceDiv, PriceInput, PriceSpan, RegistBtn, RegistTitle, TitleInput } from '../components/regist/RegistStyled';

const CreateBoard = () => {
  const [formData, setFormData] = useState({
    userId: '',
    title: '',
    category: '',
    price: '',
    description: '',
    product_condition: '',
    delivery_method: '',
    delivery_price: '',
    address_name: '',
    building_name: '',
    files: []
  });

  const [imagePreviews, setImagePreviews] = useState([]);

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (name === 'files') {
      setFormData(prevState => ({
        ...prevState,
        [name]: files
      }));
      const fileArray = Array.from(files);
      const previews = fileArray.map(file => URL.createObjectURL(file));
      setImagePreviews(previews);
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'files') {
          for (let i = 0; i < formData.files.length; i++) {
            data.append('files', formData.files[i]);
          }
        } else {
          data.append(key, formData[key]);
        }
      });

      const response = await axios.post('http://3.36.161.37/api/rentboards', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      alert('Board created successfully!');
      setFormData({
        userId: '',
        title: '',
        category: '',
        price: '',
        description: '',
        product_condition: '',
        delivery_method: '',
        delivery_price: '',
        address_name: '',
        building_name: '',
        files: []
      });
      setImagePreviews([]);
    } catch (error) {
      console.error('There was an error creating the board!', error.response?.data || error.message);
      alert('Error creating board: ' + (error.response?.data.message || error.message));
    }
  };

  return (
    <FlexDiv boxShadow="none">
      <HeaderNav />
      <MaxWidthDiv>
        <Div marginTop="10rem">
          <RegistTitle>대여물품 등록</RegistTitle>
        </Div>
        <Div width="100%" marginTop="2rem" $fDirection="row" jc="space-between" gap="2rem">
          <form onSubmit={handleSubmit}>
            <Div gap="1rem">
              <label htmlFor="userId">User ID:</label>
              <input
                type="text"
                id="userId"
                name="userId"
                value={formData.userId}
                onChange={handleChange}
                required
              />
            </Div>
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div style={{ height: '685px', border: '1px solid #D7D7D7' }}></div>
            <Div width="100%">
              <div className="form-group">
                <label htmlFor="category">Category:</label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                />
              </div>
              <PriceDiv>
                <PriceSpan>가격</PriceSpan>
                <label htmlFor="price">Price:</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  step="0.01"
                />
              </PriceDiv>
              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="productCondition">Product Condition:</label>
                <input
                  type="text"
                  id="productCondition"
                  name="productCondition"
                  value={formData.productCondition}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="deliveryMethod">Delivery Method:</label>
                <input
                  type="text"
                  id="deliveryMethod"
                  name="deliveryMethod"
                  value={formData.deliveryMethod}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="deliveryPrice">Delivery Price:</label>
                <input
                  type="number"
                  id="deliveryPrice"
                  name="deliveryPrice"
                  value={formData.deliveryPrice}
                  onChange={handleChange}
                  required
                  step="0.01"
                />
              </div>
              <div className="form-group">
                <label htmlFor="addressName">Address Name:</label>
                <input
                  type="text"
                  id="addressName"
                  name="addressName"
                  value={formData.addressName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="buildingName">Building Name:</label>
                <input
                  type="text"
                  id="buildingName"
                  name="buildingName"
                  value={formData.buildingName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="files">Files:</label>
                <input
                  type="file"
                  id="files"
                  name="files"
                  multiple
                  onChange={handleChange}
                />
              </div>
              {imagePreviews.length > 0 && (
                <div className="image-previews">
                  {imagePreviews.map((preview, index) => (
                    <img
                      key={index}
                      src={preview}
                      alt={`preview ${index}`}
                      style={{ width: '100px', height: '100px', objectFit: 'cover', margin: '5px' }}
                    />
                  ))}
                </div>
              )}
              <button type="submit">Create Board</button>
            </Div>
          </form>
        </Div>
      </MaxWidthDiv>
      <Footer />
    </FlexDiv>
  );
}

export default CreateBoard;
