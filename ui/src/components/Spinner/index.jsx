// Import pre-installed modules
import React from 'react'

// Import CSS
import './styles.css'

const Spinner = (props) => {

    // Parameters
    const diameter = props.diameter || 12
    const border = props.border || 4
    const borderColor = props.borderColor || 'blue-600'

    const classNameString = `w-${diameter} h-${diameter} border-${border} border-${borderColor} rounded-full loader`

    return <div className={classNameString}></div >
}

export default Spinner

// Sources: https://tailwindcomponents.com/component/centered-spinner