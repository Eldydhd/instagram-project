// HTML 문서로부터 필요한 요소들 가져옴
const $inputId = document.getElementById("input-id");
const $inputPw = document.getElementById("input-pw");
const $btnLogin = document.getElementById("btn-login");
const $formLogin = document.querySelector("form-login");

// 입력 필드가 유효한지 여부를 나타내는 변수들 초기화
let checkId = false;
let checkPw = false;

// 로그인 버튼 활성화
const activateButton = function () {
  $btnLogin.style.backgroundColor = "rgb(0, 149, 246, 1)";
  $btnLogin.disabled = false;
  $btnLogin.classList.add("btn-hoverEffect");
};

// 로그인 버튼 비활성화
const disabledButton = function () {
  $btnLogin.style.backgroundColor = "rgb(0, 149, 246, 0.3)";
  $btnLogin.disabled = true;
  $btnLogin.classList.remove("btn-hoverEffect");
};

// 입력 필드의 길이를 확인하여 로그인 버튼 활성화 또는 비활성화
const checkLength = function () {
  if ($inputId.value.length > 0 && $inputPw.value.length > 0) {
    activateButton(); // 입력이 모두 채워졌을 때 버튼 활성화
  } else {
    disabledButton(); // 하나 이상의 입력이 비어있을 때 버튼 비활성화
  }
};

// 이메일 유효성 검사
const idValidation = function () {
  const $emailErrorMessage = document.querySelector(".message-emailError");
  if (!$inputId.value.includes("@")) { // 이메일 형식이 아니라면
    $emailErrorMessage.style.display = "inline-block";
    checkId = false;
  } else {
    $emailErrorMessage.style.display = "none";
    checkId = true;
  }
};

// 비밀번호 유효성 검사
const pwValidation = function () {
  const $pwErrorMessage = document.querySelector(".message-pwError");
  if ($inputPw.value.length < 5) { // 비밀번호 길이가 5 미만이면
    $pwErrorMessage.style.display = "inline-block";
    checkPw = false;
    disabledButton();// 버튼 비활성화
  } else {
    $pwErrorMessage.style.display = "none";
    checkPw = true;
    activateButton();// 버튼 활성화
  }
};

// 로그인 제출
const submitLogin = function (e) {
  e.preventDefault(); // 기본 동작 방지
  if (checkId === true && checkPw === true) { // 이메일과 비밀번호가 유효하다면
    $inputId.value = ""; // 입력 필드 초기화
    $inputPw.value = ""; // ''
    location.href = "./main.html"; // 메인 페이지로 이동
  }
};
// 값이 변경될 때마다 호출되는 이벤트 리스너 추가
$inputId.addEventListener("keyup", checkLength);
$inputPw.addEventListener("keyup", checkLength);
$inputId.addEventListener("change", idValidation);
$inputPw.addEventListener("change", pwValidation);
$btnLogin.addEventListener("click", submitLogin); // 로그인 버튼 클릭 시 submitLogin 함수 호출