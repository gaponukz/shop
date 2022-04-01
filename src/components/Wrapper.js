import React from 'react';

const Wrapper = (props) => {
    return (
        <div className="App">
            <p>{props.value}</p>
            {props.children}
        </div>
    )
}

export default Wrapper