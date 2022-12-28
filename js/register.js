const regiForm = document.querySelector(".regForm");

regiForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (username.value == "") {
    alert("please input username");
  } else if (password.value == "") {
    alert("please input password");
  } else if (accountNum.value == "") {
    alert("please input account number");
  } else if (balance.value == "") {
    alert(" deposit a money first");
  } else {
    const form_data = new FormData(regiForm);
    let data = Object.fromEntries(form_data);
    fetch("http://localhost:3000/members", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  }
});
