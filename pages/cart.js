import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import Button from "@/components/Button";
import { useContext, useEffect,useState } from "react";
import { CartContext } from "@/components/CartContext";
import axios from "axios";
import Table from "@/components/Table";
import Input from "@/components/Input";
import { useSession } from 'next-auth/react';
import Footer from "@/components/Footer";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  min-height: 70vh;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr .8fr;
  }
  gap: 40px;
  margin-top: 40px;
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;

const ProductInfoCell = styled.td`
  padding: 10px 0;
`;

const ProductImageBox = styled.div`
  width: 70px;
  height: 100px;
  padding: 2px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display:flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img{
    max-width: 60px;
    max-height: 60px;
  }
  @media screen and (min-width: 768px) {
    padding: 10px;
    width: 100px;
    height: 100px;
    img{
      max-width: 80px;
      max-height: 80px;
    }
  }
`;

const ImgCart = styled.img`
    max-width: 60px;
    max-height: 60px;
    @media screen and (min-width: 768px) {
        max-width: 80px;
        max-height: 80px;   
    }
`

const QuantityLabel = styled.span`
  padding: 0 15px;
  display: block;
  @media screen and (min-width: 768px) {
    display: inline-block;
    padding: 0 10px;
  }
`;

const CityHolder = styled.div`
  display:flex;
  gap: 5px;
`;


export default function CartPage(){
  const {cartProducts, addProduct, removeProduct,clearCart} = useContext(CartContext)
  const { data: session } = useSession();
  const [products, setProducts] = useState([])
  const [name, setName] = useState(session?.user?.name.toString() || '')
  const [email, setEmail] = useState(session?.user?.email.toString() || '')
  const [city, setCity] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [streedAddress, setStreedAddress] = useState('')
  const [country, setCountry] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  useEffect(() => {
    if(cartProducts.length > 0){
      axios.post('/api/cart', {ids: cartProducts})
      .then(response =>{
        setProducts(response.data);
      })
    }else{
      setProducts([]);
    }
  },[cartProducts])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    if (window?.location.href.includes('success')) {
      setIsSuccess(true);
      clearCart();
    }
  }, [clearCart]);

  function moreOfThisProduct(id){
    addProduct(id)
  }

  function lessOfThisProduct(id){
    removeProduct(id)
  }
  async function goToPayment(){
      const response = await axios.post('/api/checkout',{
        name,
        email,
        city,
        postalCode,
        streedAddress,
        country,
        cartProducts,
      })
      if(response.data.url){
        window.location = response.data.url;
      }
  }

  let total = 0;
  for(const productId of cartProducts){
    const price = products.find(p => p._id === productId)?.price || 0;
    total += price;
  }

  if(isSuccess){
    return (
    <>
    <Header />
    <Center>
      <ColumnsWrapper>
        <Box>
          <h1>Gracias por tu compra!</h1>
          <p>En breve recibirás un email con los detalles de tu compra</p>
        </Box>
      </ColumnsWrapper>
    </Center>
    </>
    )
  }

  return (
    <>
    <Header />
    <Center>
    <ColumnsWrapper>
    <Box>
    <h2>Cart</h2>
            {!cartProducts?.length && (
              <div>Tu carrito esta vacío</div>
            )}
            {products?.length > 0 && (
              <Table>
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product._id}>
                      <ProductInfoCell>
                        <ProductImageBox>
                          <ImgCart src={product.images[0]} alt=""/>
                        </ProductImageBox>
                        {product.title}
                      </ProductInfoCell>
                      <td>
                        <Button
                          onClick={() => lessOfThisProduct(product._id)}>-</Button>
                        <QuantityLabel>
                          {cartProducts.filter(id => id === product._id).length}
                        </QuantityLabel>
                        <Button
                          onClick={() => moreOfThisProduct(product._id)}>+</Button>
                      </td>
                      <td>
                        ${cartProducts.filter(id => id === product._id).length * product.price}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td></td>
                    <td>Total:</td>
                    <td><strong>${total}</strong></td>
                  </tr>
                </tbody>
                <Button primary={1} onClick={clearCart}>Vaciar Carrito</Button>
              </Table>
              
            )}
    
    </Box>
    {!!cartProducts?.length && (
      <Box>
        <h2>Información de la Orden</h2>
        
          <Input type="text"
          name="name" 
          placeholder="Name" 
          value={name}
          onChange={ev => setName(ev.target.value)}/>
          <Input type="text"
          name="email" 
          placeholder='Email' 
          value={email}
          onChange={ev => setEmail(ev.target.value)}/>
          <CityHolder>
          <Input type="text"
          name="city" 
          placeholder='Ciudad' 
          value={city} 
          onChange={ev => setCity(ev.target.value)} />
          <Input type="text"
          name="postalCode" 
          placeholder='Código Postal' 
          value={postalCode} 
          onChange={ev => setPostalCode(ev.target.value)} />
          </CityHolder>
          <Input type="text"
          name="streedAddress" 
          placeholder='Direccion' 
          value={streedAddress} 
          onChange={ev => setStreedAddress(ev.target.value)}/>
          <Input type="text"
          name="country" 
          placeholder='País' 
          value={country} 
          onChange={ev => setCountry(ev.target.value)}/>
          <input type="hidden" name="products" value={cartProducts.join(',')}/>
          <Button 
          block={1} 
          primary={1} 
          onClick={goToPayment}>
          Continuar con el pago</Button>
      </Box>
      )
    }
    
    </ColumnsWrapper>
    </Center>
    <Footer/>
    </>
    )
}