import React from 'react';

const Wrapper = (props) => {
    // not more \_(~_~)_\
    return (
        <div className="container-fluid">
            {props.children}
        </div>
    )
}

export default Wrapper