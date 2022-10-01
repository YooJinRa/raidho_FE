import React, { useState } from "react";
import Input from "./Input";
import { MdClose } from "react-icons/md";
import styled from "styled-components";
import { useEffect } from "react";

const TagInput = ({ tags, selectedTags, tagMassage, tagValMsg }) => {
  const [postTags, setPostTags] = useState(tags);
  const [tagValidationMsg, setTagValidationMsg] = useState("");
  const [checkAlert, setCheckAlert] = useState(false);
  const [tagLength, setTagLength] = useState(0);

  // ::: 태그 삭제하기
  const removeTags = (indexToRemove) => {
    setTagValidationMsg(`${postTags[indexToRemove]} 태그가 삭제되었습니다.`);
    setCheckAlert(true);
    selectedTags([...postTags.filter((_, index) => index !== indexToRemove)]);
    setPostTags([...postTags.filter((_, index) => index !== indexToRemove)]);
  };

  // ::: 태그 추가하기
  const addTags = (event) => {
    if (event.target.value !== "") {
      if (postTags.length > 4) {
        setTagValidationMsg("입력할 수 있는 개수를 초과했습니다.");
        return false;
      }
      const checkDuplicateTag = postTags.filter(
        (tag) => tag !== `#${event.target.value}`
      );
      setPostTags([...checkDuplicateTag, `#${event.target.value}`]);
      selectedTags([...checkDuplicateTag, `#${event.target.value}`]);
      event.target.value = "";
      setTagLength(0);

      if (checkDuplicateTag.length === postTags.length) {
        console.log(postTags.length);
        setTagValidationMsg(
          `태그가 성공적으로 입력되었습니다. 최대 5개까지 입력 가능합니다. (현재 개수 ${
            postTags.length + 1
          }개)`
        );
        setCheckAlert(false);
      } else {
        setTagValidationMsg("중복된 값이 입력되었습니다.");
        setCheckAlert(true);
      }
    }
  };
  useEffect(() => {
    setTagValidationMsg(tagValMsg);
  }, [tagValMsg]);

  return (
    <>
      <StCreatePostTagsWrap className="tagBox">
        <ul id="tags">
          {postTags.map((tag, index) => (
            <li key={index} className="tag">
              <span className="tagTitle">{tag}</span>
              <span className="tagCloseIcon" onClick={() => removeTags(index)}>
                <MdClose />
              </span>
            </li>
          ))}
        </ul>
        <Input
          type="text"
          onKeyUp={(event) => (event.key === "Enter" ? addTags(event) : null)}
          onChange={(event) => setTagLength(event.target.value.length)}
          placeholder={tagMassage}
          maxLength="20"
        />
      </StCreatePostTagsWrap>
      <StValidationMsg checkAlert={checkAlert}>
        <span>{tagValidationMsg}</span>
        <strong>{tagLength} / 20자</strong>
      </StValidationMsg>
    </>
  );
};

export default TagInput;

const StCreatePostTagsWrap = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  width: 100%;
  min-height: 48px;
  border: 1px solid var(--gray-color);
  border-radius: 0px;
  padding: 0 8px;
  margin-bottom: 1rem;

  &:focus-within {
    border: 1px solid var(--main-color);
  }
  input {
    flex: 1;
    border: none;
    height: 46px;
    font-size: 1rem;
    padding: 2px 0 0 1.3rem;
    &:focus {
      outline: transparent;
    }
  }

  #tags {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin: 8px 0 0 0;
  }

  .tag {
    width: auto;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-color);
    padding: 0 8px;
    font-size: 1.5rem;
    list-style: none;
    border-radius: 20px;
    margin: 0 8px 8px 0;
    background: var(--main-color);
    .tagTitle {
      margin-top: 3px;
    }
    .tagCloseIcon {
      display: block;
      width: 18px;
      height: 18px;
      line-height: 18px;
      text-align: center;
      margin-left: 8px;
      border-radius: 50%;
      background: var(--bg-color);
      cursor: pointer;

      svg {
        width: 100%;
        height: 100%;
        path {
          color: var(--main-color);
        }
      }
    }
  }

  @media (max-width: 639px) {
    input {
      height: 46px;
      font-size: 1rem;
      padding: 2px 0 0 0.6rem;
    }
    .tag {
      font-size: 1rem;
    }
  }
`;

const StValidationMsg = styled.p`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;

  span {
    font-size: 1rem;
    font-weight: 300;
    font-style: italic;
    color: ${(props) =>
      props.checkAlert ? "var(--red-color)" : "var(--main-color)"};
    margin-bottom: 1rem;
  }
  strong {
    font-size: 1rem;
    font-weight: 300;
    font-style: italic;
  }
  @media (max-width: 639px) {
    span {
      width: calc(100% - 70px);
      font-size: 0.9rem;
    }
    strong {
      font-size: 0.9rem;
    }
  }
`;
