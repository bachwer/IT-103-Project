







fetch("menuHeader.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("menu-container").innerHTML = data;
        let homePage = document.getElementById("HomePage");
        let foodsPage = document.getElementById("foodsPage");
        let receiptsPage = document.getElementById("receiptsPage");
        let signOut = document.getElementById("SingOut");
        let btnListMenu = document.getElementById("menuList");


        let name = document.getElementById("UserName");
        name.innerHTML = localStorage.getItem("userName");
        let titlePage = document.getElementById("titlePage");
        let descriptionPage = document.getElementById("descriptionPage");
        titlePage.innerText = namePage.toString()
        descriptionPage.innerText = namePage1.toString()

        let indexUser =+localStorage.getItem("indexUser");
        let dataUser = JSON.parse(localStorage.getItem("dataUser")) || { users: [] };

        let imgAv =  document.getElementById("imgAv");
        imgAv.src =  dataUser.users[indexUser].img;

        imgAv.addEventListener("click", async () => {
            try {
                imgAv.src = await createImageUploadPopup();
                dataUser.users[indexUser].img = imgAv.src;
                localStorage.setItem("dataUser", JSON.stringify(dataUser));


            } catch (error) {
                console.error('Error:', error);
            }
        });

       if( countPage === 1){
           if (homePage) homePage.classList.add("active");
           if (foodsPage) foodsPage.classList.remove("active");
           if (receiptsPage) receiptsPage.classList.remove("active");
       }else if(countPage === 2){
           if (homePage) homePage.classList.remove("active");
           if (foodsPage) foodsPage.classList.add("active");
           if (receiptsPage) receiptsPage.classList.remove("active");
       }else{
           if (homePage) homePage.classList.remove("active");
           if (foodsPage) foodsPage.classList.remove("active");
           if (receiptsPage) receiptsPage.classList.add("active");
       }



        if (homePage) {
            homePage.addEventListener("click", () => {
                window.location.href = "HomePage.html";
            });
        }

        if (foodsPage) {
            foodsPage.addEventListener("click", () => {
                window.location.href = "FoodsPage.html";
            });
        }

        if (receiptsPage) {
            receiptsPage.addEventListener("click", () => {
                window.location.href = "ReceiptPage.html";
            });
        }
        if (signOut) {
            signOut.addEventListener("click", () => {
                localStorage.setItem("Status", null);
                localStorage.setItem("userName", null);
                window.location.href = "../index.html";
            });
        }


        let check = true;
        if (btnListMenu) {
            let AllListMenu = document.getElementById("AllListMenu");
            if (AllListMenu) {
                btnListMenu.addEventListener("click", () => {

                    let MainHome = document.getElementById("MainHome");
                    if (check === true) {

                        btnListMenu.classList.add("activeMenuList");
                        AllListMenu.style.visibility = "visible";
                        AllListMenu.style.opacity = "1";
                        AllListMenu.style.transform = "translateX(0)";
                        MainHome.style.transition = "left 0.5s ease-in-out";
                        MainHome.style.width = "80%";
                        MainHome.style.left = "18%";


                    } else {
                        MainHome.style.width = "90%";
                        MainHome.style.left = "calc(100% - 95%)";
                        btnListMenu.classList.remove("activeMenuList");
                        AllListMenu.style.opacity = "0";

                        AllListMenu.style.opacity = "0";
                        AllListMenu.style.transform = "translateX(-100%)";
                        setTimeout(() => {
                            AllListMenu.style.visibility = "hidden";
                        }, 500);
                    }

                    check = !check; // Đảo giá trị check
                });
                let chatToggle = document.getElementById("chatToggle");
                let chatWindow = document.getElementById("chatWindow");
                let closeChat = document.getElementById("closeChat");
                let sendMessage = document.getElementById("sendMessage");
                let chatInput = document.getElementById("chatInput");
                let chatContent = document.getElementById("chatContent");
                let mes = document.getElementById("mes");

// Hiển thị tên người dùng
                mes.textContent = "Xin Chào: " + localStorage.getItem("userName");

// Mở/đóng chat
                chatToggle.addEventListener("click", function () {
                    chatWindow.classList.toggle("show");
                });
                closeChat.addEventListener("click", function () {
                    chatWindow.classList.remove("show");
                });

// Xử lý gửi tin nhắn với Gemini API
                let isSending = false;
                let lastRequestTime = 0;
                const GEMINI_API_KEY = "AIzaSyCdX_vTzwUVKTRB_IHCzRO0CbTTxQEZz40"; // Thay bằng API key thực của bạn

                sendMessage.addEventListener("click", async function () {
                    const now = Date.now();
                    const message = chatInput.value.trim();

                    // Kiểm tra chống spam
                    if (!message || isSending || (now - lastRequestTime < 2000)) return;

                    isSending = true;
                    lastRequestTime = now;

                    try {
                        // Hiển thị tin nhắn người dùng
                        const userMessage = document.createElement("p");
                        userMessage.innerHTML = `<strong>Bạn:</strong> ${message}`;
                        chatContent.appendChild(userMessage);
                        chatInput.value = "";

                        // Hiển thị trạng thái loading
                        const loadingMessage = document.createElement("p");
                        loadingMessage.innerHTML = `<strong>Nutrition AI:</strong> <em>Thinking...</em>`;
                        chatContent.appendChild(loadingMessage);
                        chatContent.scrollTop = chatContent.scrollHeight;

                        // Gọi Gemini API
                        const response = await fetch(
                            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
                            {
                                method: "POST",
                                headers: {"Content-Type": "application/json"},
                                body: JSON.stringify({
                                    contents: [{
                                        parts: [{
                                            text: `Bạn là trợ lý ảo tiếng Việt. Hãy trả lời ngắn gọn: ${message}`
                                        }]
                                    }],
                                    generationConfig: {
                                        temperature: 0.7,
                                        maxOutputTokens: 500
                                    }
                                })
                            }
                        );

                        const data = await response.json();
                        console.log("Gemini response:", data); // Debug

                        if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
                            loadingMessage.innerHTML = `<strong>Nutrition Ai</strong>:</strong> ${data.candidates[0].content.parts[0].text}`;
                        } else {
                            throw new Error("Không nhận được phản hồi hợp lệ");
                        }
                    } catch (error) {
                        console.error("Lỗi Gemini:", error);
                        const errorMessage = document.createElement("p");
                        errorMessage.innerHTML = `<strong>Gemini:</strong> Lỗi: ${error.message || "Vui lòng thử lại sau"}`;
                        chatContent.appendChild(errorMessage);
                    } finally {
                        chatContent.scrollTop = chatContent.scrollHeight;
                        isSending = false;
                    }
                });

// Cho phép gửi bằng phím Enter
                chatInput.addEventListener("keypress", function (e) {
                    if (e.key === "Enter") {
                        sendMessage.click();
                    }
                });
            }

        }


    });


