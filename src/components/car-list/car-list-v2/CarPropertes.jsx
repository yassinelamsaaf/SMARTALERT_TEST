import { useLocation } from "react-router-dom";
import carsData from "../../../data/cars";
import UsedCarCard from "./UsedCarCard copy";
import NewCarCard from "./NewCarCard copy";

const CarPropertes = ({cars = carsData}) => {

  const { pathname } = useLocation();

  return pathname === "/occasion" ?
  (
    <>
      {cars.map((item, index) => (
        <UsedCarCard key={index} item={item} />
      ))}
    </>
  ) :
  (<>
    {cars.map((item, index) => (
      <NewCarCard key={index} item={item} />
    ))}
  </>)
  ;
};

export default CarPropertes;
