import React from 'react';
import styled from 'styled-components';
import { Icon, Layout, Badge } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { StoreState } from '../../store/modules';
import {
  WishItemDataParams
} from '../../store/modules/wishLists';

const HeaderDiv = styled(Layout.Header)`
  z-index: 9999;
  position:sticky;
  top:0;
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
  text-decoration:none !important;
`;

const WishListIcon = styled(Icon)`
  line-height:64px;
  svg {
    width: 20px;
    height: 20px;
  }
`;

const WishBadge = styled(Badge)`
  .ant-badge-count {
    top: 15px;
  }
`;

interface IProps {
  wishItems: WishItemDataParams[]
}

class Header extends React.Component<IProps> {
  render() {
    const { wishItems } = this.props;
    return (
      <HeaderDiv>
        <TitleText to='/'>EvanShop</TitleText>
        <Link to="/wishlist">
          <WishBadge count={wishItems.length}>
            <WishListIcon type="shopping" theme="filled"/>
          </WishBadge>
        </Link>
      </HeaderDiv>
    )
  }
}

export default connect(
  ({wish}:StoreState ) => ({
    wishItems: wish.wishItems
  })
)(Header);
