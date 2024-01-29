import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import * as C from '../../components/AuthComponents';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Auth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [number, setNumber] = useState('');

    const [isEmail, setIsEmail] = useState(false);
    const [isPassword, setIsPassword] = useState(false);
    const [isNumber, setIsNumber] = useState(false);

    const [pwType, setpwType] = useState({type: "password", visible: false});

    const onChangeEmail = (e) => {
        const currentEmail = e.target.value;
        setEmail(currentEmail);
        const emailRegExp = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a]+[c]+\.+[k]+[r]/i;
        if (!emailRegExp.test(currentEmail)) {
            setIsEmail(false);
        } else {
            setIsEmail(true);
        }
    };

    const onChangePassword = (e) => {
        const currentPassword = e.target.value;
        setPassword(currentPassword);
        const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/;
        if (!passwordRegExp.test(currentPassword)) {
            setIsPassword(false);
        } else { 
            setIsPassword(true);
        }
    };

    const onChangeNumber = (e) => {
        const currentNumber = e.target.value;
        setNumber(currentNumber);
        const numberRegExp = /^[0-9]{6,6}$/;
        if (!numberRegExp.test(currentNumber)) {
            setIsNumber(false);
        } else { 
            setIsNumber(true);
        }
    };
    
    const navigate = useNavigate();
    const onChangeEmailBtn = (e) => {
        e.preventDefault();
        const goToLogin = () => window.location.reload();
        if (!isEmail ? false : true) {
            alert("인증코드를 전송했습니다.");
        } else {
            alert('이메일을 올바르게 입력해주세요.');
            goToLogin();
        }
    };
    const onChangeNumberBtn = (e) => {
        e.preventDefault();
        if (!isNumber ? false : true) {
            alert("인증코드를 확인했습니다.");
        } else {
            alert('인증코드가 일치하지않습니다.');
        }
    };

    const onChangeButton = (e) => {
        e.preventDefault();

        const goToNext = () => {navigate('/authimg');};

        if (!isEmail || !isPassword || !isNumber ? false : true) {
            goToNext();
            getData();
            console.log('id : ', email, 'number: ', number, 'pw :', password);
        } else {
            alert('이메일 혹은 비밀번호를 정확히 입력해주세요.');
        }
    };

    const getData = async (e) => {
        try {
            const response = await axios.get(`http://localhost:5181/auth`, 
            {
                id: email,
                number: number,
                pw: password
            },
            );
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    const handlePasswordType = (e) => {
        setpwType(() => {
        if (!pwType.visible) {
            return { type: "text", visible: true };
        } else {
            return { type: "password", visible: false };
        }
        });
    };

    return(
        <>
        <C.TitleWrapper>
            <C.Title>회원가입</C.Title>
        </C.TitleWrapper>
        <Content0>
            <C.InputLabel>아이디 - 학교 이메일</C.InputLabel>
            <Wrapper>
                <AuthInput2 
                    placeholder='surmate@example.ac.kr'
                    id="email" 
                    name="email" 
                    value={email} 
                    onChange={onChangeEmail} />
                <BtnA type='button' onClick={onChangeEmailBtn}></BtnA>
            </Wrapper>
        </Content0>
        <Content>
            <C.InputLabel>인증코드 6자리</C.InputLabel>
            <Wrapper>
                <AuthInput2 
                    placeholder='000000' 
                    maxLength={6}
                    id="number"
                    name="number"
                    value={number}
                    onChange={onChangeNumber}/>
                <BtnA type='button' onClick={onChangeNumberBtn}></BtnA>
            </Wrapper>
        </Content>
        <Content>
            <C.InputLabel>비밀번호</C.InputLabel>
            <Wrapper>
                <AuthInput2 
                    type={pwType.type} 
                    placeholder='비밀번호를 입력해주세요'
                    id="password"
                    name="password"
                    value={password}
                    onChange={onChangePassword} />
                <BtnE 
                    type='button' 
                    onClick={handlePasswordType}
                    style={{ backgroundColor: !pwType.visible ? "" : "#6046FF" }}
                    ></BtnE>
            </Wrapper>
            <P>대소문자, 숫자, 특수문자(@$!*#?&) 포함 8~15자 이내</P>
        </Content>

        <Link to="/login">
            <C.NextButton
                type="submit"
                onClick={onChangeButton}
                className="button">
                <C.ButtonText>다음</C.ButtonText>
            </C.NextButton>
        </Link>
    </>
    );
}

const Content = styled.div`
    margin-top: 4vh;
`
const Content0 = styled.div`
    margin-top: 8vh;
`
const Wrapper = styled.div`
    position: relative;
    width: auto;
    display: flex;
    justify-content: center;
    align-items: center;
`
const P = styled.p`
    font-size: 10px;
    font-weight: 400;
    color: #848383;
    margin-bottom: 8vh;
    margin-top: 1vh;
`
const BtnA = styled.input`
    background: url('src/assets/images/cArrow.svg') no-repeat;
    width: 32px;
    height: 32px;
    border: none;
`
const BtnE = styled.input`
    background: url('src/assets/images/cEye.svg') no-repeat;
    width: 24px;
    height: 24px;
    border: none;
`
const AuthInput2 = styled.input`
    width: calc(90vw - 55px);
    height: 3vh;
    padding: 5px;
    border: none;
    border-bottom: 0.4px solid rgba(96, 70, 255, 0.3);
    &::placeholder {
        color: #d6d6d6;
    }
    &:focus {
        outline: none;
    }
`;
