import telefost_photo from './images/telefost.png'
import spammer_photo from './images/spammer.png'
import inviter_photo from './images/inviter.png'
import channel_parser_photo from './images/channel_parser.png'
import olx_parser_photo from './images/olx_parser.png'

import React, { useState } from 'react'
import ProductsNavbar from './components/Navbar'
import Wrapper from './components/Wrapper'
import {
    CardWrapper, 
    CardPhoto, 
    CardBody, 
    CardTitle, 
    CardText, 
    CardFooter 
} from './components/Card'
import _ from 'jquery'
import './App.css'

const productsList = [
    {
        name: "Telefost",
        price: 500,
        phot: telefost_photo,
        description: "lorem ipsum"
    },
    {
        name: "Sender",
        price: 150,
        phot: spammer_photo,
        description: "lorem ipsum"
    },
    {
        name: "Inviter",
        price: 150,
        phot: inviter_photo,
        description: "lorem ipsum"
    },
    {
        name: "Channel parser",
        price: 100,
        phot: channel_parser_photo,
        description: "lorem ipsum"
    },
    {
        name: "Olx parser",
        price: 150,
        phot: olx_parser_photo,
        description: "lorem ipsum"
    },
]

const App = () => {
    let __buttons = {}
    for (let product of productsList) {
        __buttons[product.name] = "add"
    }

    const [products, setProducts] = useState([])
    const [buttons, switchers] = useState(__buttons)

    const addProduct = (product) => {
        setProducts(products.concat([product]))
        switchers(_.extend(buttons, {[product.name]: "remove"}))
    }

    const removeProduct = (product) => {
        setProducts(products.filter(item => item !== product))
        switchers(_.extend(buttons, {[product.name]: "add"}))
    }

    return (<>
        <ProductsNavbar products={products} removeProduct={removeProduct}/>
        <br/> <br/> <br/>
        <Wrapper>  
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {productsList.map(product => 
                <CardWrapper>
                    <CardPhoto src={product.phot} />

                    <CardBody>
                        <CardTitle> {product.name} </CardTitle>
                        <CardText> {product.description} </CardText>
                    </CardBody>

                    <CardFooter>
                        {{
                            add: <button type="button" onClick={() => addProduct(product)} className="btn btn-outline-dark">+{product.price}$</button>,
                            remove: <button type="button" onClick={() => removeProduct(product)} className="btn btn-outline-dark">-{product.price}$</button>
                        }[buttons[product.name]]}
                    </CardFooter>
                </CardWrapper>
            )}
            </div>
            <br/>
        </Wrapper>
    </>)
}

export default App;