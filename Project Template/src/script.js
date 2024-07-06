async function test(){
    console.log('hello');
    await fetch('src/database.json')
    .then(response => response.json())
    .then(data => console.log(data));
}

function MapLink(){
    var survey = document.getElementById('survey').options[document.getElementById('survey').selectedIndex].text;
    survey = survey.replace(/ /g, '%20');
    console.log(survey);
    window.open('https://www.marinedataexchange.co.uk/search?site%2Fsector=Wind&searchQuery=' + survey);
}