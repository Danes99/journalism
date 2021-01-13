// Import pre-installed modules
import React from 'react'

// Import downloaded modules
import {
    Card,
    Button,
    CardBody,
    CardTitle,
    CardText
} from 'reactstrap'

const FooterInContainer = () => {
    return (
        <footer>
            <Card>
                <CardBody>
                    <CardTitle>Special Title Treatment</CardTitle>
                    <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                    <Button>Go somewhere</Button>
                </CardBody>
            </Card>
        </footer>
    )
}

export default FooterInContainer