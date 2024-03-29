import React, { useState } from "react";
import styled from "styled-components";
import * as C from "../../components/SurveyComponents";
import { useNavigate } from "react-router-dom";
import * as B from "../../components/BottomSheet";
import Warning from "../../assets/images/cLinkno.svg";
import Upload from "../../assets/images/bpajamas_warning-solid.svg";
import axios from "axios";
import { useRecoilState } from "recoil";
import { useEffect } from "react";
import back from "../../assets/images/cBack.svg";

import { contentState } from "../../components/RecoilDummys";

export default function SurveyContent() {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [link, setLink] = useState();
  const [isLink, setIsLink] = useState(false);
  const [showLBottom, setLBottom] = useState(false);
  const [showPBottom, setPBottom] = useState(false);
  const [surveyContent, setSurveyContent] = useRecoilState(contentState);
  const navigate = useNavigate();
  const onChangeTitle = (e) => {
    const currentTitle = e.target.value;
    setTitle(currentTitle);
  };
  const onChangeContent = (e) => {
    const currentContent = e.target.value;
    setContent(currentContent);
  };
  const onChangeLink = (e) => {
    const currentLink = e.target.value;
    setLink(currentLink);
    const linkRegExp = /[f]+[o]+[r]+[m]+[s]/;
    if (!linkRegExp.test(currentLink)) {
      setIsLink(false);
    } else {
      setIsLink(true);
    }
  };

  const onClickNext = () => {
    if (isLink) {
      setSurveyContent({
        ...surveyContent,
        title: title,
        description: content,
        linkUrl: link,
      });
      console.log(surveyContent);
      setPBottom(true);
    } else {
      setLBottom(true);
    }
  };

  const clickCheck = () => {
    setLBottom(false);
    setPBottom(false);
  };
  const clickNext = () => {
    navigate("/surveypoint");
  };

  return (
    <div>
      <C.TitleWrapper>
        <BackBtn src={back} onClick={() => navigate(-1)}></BackBtn>
        <C.Title>설문조사 등록</C.Title>
        <ThisNextSmallButton onClick={onClickNext}>
          <C.SmallButtonText>다음</C.SmallButtonText>
        </ThisNextSmallButton>
      </C.TitleWrapper>

      <Title
        placeholder='제목을 입력하세요.'
        id='title'
        name='title'
        value={title}
        onChange={onChangeTitle}
      ></Title>
      <Content
        placeholder='내용을 입력하세요.&#13;&#10;&#13;&#10;1.소속이 어디인가요?&#13;&#10;2.주제가 무엇인가요?&#13;&#10;3.대상은 누구인가요?&#13;&#10;4.응답 소요 시간은 얼마나 되나요?'
        id='content'
        name='content'
        value={content}
        onChange={onChangeContent}
      ></Content>
      <Adress
        placeholder='google form 링크를 입력해주세요'
        id='link'
        name='link'
        value={link}
        onChange={onChangeLink}
      ></Adress>
      {showLBottom && <LinkBottom clickCheck={clickCheck} />}
      {showPBottom && (
        <PointBottom
          onCancel={clickCheck}
          clickNext={clickNext}
        />
      )}
    </div>
  );
}

function LinkBottom({ clickCheck }) {
  return (
    <>
      <B.BackgroundBottomSheet>
        <B.BottomSheetWrapper>
          <B.BottomSheetInfo>
            <B.InputLabel>유효하지 않은 폼 링크가 등록되었어요.</B.InputLabel>
            <B.ProcessExplain>
              등록하신 설문조사가 구글폼으로 생성된 것인지
              <br />
              확인해주세요.
            </B.ProcessExplain>
            <img
              src={Warning}
              alt='warning'
            ></img>
          </B.BottomSheetInfo>
          <B.BottomButtonWrapper>
            <ConfirmButton>
              <C.ButtonText onClick={clickCheck}>확인</C.ButtonText>
            </ConfirmButton>
          </B.BottomButtonWrapper>
        </B.BottomSheetWrapper>
      </B.BackgroundBottomSheet>
    </>
  );
}

function PointBottom({ onCancel, clickNext }) {
  return (
    <>
      <B.BackgroundBottomSheet>
        <B.BottomSheetWrapper>
          <B.BottomSheetInfo>
            <B.InputLabel>해당 링크로 등록하시겠어요?</B.InputLabel>
            <B.ProcessExplain>
              등록 후 링크 변경은 불가합니다.
              <br />
              링크 변경 시 삭제 후 재등록해주세요.
            </B.ProcessExplain>
            <img
              src={Upload}
              alt='Upload'
            />
          </B.BottomSheetInfo>
          <B.BottomButtonWrapper>
            <B.CancelButton onClick={onCancel}>
              <C.ButtonText>취소</C.ButtonText>
            </B.CancelButton>
            <B.ConfirmButton>
              <C.ButtonText onClick={clickNext}>확인</C.ButtonText>
            </B.ConfirmButton>
          </B.BottomButtonWrapper>
        </B.BottomSheetWrapper>
      </B.BackgroundBottomSheet>
    </>
  );
}


const BackBtn = styled.img`
  margin-left:5vw;
  position:absolute;
  left:0; 
`;

const NextBtn = styled.button`
  width: 39px;
  height: 26px;
  border: none;
  border-radius: 5px;
  background: #6046ff;
  color: #ffffff;
  position: absolute;
  right: 5vw;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
`;
const Title = styled.input`
  &::placeholder {
    color: #d6d6d6;
    font-family: Poppins;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px;
  }
  font-size: 16px;
  font-weight: 600;
  border-width: 0 0 1px;
  border-color: #efedff;
  width: 90vw;
  margin-top: 4vh;
  padding-bottom: 0.5vh;
  outline: none;
`;
const Content = styled.textarea`
  width: 90vw;
  height: 23vh;
  font-size: 14px;
  font-weight: 500;
  text-align: left;
  &::placeholder {
    color: #d6d6d6;
    font-family: Poppins;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
  }
  margin-top: 3vh;
  border: none;
  outline: none;
`;
const Adress = styled.input`
  width: 70vw;
  border: solid 2px;
  border-color: #6046ff;
  background-color: #f7f6ff;
  border-radius: 999px;
  padding: 13px 5vw;
  font-size: 12px;
  outline: none;
  font-weight: 500;
  &::placeholder {
    color: #a7a7a7;
    font-family: Poppins;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
  }
`;

export const ConfirmButton = styled.button`
  border-radius: 10px;
  background: #6046ff;
  color: var(--white, #fff);
  width: 90vw;
  height: 5vh;
  justify-content: center;
  align-items: center;
  border: none;
  box-shadow: 0px 2px 11px 0px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  margin-bottom: 7vh;
`;

const ThisNextSmallButton = styled(C.NextSmallButton)`
  position: absolute;
  right: 5vw;
  cursor: pointer;
  ${(props) =>
    props.disabled &&
    css`
      background-color: #d9d9d9;
      pointer-events: none;
    `}
`;
