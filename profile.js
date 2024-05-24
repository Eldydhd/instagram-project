const $inputChat = document.getElementsByClassName("input-chat")[0];
const $btnChat = document.getElementsByClassName("btn-chat")[0];
const $commentBox = document.getElementsByClassName("box-comment")[0];

// 아이디 찾기
const $searchBar = document.getElementsByClassName("input-searchBar")[0];
const $filteredBox = document.getElementsByClassName("box-filteredId")[0];
const idData = [
  {
    userId: "apple_01",
    userName: "새콤달콤",
    userImg: "apple.jpg",
  },
  {
    userId: "applepie0101",
    userName: "파이는3.14",
    userImg: "applepie.jpg",
  },
  {
    userId: "peach_01",
    userName: "어피치가되고싶어",
    userImg: "peach.jpg",
  },
  {
    userId: "peachcookie123",
    userName: "스윗복숭",
    userImg: "peach_2.jpg",
  },
  {
    userId: "watermelon_03",
    userName: "수박수박수",
    userImg: "watermelon.jpg",
  },
  {
    userId: "water33",
    userName: "삼다수",
    userImg: "water.jpg",
  },
  {
    userId: "lemon_04",
    userName: "레몽몽",
    userImg: "lemon.jpg",
  },
  {
    userId: "lemonpie4040",
    userName: "레몬파이",
    userImg: "lemon.jpg",
  },
  {
    userId: "candy_0426",
    userName: "사탕해",
    userImg: "candy.jpg",
  },
  {
    userId: "cake2626",
    userName: "생일이다",
    userImg: "cake.jpg",
  },
];

const searchId = function () {
  let result = idData.filter((v, i) => {
    return v.userId.includes($searchBar.value);
  });
  result.forEach((v, i) => {
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
  if ($searchBar.value.length === 0) {
    eraseSearchId();
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

const eraseSearchId = function () {
  while ($filteredBox.hasChildNodes()) {
    $filteredBox.removeChild($filteredBox.firstChild);
  }
};

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

// 드래그앤드랍

const postItems = document.querySelectorAll('.post-item'); // 'post-item' 클래스를 가진 모든 요소 선택
let draggedItem = null; // 드래그되는 아이템을 저장할 변수를 초기화

// 각 'post-item' 요소에 대해 이벤트 리스너 추가
postItems.forEach(postItem => {
  postItem.addEventListener('dragstart', function() {
    draggedItem = this;
    //드래그각 시작된 직후에 요소의 투명도를 줄임
    setTimeout(() => {
      this.style.opacity = '0.5';
    }, 0);
  });

  postItem.addEventListener('dragend', function() { // 드래그가 종료될 때 실행되는 이벤트 리스너를 추가
    // 드래그가 종료된 직후에 요소의 투명도 복원
    setTimeout(() => {
      draggedItem.style.opacity = '';
      draggedItem = null;
    }, 0);
  });
  postItem.addEventListener('dragover', function(e) { // 드래그된 요소가 다른 요소 위로 이동할 때 실행되는 이벤트 리스너를 추가
    // 기본 동작을 막음(드롭을 허용)
    e.preventDefault();
  });

  postItem.addEventListener('dragenter', function(e) { // 드래그된 요소가 다른 요소에 들어갈 때 실행되는 이벤트 리스너를 추가
    e.preventDefault(); // 기본 동작을 막음(드롭을 허용)
    this.style.backgroundColor = 'rgba(0, 0, 0, 0.2)'; // 요소의 배경색을 변경하여 드롭 가능 여부를 시각적으로 표시
  });

  postItem.addEventListener('dragleave', function() { // 드래그된 요소가 다른 요소에서 벗어날 때 실행되는 이벤트 리스너를 추가
    this.style.backgroundColor = ''; // 요소의 배경색을 초기화하여 드롭 가능 여부를 시각적으로 표시
  });

  postItem.addEventListener('drop', function() { // 드롭이 발생했을 때 실행되는 이벤트 리스너를 추가
    this.style.backgroundColor = ''; // 요소의 배경색을 초기화
    // 드래그된 아이템이 현재 요소와 다를 경우에만 내용을 교체
    if (draggedItem !== this) {
      const temp = this.innerHTML;
      this.innerHTML = draggedItem.innerHTML;
      draggedItem.innerHTML = temp;
    }
  });
});