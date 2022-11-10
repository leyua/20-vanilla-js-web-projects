const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

populateUI();

let ticketPrice = +movieSelect.value;

// total과 count 업데이트
function updateSelectCount() {
    const selectedSeats = document.querySelectorAll(".row .selected");

    // arr로 선택된 좌석들을 localStorage에 저장
    const seatIndex = [...selectedSeats].map((item) => {
        return [...seats].indexOf(item);
    });
    localStorage.setItem("selectedSeats", JSON.stringify(seatIndex));

    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

// localStorage에 저장된 데이터들 불러오기
function populateUI() {
    const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
    if (selectedMovieIndex !== null)
        movieSelect.selectedIndex = selectedMovieIndex;

    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

    // localStorage에 "selectedSeats"라는 key가 없거나 배열의 길이가 0인 경우 제외
    if (selectedSeats !== null && selectedSeats.length > 0)
        selectedSeats.forEach((index) => {
            seats[index].classList.add("selected");
        });
}

// 영화를 선택했을 때
movieSelect.addEventListener("change", (e) => {
    ticketPrice = +e.target.value;
    updateSelectCount();

    // localStorage에 선택한 영화 저장
    localStorage.setItem("selectedMovieIndex", e.target.selectedIndex);
});

// 좌석을 클릭했을 때
container.addEventListener("click", (e) => {
    if (
        e.target.classList.contains("seat") &&
        !e.target.classList.contains("occupied")
    ) {
        e.target.classList.toggle("selected");
        updateSelectCount();
    }
});

// 초기 count와 total 설정
updateSelectCount();
