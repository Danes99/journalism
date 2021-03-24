// Import pre-installed modules
import React from 'react'

const WebPage = (props) => {

    return (
        // <div class="container mx-auto px-40 flex flex-col flex-wrap justify-between">

        <div class="flex flex-col items-center justify-center py-4 px-4 sm:px-6 lg:px-8">

            {/* Page Title */}
            {props.title ?
                <>

                    <h1 class="text-center font-sans text-black-700 text-3xl py-4">
                        {props.title}
                    </h1>

                    {/* End Border */}
                    <div class="min-w-full">
                        <div class="py-4">
                            <div class="border-t border-gray-200"></div>
                        </div>
                    </div>
                </>
                : null}

            {/* Page Content */}
            <div class="">
                {props.children}
            </div>
        </div>
    )
}

export default WebPage
