import { useState } from "react";

const Left = () => {
  const [cities, setCities] = useState([]);
  const [searched, setSearched] = useState([]);

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
  return (
    <div className="flex justify-center items-center bg-[#f3f4f6] w-[1000px] h-[1200px]">
      <div className="left-5 top-5 absolute p-10">
        <input
          type="text"
          className="border-2 border-black"
          onChange={searchHandler}
        />
        {searched.length > 0 &&
          searched.slice(0, 10).map((city) => <p>{city}</p>)}
      </div>
      <div className="flex justify-center items-center bg-[rgb(255,255,255,0.75)] w-[414px] h-[828px]">
        <div></div>
      </div>
    </div>
  );
};

export default Left;
