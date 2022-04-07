const Wrapper = (props) => {
    // not more \_(~_~)_\
    const className = `container-fluid ${props.theme === 'dark' ? 'background-dark' : '' }`
    const style = {marginTop: "65px"}
    return (
        <div style={style} className={className}>
            {props.children}
        </div>
    )
}

export default Wrapper