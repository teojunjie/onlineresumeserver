var CommentModel = require('./comments')

exports.addComment = function(req, res, next) {
    var data = req.body.comment
    var currentdate = new Date();
    var currentdateString = currentdate.getDate() + "/"
                    + (currentdate.getMonth()+1)  + "/" 
                    + currentdate.getFullYear() + " @ "  
                    + currentdate.getHours() + ":"  
                    + currentdate.getMinutes() + ":" 
                    + currentdate.getSeconds();
    var newComment = new CommentModel({
        data : data,
        dateCreated : currentdateString,
        replies : []
    })
    newComment.save((err) => {
        if (err) {
            res.json({'Updated' : false})
            next (err);
        }
        return res.json({'Updated' : true})
    })
}

exports.addCommentReply = function(req, res, next) {
    var commentDateString = req.body.commentDateString
    console.log(commentDateString)
    var reply = req.body.reply
    console.log(reply)
    var update = {"$addToSet" : {
        "replies" : reply
    }}
    CommentModel.findOneAndUpdate({dateCreated : commentDateString}, update,(err, result) => {
        if (err) {
            res.json({'Updated' : false})
            next(err)            
        } 
        if (!result) {
            return res.json({'Updated' : false})   
        }
        return res.json({'Updated' : true})
    })
}

exports.getAllComments = function(req, res, next) {
    CommentModel.find().exec((err, result)=> {
        if (err) next (err)
        return res.json(result)
    })
}