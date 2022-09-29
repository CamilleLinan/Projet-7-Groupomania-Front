const DisplayComment = ({ propPost, propUser }) => {
    const comments = propPost.comments;
    const users = propUser;
    console.log(users); 

    return(
        <>
        {comments.length > 0 &&
                comments.map((comment, i) => {
                    return ( 
                        <>
                        <div className="comment_container">
                            {users.map((commenter, i) => {
                                if (commenter._id === comment.commenterId) {
                                    return (
                                        <div className="trending_container_post_poster">
                                            <img className="trending_container_post_poster_photo" src={commenter.userPicture} alt='' />
                                            <p className="trending_container_post_poster_infos">{commenter.firstname} {commenter.lastname}</p>
                                        </div>
                                    )
                                } return null
                            })}
                            <p key={comment.id}>{comment.comment}</p>
                        </div>
                        </>
                    )
                })
            }
        </>
    )
}

export default DisplayComment;