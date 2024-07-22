//create function for logging in
async function login() {
    //get the form
    var form = document.getElementById("form");
    //get the users from the json file
    var users = await fetch("/src/users.json")
    .then(response => response.json())
    .then(data => data.users);
    var loggedIn = false;
    //loop through the users
    for (var i = 0; i < users.length; i++) {
        //if the username and password match
        if (form.username.value == users[i].username && form.password.value == users[i].password) {
            //log the user in
            alert("You have successfully logged in.");
            window.location.href = ("/src/myNews.html?username=" + form.username.value);
            loggedIn = true;
        }
    }
    //if the user is not logged in
    if (!loggedIn) {
        alert("Invalid username or password.");
    }
    //clear the form
    form.username.value = "";
    form.password.value = "";
}

//create function for signing up
async function signup() {
    //get the form
    var form = document.getElementById("form");
    //get the users from the json file
    var users = await fetch("/src/users.json")
    .then(response => response.json())
    .then(data => data.users);
    //create a new user
    var newUser = '{"username":"' + form.username.value + '","password":"' + form.password.value + '","filters":[]}';
    //add the new user to the users
    users.push(JSON.parse(newUser));
    //stringify the users
    users = "{\"users\": " + JSON.stringify(users) + "}";
    //put the users back into the json file
    await fetch("/src/users.json", {
        method: "PUT",
        headers: {"Content-type": "application/json;"},
        body: users,
    });
}

//create a function for checking if the user is logged in
function userChecker() {
    //get the url
    var url = new URL(window.location.href);
    //get the username from the url
    var username = url.searchParams.get("username");
    //if the user is not logged in
    if (username == null) {
        //take them to the login page
        alert("You must log in to view this page.");
        window.location.href = ("/src/login.html");
    }
    //if the user is logged in, welcome them
    document.getElementById("welcome").innerHTML = "Welcome " + username + "!";
}

//create a function for filtering results
async function configure() {
    //get the configure div
    var configure = document.getElementById("configure");
    //create a form
    var form = document.createElement("form");
    //create an array of filters
    var filters = new Array();
    //get the latest news
    var news = await fetch("/src/database.json")
    .then(response => response.json())
    .then(data => data.news);

    //loop through the news and filters
    for (var i = 0; i < news.length; i++) {
        for (var j = 0; j < news[i].catagories.length; j++) {
            //if the filter is not already in the array
            if (!filters.includes(news[i].catagories[j])) {
                //add the filter to the array
                filters.push(news[i].catagories[j]);
            }
        }
        
    }
    //loop through the filters
    for (var i = 0; i < filters.length; i++) {
        //create a checkbox for each filter
        var label = document.createElement("label");
        label.innerHTML = filters[i];
        var input = document.createElement("input");
        input.type = "checkbox";
        input.name = filters[i];
        input.value = filters[i];
        form.appendChild(label);
        form.appendChild(input);
    }
    //create a new line
    var newLine = document.createElement("br");
    form.appendChild(newLine);
    //create a submit button
    var submit = document.createElement("input");
    submit.type = "button";
    submit.value = "Submit";
    //create an onclick function for the submit button
    submit.onclick = async function() {
        //create an array of checked filters
        var checked = new Array();
        //loop through the form
        for (var i = 0; i < form.length; i++) {
            //if the filter is checked
            if (form[i].checked) {
                //add the filter to the array
                checked.push(form[i].value);
            }
        }
        //get the users
        var users = await fetch("/src/users.json")
        .then(response => response.json())
        .then(data => data.users);
        //get the url
        var url = new URL(window.location.href);
        //get the user from the url
        for (var i = 0; i < users.length; i++) {
            if (users[i].username == url.searchParams.get("username")) {
                var user = users[i];
            }
        }
        //set the users filters
        user.filters = checked;
        //put the user back into the users
        for (var i = 0; i < users.length; i++) {
            if (users[i].username == url.searchParams.get("username")) {
                users[i] = user;
            }
        }
        //stringify the users
        users = "{\"users\": " + JSON.stringify(users) + "}";
        //put the users back into the json file
	    await fetch("/src/users.json", {
		    method: "PUT",
            headers: {"Content-type": "application/json;"},
		    body: users,
		    
	    })
    }
    //add the form to the configure
    form.appendChild(submit);
    
    configure.appendChild(form);
}