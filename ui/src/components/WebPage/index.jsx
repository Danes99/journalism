// Import pre-installed modules
import React from 'react'

const WebPage = (props) => {

    return (
        // <div className="container mx-auto px-40 flex flex-col flex-wrap justify-between">

        // sm:px-6 lg:px-8
        <div className="flex flex-col items-center justify-center py-4 px-4">

            {/* Page Title */}
            {props.title ?
                <>

                    <h1 className="text-center font-sans text-black-700 text-3xl py-4">
                        {props.title}
                    </h1>

                    {/* End Border */}
                    <div className="min-w-full">
                        <div className="py-4">
                            <div className="border-t border-gray-200"></div>
                        </div>
                    </div>
                </>
                : null}

            {/* Page Content */}
            {props.children}
        </div>
    )
}

export default WebPage
