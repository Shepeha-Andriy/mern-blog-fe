import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../redux/features/post/postSlice";
import { useNavigate } from "react-router-dom";

export const AddPost = () => {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [img, setImg] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = () => {
    try {
      const data = new FormData()
      data.append('title', title)
      data.append('text', text)
      data.append('image', img)

      dispatch(createPost(data))
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  const handleCancel = () => {
    setImg('')
    setTitle('')
    setText('')
  }

  return (
    <form
      className="w-1/3 mx-auto py-10"
      onSubmit={e => e.preventDefault()}
    >
      
      <label className="text-gray-300 py-2 bg-gray-600 text-xs mt-2 flex items-center justify-center border-2 border-dotted cursor-pointer">
        attach image
        <input type="file" className="hidden" onChange={e => setImg(e.target.files[0])}></input>
      </label>
      <div className="flex object-cover py-2">
        {
          img && (
            <img src={URL.createObjectURL(img)} alt="img"></img>
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
        <button className="flex items-center justify-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4" onClick={handleSubmit}>Add post</button>
        <button className="flex items-center justify-center bg-red-500 text-xs text-white rounded-sm py-2 px-4" onClick={handleCancel}>cancel</button>
      </div>
    </form>
  )
}