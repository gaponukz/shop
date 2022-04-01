import React, { useState } from 'react'
import Navbar from './components/Navbar'
import HomePage from './components/Home'
import Wrapper from './components/Wrapper'
import './App.css'

const App = () => {
    const [page, setPage] = useState("home")

    return (
        <div>
            <Navbar pageSetter={setPage}/>
            <Wrapper>
                <br/>
                <HomePage/>
            </Wrapper>
        </div>
    )
}

export default App;