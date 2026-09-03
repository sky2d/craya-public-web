import statesAndCities from "@/constant/stateCity.json";
type StatesAndCities = {
  [state: string]: string[];
};
const StateAndCityMap: StatesAndCities = statesAndCities;
export default StateAndCityMap;
