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
import productsList from './products.json'
import './App.css'

const App = () => {
    let __buttons = {}
    for (let product of productsList) {
        __buttons[product.name] = "add"
    }

    const [products, setProducts] = useState([])
    const [language, setLanguage] = useState(navigator.language.split('-')[0])
    const [buttons, switchers] = useState(__buttons)

    const addProduct = (product) => {
        setProducts(products.concat([product]))
        switchers(_.extend(buttons, {[product.name]: "remove"}))
    }

    const removeProduct = (product) => {
        setProducts(products.filter(item => item !== product))
        switchers(_.extend(buttons, {[product.name]: "add"}))
    }
    const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const [theme, setTheme] = useState(userPrefersDark ? "dark" : "light")

    return (<>
        <ProductsNavbar 
            products={products} 
            removeProduct={removeProduct}
            theme={theme}
            setTheme={setTheme}
            language={language}
            setLanguage={setLanguage}
        />
        <Wrapper theme={theme}>  
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {productsList.map(product => 
                    <CardWrapper theme={theme}>
                        <CardPhoto src={product.photo} />

                        <CardBody>
                            <CardTitle> {product.name} </CardTitle>
                            <CardText> {product.description[language] || product.description.en} </CardText>
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