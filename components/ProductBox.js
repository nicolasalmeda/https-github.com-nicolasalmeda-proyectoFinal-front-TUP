import styled from "styled-components"
import Button from "@/components/Button"
import CartIcon from "@/components/icons/CartIcon"
import Link from "next/link"
import {useContext} from "react";
import {CartContext} from "@/components/CartContext";


const ProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const WhiteBox = styled(Link)`
  background-color: #fff;
  border-radius: 5px;
  padding: 20px;
  height: 120px
  width: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`

const Img = styled.img`
    max-width: 100%;
    max-height: 100%;
    border-radius: 5px;
    margin-bottom: 10px;
`

const Title = styled(Link)`
  font-weight: normal;
  font-size:.9rem;
  color:inherit;
  text-decoration:none;
  margin:0;
`;

const ProductInfoBox = styled.div`
  margin-top: 5px;
`;

const PriceRow = styled.div`
  display: block;
  @media screen and (min-width: 768px) {
    display: flex;
    gap: 5px;
  }
  align-items: center;
  justify-content:space-between;
  margin-top:2px;
`;

const Price = styled.div`
  font-size: 1rem;
  font-weight:400;
  text-align: right;
  @media screen and (min-width: 768px) {
    font-size: 1.2rem;
    font-weight:600;
    text-align: left;
  }
`;

export default function ProductBox({ _id,title,description,price,images}) {
  const {addProduct} = useContext(CartContext);
  const url = '/product/'+_id;
    return (
      <ProductWrapper>
      <WhiteBox href={url}>
        <div>
          <Img src={images?.[0]} alt=""/>
        </div>
      </WhiteBox>
      <ProductInfoBox>
        <Title href={url}>{title}</Title>
        <PriceRow>
          <Price>
            ${price}
          </Price>
          <Button block={1} onClick={() => addProduct(_id)} primary={1}>
            Añadir Carrito
          </Button>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
    )
}