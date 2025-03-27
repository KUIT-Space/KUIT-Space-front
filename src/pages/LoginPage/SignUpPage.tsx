import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Modal from "@/components/Modal";
import SignUpHeader from "@/components/SignUpHeader";
import {
  Container,
  Explanation,
  Input,
  InputContainer,
  NameCount,
  NextButton,
  StyledText,
} from "@/pages/LoginPage/SignUpPage.styled";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [passwordState, setPasswordState] = useState<"empty" | "invalid" | "valid">("empty");
  const [confirmPasswordState, setConfirmPasswordState] = useState<"empty" | "invalid" | "valid">(
    "empty",
  );
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    if (currentStep === 1) {
      setIsButtonActive(email.trim() !== "");
    } else if (currentStep === 2) {
      const isValidPassword = password.length >= 8 && password.length <= 20;
      const isValidConfirmPassword = confirmPassword === password;
      if (password.trim() === "") {
        setPasswordState("empty");
      } else if (!isValidPassword || !validatePassword(password)) {
        setPasswordState("invalid");
      } else {
        setPasswordState("valid");
      }

      if (confirmPassword.trim() === "") {
        setConfirmPasswordState("empty");
      } else if (!isValidConfirmPassword) {
        setConfirmPasswordState("invalid");
      } else {
        setConfirmPasswordState("valid");
      }

      setIsButtonActive(isValidPassword && isValidConfirmPassword);
    } else if (currentStep === 3) {
      setIsButtonActive(name.trim() !== "");
    }
  }, [email, password, confirmPassword, name, currentStep]);

  const handleBackClick = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    } else {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmModal = () => {
    setIsModalOpen(false);
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    } else {
      navigate(-1);
    }
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password: string) => {
    const re = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
    return re.test(password);
  };

  const validateUserName = (name: string) => {
    return name.length >= 1 && name.length <= 10;
  };

  const handleNextButtonClick = async () => {
    if (currentStep === 1) {
      if (!validateEmail(email)) {
        alert("Invalid email format.\nproject@space.kuit 형식으로 입력해야 합니다.");
        return;
      }
    }
    if (currentStep === 2) {
      if (!validatePassword(password)) {
        alert("Invalid password format");
        return;
      }
    }
    if (currentStep === 3) {
      if (!validateUserName(name)) {
        alert("Invalid username length");
        return;
      }

      // try {
      axios
        .post(``, {
          email: email,
          password: password,
          userName: name,
        })
        .then((response) => {
          if (response.status === 200) {
            console.log("회원가입 성공:", response.data.message);
            navigate("/login");
          } else {
            console.error("회원가입 실패:", response.data.message);
          }
        })
        .catch((err) => {
          if (err.response.status.toString().startsWith("4")) {
            if (err.response.data.message === "이미 존재하는 이메일입니다.") {
              setCurrentStep(1);
              alert("이미 존재하는 이메일입니다.");
            } else if (err.response.data.message === "이메일 형식에 맞지 않습니다.. ") {
              setCurrentStep(1);
              alert("이메일 형식에 맞지 않습니다.. ");
            }
          }
          console.error(err);
        });
    } else {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  return (
    <>
      <SignUpHeader title="회원가입" onBackClick={handleBackClick} />
      <Container>
        {currentStep === 1 && (
          <>
            <StyledText>
              <>
                아이디로 사용될
                <br />
                이메일을 입력해주세요
              </>
            </StyledText>
            <InputContainer>
              <Input
                type="email"
                placeholder="project@space.kuit"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleNextButtonClick()}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
                $isValid={validateEmail(email)}
              />
            </InputContainer>
            <Explanation $isValid={validateEmail(email)}>
              {email.trim() === "" && "이메일을 입력해주세요."}
              {email.trim() !== "" && !validateEmail(email) && "사용 불가능한 이메일입니다."}
              {validateEmail(email) && "사용 가능한 이메일입니다."}
            </Explanation>

            <NextButton
              $isActive={validateEmail(email)}
              $isInputFocused={isInputFocused}
              onClick={handleNextButtonClick}
              disabled={!isButtonActive}
            >
              다음
            </NextButton>
          </>
        )}
        {currentStep === 2 && (
          <>
            <StyledText>비밀번호를 입력해주세요</StyledText>
            <InputContainer>
              <Input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
                style={{ marginTop: "5.28rem" }}
                $state={passwordState}
                $isValid={passwordState === "valid"}
              />
            </InputContainer>
            <Explanation $state={passwordState} $isValid={passwordState === "valid"}>
              {passwordState === "empty" && "비밀번호를 입력해주세요.(8~20자)"}
              {passwordState === "invalid" && (
                <span>
                  사용 불가능한 비밀번호입니다. <br /> 대문자, 소문자, 숫자, 특수문자가 각 1개 이상
                  포함되어야 합니다.
                </span>
              )}
              {passwordState === "valid" && "사용 가능한 비밀번호입니다."}
            </Explanation>

            <InputContainer>
              <Input
                type="password"
                placeholder="비밀번호 확인"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleNextButtonClick()}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
                style={{ marginTop: "0.75rem" }}
                $state={confirmPasswordState}
                $isValid={confirmPasswordState === "valid"}
              />
            </InputContainer>
            <Explanation $state={confirmPasswordState} $isValid={confirmPasswordState === "valid"}>
              {confirmPasswordState === "empty"
                ? "비밀번호를 한 번 더 입력해주세요."
                : confirmPasswordState === "valid"
                  ? "비밀번호가 일치합니다."
                  : "비밀번호가 일치하지 않습니다."}
            </Explanation>

            <NextButton
              $isActive={isButtonActive}
              $isInputFocused={isInputFocused}
              onClick={handleNextButtonClick}
              disabled={!isButtonActive}
            >
              다음
            </NextButton>
          </>
        )}
        {currentStep === 3 && (
          <>
            <StyledText>이름을 입력해주세요</StyledText>
            <InputContainer>
              <Input
                type="text"
                placeholder="이름"
                value={name}
                onChange={(e) => {
                  if (e.target.value.length <= 10) setName(e.target.value);
                }}
                onKeyDown={(e) => e.key === "Enter" && handleNextButtonClick()}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
                style={{
                  marginTop: "5.5rem",
                  borderColor: validateUserName(name) ? "#48FFBD" : "#FF5656",
                }}
                $isOverMaxLength={name.length > 10}
              />
              <NameCount style={{ marginTop: "5.5rem" }}>{`${name.length}/10`}</NameCount>
            </InputContainer>
            <NextButton
              $isActive={isButtonActive}
              $isInputFocused={isInputFocused}
              onClick={handleNextButtonClick}
              disabled={!isButtonActive}
            >
              시작하기
            </NextButton>
          </>
        )}
        {/*<Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onConfirm={handleConfirmModal}
          title="회원가입 그만두기"
          content={["여기서 그만두면 스페이스의", "서비스를 이용할 수 없어요!"]}
          leftButtonText="취소"
          rightButtonText="확인"
        />*/}
      </Container>
    </>
  );
};

export default SignUp;
