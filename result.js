window.addEventListener(
    "message",
    (event) => {
        const data = JSON.parse(event.data);
        const resultBody = document.getElementById('resultBody');
        resultBody.innerHTML = '';
        data.data.forEach((value, index) => {
            if (data.result == true) {
                resultBody.innerHTML += "<tr><th scope='row'>№" + (index + 1) + "</th><td>" + value.team + "<td>" + value.bad + "</td><td>" + value.good + "</td><td>" + value.power + "</td></tr>";
            } else {
                resultBody.innerHTML += "<tr><th scope='row'></th><td>" + value.team + "<td>" + value.bad + "</td><td>" + value.good + "</td><td>" + value.power + "</td></tr>";
            }
        });
    },
    false,
  );