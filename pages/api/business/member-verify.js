async function handler(req, res) {
    initDatabase()
    try {
        

        return res.status(200).json({
            success: true,
            status: 200,
            data: entries,
            message: "Successfully Changed"
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            status: 500,
            message: err.message
        })
    }
}

export default authentication(handler)