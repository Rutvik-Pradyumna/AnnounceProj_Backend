exports.errHandler = (err, req, res, next) => {
    if (err) {
        console.log(err)
        res.send({err:'found some error'})
    }
    next()
}