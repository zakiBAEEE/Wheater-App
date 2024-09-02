document.addEventListener("DOMContentLoaded", () => {

    apiKey = "fe1918566a4c97e174954004f33f7edc";
    apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
    var tombolInput = document.getElementById("tombol");

    document.getElementById('kontenUtama').style.display = 'none';
    document.getElementById('loading').style.display = 'block';


    navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        try {
            var kota = await cekKota(lat, lon);
            cekCuaca(kota);
        } catch (error) {
            console.log(error);
            alert('Anda HARUS MENGIZINKAN APLIKASI MENGAKSES LOKASI ANDA, TIDAK BOLEH TIDAK YA!!');
        }
        finally {
            document.getElementById('kontenUtama').style.display = 'block';
            document.getElementById('loading').style.display = 'none';
        }

    });


    function apakahSiang(now, sunrise, sunset) {
        return now >= sunrise && now <= sunset
    }

    tombolInput.addEventListener("click", () => {
        var input = document.getElementById("inputKota");
        cekCuaca(input.value);
        input.value = "";
    });

    async function cekCuaca(kota) {

        const now = new Date(); // Mendapatkan waktu saat ini
        const nowUnix = Math.floor(now.getTime() / 1000); // Mengonversi waktu saat ini ke timestamp Unix dalam UTC

        const response = await fetch(apiUrl + `${kota}&appid=${apiKey}`);
        var data = await response.json();

        const sunrise = data.sys.sunrise;
        const sunset = data.sys.sunset;
        const dayTime = apakahSiang(nowUnix, sunrise, sunset);

        var wind = document.getElementById('wind');
        wind.innerHTML = ` <img src="${wind.getAttribute('data-image-url')}" alt
                        class="sm:w-14 w-12">
                    <div
                        class="flex flex-col items-center justify-around gap-y-1">
                        <h3
                            class="text-white text-xl font-bold sm:text-2xl sm:font-semibold"
                            id="kecepatanAngin">${data.wind.speed}
                            km/h</h3>
                        <h4 class="text-white text-lg">Wind Speed</h4>
                    </div>`

        var humidity = document.getElementById('humidity');
        humidity.innerHTML = ` <img src="${humidity.getAttribute('data-image-url')}" alt
                        class="sm:w-14 w-12">
                    <div
                        class="flex flex-col items-center justify-around gap-y-1">
                        <h3
                            class="text-white text-xl font-bold sm:text-2xl sm:font-semibold"
                            id="kelembapan">${data.main.humidity}%</h3>
                        <h4 class="text-white text-lg">Humidity</h4>
                    </div>`

        var kota = document.getElementById('kota');
        kota.innerHTML = ` <h1
                    class="text-3xl sm:text-4xl font-bold font-poppins text-white "
                    id="suhu">${Math.floor(data.main.temp)}&#176</h1>
                <h2
                    class="text-3xl sm:text-4xl font-bold text-white font-poppins"
                    id="namaKota">${data.name}</h2>`

        var gambarCuaca = document.getElementById("gambarCuaca");

        if (data.weather[0].main == "Clouds") {
            if (dayTime) {
                document.getElementById("ilustrasiCuaca").innerHTML = ` <script
                    src="{static "base_page/js/animasi.mjs"}"
                    type="module"></script>

                <dotlottie-player
                    src="https://lottie.host/03c2b843-a343-4132-b802-651afab13aee/7zIeSN7EUm.json"
                    background="transparent" speed="1"
                    style="width: 250px; height: 250px;" loop
                    autoplay></dotlottie-player>`;
            } else {
                document.getElementById("ilustrasiCuaca").innerHTML = `<script src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs" type="module"></script> 

                <dotlottie-player src="https://lottie.host/6a96aabb-3e22-44d4-b730-2bf5bbc4fb3f/5R4x9B91bK.json" background="transparent" speed="1" style="width: 250px; height: 250px;" loop autoplay></dotlottie-player>`
            }
        } else if (data.weather[0].main == "Rain") {
            if (dayTime) {
                document.getElementById(
                    "ilustrasiCuaca"
                ).innerHTML = `<script src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs" type="module"></script> 

                <dotlottie-player src="https://lottie.host/4c1894a9-620c-458b-9b3d-059165c849ac/Nk4s8W64R0.json" background="transparent" speed="1" style="width: 250px; height: 250px;" loop autoplay></dotlottie-player>`;
            } else {
                document.getElementById("ilustrasiCuaca").innerHTML = `<script src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs" type="module"></script> 

                <dotlottie-player src="https://lottie.host/0579f369-a8c1-4749-b4b0-17497f8d351c/RH7YnNV47p.json" background="transparent" speed="1" style="width: 250px; height: 250px;" loop autoplay></dotlottie-player>`
            }

        } else if (data.weather[0].main == "Clear") {
            if (dayTime) {
                document.getElementById(
                    "ilustrasiCuaca"
                ).innerHTML = `<script src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs" type="module"></script> 

                <dotlottie-player src="https://lottie.host/86b5c7dc-8ba2-45e2-bb48-0e877e8f40b8/75nki6OtiR.json" background="transparent" speed="1" style="width: 250px; height: 250px;" loop autoplay></dotlottie-player>`;
            } else {
                document.getElementById("ilustrasiCuaca").innerHTML = `<script src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs" type="module"></script> 

                <dotlottie-player src="https://lottie.host/7e56d434-700c-4608-9294-1793fa09e499/MTahZWocmZ.json" background="transparent" speed="1" style="width: 250px; height: 250px;" loop autoplay></dotlottie-player>`

            }
        } else if (data.weather[0].main == "Drizzle") {
            if (dayTime) {
                document.getElementById(
                    "ilustrasiCuaca"
                ).innerHTML = `<script src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs" type="module"></script> 

                <dotlottie-player src="" background="transparent" speed="1" style="width: 250px; height: 250px;" loop autoplay></dotlottie-player>`;
            }
            else {
                document.getElementById(
                    "ilustrasiCuaca"
                ).innerHTML = `<script src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs" type="module"></script> 

                <dotlottie-player src="https://lottie.host/a1c51449-fc2b-4e49-ab31-043b67fcb97b/piJfugHYJM.json" background="transparent" speed="1" style="width: 300px; height: 300px;" loop autoplay></dotlottie-player>`
            }

        } else if (data.weather[0].main == "Mist") {
            if (dayTime) {
                document.getElementById(
                    "ilustrasiCuaca"
                ).innerHTML = `<script src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs" type="module"></script> 

                <dotlottie-player src="https://lottie.host/0f3fb540-a8d1-40aa-8be1-a84827e3a9b6/dtAhOq86Wa.json" background="transparent" speed="1" style="width: 250px; height: 250px;" loop autoplay></dotlottie-player>`;
            }
            else {
                document.getElementById(
                    "ilustrasiCuaca"
                ).innerHTML = `<script src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs" type="module"></script> 

                <dotlottie-player src="https://lottie.host/7aff8a92-08f3-4902-be11-d9c252ba3927/INl9zAlJVh.json" background="transparent" speed="1" style="width: 300px; height: 300px;" loop autoplay></dotlottie-player>`
            }
        }
    }

    async function cekKota(lat, lon) {

        var apiURL = 'http://api.openweathermap.org/geo/1.0/reverse?'

        const response = await fetch(apiURL + `lat=${lat}&lon=${lon}&appid=${apiKey}`);
        var data = await response.json();

        var kota = data[0].name;
        return kota;


    }
});