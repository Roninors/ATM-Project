let submitEl = document.getElementById("submitButton");
let cancelBtn = document.getElementById("cancelBtn");
let clearBtn = document.getElementById("clearBtn");
let wdrawInp = document.getElementById("inp1");
let withdrawAmount;
submitEl.addEventListener("click", () => {
  if (wdrawInp.value == "") {
    alert("Enter Withdraw Amount");
    return;
  } else {
    if (Math.sign(wdrawInp.value) === -1) {
      alert("Do not put invalid values");
      return;
    }
    wdrawFunc1()
    //openPopup();
  }
});

let wdrawFunc1 = () => {
  fetch("http://localhost:3000/loggedin")
    .then((res) => res.json())
    .then((json) => {
       withdrawAmount = document.getElementById("inp1").value;
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
      postRecords()
    })
    .catch(function () {
      console.log("error");
    });
};

let postRecords =  ()=>{
  fetch("http://localhost:3000/loggedin")
  .then((res) => res.json())
  .then((json) => {
    var recordObj = {
      record_type: "Withdraw",
      record_date:`${new Date().getMonth()+1} / ${new Date().getDate()}/ ${new Date().getFullYear()}`,
      record_time : `${new Date().getHours()} : ${new Date().getMinutes()} : ${new Date().getSeconds()}`,
      record_amount: withdrawAmount,
      record_balance: json[0].Balance,
      recordId: json[0].id
    };
    let url = `http://localhost:3000/records`;
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recordObj),
    });
    
  })
  .catch(function () {
    console.log("error");
  });
}




cancelBtn.addEventListener("click", () => {
  window.location.href = "mainmenu.html";
});

clearBtn.addEventListener("click", () => {
  wdrawInp.value = "";
});
/*
function openPopup() {
  popup.classList.add("open-popup");
}

function closePopup() {
  popup.classList.remove("open-popup");
}
*/