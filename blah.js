function fetchData() {
    fetch('https://api.spacexdata.com/v3')
        .then(res => res.json())
        .then(json => console.log(json));

}

fetchData();