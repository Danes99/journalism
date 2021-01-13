// Import pre-installed modules
import React from 'react'

// Import downloaded modules
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'

// Import CSS
import './Page.css'

const Page = props => {
    return (
        <div className='main-content'>
            <Container className="p-3">

                <Jumbotron>
                    <div className='Page'>
                        <div className='main-content-2'>
                            {props.title ? <h1 className="text-center">{props.title}</h1> : null}
                            {props.children}
                        </div>
                    </div>
                </Jumbotron>

            </Container>
        </div >
    )
}

export default Page