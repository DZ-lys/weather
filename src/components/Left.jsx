import { useState } from "react";

const Left = () => {
  const [cities, setCities] = useState([]);
  const [searched, setSearched] = useState([]);
  const [tempreture, setTemp] = useState("");

  async function getData() {
    const result = await fetch("https://countriesnow.space/api/v0.1/countries");
    const data = await result.json();
    let incomeCities = data.data.map((country) => {
      return country.cities;
    });
    incomeCities = incomeCities.flat();
    setCities(incomeCities);
  }
  // getData();

  const searchHandler = (e) => {
    const search = e.target.value;
    const filtered = cities.filter((city) => {
      return city.includes(search);
    });
    setSearched(filtered);
  };
  getWeather();

  async function getWeather() {
    const result = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=2e39ce842b0a4f8c87621141250801 &q={tokyo}`
    );
    const weather = await result.json();
    let report = weather.maxtemp_c;

    return setTemp(report);
  }

  return (
    <div className="flex justify-center items-center bg-[#f3f4f6] w-[1000px] h-[1200px]">
      <div className="left-5 top-5 absolute p-10">
        <input
          type="text"
          className="border-2 border-black"
          onChange={searchHandler}
        />
        {searched.length > 0 &&
          searched.slice(0, 5).map((city) => <p>{city}</p>)}
      </div>
      <div className="flex justify-center items-center bg-[rgb(255,255,255,0.75)] w-[414px] h-[828px]">
        <div>
          <p>{tempreture}</p>
        </div>
      </div>
    </div>
  );
};

export default Left;
