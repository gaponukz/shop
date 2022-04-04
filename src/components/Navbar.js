import { useState } from "react"
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

const ProductsNavbar = (props) => {
    const [username, setUsername] = useState("")
    const [message, setMesage] = useState("")
    const [success, setSuccess] = useState(false)

    let currentTime = new Date()
    let currentHours = currentTime.getHours()
    let currentMinutes = currentTime.getMinutes()
    let hours = currentHours.length === 2 ? '0' + currentHours : currentHours
    let minutes = currentMinutes.length === 2 ? '0' + currentMinutes : currentMinutes

    return (
        <nav className="navbar navbar-light bg-light fixed-top">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Save your time</a>
                <BasketButton products={props.products}/>
                
                <div className="offcanvas offcanvas-end " tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
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
                            variant="outline-dark"
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

const MessageBox = (props) => {
    return (
        <div class="message__block">
            <div class="message__heading">
                <div class="message__name">{props.name}</div>
                <div class="message__time">{props.time}</div>
            </div>
            <div class="message__content" contenteditable="" spellcheck="false">
                {props.children}
            </div>
        </div>
    )
}

export default ProductsNavbar