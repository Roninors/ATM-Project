let logoutBtn = document.querySelector(".logout-logo");

logoutBtn.addEventListener("click", async () => {
  const res = await fetch("http://localhost:3000/loggedin");
  const data = await res.json();

  await fetch(`http://localhost:3000/loggedin/${data[0].id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
  });

  window.location.href = "/html/atm.html";
});
