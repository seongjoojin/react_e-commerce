import React from 'react';
import styled from 'styled-components';
import { Icon, Layout } from 'antd';
import { Link } from 'react-router-dom';

const HeaderDiv = styled(Layout.Header)`
  max-width:1200px;
  margin:0 auto;
  padding:0 16px;
  width:100%;
  display:flex;
  justify-content:space-between;
  color:#333;
  background-color:#fff;
  a {
    color: #333;
  }
`;

const TitleText = styled(Link)`
  color:#333;
  font-size:24px;
  font-weight:bold;
  text-decoration:none;
`;

const WishListIcon = styled(Icon)`
  line-height:64px;
`;

const Header = () => (
  <HeaderDiv>
    <TitleText to='/'>EvanShop</TitleText>
      <Link to="/wishlist">
        <WishListIcon type="shopping" theme="filled" />
      </Link>
  </HeaderDiv>
);

export default Header
