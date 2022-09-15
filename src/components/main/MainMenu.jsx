import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { authInstance } from "../../shared/api";

import MainPostList from "./MainPostList";
import Button from "../../elements/Button";

const MainMenu = () => {
  const [best, setBest] = useState(false);
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
      heartCount: 100,
      isHeartMine: true,
    },
    {
      id: 2,
      multipartFiles: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsYeU_xa0PN9zgmYzlkTMVGKJ4ulAGevTa9A&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsYeU_xa0PN9zgmYzlkTMVGKJ4ulAGevTa9A&usqp=CAU",
      ],
      memberName: "김경문",
      isImages: false,
      memberImage: null,
      isHeartMine: false,
    },
    {
      id: 3,
      multipartFiles: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsYeU_xa0PN9zgmYzlkTMVGKJ4ulAGevTa9A&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsYeU_xa0PN9zgmYzlkTMVGKJ4ulAGevTa9A&usqp=CAU",
      ],
      memberName: "김경문",
      isImages: false,
      memberImage: null,
    },
    {
      id: 4,
      multipartFiles: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsYeU_xa0PN9zgmYzlkTMVGKJ4ulAGevTa9A&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsYeU_xa0PN9zgmYzlkTMVGKJ4ulAGevTa9A&usqp=CAU",
      ],
      memberName: "김경문",
      isImages: false,
      memberImage: null,
    },
  ]);
  const getBestPosts = async () => {
    const res = await authInstance.get(`/api/post/likelist`);
    console.log(res);
    return setPostList(res.data.data.content);
  };
  const getLatestPosts = async () => {
    const res = await authInstance.get(`/api/post/latest`);

    console.log(res);
    return setPostList(res.data.data.content);
  };
  useEffect(() => {
    getLatestPosts();
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
          variant={best ? "gray" : "primary"}
          onClick={latesthandler}
        >
          실시간
        </Button>
        <Button
          size="medium"
          variant={best ? "primary" : "gray"}
          onClick={besthandler}
        >
          추천순
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
