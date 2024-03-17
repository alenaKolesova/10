let loadButton = document.getElementById('loadButton')
loadButton.onclick = () => {

    async function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        console.log('Широта:' + latitude);
        console.log('Долгота:' + longitude);

        let res = await fetch(`/apiWeather?lat=${latitude}&lon=${longitude}`)
        let resJson = await res.json()

        let nameElement = document.getElementById('name')
        nameElement.innerText = "Погода в городе " + resJson.city

        let tempElement = document.getElementById('temp')
        tempElement.innerText = resJson.temp + '°'

        let descriptionElement = document.getElementById('description')
        descriptionElement.innerText = resJson.description

        iconId = resJson.icon
        let img = document.createElement("img");
        img.src = `https://openweathermap.org/img/wn/${iconId}@2x.png`;
        iconElement = document.getElementById('icon');
        icon.appendChild(img);

        let dateElement = document.getElementById('date')
        let months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
        let currentDate = new Date();
        dateElement.innerHTML = months[currentDate.getMonth()] + " " + currentDate.getDate() + ", " + currentDate.getFullYear()

        console.log(resJson);

        loadButton.classList.toggle('display-none')
    }

    function error() {
        status.textContent = "Невозможно получить ваше местоположение";
    }

    if (!navigator.geolocation) {
        status.textContent = "Geolocation не поддерживается вашим браузером";
    } else {
        status.textContent = "Определение местоположения…";
        navigator.geolocation.getCurrentPosition(success, error);
    }

}


