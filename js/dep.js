let cancelBtn = document.getElementById("cancelBtn");
let clearBtn = document.getElementById("clearBtn");
let depInp = document.getElementById("inp1");
let depFunc = () => {
  if (depInp.value == "") {
    alert("Please enter amount");
    return;
  }
  fetch("http://localhost:3000/loggedin")
    .then((res) => res.json())
    .then((json) => {
      let depAmount = document.getElementById("inp1").value;
      let depBal = +depAmount + +json[0].Balance;
      var obj = {
        Balance: `${depBal}`,
      };
      let url = `http://localhost:3000/loggedin/${json[0].id}`;

      fetch(url, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(obj),
      });

      updateAdmin1();
    })
    .catch(function () {
      console.log("error");
    });
};

let updateAdmin1 = () => {
  fetch("http://localhost:3000/loggedin")
    .then((res) => res.json())
    .then((json) => {
      var obj2 = {
        Balance: `${json[0].Balance}`,
      };
      let url = `http://localhost:3000/members/${json[0].id}`;

      fetch(url, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(obj2),
      });
    })
    .catch(function () {
      console.log("error");
    });
};

cancelBtn.addEventListener("click", () => {
  window.location.href = "menu.html";
});

clearBtn.addEventListener("click", () => {
  depInp.value = "";
});
