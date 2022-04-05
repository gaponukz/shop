const Wrapper = (props) => {
    // not more \_(~_~)_\
    return (
        <div className={`container-fluid ${props.theme === 'dark' ? 'background-dark' : '' }`}>
            {props.children}
        </div>
    )
}

export default Wrapper