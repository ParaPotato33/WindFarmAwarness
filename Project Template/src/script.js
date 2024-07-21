async function login() {
    var form = document.getElementById("form");
    var users = await fetch("/src/users.json")
    .then(response => response.json())
    .then(data => data.users);
    var loggedIn = false;
    for (var i = 0; i < users.length; i++) {
        if (form.username.value == users[i].username && form.password.value == users[i].password) {
            alert("You have successfully logged in.");
            window.location.href = ("/src/myNews.html?username=" + form.username.value);
            loggedIn = true;
        } else {
        }
    }
    if (!loggedIn) {
        alert("Invalid username or password.");
    }
    form.username.value = "";
    form.password.value = "";
}

async function signup() {
    var form = document.getElementById("form");
    var users = await fetch("/src/users.json")
    .then(response => response.json())
    .then(data => data.users);

    var newUser = '{"username":"' + form.username.value + '","password":"' + form.password.value + '","filters":[]}';
    console.log(newUser);
    users.push(JSON.parse(newUser));
    users = "{\"users\": " + JSON.stringify(users) + "}";

    await fetch("/src/users.json", {
        method: "PUT",
        headers: {"Content-type": "application/json;"},
        body: users,
    });

    console.log(users);
}

function userChecker() {
    var url = new URL(window.location.href);
    var username = url.searchParams.get("username");
    console.log(username);
    if (username == null) {
        alert("You must log in to view this page.");
        window.location.href = ("/src/login.html");
    }
    document.getElementById("welcome").innerHTML = "Welcome " + username + "!";
    var user = document.getElementById("user");
}

async function configure() {
    var configure = document.getElementById("configure");
    var form = document.createElement("form");
    var filters = new Array();
    var news = await fetch("/src/database.json")
    .then(response => response.json())
    .then(data => data.news);

    for (var i = 0; i < news.length; i++) {
        for (var j = 0; j < news[i].catagories.length; j++) {
            if (!filters.includes(news[i].catagories[j])) {
                filters.push(news[i].catagories[j]);
            }
        }
        
    }
    for (var i = 0; i < filters.length; i++) {
        var label = document.createElement("label");
        label.innerHTML = filters[i];
        var input = document.createElement("input");
        input.type = "checkbox";
        input.name = filters[i];
        input.value = filters[i];
        form.appendChild(label);
        form.appendChild(input);
    }

    var newLine = document.createElement("br");
    form.appendChild(newLine);

    var submit = document.createElement("input");
    submit.type = "button";
    submit.value = "Submit";
    submit.onclick = async function() {
        var checked = new Array();
        for (var i = 0; i < form.length; i++) {
            if (form[i].checked) {
                checked.push(form[i].value);
            }
        }
        var users = await fetch("/src/users.json")
        .then(response => response.json())
        .then(data => data.users);
        
        var url = new URL(window.location.href);

        for (var i = 0; i < users.length; i++) {
            if (users[i].username == url.searchParams.get("username")) {
                var user = users[i];
            }
        }

        user.filters = checked;

        for (var i = 0; i < users.length; i++) {
            if (users[i].username == url.searchParams.get("username")) {
                users[i] = user;
            }
        }

        users = "{\"users\": " + JSON.stringify(users) + "}";
        //const jsonString = JSON.stringify(users);
	    await fetch("/src/users.json", {
		    method: "PUT",
            headers: {"Content-type": "application/json;"},
		    body: users,
		    
	    })
    }
    form.appendChild(submit);

    configure.appendChild(form);
}