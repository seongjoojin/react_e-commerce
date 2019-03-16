import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
// @ts-ignore
import coupons from 'api/coupons';
import { StoreState } from '../../store/modules';
import {
  WishItemDataParams,
  actionCreators as wishsActions
} from '../../store/modules/wishLists';
import { List, Checkbox, InputNumber, Select } from 'antd';
import { bindActionCreators } from 'redux';

const Option = Select.Option;

const WishTitle = styled.h1`
  background-color: #fff;
  margin: 0;
  padding: 8px;
  font-size: 20px;
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

const AmountInfo = styled.div`
  width: 100%;
  padding: 16px 8px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
`;

const AmountNumber = styled.span`
  color: #dd2c00;
  b {
    font-size: 18px;
  }
`;

interface IProps {
  wishItems: WishItemDataParams[];
  WishsActions: typeof wishsActions;
}

interface IState {
  totalAmount: number
}

class Wishlist extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  state: IState = {
    totalAmount: 0
  };

  changeCount =  (value: any, id: string) => {
    const { WishsActions } = this.props;
    WishsActions.change(id, value)
  };

  changeCheck = (value: any, id: string) => {
    const { WishsActions } = this.props;
    WishsActions.check(id, value.target.checked);
  };

  render() {
    const { changeCount, changeCheck } = this;
    const { wishItems } = this.props;
    const { totalAmount } = this.state;
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
            count: number;
            check: boolean;
          }) => (
            <List.Item
              key={item.id}
              extra={
                <RightDiv>
                  <WishCheckbox
                    onChange={value =>changeCheck(value ,item.id)}
                  />
                  <WishInputNumber defaultValue={1} onChange={value =>changeCount(value, item.id)} />
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
        <AmountInfo>
          <span>총 결제 금액</span>
          <AmountNumber><b>{totalAmount}</b>&nbsp;원</AmountNumber>
        </AmountInfo>
      </>
    );
  }
}

export default connect(
  ({wish}:StoreState ) => ({
    wishItems: wish.wishItems
  }),
  (dispatch) => ({
    WishsActions: bindActionCreators(wishsActions, dispatch)
  })
)(Wishlist);
