import { readFile } from "fs/promises";

let RENTALS;

// Read data in when app starts
// Database is kept in memory only
export const connectToDatabase = async () =>{
  RENTALS = JSON.parse(
  await readFile(new URL("../data/fake-rentals.json", import.meta.url)));
}

export const getRentals = () => RENTALS.sort((a, b) => b.id - a.id);

export const getRentalById = (id) =>
  RENTALS.find((rental) => rental.id === Number(id));

export const deleteRentalById = (id) => {
  const index = RENTALS.findIndex((rental) => rental.id === Number(id));
  if (index !== -1) {
    RENTALS.splice(index, 1);
  }
  console.log(getRentals());
};

const getMaxId = () =>{
  const maxIdObject = RENTALS.reduce(function(prev, current) {
    return (prev.id > current.id) ? prev : current
  });

  return maxIdObject.id;
}

export const addRental = (rental) => {
  RENTALS.push({
    id: getMaxId() + 1,
    ...rental,
  });
  console.log(getRentals());
}

export const updateRental = (rental) => {
  const index = RENTALS.findIndex((r) => r.id === Number(rental.id));
  if (index !== -1) {
    RENTALS[index] = {
      ...RENTALS[index],
      ...rental,
    };
  }
  console.log(getRentals());
};