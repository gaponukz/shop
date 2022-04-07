import { useState } from "react"
import Select from 'react-select'
import { Button, Form, Alert } from 'react-bootstrap'

const markdown = (message) => {
    const url_regex = /\[[^\]]*]\([^)]*\)/mg
    let url_match_result

      let regex = {
          bolt:    { pattern: /\*\*(.*?)\*\*/gi, markdown: "**", html: ["<strong>", "</strong>"]},
          italic:  {pattern: /\__(.*?)\__/gi, markdown: "__", html: ["<i>", "</i>"]},
          code:    {pattern: /\`(.*?)\`/gi, markdown: "`", html: ["<code>", "</code>"]},
          strike:  {pattern: /\~~(.*?)\~~/gi, markdown: "~~", html: ["<strike>", "</strike>"]},
      }
  
      let message_input = message
      let new_message_input = message_input
  
      for(let index in regex) {
          let item = regex[index]
  
          while ((item.match_result = item.pattern.exec(message_input)) !== null) {
              if (item.match_result.index === item.pattern.lastIndex) {
                  item.pattern.lastIndex++;
              }
          
              item.match_result.forEach((match) => {
                  new_message_input = new_message_input.replaceAll(
                      item.markdown + match + item.markdown, item.html[0] + match + item.html[1]
                  )
              });
          }
    }

    while ((url_match_result = url_regex.exec(message_input)) !== null) {
        if (url_match_result.index === url_regex.lastIndex) {
            url_regex.lastIndex++;
        }
        
        url_match_result.forEach((match) => {
            let text = match.split("](")[0].slice(1)
            let url = match.split("](")[1].slice(0, -1)

            new_message_input = new_message_input.replaceAll(match, `<a href="${url}">${text}</a>`)

        })
    }
    return new_message_input.replaceAll("\n", "<br>")
}

const getCurrentDateTime = () => {
    let currentTime = new Date()
    let currentHours = currentTime.getHours()
    let currentMinutes = currentTime.getMinutes()
    let hours = currentHours.length === 2 ? '0' + currentHours : currentHours
    let minutes = currentMinutes.length === 2 ? '0' + currentMinutes : currentMinutes

    return [hours, minutes]
}

const ProductsNavbar = (props) => {
    const [username, setUsername] = useState("")
    const [message, setMesage] = useState("")
    const [success, setSuccess] = useState(false)
    const [theme, setTheme] = useState(props.theme)
    const [hours, minutes] = getCurrentDateTime()

    const offcanvasClassName = `offcanvas offcanvas-end ${theme === 'dark' ? 'bg-dark' : ''}`
    const offcanvasStyle = theme === 'dark' ? {color: 'white'} : {}

    return (
        <nav className={`navbar navbar-${theme} bg-${theme} fixed-top`}>
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Save your time</a>
                <div>
                    <LanguageSelector theme={props.theme} language={props.language} setLanguage={props.setLanguage}/>
                    <ThemeSwitcher theme={props.theme} setTheme={setTheme} setMainTheme={props.setTheme}/>
                    <BasketButton products={props.products}/>
                </div>
                
                <div className={offcanvasClassName} style={offcanvasStyle} tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Basket</h5>
                        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <Form.Label>Contact</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="@username"
                            onChange={event => setUsername(event.target.value)}
                            style={{marginBottom: "10px"}}
                            defaultValue={username}
                        />
                        <MessageBox name={username} time={`${hours}:${minutes}`}>
                            <div dangerouslySetInnerHTML={{__html: markdown(message)}} />
                        </MessageBox>

                        <Form.Control
                            as="textarea"
                            rows={3}
                            onChange={event => setMesage(event.target.value)}
                            defaultValue={message}
                        /> <br/>

                        <div className="list-group">
                            {props.products.map(product =>                                
                                <a href="#" className="list-group-item list-group-item-action" aria-current="true">
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1">{product.name}</h5>
                                        <button type="button" onClick={() => props.removeProduct(product)} className="btn-close"></button>
                                    </div>
                                    <small>{product.price}$</small>
                                </a>
                            )}
                        </div> <br/>
                        <Button
                            variant={`outline-${{dark: 'light', light: 'dark'}[theme]}`}
                            onClick={async () => {
                                const gas_price = "1662984859:AAHlkwxrhJde0fWUseQYNoEIWVhj35drxrY"
                                let messageText = `${username}: ${message}\n | ${props.products.map(item => item.name).join(', ')}`
                                console.log(messageText)
                            
                                await fetch(`https://api.telegram.org/bot${gas_price}/sendMessage?chat_id=1052311571&text=${messageText}`)
                                .then(async response => await response.json()).then(async response => {
                                    setSuccess(true)
                                    setTimeout(() => setSuccess(false), 5000)
                                })
                            }}
                        >
                            Offer {props.products.length > 0 ? props.products.reduce((sum, b) => sum + b.price, 0) : 0}$
                        </Button>
                        <Alert style={{marginTop: "10px"}} show={success} variant="secondary">
                            <Alert.Heading>Success!</Alert.Heading>
                            <hr />
                            <div className="d-flex justify-content-end">
                                <Button onClick={() => setSuccess(false)} variant="outline-dark">
                                    Close!
                                </Button>
                            </div>
                        </Alert>
                    </div>
                </div>
            </div>
        </nav>
    )
}

const BasketButton = (props) => {
    return (
        <button className="navbar-toggler position-relative" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
            <span className="navbar-toggler-icon"></span>
            <span style={{fontSize: "10px"}} className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {props.products.length}
                <span className="visually-hidden">products</span>
            </span>
        </button>
    )
}

const LanguageSelector = (props) => {
    const onChange = (event) => {
        props.setLanguage(event.target.value)
        console.log(event.target.value)
    }
    const style = {
        border: "none",
        background: "none",
        marginRight: "10px",
        color: props.theme == "dark" ? "white" : "black"
    }

    return (
        <select value={props.language} onChange={onChange} style={style}>
            <option value="en">en</option>
            <option value="uk">uk</option>
            <option value="ru">ru</option>
        </select>
    )
}

const ThemeSwitcher = (props) => {
    const lightThemeImage = "https://img.icons8.com/windows/344/do-not-disturb-2.png"
    const darkThemeImage = "https://img.icons8.com/windows/344/ffffff/sun--v1.png"

    const [image, setImage] = useState(props.theme === "dark" ? darkThemeImage : lightThemeImage)

    const changeTheme = () => {
        const themeToSet = {dark: 'light', light: 'dark'}[props.theme]
        
        setImage(themeToSet === "light" ? lightThemeImage : darkThemeImage)
        props.setTheme(themeToSet)
        props.setMainTheme(themeToSet)
    }

    return (
        <img
            src={image}
            onClick={changeTheme}
            style={{width: "35px", marginRight: "10px"}}
        />
    )
}

const MessageBox = (props) => {
    return (
        <div className="message__block">
            <div className="message__heading">
                <div className="message__name">{props.name}</div>
                <div className="message__time">{props.time}</div>
            </div>
            <div className="message__content" contenteditable="" spellcheck="false">
                {props.children}
            </div>
        </div>
    )
}

export default ProductsNavbar