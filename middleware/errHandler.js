exports.errHandler = (err, req, res, next) => {
    if (err) {
      console.log(err)
      res.status(401).json({ error: 'Authentication failed' });
    }
}