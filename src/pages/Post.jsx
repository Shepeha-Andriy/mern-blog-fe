import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AiFillEye, AiOutlineMessage, AiTwotoneEdit, AiTwotoneDelete } from 'react-icons/ai'
import Moment from 'react-moment'
import axios from '../utils/axios'
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../redux/features/post/postSlice";
import { createComment, getPostComments } from "../redux/features/comment/commentSlice";
import { toast } from "react-toastify";
import { CommentItem } from "../components/CommentItem";

export const Post = () => {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [comment, setComment] = useState('')
  const { user } = useSelector(state => state.auth)
  const { comments } = useSelector(state => state.comment)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  

  const fetchPost = useCallback(async () => {
    const { data } = await axios.get(`/posts/${id}`)
    setPost(data.post)
  }, [id])

    const fetchComments = useCallback(async () => {
    try {
      dispatch(getPostComments(id))
    } catch (error) {
      console.log(error)
    }
  }, [dispatch, id])

  useEffect(() => {
    fetchPost()
  }, [fetchPost])
  
  useEffect(() => {
    fetchComments()
  }, [fetchComments])

  const removePostsHandler = () => {
    try {
      dispatch(deletePost(id))
      toast('post deleted')
      navigate('/posts')
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = () => {
    try {
      dispatch(createComment({ postId: id, comment }))
      setComment('')
    } catch (error) {
      console.log(error)
    }
  }

  if (!post) {
    return (
      <div className="text-xl text-center text-white py-10">
        Loading...
      </div>
    )
  }

  return (
    <div>
      <button className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4">
        Back
      </button>

      <div className="flex gap-10 py-8">
        <div className="w-3/3"></div>
          <div className="flex flex-col basis-1/4 flex-grow">
            <div className={post.imgUrl ? 'flex rounded-sm h-80' : "flex rounded-sm"}>
              {
                post.imgUrl && (
                  <img src={`${post.imgUrl}`} alt="img" className="object-cover w-full"></img>
                )
              }
          </div>
            <div className="flex justify-between items-center pt-2">
              <div className="text-xs text-white opacity-50">{ post.username }</div>
              <div className="text-xs text-white opacity-50">
                <Moment date={post.createdAt} format="D MMM YYYY"></Moment>
              </div>
            </div>
            <div className="text-white text-xl">{ post.title }</div>
            <p className="text-white text-xs opacity-60 pt-4">{ post.text }</p>

            <div className="flex gap-3 items-center mt-2 justify-between">
              <div className="flex gap-3 mt-4">
                <button className="flex justify-center items-center gap-2 text-xs text-white opacity-50">
                  <AiFillEye></AiFillEye> <span>{ post.views }</span>
                </button>
                <button className="flex justify-center items-center gap-2 text-xs text-white opacity-50">
                  <AiOutlineMessage></AiOutlineMessage> <span>{ post.comments?.length }</span>
                </button>
            </div>
            
            {
              user?._id === post.author && (
                <div className="flex gap-3 mt-4">
                  <button className="flex justify-center items-center gap-2 text-white opacity-50">
                    <Link to={`/${id}/edit`}>
                      <AiTwotoneEdit></AiTwotoneEdit>
                    </Link>
                  </button>
                  <button className="flex justify-center items-center gap-2 text-white opacity-50" onClick={removePostsHandler}>
                    <AiTwotoneDelete></AiTwotoneDelete>
                  </button>
                </div>
              )
            }
            </div>
          </div>
        <div className="w-1/3 p-8 bg-gray-700 flex flex-col gap-2 rounded-sm">
          <form className="flex gap-2" onSubmit={e => e.preventDefault()}>
            <input
              type="text" placeholder="comment" onChange={(e) => setComment(e.target.value)}
              className="text-black rounded-sm w-full p-2 border text-xs outline-none placeholder:text-gray-700 bg-gray-400" value={comment}></input>
            <button type="submit" className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4" onClick={handleSubmit}>send</button>
          </form>

          {
            comments?.map(cmt => (
              <CommentItem key={cmt._id} comment={cmt}></CommentItem>
            ))
          }
        </div>
      </div>
    </div>
  )
}