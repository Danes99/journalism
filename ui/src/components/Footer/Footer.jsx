// Import pre-installed modules
import React from 'react'

// Import downloaded modules
import { Card, CardFooter } from 'reactstrap'

const Footer = () => {
    return (
        <footer>
            <Card>
                <CardFooter className="text-muted">
                    &copy; Company
                </CardFooter>
            </Card>
        </footer>
    )
}

export default Footer