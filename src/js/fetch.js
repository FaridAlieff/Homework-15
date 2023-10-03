let btn = document.getElementById("btn");

btn.addEventListener("click", function () {
  fetch("https://randomuser.me/api/?results=15")
    .then((response) => response.json())
    .then((data) => {
      let users = data.results;
      let output = "";
      for (let user of users) {
        output += `
          <div class="card">
            <img src="${user.picture.large}" alt="">
            <h3>${user.name.title} ${user.name.first} ${user.name.last}</h3>
            <p>${user.email}</p>
            <p>${user.location.city}</p>
          </div>
        `;
      }
      document.getElementById("output").innerHTML = output;
    });
});
