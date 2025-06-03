exports.get_user = (req,res) => {
    res.send({user:req.user})
}