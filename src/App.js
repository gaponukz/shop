import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Wrapper from './components/Wrapper'
import './App.css'

const App = () => {
    return (
        <div>
            <Navbar/>
            <Wrapper>
                Hello World
            </Wrapper>
        </div>
    )
}

export default App;