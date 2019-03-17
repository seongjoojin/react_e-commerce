import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import coupons from '../../api/coupons';
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
  totalAmount: number;
  selectCoupon: null | string;
}

class Wishlist extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this._changeCount = this._changeCount.bind(this);
    this._changeCheck = this._changeCheck.bind(this);
  }

  state: IState = {
    totalAmount: 0,
    selectCoupon: null
  };

  _changeCount = async (value: any, id: string) => {
    const { WishsActions } = this.props;
    await WishsActions.changeCount(id, value);
    await this._sumWish();
  };

  _changeCheck = async (value: any, id: string) => {
    const { WishsActions } = this.props;
    await WishsActions.changeCheck(id, value.target.checked);
    if (value) {
      await this._sumWish();
    }
  };

  _changeSelect = (value: any) => {
    this.setState(
      () => ({ selectCoupon: value }),
      () => { this._sumWish() }
    );
  };

  _sumWish() {
    const { wishItems } = this.props;
    const { selectCoupon } = this.state;
    let sumNumber = 0;
    switch (selectCoupon) {
      case 'rate':
        const rates = coupons.map(
          (coupon: any)=> {
            return coupon.type === 'rate' ? coupon.discountRate : null ;
          }
        );
        const rate = rates.filter((rate: null | string)=> rate !== null)[0];
        wishItems.map(wish=>{
          return wish.check ?
            wish.availableCoupon ?
              sumNumber = sumNumber + (wish.price * wish.count) :
              sumNumber = sumNumber + (wish.price * wish.count) - ((wish.price * wish.count) * (rate/100))
            :
            sumNumber;
        });
        break;
      case 'amount':
        const amounts = coupons.map(
          (coupon: any)=> {
            return coupon.type === 'amount' ? coupon.discountAmount : null ;
          }
        );
        const amount = amounts.filter((amount: null | string)=> amount !== null)[0];
        wishItems.map(wish=>{
          return wish.check ?
            wish.availableCoupon ?
              sumNumber = sumNumber + (wish.price * wish.count) :
              sumNumber = sumNumber + ((wish.price * wish.count) - amount)
            :
            sumNumber;
        });
        break;
      default:
        wishItems.map(wish=>{
          return wish.check ? sumNumber = sumNumber + (wish.price * wish.count) : sumNumber;
        });
    }
    this.setState({ totalAmount: sumNumber });
  }

  render() {
    const { _changeCount, _changeCheck, _changeSelect } = this;
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
                    onChange={value =>_changeCheck(value ,item.id)}
                  />
                  <WishInputNumber
                    min={1}
                    defaultValue={1}
                    onChange={value =>_changeCount(value, item.id)}
                  />
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
          onChange={value =>_changeSelect(value)}
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
