import { useEffect, useState } from "react";

const Left = () => {
  const [cities, setCities] = useState([]);
  const [searched, setSearched] = useState([]);
  const [tempreture, setTemp] = useState("");
  const [citySelector, setCitySelector] = useState("Ulaanbaatar");

  async function getData() {
    const result = await fetch("https://countriesnow.space/api/v0.1/countries");
    const data = await result.json();
    let incomeCities = data.data.map((country) => {
      return country.cities;
    });
    incomeCities = incomeCities.flat();
    setCities(incomeCities);
  }

  const selectCity = (city) => {
    setSearched([]);
    setCitySelector(city);
    getWeather(city);
  };

  const searchHandler = (e) => {
    const search = e.target.value;
    const filtered = cities.filter((city) => {
      return city.includes(search);
    });
    setSearched(filtered);
  };
  async function getWeather(city) {
    const result = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=2e39ce842b0a4f8c87621141250801&q=${city}`
    );
    const weather = await result.json();
    let report = weather.forecast.forecastday[0].day.maxtemp_c;
    return setTemp(report);
  }

  useEffect(() => {
    getData();
    getWeather("Ulaanbaatar");
  }, []);

  return (
    <div className="flex justify-center items-center bg-[#f3f4f6] w-[1000px] h-[1200px]">
      <div className="flex flex-col items-start left-5 top-5 absolute p-10">
        <input
          type="text"
          className="border-2 border-black"
          onChange={searchHandler}
        />
        {searched.length > 0 &&
          searched.slice(0, 5).map((city, index) => (
            <p
              key={index}
              className="hover:cursor-pointer "
              onClick={() => selectCity(city)}
            >
              {city}
            </p>
          ))}
      </div>
      <div className="flex bg-[rgb(255,255,255,0.75)] w-[414px] h-[828px]">
        <div className="flex flex-col gap-3">
          <p className="text-[#9ca3af] text-[14px] ">january 10th, 2025</p>
          <p className="text-[#111827] text-[48px] ">{citySelector}</p>
          <img
            className="w-[260px] h-[260px] overflow-hidden"
            src="https://s3-alpha-sig.figma.com/img/3c6b/babb/0657324bf17d1bd5169b60a7fbcb80b1?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Pra0N4Cxxv-ewi0qhKIEJwVG-qSQezH7Q6S1fZm9xI5CbB4rFJvfCDeC0E8xxsaek9gkYMBfhocmMCEiHaXpnXaoMAmib~KnIUzRk97v1ljdZrQDtNb-10iL18XqBFdH-S0nPWiBZ4MRUVItu4ZDz7HLXsHPdNFM4YniGfm5wMKFIzIUxNEluKrLxvjqzRPaU1G2K1lgL~yYnISdOqpxgPTqMa31xhRyyuQlEJLrl1CYAcr4z0PjoeujFyuAM5LF3YsBVVMwoTNQmzqmttZsjNH3pNXDsRbuwxG9ThwApw1TvsuCs8oDJ2n0DwihR6EOmMBw6jpJgXxmKfM1lxmWsw__"
            alt=""
          />
          <p className="text-[124px] ">{tempreture}</p>
          <p className="text-[#ff8e27] text-[20px] ">sunny</p>
        </div>
      </div>
    </div>
  );
};

export default Left;
