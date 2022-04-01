import React, {useState} from 'react'
import scripts from './scripts.json'

const Navbar = (props) => {
    const [acive, setActive] = useState(false)
    
    return (
        <div>
            <NavbarContent acive={acive ? "collapse show" : "collapse"}>
            <ul className="nav justify-content-end">
                {scripts.map(script => 
                    <li className="nav-item">
                        <a
                            className="nav-link"
                            aria-current="page"
                            href="#" 
                            onClick={() => props.pageSetter(script.name)}>
                                {script.name}
                        </a>
                    </li>
                )}
            </ul>
            </NavbarContent>
            <nav className="navbar navbar-dark dark-nav">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" onClick={() => setActive(!acive)}>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
            </nav>
        </div>
    )
}

const NavbarContent = (props) => {
    return (
        <div className={props.acive}>
            <div className="dark-nav p-4">
                {props.children}
            </div>
        </div>
    )
}

export default Navbar