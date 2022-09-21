import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import imageCompression from "browser-image-compression";
import CreatePostImageCrop from "./CreatePostImageCrop";
import styled from "styled-components";

const CreatePostImage = ({ selectedPostImages }) => {
  const [files, setFiles] = useState([]);
  const [resizingFiles, setResizingFiles] = useState([]);
  const [resizingPreviewFiles, setResizingPreviewFiles] = useState([]);
  const [selectedImage, setSelectedImage] = useState();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [fileRejectionsMessage, setFileRejectionsMessage] = useState(null);
  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
      // ::: 편집화면 첫 이미지는 첫번째 이미지로 설정
      setSelectedImage(acceptedFiles[0].preview);
    },
    maxFiles: 5, // ::: 최대 이미지 개수 설정하기
  });

  // ::: 이미지 리사이징(Resizing)
  const compressImageAndGetImageFile = (file) => {
    const options = {
      maxSizeMB: 1.5,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    const compressedFile = imageCompression(file, options);
    return compressedFile;
  };

  console.log("files ===>", files);

  // ::: 최대 이미지보다 많은 이미지를 넣게 되면 에러 메시지 나타내기

  const originImageToResizingImage = async (files) => {
    let temp = [];
    let previewTemp = [];
    for (let i = 0; i < files.length; i++) {
      const complessedFile = await compressImageAndGetImageFile(files[i]);
      console.log("complessedFile===>", i, "번째!!!", complessedFile);
      temp.push(complessedFile);
      const previewCompressedFile = await imageCompression.getDataUrlFromFile(
        complessedFile
      );
      previewTemp.push(previewCompressedFile);
    }
    setResizingFiles(temp);
    setResizingPreviewFiles(previewTemp);
  };
  useEffect(() => {
    fileRejections.length > 0
      ? setFileRejectionsMessage(
          <>
            <span>- 이미지는 최대 5장까지 업로드가 가능합니다!</span> <br />
            <strong>현재 업로드한 이미지 개수 : {fileRejections.length}</strong>
          </>
        )
      : setFileRejectionsMessage(null);

    if (files.length > 0) {
      originImageToResizingImage(files);
    }

    // eslint-disable-next-line
  }, [fileRejections, files]);

  console.log("resizingFiles ===>", resizingFiles);
  console.log("resizingPreviewFiles ===>", resizingPreviewFiles);

  return (
    <StCreatePostImageWrap>
      {files.length === 0 && (
        <StImageDropZone {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <p>
            해당 영역을 클릭하거나 이미지 파일을 드레그하여
            <br />
            업로드할 이미지를 선택해주세요. <br />
            최대 5장까지 업로드 가능합니다.
          </p>
        </StImageDropZone>
      )}
      <StAlertMessage>{fileRejectionsMessage}</StAlertMessage>
      <StPostImageCropWrap>
        {resizingFiles.length !== 0 && (
          <CreatePostImageCrop
            files={resizingFiles}
            previewFiles={resizingPreviewFiles}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            selectedImageIndex={selectedImageIndex}
            setSelectedImageIndex={setSelectedImageIndex}
            selectedPostImages={selectedPostImages}
          />
        )}
      </StPostImageCropWrap>
    </StCreatePostImageWrap>
  );
};

export default CreatePostImage;

const StCreatePostImageWrap = styled.div`
  width: 100%;
`;

const StImageDropZone = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 150px;
  border: 1px solid var(--gray-color);
  background-color: var(--bg-color);
  cursor: pointer;

  p {
    text-align: center;
    font-size: 1.2rem;
    line-height: 1.5;
    padding: 0 1rem;
  }
`;

const StAlertMessage = styled.p`
  line-height: 1.3;
  font-style: italic;
  margin-top: 1rem;

  span,
  strong {
    color: var(--red-color);
  }

  strong {
    text-decoration: underline;
    padding-left: 10px;
  }
`;

const StPostImageCropWrap = styled.div`
  width: 100%;
  margin-bottom: 2rem;
`;
