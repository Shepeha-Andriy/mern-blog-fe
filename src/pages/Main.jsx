import React, { useEffect } from "react";
import { PostItem } from "../components/PostItem";
import { PopularPosts } from "../components/PopularPosts";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from '../redux/features/post/postSlice'

export const Main = () => {
  const dispatch = useDispatch()
  const { posts, popularPosts } = useSelector(state => state.post)
  
  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch])

  if (!posts.length) {
    return (
      <div className="text-xl text-center text-white py-10">
        posts not exist
      </div>
    )
  }

  return (
    <div className="max-w-[900px] mx-auto py-10">
      <div className="flex justify-between gap-8">
        <div className="flex flex-col gap-10 basis-4/5">
          {
            posts?.map((post, i) => (
              <PostItem key={i} post={post}></PostItem>
           ))
          }
        </div>
        <div className="basis-1/5">
          <div className="text-xs uppercase text-white">
            Popular:
          </div>

          {
            popularPosts?.map((post, i) => (
              <PopularPosts key={i} post={post}></PopularPosts>
            ))
          }
        </div>
      </div>
    </div>
  )
}