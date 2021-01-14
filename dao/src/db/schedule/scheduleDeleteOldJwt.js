const deleteJwt = async () => {
    try {
        const queryString = `DELETE from jwt WHERE created_at < NOW() - INTERVAL '12 hours';`
        const result = await client.query(queryString)
        return { success: true, result: result.rowCount }
    }
    catch (error) {
        console.log(error)
        return { success: false, result: error }
    }
}

const schedule = async (time = process.env.SCHEDULE_DELETE_OLD_JWT || 300000) => {
    try {
        deleteJwt()
        setTimeout( () => schedule(time) , time)
    }
    catch (error) {
        console.log(error)
    }
}

module.exports = schedule