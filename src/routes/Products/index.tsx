import React from 'react';
import styled from 'styled-components';
import { Card } from 'antd';
// @ts-ignore
import productItems from '../../api/productItems';

const { Meta } = Card;

const ProductList = styled.div`
  width:100%;
`;

const Products = () => {
  // 노출 순서(score)에 따라 정렬
  const sortItems: any = productItems.sort((a, b) => {
      if (a.score > b.score) {
        return 1;
      }
      if (a.score < b.score) {
        return -1;
      }
      return 0;
  });

  // 페이징 함수
  function paginate (array: { slice: (arg0: number, arg1: number) => void; }, page_size: number, page_number: number) {
    --page_number;
    return array.slice(page_number * page_size, (page_number + 1) * page_size);
  }

  // 초기값
  interface Items {
    availableCoupon: boolean | undefined;
    coverImage: string
    id: string
    price: number
    score: number
    title: string
  }
  // @ts-ignore
  const initItems: Array<Items> = paginate(sortItems,5,1);

  const list = initItems.map(info =>{
   return (<Card key={info.score}
        cover={<img alt="example" src={info.coverImage}/>}
      >
        <Meta
          title={info.title}
          description={info.price}
        />
      </Card>)
    });

    return (
    <>
      <ProductList>
        {list}
      </ProductList>
    </>);
};

export default Products
