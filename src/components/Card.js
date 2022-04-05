const CardWrapper = (props) => {
    const className = `card h-100 ${props.theme === 'dark' ? 'bg-dark' : ''}`
    const style = props.theme === 'dark' ? {color: 'white'} : {}

    return (
        <div className="col">
            <div className={className} style={style}>
                {props.children}
            </div>
        </div>
    )
}

const CardPhoto = (props) => {
    return (<img src={props.src} className="card-img-top"/>)
}

const CardBody = (props) => {
    return (
        <div className="card-body">
            {props.children}
        </div>
    )
}

const CardTitle = (props) => {
    return (
        <h5 className="card-title">
            {props.children}
        </h5>
    )
}

const CardText = (props) => {
    return (
        <p className="card-text">
            {props.children}
        </p>
    )
}

const CardFooter = (props) => {
    return (
        <div className="card-footer">
            <div className="text-end">
                {props.children}
            </div>
        </div>
    )
}

const CardButton = (props) => {
    const theme = {dark: 'light', light: 'dark'}[props.theme]
    return (
        <button type="button" onClick={props.onClick} className={`btn btn-outline-${theme}`}>
            {props.children}
        </button>
    )
}

export {CardWrapper, CardPhoto, CardBody, CardTitle, CardText, CardFooter, CardButton}