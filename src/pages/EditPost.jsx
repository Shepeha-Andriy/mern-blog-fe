import React, { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom'
import axios from "../utils/axios";
import { updatePost } from '../redux/features/post/postSlice'
import FileBase from 'react-file-base64';

export const EditPost = () => {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [oldImg, setOldImg] = useState('')
  const [newImg, setNewImg] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()

   const fetchPost = useCallback(async () => {
    const { data } = await axios.get(`/posts/${id}`)
    setTitle(data.post.title) 
    setText(data.post.text) 
    setOldImg(data.post.imgUrl) 
   }, [id])
  
  const handleSubmit = async() => {
    try {
      const data = new FormData()
      data.append('title', title)
      data.append('text', text)
      data.append('id', id)
      data.append('image', newImg)
      
      dispatch(updatePost(data))
      navigate('/posts')
    } catch (error) {
      console.log(error)
    }
  }
  
  const handleCancel = () => {
    setNewImg('')
    setTitle('')
    setText('')
  }

  useEffect(() => {
    fetchPost()
  }, [fetchPost])

  return (
    <form
      className="w-1/3 mx-auto py-10"
      onSubmit={e => e.preventDefault()}
    >
      
      <label className="text-gray-300 py-2 bg-gray-600 text-xs mt-2 flex items-center justify-center border-2 border-dotted cursor-pointer">
        attach image
        <FileBase type="file" multiple={false} onDone={({ base64 }) => { setNewImg(base64) }} />
      </label>
      <div className="flex object-cover py-2">
        {
          oldImg && (
            <img src={`${oldImg}`} alt="img"></img>
          )
        }
        {
          newImg && (
            <img src={newImg} alt="img"></img>
          )
        }
      </div>

      <label className="text-xs text-white opacity-70">
        Post title
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="title"
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
        ></input>
      </label>

      <label className="text-xs text-white opacity-70">
        Post text
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="post text"
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none resize-none h-40 placeholder:text-gray-700"
        ></textarea>
      </label>

      <div className="flex gap-8 items-center justify-center mt-4">
        <button className="flex items-center justify-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4" onClick={handleSubmit}>Save</button>
        <button className="flex items-center justify-center bg-red-500 text-xs text-white rounded-sm py-2 px-4" onClick={handleCancel}>Cancel</button>
      </div>
    </form>
  )
}