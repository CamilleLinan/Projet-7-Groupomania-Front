import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComment } from '@fortawesome/free-regular-svg-icons';

const likeIcon = <FontAwesomeIcon icon={faThumbsUp} />
const commentIcon = <FontAwesomeIcon icon={faComment} />

const PostCard = (props) => {
    const {posts} = props;
    const { posters } = props;
    console.log(posts);
    console.log(posters);

    if (posts.length > 0) {

    return (
        posts.map((post, poster, index) => {
            return ( 
            <>
            <div className='trending_container_post bg_section'>
                <div className="trending_container_post_poster">
                    <img className="trending_container_post_poster_photo" src={poster.posterPicture} alt='' />
                    <div className="trending_container_post_poster_infos">
                        <p className="trending_container_post_poster_infos_name bold">{post.posterId} {post.posterFirstname} {post.posterLastname}</p>
                        <p className="trending_container_post_poster_infos_date">{post.createdAt}</p>
                    </div>
                </div>

                <div className="trending_container_post_content">
                    <p className="trending_container_post_content_message">{post.message}</p>
                    <img className="trending_container_post_content_image" src={post.postPicture} alt='' />
                </div>

                <div className='trending_container_post_btn_container'>
                    <button onClick={post.onLike} className='trending_container_post_btn trending_container_post_btn_like'>{likeIcon}</button>
                    <button onClick={post.onComment} className='trending_container_post_btn trending_container_post_btn_comment'>{commentIcon}</button>
                </div>
            </div>
            </>
            )
        })
    )
    }
}

export default PostCard;