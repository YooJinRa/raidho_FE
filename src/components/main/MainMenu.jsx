import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { authInstance, instance } from "../../shared/api";

import MainPostList from "./MainPostList";
import Button from "../../elements/Button";

const MainMenu = () => {
  const [best, setBest] = useState(true);
  const [postList, setPostList] = useState([
    {
      id: 1,
      imgurl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsYeU_xa0PN9zgmYzlkTMVGKJ4ulAGevTa9A&usqp=CAU",
      memberImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSInE9w_wk9gHxSLJ44RL2NoVHnIDjXNPEgbw&usqp=CAU",
      memberName: "김경문",
      isImages: true,
      multipartFiles: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsYeU_xa0PN9zgmYzlkTMVGKJ4ulAGevTa9A&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsYeU_xa0PN9zgmYzlkTMVGKJ4ulAGevTa9A&usqp=CAU",
      ],
    },
    {
      id: 2,
      multipartFiles: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsYeU_xa0PN9zgmYzlkTMVGKJ4ulAGevTa9A&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsYeU_xa0PN9zgmYzlkTMVGKJ4ulAGevTa9A&usqp=CAU",
      ],
      memberImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSInE9w_wk9gHxSLJ44RL2NoVHnIDjXNPEgbw&usqp=CAU",
      memberName: "김경문",
      isImages: false,
    },
  ]);
  const getBestPosts = async () => {
    const res = await authInstance.get(`/api/post/likelist`);
    console.log(res);
    return setPostList(res.data);
  };
  const getLatestPosts = async () => {
    const res = await instance.get(`/api/post/latest`);
    console.log(res);
    return setPostList(res.data.data.content);
  };
  useEffect(() => {
    getBestPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const besthandler = () => {
    getBestPosts();
    setBest(true);
  };
  const latesthandler = () => {
    getLatestPosts();
    setBest(false);
  };
  return (
    <>
      <StMenuset>
        <Button
          size="medium"
          variant={best ? "primary" : "gray"}
          onClick={besthandler}
        >
          BEST
        </Button>
        <Button
          size="medium"
          variant={best ? "gray" : "primary"}
          onClick={latesthandler}
        >
          실시간
        </Button>
      </StMenuset>
      <MainPostList postList={postList} />
    </>
  );
};

export default MainMenu;
const StMenuset = styled.div`
  display: flex;
  button {
    margin-right: 1.5rem;
  }
`;
