import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { StoreState } from '../../store/modules';
import {
  WishItemDataParams
} from '../../store/modules/wishLists';
import { List, Icon } from 'antd';

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

interface IProps {
  wishItems: WishItemDataParams[]
}

class Wishlist extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    const { wishItems } = this.props;
    console.log(wishItems);
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
            >
              <List.Item.Meta
                avatar={<img width={100} alt="logo" src={item.coverImage} />}
                title={<p>{item.title}</p>}
                description={item.price}
              />
            </List.Item>
          )}
        />
      </>
    );
  }
}


export default connect(
  ({wish}:StoreState ) => ({
    wishItems: wish.wishItems
  })
)(Wishlist);
