import Center from "@/components/Center";
import styled from "styled-components";
import Button from "@/components/Button";
import ButtonLink from "@/components/ButtonLink";
import CartIcon from "@/components/icons/CartIcon";
import { useContext } from "react";
import {CartContext} from "@/components/CartContext";

const Bg = styled.div`
  background-color: #222;
  color:#fff;
  padding: 50px 0;
`;

const Title = styled.h1`
  margin:0;
  font-weight: normal;
  font-size: 3rem;
`;

const Desc = styled.p`
  color:#aaa;
  font-size: .8rem;
`;

const ColumnsWrapper = styled.div`
display: grid;
grid-template-columns: 1.1fr .9fr;
gap: 40px;
`;

const StyledImg = styled.img`
  max-width: 100%;
  border-radius: 10px;
`;

const Column = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 25px;
`;
export default function Featured({product}) {
  const {addProduct} = useContext(CartContext)
  function addFeaturedToCart(){
    addProduct(product._id)
  }
  return(
    <Bg>
      <Center>
        <ColumnsWrapper>
          <Column>
          <div>
            <Title>{product.title}</Title>
            <Desc>{product.description}
            </Desc>
            <ButtonsWrapper>
            <ButtonLink href={'/product/'+product._id} outline={1} white={1}>Leer más</ButtonLink>
            <Button primary={1} onClick={addFeaturedToCart}>
              <CartIcon/>
              Añadir al carrito</Button>
            </ButtonsWrapper>
          </div>
          </Column>
          <Column>
            <StyledImg src={product.images[0]} alt=''/>
          </Column>
        </ColumnsWrapper>
      </Center>
    </Bg>
  )
}