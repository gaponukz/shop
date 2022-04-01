import { useState } from 'react';
import Wrapper from './components/Wrapper'
import './App.css'

const App = () => {
    let [counter, setCounter] = useState(0)
    let [value, setValue] = useState("some text")

    return (
        <Wrapper value={value}>
            <p>{counter}</p>
            <input value={value} onChange={(event) => {setValue(event.target.value)}}/>
            <button onClick={() => setCounter(counter +=1)}>+</button>
            <button onClick={() => setCounter(counter -= 1)}>-</button>
        </Wrapper>
    )
}

export default App;