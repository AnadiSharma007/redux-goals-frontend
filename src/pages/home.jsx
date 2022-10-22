import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GoalsTable from "../components/goalstable";
import { Button, FormLabel, Input } from "@chakra-ui/react";
import {reset, fetchAllPosts, createAPost} from '../features/post/postSlice'
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/shared/layout";

const Home = () => {
  const navigate = useNavigate();
  const [postData, setPostData] = useState({
    title: "",
    description: "",
  });

  const {title, description} = postData;
  const { user } = useSelector((state) => state.user);
  const { posts } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      navigate("/signin");
    }

    dispatch(fetchAllPosts())

    return () => {
      dispatch(reset())
    }
  }, [user, posts, navigate, dispatch]);

  const handleChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await dispatch(createAPost({
        title, 
        description
      }));
    } catch (error) {
      console.error(error.message);
    }
  };


  return (
    <Layout>
      <div className="flex flex-col items-center justify-center gap-10 h-screen w-[80vw] m-auto">
        <div className="w-full">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-5 "
          >
            <div className="w-full">
              <FormLabel>Title</FormLabel>
              <Input
                width={"full"}
                placeholder="Title"
                name="title"
                onChange={handleChange}
              />
            </div>
            <div className="w-full">
              <FormLabel>Description</FormLabel>
              <Input
                width={"full"}
                placeholder="Description"
                name="description"
                onChange={handleChange}
              />
            </div>
            <div>
              <Button type="submit">Add Goal</Button>
            </div>
          </form>
        </div>
        <div>
          <GoalsTable posts={posts} />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
