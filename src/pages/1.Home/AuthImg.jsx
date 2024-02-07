import styled from "styled-components";
import * as C from "../../components/AuthComponents";
import ddefaultProfile from "../../assets/images/ddefaultProfile.svg";
import dfixButton from "../../assets/images/dfixButton.svg";
import { Link } from "react-router-dom";
import { React, useState, useEffect } from "react";

export default function Profile() {
  const [inputName, setInputName] = useState("");
  const [nameValid, setNameValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);

  const [uploadedImage, setUploadedImage] = useState(ddefaultProfile);

  const onUploadImage = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setUploadedImage(imageUrl);
  };

  const handleName = (e) => {
    setInputName(e.target.value);
    setNameValid(e.target.value.trim());
  };

  useEffect(() => {
    if (nameValid) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [nameValid]);

  return (
    <>
      <C.TitleWrapper>
        <C.Title>프로필 설정</C.Title>
      </C.TitleWrapper>
      <ProfileWrapper>
        <DefaultProfile>
          {uploadedImage ? (
            <UploadedImg
              src={uploadedImage}
              alt='profileImage'
            />
          ) : null}
          <FixButton>
            <FileInput onChange={onUploadImage} />
          </FixButton>
        </DefaultProfile>
      </ProfileWrapper>
      <SizedBox></SizedBox>
      <C.InputLabel>닉네임</C.InputLabel>
      <C.AuthInput
        placeholder='스트로베리 초코 생크림 케이크'
        name='nickname'
        value={inputName}
        onChange={handleName}
      ></C.AuthInput>
      <Link to='/authrule'>
        <C.NextButton
          type='submit'
          disabled={notAllow}
        >
          <C.ButtonText>다음</C.ButtonText>
        </C.NextButton>
      </Link>
    </>
  );
}

const FileInput = ({ onChange }) => {
  return (
    <>
      <ImgInput
        type='file'
        id='fileInput'
        accept='images/*'
        onChange={onChange}
      />
      <Imglabel htmlFor='fileInput' />
    </>
  );
};

const SizedBox = styled.div`
  width: 90vw;
  height: 7vh;
`;

const ProfileWrapper = styled.div`
  position: relative;
  margin-top: 10vh;
  width: auto;
  display: flex;
  height: 20vh;
  justify-content: center;
  align-items: center;
`;

const DefaultProfile = styled.div`
  position: absolute;
  z-index: 0;
  border-radius: 70%;
  object-fit: cover;
`;

const FixButton = styled.div`
  position: absolute;
  left: 65%;
  top: 85%;
  transform: translateY(-50%);
  z-index: 2;
  margin: 0;
  cursor: pointer;
`;

const UploadedImg = styled.img`
  border-radius: 70%;
  width: 125px;
  height: 125px;
`;

const ImgInput = styled.input`
  display: none;
`;

const Imglabel = styled.label`
  background-image: url(${dfixButton});
  background-size: cover;
  width: 32px;
  height: 32px;
  display: inline-block;
  cursor: pointer;
`;