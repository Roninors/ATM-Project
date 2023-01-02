let redirect = async () => {
    const res = await fetch("http://localhost:3000/loggedin");
    const data = await res.json();
  
    if (data == "") {
      window.location.href = "/html/atm.html";
    }
  };
  document.addEventListener("DOMContentLoaded", redirect());