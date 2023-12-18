import Center from "@/components/Center"
import ProductsGrid from "@/components/ProductsGrid"
import Title from "@/components/Title"



export default function NewProducts({products}) {
    return (
      <Center>
        <Title>Productos Nuevos</Title>
        <ProductsGrid products={products} />
      </Center>
    )
}