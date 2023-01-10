let redirect = async () => {
    const res = await fetch("http://localhost:3000/adminLogin");
    const data = await res.json();
  
    if (data == "") {
      window.location.href = "../html/adminlog.html";
    }
  };
  document.addEventListener("DOMContentLoaded", redirect());