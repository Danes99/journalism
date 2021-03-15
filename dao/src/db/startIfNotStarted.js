// Import DB function
const start = require('./start')

// Constants
const TIME_MILLISECONDS_FIRST_WAIT = (process.env.TIME_SECONDS_FIRST_WAIT || 5) * 1000
const TIME_WAIT_MULTIPLY_BY = process.env.TIME_SECONDS_MULTIPLY_BY || 2

// Functions
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
// https://stackoverflow.com/questions/14249506/how-can-i-wait-in-node-js-javascript-l-need-to-pause-for-a-period-of-time

const startIfNotStarted = async (clientData, i = 0) => {

    try {

        let result = await start(clientData)
        let i = 0

        while (!result.success) {

            const waitTime = TIME_MILLISECONDS_FIRST_WAIT * Math.pow(TIME_WAIT_MULTIPLY_BY, i)

            // Wait 5 * 2^i seconds before next trial
            console.log(`Could not connect @ database, retrying in ${waitTime / 1000}s`)
            await delay(waitTime)

            result = await start(clientData)

            if (i < 6) i++
        }

        return result

        // if (result.success) {
        //     return result
        // } else {

        //     const waitTime = TIME_MILLISECONDS_FIRST_WAIT * Math.pow(TIME_WAIT_MULTIPLY_BY, i)

        //     // Wait 5 * 2^i seconds before next trial
        //     console.log(`Could not connect @ database, retrying in ${waitTime/1000}s`)
        //     await delay(waitTime)

        //     // Start again, then return result
        //     // This is a recursive function
        //     return startIfNotStarted(
        //         clientData, 
        //         i < 6 ? i + 1 : 6
        //     )
        // }

    } catch (error) {
        console.log(error)
    }
}

module.exports = startIfNotStarted