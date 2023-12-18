import styled, {css} from "styled-components"
import { primary } from "@/lib/colors"

export const ButtonStyles = css`

background-color: ${primary};
border:0;
color:#fff;
padding: 5px 15px;
border-radius: 5px;
cursor: pointer;
display: inline-flex;
align-items: center;
text-decoration: none;
svg {
  height: 16px;
  margin-right: 5px;
}

${props => props.block && css`
display: block;
width: 100%;
`}

${props => props.white && !props.outline && css`
background-color: #fff;
color: #000;
`}
${props => props.white && props.outline && css`
background-color: transparent;
color: #fff;
border: 1px solid #fff;
`}
${props => props.primary && !props.outline && css`
background-color: ${primary};
border: 1px solid ${primary};
color: #fff;
`}
${props => props.primary && props.outline && css`
background-color: transparent;
border: 1px solid ${primary};
color: #5542f6;
`}
${props => props.size === 'l' && css`
  font-size: 1.2rem;
  padding: 10px 20px;
  svg{
    height: 20px;
  }
  `
}`


export const StyledButton = styled.button`
${ButtonStyles}
`

export default function Button({children,...rest}){
  return(
    <StyledButton {...rest}>{children}</StyledButton>
  )
}