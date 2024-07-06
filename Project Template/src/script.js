//A function to open the respective page for survey data depending on the option selected in the dropdown menu
function MapLink(){
    //Get the selected option from the dropdown menu
    var survey = document.getElementById('survey').options[document.getElementById('survey').selectedIndex].text;
    //Replace spaces with %20
    survey = survey.replace(/ /g, '%20');
    //Open the respective page for the survey data
    window.open('https://www.marinedataexchange.co.uk/search?site%2Fsector=Wind&searchQuery=' + survey);
}

//A function to map the image of the survey data depending on the option selected in the dropdown menu
function mapImage() {
    //Get the selected option from the dropdown menu
    var image = document.getElementById('survey').options[document.getElementById('survey').selectedIndex].text;
    //Replace spaces with nothing
    image = image.replace(/ /g, '');
    //Get the image element by its id
    var img = document.getElementById('Map');
    //Set the source of the image to the respective image
    img.src = 'Assets/' + image + '.png';
}

//A function to clear the survey data from the table
function clearTable() {
    document.getElementById('form').reset();
}