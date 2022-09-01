import React from "react";
import UpdateMyProfile from "./UpdateMyProfile";
import MyPostList from "./MyPostList";
import styled from "styled-components";

const MyProfileContainer = () => {

  return(
    <StMyProfileContainerWrap>
      <StMyProfileTitleRow>
        <h3>프로필</h3>
        <span className="bgMiddleLine"/>
      </StMyProfileTitleRow>
      <UpdateMyProfile />

      <StMyProfileTitleRow>
        <h3>내가 쓴 글</h3>
        <span className="bgMiddleLine"/>
      </StMyProfileTitleRow>
      <MyPostList />

      <StMyProfileTitleRow>
        <h3>계정 / 보안</h3>
        <span className="bgMiddleLine"/>
      </StMyProfileTitleRow>
    </StMyProfileContainerWrap>
  );
};

export default MyProfileContainer;

const StMyProfileContainerWrap = styled.div`
  background-color: var(--bg-color);
`;

const StMyProfileTitleRow = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 45px;
  margin: 25px 0;

  h3 {
    font-size: 2rem;
    font-weight: 400;
    color: var(--title-color);
    padding-right: 25px;
    background-color: var(--bg-color);
    z-index: 2;
  }

  .bgMiddleLine {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: var(--line-color);
    z-index: 1;
  }
`;