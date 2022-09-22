import React, { useState } from "react";
import { authInstance } from "../../shared/api";
import imageCompression from "browser-image-compression";
import Button from "../../elements/Button";
import Input from "../../elements/Input";
import Potal from "../../global/globalModal/Potal";
import Modal from "../../global/globalModal/Modal";
import styled from "styled-components";
import DefaultMemberImage from "../../assets/defaultProfileImage.svg";

const UpdateMyProfile = (props) => {
  // ::: 유저 정보 가져오기
  const memberInfo = {
    memberId: localStorage.getItem("memberId"),
    memberName: localStorage.getItem("memberName"),
    memberImage:
      localStorage.getItem("memberImage") === "null"
        ? `${DefaultMemberImage}`
        : localStorage.getItem("memberImage"),
    memberIntro: localStorage.getItem("memberIntro"),
  };

  const [selectedMemberImage, setSelectedMemberImage] = useState(null);
  const [compressedImageFile, setCompressedImageFile] = useState(
    memberInfo.memberImage
  );
  const [updateNickname, setUpdateNickname] = useState(memberInfo.memberName);
  const [updateComment, setUpdateComment] = useState(memberInfo.memberIntro);

  // ::: 프로필 편집 모달(createPotal) 컨트롤 하기
  const [modalOn, setModalOn] = useState(false);
  const handleModal = () => {
    setModalOn(!modalOn);

    // ::: 유저가 입력한 값 초기화 시키기
    setSelectedMemberImage(null);
    setCompressedImageFile(memberInfo.memberImage);
    setUpdateNickname(memberInfo.memberName);
    setUpdateComment(memberInfo.memberIntro);
  };

  // ::: 이미지 리사이징(Resizing)
  const compressImageAndGetImageFile = async (postImageFile) => {
    const options = {
      maxSizeMB: 0.8,
      maxWidthOrHeight: 900,
      useWebWorker: true,
    };
    const compressedFile = await imageCompression(postImageFile, options);
    return compressedFile;
  };

  // ::: 이미지 미리보기(Image Preview)
  const onChangePostImageFile = async (event) => {
    const postImageFile = event.target.files[0];
    try {
      const compressedFile = await compressImageAndGetImageFile(postImageFile);
      setCompressedImageFile(compressedFile);
      const finalCompressedImage = await imageCompression.getDataUrlFromFile(
        compressedFile
      );
      setSelectedMemberImage(finalCompressedImage);
    } catch (error) {
      console.log("__PostImage_uploadImageError ::", error);
      alert("이미지를 업로드 하는데 문제가 생겼습니다. 다시 시도해주세요!");
    }
  };

  const onChangeUpdateMemberName = (event) => {
    setUpdateNickname(event.target.value);
  };

  const onChangeUpdateMemberComment = (event) => {
    setUpdateComment(event.target.value);
  };

  console.log("compressedImageFile", compressedImageFile);
  console.log("updateNickname", updateNickname);
  console.log("updateComment", updateComment);

  // ::: 수정 정보 서버에 전달하기
  const onCompleteUpdateProfile = async () => {
    // :: image file formData 형식 변환
    const formData = new FormData();
    formData.append("memberImage", compressedImageFile);
    // formData.append("memberName", updateNickname);
    // formData.append("memberIntro", updateComment);
    formData.append("memberId", memberInfo.memberId);

    try {
      const profileResponse = await authInstance.post(`/api/mypage`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(profileResponse);
    } catch (error) {
      alert(`프로필 수정에 오류가 났습니다. ${error}`);
      console.log(error);
    }
  };
  return (
    <StUpdateMyProfileWrap>
      <StMyProfileBox>
        <p>
          <img src={memberInfo.memberImage} alt={memberInfo.memberName} />
        </p>
        <dl>
          <dt>@{memberInfo.memberName}</dt>
          <dd>{memberInfo.memberIntro}</dd>
        </dl>
      </StMyProfileBox>
      <Button onClick={handleModal} size="square" variant="lineSquare">
        프로필 편집
      </Button>

      <Potal>
        {modalOn && (
          <Modal onClose={handleModal}>
            <StUpdateUserProfileModal>
              <StUpdateProfileTop>
                <StUpdateProfileRow>
                  <StMemberImageBox
                    userImageProfile={`url(${memberInfo.memberImage})`}
                  >
                    <input
                      type="file"
                      style={{ display: "none" }}
                      onChange={onChangePostImageFile}
                      accept="image/jpg, image/jpeg, image/png"
                    />
                    {selectedMemberImage ? (
                      <img
                        src={selectedMemberImage}
                        alt="preview"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <span className="changeImageMessage">사진 변경</span>
                    )}
                  </StMemberImageBox>
                  {/* <StMemberNicknameBox>
                    <p>@{memberInfo.memberName}</p>
                  </StMemberNicknameBox> */}

                  <StMemberNicknameBox>
                    <StUpdateUserProfileTitle>닉네임</StUpdateUserProfileTitle>
                    <Input
                      size="large"
                      variant="default"
                      value={updateNickname}
                      placeholder={memberInfo.memberName}
                      onChange={(event) => onChangeUpdateMemberName(event)}
                    />
                  </StMemberNicknameBox>
                </StUpdateProfileRow>

                <StUpdateUserProfileTitle>한 줄 소개</StUpdateUserProfileTitle>
                <Input
                  size="large"
                  variant="default"
                  placeholder={memberInfo.memberIntro}
                  onChange={(event) => onChangeUpdateMemberComment(event)}
                  value={updateComment}
                />
              </StUpdateProfileTop>
              <StButtonWrap>
                <Button
                  size="square"
                  variant="lineSquare"
                  onClick={handleModal}
                >
                  취소
                </Button>
                <Button
                  size="square"
                  variant="lineSquare"
                  onClick={onCompleteUpdateProfile}
                >
                  수정
                </Button>
              </StButtonWrap>
            </StUpdateUserProfileModal>
          </Modal>
        )}
      </Potal>
    </StUpdateMyProfileWrap>
  );
};

export default UpdateMyProfile;

const StUpdateMyProfileWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 120px;
  background-color: var(--bg-color);

  @media (max-width: 639px) {
    height: 150px;
    align-items: flex-start;
    flex-direction: column;

    button {
      margin-top: 1rem;
      padding: 0.5rem 1rem;
    }
  }
`;

const StMyProfileBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;

  p {
    width: 120px;
    height: 120px;
    border: 1px solid var(--gray-color);
    border-radius: 50%;
    margin-right: 35px;
    overflow: hidden;
    object-fit: contain;

    img {
      width: 100%;
      height: 100%;
    }
  }

  dl {
    dt {
      display: flex;
      align-items: center;
      height: 54px;
      font-size: 2.25rem;
    }
    dd {
      display: flex;
      align-items: flex-start;
      height: 66px;
      font-size: 1.5rem;
    }
  }
`;

const StUpdateProfileTop = styled.div``;
const StButtonWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  margin-top: 30px;

  button {
    margin-left: 1rem;
  }
`;

const StUpdateUserProfileTitle = styled.h2`
  font-size: 1.5rem;
  text-align: left;
  margin: 1rem 0;
`;

const StUpdateUserProfileModal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 90%;
  padding: 1rem 3rem 1rem 1rem;

  @media (max-width: 639px) {
    padding: 0;
  }
`;

const StUpdateProfileRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-start;
  width: 100%;
  margin-bottom: 2rem;
`;

const StMemberImageBox = styled.label`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 150px;
  background-image: linear-gradient(
      0deg,
      rgba(71, 71, 71, 0.8),
      rgba(71, 71, 71, 0.8)
    ),
    ${(props) => props.userImageProfile && props.userImageProfile};
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  margin-right: 20px;
  overflow: hidden;

  .changeImageMessage {
    font-size: 1.2rem;
    letter-spacing: 1px;
  }
  @media (max-width: 639px) {
    width: 100px;
    height: 100px;
  }
`;

const StMemberNicknameBox = styled.div`
  width: 200px;

  p {
    width: 100%;
    font-size: 1.7rem;
    text-align: left;
  }
  @media (max-width: 639px) {
    width: 180px;
  }
`;
