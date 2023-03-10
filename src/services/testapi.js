function demoApi(req,res,next) {
    res.json({
        status:200,
        message:"Node JS API working"
    }); 
}

module.exports={
    demoApi
}