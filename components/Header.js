import Link from "next/link";
import styled from "styled-components";
import Center from "@/components/Center";
import { useContext } from "react";
import {CartContext} from "@/components/CartContext";

const StyledHeader = styled.header`
background-color: #222;
`
const Logo = styled(Link)`
    color:#fff;
    text-decoration:none;
    `;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`
const StyledNav = styled.nav`
  display: flex;
  gap: 15px;
`

const NavLink = styled(Link)`
  color: #aaa;
  text-decoration: none;
  margin-left: 20px;
  &:hover {
    color: #ccc;
  }
`

export default function Header () {
  const {cartProducts} = useContext(CartContext)
  return(
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href="/">Ecommerce</Logo>
          <StyledNav>
            <NavLink href={'/'}>Inicio</NavLink>
            <NavLink href={'/products'}>Productos</NavLink>
            <NavLink href={'/categories'}>Categorías</NavLink>
            <NavLink href={'/account'}>Cuenta</NavLink>
            <NavLink href={'/cart'}>Carrito ({cartProducts.length})</NavLink>
          </StyledNav>
        </Wrapper>
      </Center>
    </StyledHeader>
  )
}