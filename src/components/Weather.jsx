const Weather = () => {
  async function getWeather() {
    const result = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=2e39ce842b0a4f8c87621141250801 &q={tokyo}`
    );
    const weather = await result.json();
    console.log(weather);
  }
  getWeather();
};

export default Weather;
