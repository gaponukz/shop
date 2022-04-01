import React, {useState} from 'react'

const HomePage = () => {
    return (
        <div className="row">
            <div className="col" style={{paddingLeft: "50px"}}>
                <h1 style={{textAlign: 'right', color: "#66FCF1"}}>Let's create your app!</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla non efficitur metus. 
                    Fusce interdum massa et eros lacinia, at tristique lectus euismod. Cras ullamcorper 
                    eleifend nulla, in scelerisque nunc laoreet sed. Aliquam erat volutpat. Curabitur 
                    tincidunt nibh at tincidunt aliquet. Pellentesque id efficitur ipsum. Donec sem diam,
                     placerat iaculis orci non, maximus varius urna. In hac habitasse platea dictumst. 
                     Maecenas lobortis tellus in nisi convallis tincidunt. Vestibulum accumsan ornare 
                     libero quis porta. Vestibulum hendrerit risus et purus porttitor suscipit. Nam non 
                     enim eu leo dapibus suscipit. Sed varius est sed iaculis dapibus. Aenean consequat, 
                     tellus id finibus tempus, ante justo faucibus arcu, vel bibendum justo metus dignissimlacus.
                </p>
            </div>
            <div className="col">
                <div className="image-container">
                    <img className="start-image" src="https://ethereum.org/static/9a6e158f4ffd1cb5de246a3ecd0d7f86/b3831/hackathon_transparent.webp"/>
                </div>
            </div>
        </div>
    )
}

export default HomePage