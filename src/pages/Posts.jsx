import { PostItem } from "../components/PostItem";
import axios from "../utils/axios";
import React, { useCallback, useEffect, useState } from "react";

export const Posts = () => {
  const [posts, setPosts] = useState([])

  const fetchMyPosts = useCallback(async () => {
    try {
      const { data } = await axios.get('posts/user/me')
      setPosts(data.posts)

      return data
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    fetchMyPosts()
  }, [fetchMyPosts])

  if (!posts) {
    return (
      <div className="text-xl text-center text-white py-10">
        Loading...
      </div>
    )
  }

  return (
    <div className="w-1/2 mx-auto py-10 flex flex-col gap-10">
      {
        posts.map((post, i) => (
          <PostItem key={i} post={post}></PostItem>
        ))
      }
    </div>
  )
}