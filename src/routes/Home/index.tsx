import React from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

const MainBanner = styled.div`
  margin:0 0 16px 0;
  width:100%;
  position:relative;
  img {
    opacity:0.4;
    width:100%;
  }
`;

const BannerText = styled.p`
  position:absolute;
  top:15%;
  left:50%;
  transform:translateX(-50%);
  font-size:20px;
  font-weight:bold;
  color:#000;
`;

const BannerButton = styled(Button)`
  position:absolute;
  top:65%;
  left:50%;
  transform:translateX(-50%);
`;

const NavList = styled.ul`
  list-style:none;
  padding:0;
  margin:0;
  display:flex;
  li {
    text-align:center;
    width:33.33%;
    padding: 16px 0;
    color:#333;
    background-color:#fff;
    a {
      display:block;
      color:#333;
    }
  }
`;

const Home = () => (
  <>
    <MainBanner>
      <img src="/img/banner.jpeg" alt="이벤트"/>
      <BannerText>오픈 이벤트!<br />회원가입하고 10,000원 쿠폰 가져가세요.</BannerText>
      <BannerButton type="primary" shape="round" size="large">쿠폰 받기</BannerButton>
    </MainBanner>
    <NavList>
      <li>
        <Link to="/">
          Home
        </Link>
      </li>
      <li>
        <Link to="/products">
          Products
        </Link>
      </li>
      <li>Event</li>
    </NavList>
  </>
);

export default Home;
