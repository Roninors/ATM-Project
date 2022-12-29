let redirect = async () => {
  const res = await fetch("http://localhost:3000/loggedin");
  const data = await res.json();

  if (data == "") {
    window.location.href = "/html/atm.html";
  }
};
document.addEventListener("DOMContentLoaded", redirect());

let cancelBtn = document.getElementById("cancelBtn");
let clearBtn = document.getElementById("clearBtn");
let wdrawInp = document.getElementById("inp1");
let wdrawFunc1 = () => {
  if (wdrawInp.value == "") {
    alert("Enter Withdraw Amount");
    return;
  }
  fetch("http://localhost:3000/loggedin")
    .then((res) => res.json())
    .then((json) => {
      let withdrawAmount = document.getElementById("inp1").value;
      let zeroBal = JSON.parse('{ "Balance": "0" }');
      if (json[0].Balance == zeroBal.Balance) {
        alert("Insufficient Funds");
        return;
      } else {
        var newBal = json[0].Balance - withdrawAmount;
        if (Math.sign(newBal) === -1) {
          alert("Insufficient Funds");
          return;
        }
        var obj = {
          Balance: `${newBal}`,
        };
        let url = `http://localhost:3000/loggedin/${json[0].id}`;

        fetch(url, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(obj),
        });

        updateAdmin1();
      }
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
  window.location.href = "mainmenu.html";
});

clearBtn.addEventListener("click", () => {
  wdrawInp.value = "";
});
