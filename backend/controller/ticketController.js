const getTicket = (req, res) => {
    res.status(200).json({message: "Get ticket"})
}

module.exports = {
    getTicket, 
}