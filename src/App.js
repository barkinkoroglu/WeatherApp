import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import {
  BsCloudHaze2Fill,
  BsCloudDrizzleFill,
  BsEye,
  BsWater,
  BsThermometer,
  BsWind,
} from "react-icons/bs";
import {
  IoMdSunny,
  IoMdRainy,
  IoMdCloudy,
  IoMdSnow,
  IoMdThunderstorm,
  IoMdSearch,
} from "react-icons/io";
export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const date = new Date();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(city);
    fetchData();
    console.log(weather);
    setCity("");
  };

  const fetchData = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4981c9be1127918d64ad5187a602348e&units=metric`
    )
      .then((res) => res.json())
      .then((data) => setWeather(data))
      .catch((error) => console.log(error.message));
  };

  let icon;

  switch (weather?.weather[0].main) {
    case "Clouds":
      icon = <IoMdCloudy />;
      break;
    case "Haze":
      icon = <BsCloudHaze2Fill />;
      break;
    case "Rain":
      icon = <IoMdRainy className="text-[#31cafb]" />;
      break;
    case "Clear":
      icon = <IoMdSunny className="text-[#ffde33]" />;
      break;
    case "Drizzle":
      icon = <BsCloudDrizzleFill className="text-[#31cafb]" />;
      break;
    case "Snow":
      icon = <IoMdSnow className="text-[#31cafb]" />;
      break;
    case "Thunderstorm":
      icon = <IoMdThunderstorm />;
      break;
  }
  return (
    <div className="h-screen text-white ">
      <img
        src="https://images.pexels.com/photos/220201/pexels-photo-220201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="background"
        className="absolute top-0 left-0 right-0 bottom-0 -z-10 w-full h-screen "
      />
      <div className="text-white absolute top-0 left-0 right-0 bottom-0 bg-slate-800 opacity-80 "></div>

      <div className="max-w-sm mx-auto flex flex-col h-[calc(100vh-64px)]  items-center justify-center gap-y-5   ">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex w-full text-black relative "
        >
          <input
            type="text"
            className="w-full bg-slate-100 opacity-80 rounded-lg outline-none p-2  "
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <div className="absolute right-0 top-0 bg-slate-400 rounded-lg px-1 py-1 hover:bg-slate-500">
            {" "}
            <button className=" " type="submit">
              {" "}
              <FiSearch color="black" fontSize={25} />
            </button>
          </div>
        </form>

        {weather && (
          <div className="flex flex-col w-full px-5 py-5 bg-slate-700 opacity-80 rounded-lg shadow-lg">
            <div className="flex items-center gap-x-3">
              <div className="text-[90px]">{icon}</div>
              <div className="flex flex-col -mt-4 text-lg">
                <h1 className="text-lg font-bold">{weather.name}</h1>
                <h2 className="text-sm">
                  {date.getUTCDate()}/{date.getUTCMonth() + 1}/
                  {date.getUTCFullYear()}
                </h2>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center ">
              <div className="flex  items-center ">
                <h2 className="text-8xl font-bold mb-2 ">
                  {parseInt(weather.main.temp)}
                </h2>
                <span className="text-lg">°C</span>
              </div>
              <h3>{weather.weather[0].main}</h3>
            </div>
            <div className="flex flex-col gap-y-2">
              <div className="flex justify-between mt-6">
                <div className="flex items-center gap-x-1">
                  <BsWater />
                  <h1>Humidity</h1>
                  {weather.main.humidity}%
                </div>
                <div className="flex items-center gap-x-1">
                  <BsThermometer />
                  <h1>Feels like</h1> {parseInt(weather.main.feels_like)}
                  <span> °C </span>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center gap-x-1">
                  <BsEye />
                  <h1>Visibility</h1>
                  {weather.visibility / 1000}km
                </div>
                <div className="flex items-center gap-x-1 ">
                  <BsWind />
                  <h1>Wind</h1>
                  {weather.wind.speed} m/s
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
