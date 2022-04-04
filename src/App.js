import React, { useState } from 'react'
import ProductsNavbar from './components/Navbar'
import Wrapper from './components/Wrapper'
import './App.css'

import telefost_photo from './images/telefost.png'
import spammer_photo from './images/spammer.png'
import channel_parser_photo from './images/channel_parser.png'
import olx_parser_photo from './images/olx_parser.png'

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
    const [products, setProducts] = useState([])

    return (
        <div>
            <ProductsNavbar products={products} setProducts={setProducts}/>
            <br/> <br/> <br/>
            <Wrapper>  
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {productsList.map(product => 
                        <div className="col">
                            <div className="card h-100">
                                <img src={product.phot} className="card-img-top"/>
                                <div className="card-body">
                                    <h5 className="card-title">{product.name}</h5>
                                    <p className="card-text">{product.description}</p>
                                </div>
                                <div className="card-footer">
                                    <div className="text-end">
                                        <button type="button" onClick={() => {
                                            setProducts(products.concat([product]))
                                        }} className="btn btn-outline-dark">+{product.price}$</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </Wrapper>
        </div>
    )
}

export default App;