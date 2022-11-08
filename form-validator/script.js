const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

/** 입력창이 비어있는데 제출하는 경우 */
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = "form-control error";
    const small = formControl.querySelector("small");
    small.innerText = message;
}

/** 제대로 입력되어 제출할 경우 */
function showSuccsess(input) {
    const formControl = input.parentElement;
    formControl.className = "form-control success";
}

/** email 형식이 유효한지 확인 */
function checkEmail(input) {
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(input.value.trim())) {
        showError(input, `Email is not valid`);
    }
}

/** 입력창에 제대로 입력했는지 확인 */
function checkRequired(inputArr) {
    inputArr.forEach((input) => {
        if (input.value.trim() === "") {
            showError(input, `${getFieldName(input)} is required`);
        } else {
            showSuccsess(input);
        }
    });
}

/** 입력한 내용의 길이가 제한 범위 안인지 확인 */
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(
            input,
            `${getFieldName(input)} must be at least ${min} characters`
        );
    } else if (input.value.length > max) {
        showError(
            input,
            `${getFieldName(input)} must be less than ${max + 1} characters`
        );
    }
}

/** password2에서 password와 동일하게 입력했는지 확인 */
function checkPasswordsMatch(input1, input2) {
    if (input1.value !== input2.value) {
        showError(input2, `Passwords do not match`);
    }
}

/** input 영역의 이름을 돌려주는 함수 */
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    checkRequired([username, email, password, password2]);
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkEmail(email);
    checkPasswordsMatch(password, password2);
});
