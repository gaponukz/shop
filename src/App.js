import React, { useState } from 'react'
import ProductsNavbar from './components/Navbar'
import Wrapper from './components/Wrapper'
import {
    CardWrapper, 
    CardPhoto, 
    CardBody, 
    CardTitle, 
    CardText, 
    CardButton,
    CardFooter 
} from './components/Card'
import _ from 'jquery'
import './App.css'

const productsList = [
    {
        name: "Telefost",
        price: 500,
        photo: "images/telefost.png",
        description: "lorem ipsum"
    },
    {
        name: "Sender",
        price: 150,
        photo: "images/spammer.png",
        description: "lorem ipsum"
    },
    {
        name: "Inviter",
        price: 150,
        photo: 'images/inviter.png',
        description: "lorem ipsum"
    },
    {
        name: "Channel parser",
        price: 100,
        photo: 'images/channel_parser.png',
        description: "lorem ipsum"
    },
    {
        name: "Olx parser",
        price: 150,
        photo: 'images/olx_parser.png',
        description: "lorem ipsum"
    },
]

const App = () => {
    let __buttons = {}
    for (let product of productsList) {
        __buttons[product.name] = "add"
    }
    const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    const [products, setProducts] = useState([])
    const [buttons, switchers] = useState(__buttons)
    const [theme, setTheme] = useState(userPrefersDark ? "dark" : "light")

    const addProduct = (product) => {
        setProducts(products.concat([product]))
        switchers(_.extend(buttons, {[product.name]: "remove"}))
    }

    const removeProduct = (product) => {
        setProducts(products.filter(item => item !== product))
        switchers(_.extend(buttons, {[product.name]: "add"}))
    }

    return (<>
        <ProductsNavbar 
            products={products} 
            removeProduct={removeProduct}
            theme={theme}
            setTheme={setTheme}
        />
        <br/> <br/> <br/>
        <Wrapper theme={theme}>  
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {productsList.map(product => 
                    <CardWrapper theme={theme}>
                        <CardPhoto src={product.photo} />

                        <CardBody>
                            <CardTitle> {product.name} </CardTitle>
                            <CardText> {product.description} </CardText>
                        </CardBody>

                        <CardFooter>{{
                            add: <CardButton theme={theme} onClick={() => addProduct(product)}>+{product.price}$</CardButton>,
                            remove: <CardButton theme={theme} onClick={() => removeProduct(product)}>-{product.price}$</CardButton>
                        }[buttons[product.name]]}</CardFooter>
                    </CardWrapper>
                )}
            </div>
            <br/>
        </Wrapper>
    </>)
}

export default App;