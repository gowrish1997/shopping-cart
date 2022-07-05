import { Send } from '@material-ui/icons'
import React from 'react'
import styled from 'styled-components'
const Container =styled.div`
display: flex;
flex-direction: column;
background-color: #FFDEAD;
height: 50vh;
justify-content: center;
align-items: center;
`
const Title=styled.h1`
`
const Desc=styled.div`
margin-bottom:10px;
`
const Inputcontainer=styled.div`
display: flex;
justify-content: center;
align-items:center;
width: 30%;
`
const Input=styled.input`
padding: 7px;
flex:8;
`
const Button=styled.button`
background-color: teal;
flex: 1;
`
const Newsletter = () => {
  return (
   <Container>
       <Title>Newsletter</Title>
       <Desc>Check here for new product and new offer</Desc>
       <Inputcontainer>
       <Input placeholder='Type here' ></Input>
       <Button>
           <Send></Send>
       </Button>
       </Inputcontainer>
   </Container>
  )
}
export default Newsletter
