// 1. 구글 앱스 스크립트 배포 URL (본인의 URL로 교체 필수!)
const API_URL = "https://docs.google.com/spreadsheets/d/1Z0Qa4DO396yLtlWe-bhbgEbz5O7exJStTQnfHky4nYE/edit?usp=sharing";

const searchBtn = document.getElementById('searchBtn');
const studentIdInput = document.getElementById('studentId');
const studentNameInput = document.getElementById('studentName');
const studentBirthInput = document.getElementById('studentBirth'); // 생년월일 추가
const resultArea = document.getElementById('resultArea');
const displayId = document.getElementById('displayId');
const displayPw = document.getElementById('displayPw');

async function searchAccount() {
    const idValue = studentIdInput.value.trim();
    const nameValue = studentNameInput.value.trim();
    const birthValue = studentBirthInput.value.trim();

    if (!idValue || !nameValue || !birthValue) {
        alert("학번, 이름, 생년월일을 모두 입력해주세요! ✨");
        return;
    }

    // 버튼을 검색 중 상태로 변경
    searchBtn.innerText = "검색 중...";
    searchBtn.disabled = true;

    try {
        // 2. 스프레드시트 데이터 가져오기 (비동기 통신)
        const response = await fetch(API_URL);
        const studentData = await response.json();

        // 3. 입력한 3가지 정보가 모두 일치하는 학생 찾기
        const student = studentData.find(s => 
            String(s.id) === idValue && 
            String(s.name) === nameValue && 
            String(s.birth) === birthValue
        );

        if (student) {
            displayId.textContent = student.googleId;
            displayPw.textContent = student.googlePw;
            resultArea.classList.remove('hidden');
        } else {
            alert("정보가 일치하는 학생을 찾을 수 없어요. 😿");
            resultArea.classList.add('hidden');
        }
    } catch (error) {
        console.error("데이터를 가져오는 데 실패했습니다:", error);
        alert("서버 연결에 실패했습니다. URL을 확인해 주세요!");
    } finally {
        // 버튼 원래대로 복구
        searchBtn.innerText = "검색하기";
        searchBtn.disabled = false;
    }
}

searchBtn.addEventListener('click', searchAccount);