import styled from "styled-components";

const FooterContainer = styled.div`
  margin-top: 40px;
  background-color: #0c181c;
  padding: 2rem 0 2rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  gap: 40px;
  text-align: center;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align:center;
  `

const ImgFooter = styled.img`
  max-width: 60px;
  max-height: 60px;
  @media screen and (min-width: 768px) {
    max-width: 80px;
    max-height: 80px;
  }
`;

const List = styled.ul`
  list-style: none;`

export default function Footer (){
  return(
    <FooterContainer>
      <Wrapper>     
          <p>Lagoria Almeda Nicolas Ariel</p>
          <p>Legajo: 55634</p>
      </Wrapper>
      <Wrapper>
        <p>Tecnicatura Universitaria en Programacíon</p>
      <p>Universidad Tecnologica Nacional - Facultad Regional de Tucumán</p>
      </Wrapper>
      <Wrapper>
        <ImgFooter src="https://nico-next-ecommerce.s3.amazonaws.com/file-1702994096825.png" alt=""/>
        <p>Todos los derechos reservados</p>
      </Wrapper>
    </FooterContainer>
  )
}