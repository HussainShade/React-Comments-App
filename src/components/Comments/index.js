import {Component} from 'react'
import './index.css'
import {v4 as uuidv4} from 'uuid'
import {formatDistanceToNow} from 'date-fns'
import CommentItem from '../CommentItem'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {
    commentsList: [],
    name: '',
    comment: '',
  }

  onNameChange = event => {
    this.setState({name: event.target.value})
  }

  onCommentChange = event => {
    this.setState({comment: event.target.value})
  }

  isLikedComment = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  onSubmitButton = event => {
    event.preventDefault()
    const {name, comment} = this.state
    const commentTime = formatDistanceToNow(new Date())
    const randomColor =
      initialContainerBackgroundClassNames[
        Math.floor(Math.random() * initialContainerBackgroundClassNames.length)
      ]
    const newComment = {
      id: uuidv4(),
      name,
      comment,
      isLiked: false,
      commentTime: commentTime,
      backgroundColor: randomColor,
    }

    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      name: '',
      comment: '',
    }))
  }

  onDeleteComment = id => {
    const {commentsList} = this.state
    const filteredCommentsData = commentsList.filter(each => each.id !== id)
    this.setState({
      commentsList: filteredCommentsData,
    })
  }

  render() {
    const {commentsList, name, comment} = this.state

    const totalComment = commentsList.length

    return (
      <div className="app-container">
        <h1 className="heading">Comments</h1>
        <div className="first-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
            alt="comments"
            className="comments"
          />
          <div>
            <p className="description">Say something about 4.0 Technologies</p>
            <form onSubmit={this.onSubmitButton} className="form-container">
              <input
                type="text"
                value={name}
                placeholder="Your Name"
                onChange={this.onNameChange}
                className="name-input"
              />
              <textarea
                type="text"
                value={comment}
                placeholder="Your Comment"
                onChange={this.onCommentChange}
                className="comment-input"
              />
              <button type="submit" className="submit-btn">
                Add Comment
              </button>
            </form>
          </div>
        </div>
        <div className="comment-count-container">
          <p className="comment-count">{totalComment}</p>
          <p className="description">Comments</p>
        </div>
        <ul className="comments-list">
          {commentsList.map(eachComment => (
            <CommentItem
              key={eachComment.id}
              commentDetails={eachComment}
              isLikedComment={this.isLikedComment}
              onDeleteComment={this.onDeleteComment}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default Comments