function createImageUploadPopup() {
    return new Promise((resolve, reject) => {
        const popupContainer = document.createElement('div');
        popupContainer.className = 'image-upload-popup';
        popupContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 999999;
        `;

        const popupContent = document.createElement('div');
        popupContent.className = 'popup-content';
        popupContent.style.cssText = `
            background-color: white;
            padding: 20px;
            border-radius: 5px;
            width: 90%;
            max-width: 500px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        `;

        const title = document.createElement('h2');
        title.textContent = 'Upload image using link for avatar';
        title.style.margin = '0 0 15px 0';
        title.style.color = '#333';

        const urlInput = document.createElement('input');
        urlInput.type = 'url';
        urlInput.placeholder = 'Enter image URL';
        urlInput.style.cssText = `
            width: 100%;
            padding: 10px;
            margin-bottom: 15px;
            border: 1px solid #ddd;
            border-radius: 4px;
            box-sizing: border-box;
        `;

        const imagePreview = document.createElement('div');
        imagePreview.style.cssText = `
            margin: 15px 0;
            text-align: center;
            min-height: 100px;
            display: none;
        `;

        const previewImage = document.createElement('img');
        previewImage.style.maxWidth = '100%';
        previewImage.style.maxHeight = '200px';
        previewImage.style.border = '1px solid #eee';
        imagePreview.appendChild(previewImage);

        const buttonContainer = document.createElement('div');
        buttonContainer.style.display = 'flex';
        buttonContainer.style.justifyContent = 'space-between';
        buttonContainer.style.marginTop = '20px';

        const previewButton = document.createElement('button');
        previewButton.textContent = 'Preview Image';
        previewButton.style.cssText = `
            padding: 8px 15px;
            background-color: #2BA0CC;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        `;

        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'Cancel';
        cancelButton.style.cssText = `
            padding: 8px 15px;
            background-color: #f1f1f1;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            margin-right: 10px;
        `;

        const uploadButton = document.createElement('button');
        uploadButton.textContent = 'Upload';
        uploadButton.style.cssText = `
            padding: 8px 15px;
            background-color: #1AB394;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        `;

        // Preview button click handler
        previewButton.onclick = () => {
            const url = urlInput.value.trim();
            if (url) {
                previewImage.src = url;
                previewImage.onload = () => {
                    imagePreview.style.display = 'block';
                    urlInput.style.border = '1px solid #ddd';
                    urlInput.style.color = 'inherit';
                };
                previewImage.onerror = () => {
                    imagePreview.style.display = 'none';
                    urlInput.style.border = '2px solid red';
                    urlInput.style.color = 'red';
                };
            } else {
                urlInput.style.border = '2px solid red';
                urlInput.style.color = 'red';
            }
        };

        // Cancel button click handler
        cancelButton.onclick = () => {
            document.body.removeChild(popupContainer);
            reject(new Error('User cancelled the upload'));
        };

        // Upload button click handler
        uploadButton.onclick = () => {
            const url = urlInput.value.trim();
            if (url && imagePreview.style.display !== 'none') {
                document.body.removeChild(popupContainer);
                resolve(url);
            } else {
                previewButton.style.border = '2px solid red';
            }
        };

        // Assemble the popup
        buttonContainer.appendChild(cancelButton);
        buttonContainer.appendChild(uploadButton);

        popupContent.appendChild(title);
        popupContent.appendChild(urlInput);
        popupContent.appendChild(previewButton);
        popupContent.appendChild(imagePreview);
        popupContent.appendChild(buttonContainer);

        popupContainer.appendChild(popupContent);
        document.body.appendChild(popupContainer);

        urlInput.focus();
    });


// Usage example:
async function useImageUpload() {
    try {
        const imageUrl = await createImageUploadPopup();
        console.log('Selected image URL:', imageUrl);
        document.getElementById('imgAv').src = imageUrl;
    } catch (error) {
        console.log('Image upload cancelled or failed:', error.message);
    }
}}