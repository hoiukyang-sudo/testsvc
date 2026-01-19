// 1. 학생 계정 데이터 (예시 데이터입니다)
const studentData = [
    { id: "10101", name: "김철수", googleId: "chulsoo101@school.com", googlePw: "pw12345!" },
    { id: "10102", name: "이영희", googleId: "younghee102@school.com", googlePw: "yh0202**" },
    { id: "20105", name: "박민수", googleId: "minsu201@school.com", googlePw: "ms990815" }
];

// 2. HTML 요소 가져오기
const searchBtn = document.getElementById('searchBtn');
const studentIdInput = document.getElementById('studentId');
const studentNameInput = document.getElementById('studentName');
const resultArea = document.getElementById('resultArea');
const displayId = document.getElementById('displayId');
const displayPw = document.getElementById('displayPw');

// 3. 검색 함수 정의
function searchAccount() {
    const idValue = studentIdInput.value.trim();
    const nameValue = studentNameInput.value.trim();

    // 입력값이 비어있는지 확인
    if (idValue === "" || nameValue === "") {
        alert("학번과 이름을 모두 입력해주세요! 🐾");
        return;
    }

    // 데이터에서 일치하는 학생 찾기
    const student = studentData.find(s => s.id === idValue && s.name === nameValue);

    if (student) {
        // 정보를 찾은 경우
        displayId.textContent = student.googleId;
        displayPw.textContent = student.googlePw;
        resultArea.classList.remove('hidden'); // 결과창 보여주기
    } else {
        // 정보를 찾지 못한 경우
        alert("정보를 찾을 수 없어요. 학번과 이름을 확인해 주세요! 😿");
        resultArea.classList.add('hidden');
    }
}

// 4. 버튼 클릭 이벤트 연결
searchBtn.addEventListener('click', searchAccount);

// 5. 엔터 키를 눌렀을 때도 검색되도록 설정
studentNameInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchAccount();
    }
});