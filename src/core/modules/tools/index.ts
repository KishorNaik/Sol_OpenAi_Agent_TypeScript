export const getWeatherDetails=(city:string)=>{
  if(city.toLowerCase()==='mumbai'){
    return `25°C`
  };
  if(city.toLowerCase()==='delhi'){
    return `28°C`
  };
  if(city.toLowerCase()==='kolkata'){
    return `30°C`
  };
  if(city.toLowerCase()==='bangalore'){
    return `20°C`
  }
}
