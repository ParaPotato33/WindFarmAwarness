async function test(){
    console.log('hello');
    await fetch('src/database.json')
    .then(response => response.json())
    .then(data => console.log(data));
}

function MapLink(){
    window.location.href = 'https://www.marinedataexchange.co.uk/search';
}