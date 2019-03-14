import * as React from 'react';
import styled from 'styled-components';
import { Card , Icon, Button as AntButton } from 'antd';
// @ts-ignore
import productItems from 'api/productItems';

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
  onMoreGoods = (): void => {
    this.setState(
      () => ({ loading: true})
    );
    this.setState(
      ({ pageNumber }) => ({ pageNumber: pageNumber + 1 })
    );
    let moreLists = this.onPaginate({ array: this.state.sortItems, page_size: 5, page_number: this.state.pageNumber });
    this.setState(
      ({ goodsItems }) => ({
        goodsItems: goodsItems.concat(moreLists)
      })
    );
    this.setState(
      () => ({ loading: false})
    );
  };

  // 페이징 함수
  onPaginate = (parameters: { array: any, page_size: number, page_number: number }) => {
    let { array, page_size, page_number } = parameters;
    --page_number;
    return array.slice(page_number * page_size, (page_number + 1) * page_size);
  };

  async componentDidMount() {
    await this.setState(
      () => ({ sortItems: productItems.sort((a: { score: number; }, b: { score: number; }) => {
          if (a.score > b.score) {
            return 1;
          }
          if (a.score < b.score) {
            return -1;
          }
          return 0;
        })
      })
    );
    await this.setState(
      () => ({
        goodsItems: this.onPaginate({ array: this.state.sortItems, page_size: 5, page_number: this.state.pageNumber })
      })
    );
  }

  render() {
    const { onMoreGoods } = this;
    const { goodsItems, loading } = this.state;
    const list = goodsItems.map(info =>{
      return (<Card key={info.score}
                    cover={<img alt="example" src={info.coverImage}/>}
                    actions={[<div><Icon type="shopping" />&nbsp;장바구니</div>]}
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
      <MoreViewButton type="primary" loading={loading} onClick={onMoreGoods} htmlType="button">
        More View
      </MoreViewButton>
    </>)
  }
}

export default Products;
