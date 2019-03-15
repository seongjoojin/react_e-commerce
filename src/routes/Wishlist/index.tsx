import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
// @ts-ignore
import coupons from 'api/coupons';
import { StoreState } from '../../store/modules';
import {
  WishItemDataParams
} from '../../store/modules/wishLists';
import { List, Checkbox, InputNumber, Select } from 'antd';

const Option = Select.Option;

const WishTitle = styled.h1`
  background-color: #fff;
  margin: 0;
  padding: 8px;
  font-size: 24px;
`;

const WishList = styled(List)`
  background-color: #fff;
  padding: 0 8px;
`;

const WishCheckbox = styled(Checkbox)`
  display: block;
  text-align: right;
  margin-bottom: 16px;
`;

const WishInputNumber = styled(InputNumber)`
  display: block;
  margin-bottom: 16px;
`;

const WishSelect = styled(Select)`
  margin: 16px 8px;
  display: block;
`;

const RightDiv = styled.div`
`;

interface IProps {
  wishItems: WishItemDataParams[]
}

class Wishlist extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    const { wishItems } = this.props;
    const couponList = coupons.map((coupon: { type: string; title: string; }) => {
      return (
        <Option key={coupon.type} value={coupon.type}>{coupon.title}</Option>
      );
    });
    return (
      <>
        <WishTitle>장바구니</WishTitle>
        <WishList
          itemLayout="vertical"
          size="large"
          dataSource={wishItems}
          renderItem={(item: {
            availableCoupon: undefined | boolean;
            coverImage: string;
            id: string;
            price: number;
            score: number;
            title: string;
          }) => (
            <List.Item
              key={item.id}
              extra={
                <RightDiv>
                  <WishCheckbox />
                  <WishInputNumber min={1} defaultValue={1} />
                </RightDiv>
              }
            >
              <List.Item.Meta
                avatar={<img width={100} alt="logo" src={item.coverImage} />}
                title={<p>{item.title}</p>}
                description={item.price}
              />
            </List.Item>
          )}
        />
        <WishSelect
          placeholder="쿠폰 선택"
        >
          {couponList}
        </WishSelect>
      </>
    );
  }
}

export default connect(
  ({wish}:StoreState ) => ({
    wishItems: wish.wishItems
  })
)(Wishlist);
