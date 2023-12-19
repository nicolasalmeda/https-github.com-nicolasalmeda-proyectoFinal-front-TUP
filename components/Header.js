import Link from "next/link";
import styled from "styled-components";
import Center from "@/components/Center";
import { useContext,useState } from "react";
import {CartContext} from "@/components/CartContext";
import BarsIcon from "./icons/Bars";
import { useSession, signIn, signOut } from "next-auth/react"
import Button from "./Button";

const StyledHeader = styled.header`
background-color: #222;
`
const Logo = styled(Link)`
  color:#fff;
  text-decoration:none;
  position: relative;
  z-index: 3;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`
const StyledNav = styled.nav`
  ${props => props.mobileNavActive ? `
    display: block;
  ` : `
    display: none;
  `}
  gap: 15px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 70px 20px 20px;
  background-color: #222;
  @media screen and (min-width: 768px) {
    display: flex;
    position: static;
    padding: 0;
  }
`;

const NavLink = styled(Link)`
  display: block;
  color:#aaa;
  text-decoration:none;
  padding: 10px 0;
  @media screen and (min-width: 768px) {
    padding:0;
  }
`;

const NavButton = styled.button`
  background-color: transparent;
  width: 30px;
  height: 30px;
  border:0;
  color: white;
  cursor: pointer;
  position: relative;
  z-index: 3;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

const UserContainer = styled.div`
  display: flex;
  align-items: start;
  gap: 10px;
  color: #fff;
  margin-bottom:  0;
  @media screen and (max-width: 768px) {
    margin-bottom: 10px;
    align-items: center;
  }
`;

const ImgUser = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`

export default function Header () {
  const { data: session } = useSession()
  const {cartProducts, clearCart} = useContext(CartContext)
  const [mobileNavActive,setMobileNavActive] = useState(false);

  const handleSignOutAndClearCart = async () => {
    await clearCart();
    await signOut();
  }
  return(
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href="/">EcoTech</Logo>
          <StyledNav mobileNavActive={mobileNavActive}>
            <NavLink href={'/'}>Inicio</NavLink>
            <NavLink href={'/products'}>Productos</NavLink>
            <NavLink href={'/categories'}>Categorías</NavLink> 
            <NavLink href={'/account'}>Cuenta</NavLink>
            {session ? (
              <>
                <NavLink href={'/cart'}>Carrito ({cartProducts.length})</NavLink>
                <Logo href={'#'}>
                  <UserContainer>
                    <ImgUser src={session.user.image} alt="" className="w-4 h-4" />
                    <span className="py-1 px-2">{session.user.name}</span>
                  </UserContainer>
                </Logo>
              </>
            ) : (
              <NavLink href={'/cart'}>Carrito ({cartProducts.length})</NavLink>
            )}
            <Button outline={1} white={1} onClick={() => session ? handleSignOutAndClearCart() : signIn()}> {session ? 'Salir' : 'Ingresar'}</Button>
          </StyledNav>
          <NavButton onClick={() => setMobileNavActive(prev => !prev)}>
            <BarsIcon />
          </NavButton>
        </Wrapper>
      </Center>
    </StyledHeader>
  )
}