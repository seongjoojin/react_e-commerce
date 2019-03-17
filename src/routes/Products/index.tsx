import React from 'react';
import styled from 'styled-components';
import { Card , Icon, Button as AntButton } from 'antd';
import productItems from '../../api/productItems';
import { connect } from 'react-redux';
import { StoreState } from '../../store/modules';
import {
  WishItemDataParams,
  actionCreators as wishsActions,
} from '../../store/modules/wishLists';
import {bindActionCreators} from 'redux';

const { Meta } = Card;

const ProductList = styled.div`
  width:100%;
  > div {
    margin-bottom: 16px;
  }
`;

const MoreViewButton = styled(AntButton)`
  width: 100%;
`;

interface Items {
  availableCoupon: boolean | undefined
  coverImage: string
  id: string
  price: number
  score: number
  title: string
}

interface ISortItems {
  coverImage: string
  id: string
  price: number
  score: number
  title: string
}

interface IProps {
  wishItems: WishItemDataParams[];
  WishsActions: typeof wishsActions;
}

interface IState {
  pageNumber: number
  sortItems: Array<ISortItems>
  goodsItems: Array<Items>
  loading: boolean
}

class Products extends React.Component<IProps, IState> {
  state: IState = {
    pageNumber: 1,
    sortItems: [],
    goodsItems: [],
    loading: false
  };

  // 더 보기 함수
  _addPageNumber = () => {
    this.setState(
      (state) =>  ({ pageNumber: state.pageNumber + 1  }),
      () => {this._onMoreGoods();}
    );
  };

  _onMoreGoods = () => {
    let moreLists = this._onPaginate({
      array: this.state.sortItems, page_size: 5, page_number: this.state.pageNumber
    });
    this.setState((state) =>  {
      return {goodsItems: state.goodsItems.concat(moreLists)}
    });
  };

  // 페이징 함수
  _onPaginate = (parameters: { array: any, page_size: number, page_number: number }) => {
    let { array, page_size, page_number } = parameters;
    --page_number;
    return array.slice(page_number * page_size, (page_number + 1) * page_size);
  };

  componentDidMount() {
    const sortItems = productItems.sort((a: { score: number; }, b: { score: number; }) => {
      if (a.score > b.score) {
        return 1;
      }
      if (a.score < b.score) {
        return -1;
      }
      return 0;
    });
    this.setState({ sortItems });
    const goodsItems = this._onPaginate({
      array: sortItems, page_size: 5, page_number: this.state.pageNumber
    });
    this.setState({ goodsItems });
  }

  _onAdd = (
    availableCoupon: undefined | boolean,
    coverImage: string,
    id: string,
    price: number,
    score: number,
    title: string,
    count: number,
    check: boolean): void => {
    const { WishsActions } = this.props;
    WishsActions.add({
      availableCoupon,
      coverImage,
      id,
      price,
      score,
      title,
      count,
      check,
    });
  };

  _onRemove = (id: string): void => {
    const { WishsActions } = this.props;
    WishsActions.remove(id);
  };

  render() {
    const { _addPageNumber, _onAdd, _onRemove } = this;
    const { wishItems } = this.props;
    const { goodsItems } = this.state;
    const list = goodsItems.map(info =>{
      const items = wishItems.filter(wish => wish.id === info.id);
      return (<Card key={info.id}
                    cover={<img alt="example" src={info.coverImage}/>}
                    actions={[
                      <div
                        onClick={() =>{
                          if (wishItems.length > 0) {
                            items.length !== 1 ?
                              _onAdd(
                                info.availableCoupon,
                                info.coverImage,
                                info.id,
                                info.price,
                                info.score,
                                info.title,
                                1, false
                              ) :
                              _onRemove(info.id)
                          } else {
                            _onAdd(
                              info.availableCoupon,
                              info.coverImage,
                              info.id,
                              info.price,
                              info.score,
                              info.title,
                              1, false
                            )
                          }
                        }}
                      >
                        <Icon type="shopping" />
                        &nbsp; {items.length !== 1 ? "장바구니 추가" : "장바구니 빼기"}
                      </div>
                    ]}
      >
        <Meta
          title={info.title}
          description={info.price}
        />
      </Card>);
    });
    return (
    <>
      <ProductList>
        {list}
      </ProductList>
      <MoreViewButton type="primary" onClick={_addPageNumber} htmlType="button">
        More View
      </MoreViewButton>
    </>)
  }
}


export default connect(
  ({wish}:StoreState ) => ({
    wishItems: wish.wishItems
  }),
  (dispatch) => ({
    WishsActions: bindActionCreators(wishsActions, dispatch),
  })
)(Products);
