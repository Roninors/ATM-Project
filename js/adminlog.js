let submitBtn = document.getElementById("submitBtn");

let adminFunc = () => {
  fetch(" http://localhost:3000/admin/1")
    .then((res) => res.json())

    .then((json) => {
      let user = document.getElementById("username").value;
      let pass = document.getElementById("password").value;

      let parseduser = JSON.parse(`{"username":"${user}" }`);
      let parsedpass = JSON.parse(`{"password":"${pass}" }`);
      if (parseduser.username == json.username) {
        if (parsedpass.password == json.password) {
          location.href = "adminpanel.html";
        } else {
          alert("Password Invalid");
        }
      } else {
        alert("Username Invalid");
      }
    });
};
