var CommentModel = require('./comments')

exports.addComment = function(req, res, next) {
    var data = req.body.comment
    console.log(req.body)
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
            return res.redirect('./getAllComments')
        }
        return res.redirect('./getAllComments')
    })
}

exports.addCommentReply = function(req, res, next) {
    console.log(req.body)
    var commentDateString = req.body.commentDateString
    console.log(commentDateString)
    var reply = req.body.reply
    console.log(reply)
    var update = {"$addToSet" : {
        "replies" : reply
    }}
    CommentModel.findOneAndUpdate({dateCreated : commentDateString}, update,(err, result) => {
        if (err) {
            return res.redirect('./getAllComments')     
        } 
        if (!result) {
            return res.redirect('./getAllComments')
        }
        return res.redirect('./getAllComments')
    })
}

exports.getAllComments = function(req, res, next) {
    CommentModel.find().exec((err, result)=> {
        if (err) next (err)
        console.log(result)

        return res.render('comments', {comments : result});
    })
}