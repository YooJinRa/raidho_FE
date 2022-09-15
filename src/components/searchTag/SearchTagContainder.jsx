import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import styled, { css } from "styled-components";
import MainPostCard from "../main/MainPostCard";
import MeetingListCard from "../meetingList/MeetingListCard";
// import { authInstance } from "../../shared/api";

const SearchTagContainer = () => {
  const location = useLocation();

  // ::: 추천 테마 리스트 전역에서 불러오기
  const themeList = useSelector((state) => state.themeSlice.themeList);
  const meetingList = useSelector((state) => state.meetingSlice.meetingList);
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
  ]);
  // ::: ===> 서버테스트 세팅
  // const [meetingList, setMeetingList] = useState([]);

  console.log(postList);

  // ::: Uri 한글깨짐 방지
  const decodeUri = decodeURI(location?.search);
  const tagName = decodeUri.split("=")[1];
  const tagUri = location.pathname.includes("post");

  // ::: 검색 uri 상태 확인
  const [checkUri, setCheckUri] = useState(tagUri); // ::: true => 여행후기 ::: false => 여행친구찾기

  const onClickCheckUri = () => {
    // ::: tagUri true이면 post get / false이면 meeting get
    setCheckUri(tagUri);
  };
  console.log("Post : True / Meeting : False ===>", checkUri);
  console.log("tagName===>", tagName);

  // ::: uri 정보 가져오기
  useEffect(() => {
    const tagUri = location.pathname.includes("post");
    setCheckUri(tagUri);
  }, [location]);

  // // ::: ===> 서버테스트 세팅
  // // ::: 테그 상세 리스트 리스트 불러오기
  // const getSearchTagList = async () => {
  //   try {
  //     if (checkUri) {
  //       // ::: 포스트 게시글 가져오기
  //       const responseTagPost = await authInstance.get(`/api/post/${tagName}`);
  //       console.log(responseTagPost);
  //       return setPostList(responseTagPost.data);
  //     } else {
  //       // ::: 미팅 게시글 가져오기
  //       const responseTagMeeting = await authInstance.get(
  //         `/api/meeting/${tagName}`
  //       );
  //       console.log(responseTagMeeting);
  //       return setMeetingList(responseTagMeeting.data);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getSearchTagList();
  // }, []);
  return (
    <StSearchTagContainerWrap>
      <h3>추천 여행 테마</h3>
      <StTagCardWrap>
        {themeList.map((themeCard) => (
          <Link
            key={themeCard.themeName}
            to={`/post/best?tag=${themeCard.themeName}`}
          >
            <StTagCard bgImage={`url(${themeCard.themeImage})`}>
              {themeCard.themeName}
            </StTagCard>
          </Link>
        ))}
      </StTagCardWrap>
      <StTagCategoryWrap>
        <li>
          <NavLink
            to={`/post/best?tag=${tagName}`}
            activeClassName="selected"
            onClick={onClickCheckUri}
          >
            여행 후기
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`/meeting/chat?tag=${tagName}`}
            activeClassName="selected"
            onClick={onClickCheckUri}
          >
            여행 친구 찾기
          </NavLink>
        </li>
      </StTagCategoryWrap>
      <StTagContentWrap checkUri={checkUri}>
        {checkUri
          ? postList.map((post) => <MainPostCard key={post.id} post={post} />)
          : meetingList.map((meeting) => (
              <MeetingListCard key={meeting.id} meeting={meeting} />
            ))}
      </StTagContentWrap>
    </StSearchTagContainerWrap>
  );
};

export default SearchTagContainer;

const StSearchTagContainerWrap = styled.div`
  h3 {
    font-size: 1.5rem;
    margin: 15px 0;
    color: var(--title-color);
  }
`;

const StTagCardWrap = styled.ul`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 18px;
  @media (max-width: 767px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const StTagCard = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 95px;
  color: #ffffff;
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  border-radius: 15px;
  background-image: linear-gradient(
      0deg,
      rgba(71, 71, 71, 0.57),
      rgba(71, 71, 71, 0.57)
    ),
    ${(props) => props.bgImage && props.bgImage};
  background-size: cover;
  background-position: center;
  cursor: pointer;

  &:hover {
    background-image: linear-gradient(
        0deg,
        rgba(71, 71, 71, 0.7),
        rgba(71, 71, 71, 0.7)
      ),
      ${(props) => props.bgImage && props.bgImage};
  }
`;

const StTagCategoryWrap = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 70px;
  margin-top: 2rem;
  border-bottom: 1px solid var(--gray-color);
  li {
    height: 100%;
    padding: 0 1rem;
    margin-right: 1rem;

    a {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      font-size: 1.5rem;
      font-weight: 700;
      padding: 0 1rem;
    }

    .active {
      border-bottom: 4px solid var(--title-color);
    }
  }
`;

const StTagContentWrap = styled.div`
  width: 100%;
  min-height: 100px;
  margin-top: 1.5rem;

  ${(props) =>
    props.checkUri
      ? css`
          column-width: 310px;
          column-gap: 15px;
        `
      : css`
          display: grid;
          grid-template-columns: repeat(3, 1fr);
        `}
`;
