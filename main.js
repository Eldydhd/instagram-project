// 채팅 입력 필드, 채팅 전송 버튼, 댓글 박스 참조 획득
const $inputChat = document.getElementsByClassName("input-chat")[0];
const $btnChat = document.getElementsByClassName("btn-chat")[0];
const $commentBox = document.getElementsByClassName("box-comment")[0];

// 댓글 작성
const leaveComment = function (e) {
  e.preventDefault();
  const comment = document.createElement("p"); // 새로운 댓글 요소 생성
  const wrapComment = document.createElement("div");
  comment.textContent = $inputChat.value; // 입력된 채팅 내용 댓글로 설정
  wrapComment.appendChild(comment);
  comment.classList.add("text-comment");
  $inputChat.value = ""; // 입력 필드 비우기

  // 좋아요 아이콘 추가
  const likeIcon = document.createElement("img");
  likeIcon.src = "image/heart.png";
  likeIcon.width = 14;
  likeIcon.height = 14;
  likeIcon.classList.add("img-heart-comment");
  wrapComment.appendChild(likeIcon);

  // 삭제 아이콘 추가
  const deleteIcon = document.createElement("img");
  deleteIcon.src = "image/delete.png";
  deleteIcon.width = 10;
  deleteIcon.height = 10;
  deleteIcon.classList.add("img-delete-comment");
  wrapComment.appendChild(deleteIcon);
  

  // 댓글 박스에 댓글 추가
  $commentBox.appendChild(wrapComment);
};

// 채팅 입력 시 버튼 활성화
const visibleButton = function () {
  if ($inputChat.value.length > 0) {
    $btnChat.classList.add("btn-chat-effect");
  } else {
    $btnChat.classList.remove("btn-chat-effect");
  }
};

// 이벤트 리스너 추가
$btnChat.addEventListener("click", leaveComment);
$inputChat.addEventListener("keyup", visibleButton);

// 하트, 삭제 아이콘 제어
const controlImg = function (e) {
  // 클릭된 아이콘이 하트인 경우
  if (e.target.getAttribute("src") == "image/heart.png") {
    e.target.setAttribute("src", "image/fullHeart.png"); // 하트를 채워진 하트로 변경
  } else if (e.target.getAttribute("src") == "image/fullHeart.png") {
    e.target.setAttribute("src", "image/heart.png"); // 채워진 하트를 빈 하트로 변경
  }
  // 클릭된 아이콘이 삭제 아이콘인 경우
  if (e.target.className === "img-delete-comment") {
    let parent = e.target.parentElement; // 댓글 요소의 부모 요소 가져오기
    parent.remove(); // 부모 요소(댓글) 삭제
  }
};
// 댓글 박스에 클릭 이벤트 리스너 추가
$commentBox.addEventListener("click", controlImg);

// 아이디 검색 관련 기능
const $searchBar = document.getElementsByClassName("input-searchBar")[0];
const $filteredBox = document.getElementsByClassName("box-filteredId")[0];
const idData = [
  // 사용자 정보 데이터
  {
    userId: "apple_01",
    userName: "새콤달콤",
    userImg: "image/apple.jpg",
  },
  {
    userId: "applepie0101",
    userName: "파이는3.14",
    userImg: "image/applepie.jpg",
  },
  {
    userId: "peach_01",
    userName: "어피치가되고싶어",
    userImg: "image/peach.jpg",
  },
  {
    userId: "peachcookie123",
    userName: "스윗복숭",
    userImg: "image/peach_2.jpg",
  },
  {
    userId: "watermelon_03",
    userName: "수박수박수",
    userImg: "image/watermelon.jpg",
  },
  {
    userId: "water33",
    userName: "삼다수",
    userImg: "image/water.jpg",
  },
  {
    userId: "lemon_04",
    userName: "레몽몽",
    userImg: "image/lemon.jpg",
  },
  {
    userId: "lemonpie4040",
    userName: "레몬파이",
    userImg: "image/lemon.jpg",
  },
  {
    userId: "candy_0426",
    userName: "사탕해",
    userImg: "image/candy.jpg",
  },
  {
    userId: "cake2626",
    userName: "생일이다",
    userImg: "image/cake.jpg",
  },
];

// 아이디 검색
const searchId = function () {
  // 입력된 검색어로 필터링된 결과 가져옴
  let result = idData.filter((v, i) => {
    return v.userId.includes($searchBar.value) || v.userName.includes($searchBar.value);
  }); 
  // 검색 결과 화면에 출력
  result.forEach((v, i) => {
    // 검색 결과를 표시할 요소 생성 및 설정
    const wrapFiltered = document.createElement("div");
    const wrapText = document.createElement("div");
    const filteredImg = document.createElement("img");
    const filteredId = document.createElement("span");
    const filteredName = document.createElement("span");
    filteredImg.classList.add("filteredImg");
    wrapFiltered.classList.add("wrapFiltered");
    filteredId.classList.add("filteredId");
    filteredName.classList.add("filteredName");
    wrapText.classList.add("wrapText");

    wrapFiltered.appendChild(filteredImg);
    filteredImg.src = v.userImg;

    filteredId.innerText = v.userId;
    wrapText.appendChild(filteredId);

    filteredName.innerText = v.userName;
    wrapText.appendChild(filteredName);
    wrapFiltered.appendChild(wrapText);

    $filteredBox.appendChild(wrapFiltered);
  });
  // 검색어가 비어있는 경우 최근 검색 내역 초기화
  if ($searchBar.value.length === 0) {
    eraseSearchId();
    // 최근 검색 내역이 없음을 알리는 요소 생성 및 출력
    const boxRecentSearch = document.createElement("div");
    const recentSearchTitle = document.createElement("p");
    const recentSearchContent = document.createElement("p");
    recentSearchTitle.innerText = "최근 검색 항목";
    recentSearchTitle.classList.add("title-recentSearch");
    recentSearchContent.innerText = "최근 검색 내역 없음.";
    recentSearchContent.classList.add("content-recentSearch");
    boxRecentSearch.appendChild(recentSearchTitle);
    boxRecentSearch.appendChild(recentSearchContent);
    $filteredBox.appendChild(boxRecentSearch);
  }
};

// 최근 검색 내역 초기화 
const eraseSearchId = function () {
  // 필터링된 아이디 박스의 자식 요소들 모두 삭제
  while ($filteredBox.hasChildNodes()) {
    $filteredBox.removeChild($filteredBox.firstChild);
  }
};

// 아이디 검색 이벤트 리스너 추가
$searchBar.addEventListener("keyup", searchId);
$searchBar.addEventListener("keydown", eraseSearchId);
$searchBar.addEventListener("click", () => {
  $filteredBox.style.display = "inline-block";
});
$searchBar.addEventListener("focusout", () => {
  $filteredBox.style.display = "none";
  $searchBar.value = "";
});

// 메뉴박스 
const $wrapMenu = document.getElementsByClassName("wrap-menu")[0];
const $profileImg = document.getElementsByClassName("img-navProfile")[0];
const $body = document.getElementsByTagName("body")[0];
const controlMenu = function (e) {
  if (e.target.className === "img-navProfile") {
    if ($wrapMenu.style.display === "none") {
      $wrapMenu.style.display = "inline-block";
    } else {
      $wrapMenu.style.display = "none";
    }
  } else {
    $wrapMenu.style.display = "none";
  }
};
$body.addEventListener("click", controlMenu);