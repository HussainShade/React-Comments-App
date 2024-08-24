import './index.css'

const CommentItem = props => {
  const {commentDetails, isLikedComment, onDeleteComment} = props
  const {id, name, comment, isLiked, commentTime, backgroundColor} =
    commentDetails

  const firstLetter = name[0].toUpperCase()

  const onLikeButtonClicked = () => {
    isLikedComment(id)
  }

  const onDeleteButtonClicked = () => {
    onDeleteComment(id)
  }

  const likeImgUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const likeTextClass = isLiked ? 'liked' : ''

  return (
    <li className="list-item">
      <div className="user-container">
        <div className={`user-icon ${backgroundColor}`}>
          <p>{firstLetter}</p>
        </div>
        <div className="user-details">
          <p className="user-name">
            {name} <span className="user-date">{commentTime}</span>
          </p>
          <p className="user-comment">{comment}</p>
        </div>
      </div>
      <div className="btn-container">
        <div>
          <button
            type="button"
            onClick={onLikeButtonClicked}
            className="like-button"
            data-testid="like"
          >
            <div className="like-container">
              <img src={likeImgUrl} alt="like" className="btn-style" />
              <p className={`like-text ${likeTextClass}`}>Like</p>
            </div>
          </button>
        </div>

        <button
          type="button"
          onClick={onDeleteButtonClicked}
          className="delete-button"
          data-testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
            className="btn-style"
          />
        </button>
      </div>
    </li>
  )
}

export default CommentItem
