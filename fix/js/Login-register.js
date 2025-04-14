let changeSign = document.getElementById("back-to-Sign");
let dataUser = JSON.parse(localStorage.getItem("dataUser")) || { users: [] };
let check = true;
let pop = document.getElementById("notification");
let text = document.getElementById("textInPop");
let img = document.getElementById("iconSuccess");
let imgError = document.getElementById("iconError");
let box = document.getElementById("notification_error");
let status = localStorage.getItem("Status");
box.style.display = "none";
if(status === "on"){
    console.log("xin chao " + localStorage.getItem("userCurrent"));
    window.location.href = "./page/HomePage.html"
}

function cssError(){
    box.style.display = "flex";
    pop.style.display = "flex";
    pop.style.flexDirection = "column";
    pop.style.backgroundColor = "#FFE5E8";
    imgError.style.display = "block";
    text.style.paddingLeft = "16px";
}
function timeOut(){
    setTimeout(() => {
        Object.assign(pop.style, resetStyles);
        Object.assign(box.style, { display: "none" });
        Object.assign(imgError.style, { display: "none" });
    }, 2000);
}

let resetStyles = {
    display: "none",
    flexDirection: "",
    backgroundColor: "",
    alignItems:"",
    paddingLeft: "",
    innerHTML: ""
};

convertSign();

changeSign.addEventListener("click", function(){
    check = !check;
    convertSign();
});

function convertSign(){
    let title = document.getElementById("title");
    let userName = document.getElementById("userName");
    let checkbox = document.getElementById("remember-box");
    let text = document.getElementById("textSign");
    let btn = document.getElementById("SignIn");
    let newBtn = btn.cloneNode(true);
    btn.replaceWith(newBtn);
    btn = newBtn;
    if(check){
        title.innerText = "Please sign in"
        userName.style.display = "none";
        checkbox.style.display = "block";
        text.innerText = "Don't have an account,";
        btn.innerText = "Sign in";
        btn.addEventListener("click", signIn);
    }else{
        title.innerText = "Please sign up"
        userName.style.display = "flex";
        checkbox.style.display = "none";
        text.innerText = "Already have an account,";
        btn.innerText = "Sign up";
        btn.addEventListener("click", signUp);
    }
}

function signUp(){
    let emailAddress = document.getElementById("email").value;
    let userNameInput = document.getElementById("userName").value;
    let password = document.getElementById("password").value;
    if (!emailAddress.endsWith("@gmail.com") || emailAddress.includes(' ')) {
        cssError();
        text.innerHTML = "Invalid Email";
        timeOut();
        return;
    }
    if (dataUser.users.some(user => user.email === emailAddress)) {
        cssError();
        text.innerHTML = "Email Trùng lặp";
        timeOut();
        return;
    }else if(dataUser.users.some(user => user.userName === userNameInput)) {
        cssError();
        text.innerHTML = "Ten Trùng lặp";
        timeOut();
        return;
    } else if(password.length < 8){
        cssError();
        text.innerHTML = "Invalid Password";
        timeOut();
        return;
    }else if(userNameInput.length < 3){
        cssError();
        text.innerHTML = "Invalid UserName";
        timeOut();
        return;
    }
    let newUser = {
        img: "https://app.nutrium.com/assets/fallback/professional/male_thumb_300-6e727c46044d3393a70ff631a652ccc3d48551795b7602f892e041f90c8781ac.png",
        email: emailAddress,
        userName: userNameInput,
        password: password,
        favorite: { id: [] }
    };

    dataUser.users.push(newUser);

    localStorage.setItem("dataUser", JSON.stringify(dataUser));

    document.getElementById("email").value = "";
    document.getElementById("userName").value = "";
    document.getElementById("password").value = "";
    check = true;

    pop.style.display = "flex";
    pop.style.backgroundColor = "#E5FFF0";
    pop.style.alignItems= "center";
    pop.style.gap = "8px";
    img.style.display = "block";
    text.innerText = "Đăng kí thành công";
    setTimeout(() => {
        Object.assign(pop.style, resetStyles);
        Object.assign(img.style, { display: "none" });
    }, 2000);
    convertSign();
}

function signIn(){
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let checkbox = document.getElementById("remember-me");
    let checkLogin = dataUser.users.findIndex(user => user.email === email && user.password === password);
    if (checkLogin === -1) {
        cssError();
        text.innerHTML = "Sai mật khẩu hoặc sai Email.";
        timeOut();
        return;
    }

    if (checkbox.checked) {
        localStorage.setItem("Status", "on");
    }

    let user = dataUser.users.find(user => user.email === email);
    const userName = user.userName

    localStorage.setItem("userName", userName);

    console.log(userName);
    localStorage.setItem("loginSuccess", "true");
    localStorage.setItem("indexUser", checkLogin.toString())
    window.location.href = "./page/HomePage.html";
}



