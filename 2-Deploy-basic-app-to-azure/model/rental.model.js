import { readFile } from "fs/promises";
import { v4 as uuidv4 } from 'uuid';

let RENTALS=[];

// Read data in when app starts
// Database is kept in memory only
export const connectToDatabase = async () =>{
  const fakeData = JSON.parse(
  await readFile(new URL("../data/fake-rentals.json", import.meta.url)));

  for await(const item of fakeData){
    await addRental(item)
  }
}

export const getRentals = () => RENTALS.sort((a, b) => b.id - a.id);

export const getRentalById = (id) =>
  RENTALS.find((rental) => rental.id === id);

export const deleteRentalById = (id) => {
  const index = RENTALS.findIndex((rental) => rental.id === id);
  if (index !== -1) {
    RENTALS.splice(index, 1);
  }
  console.log(getRentals());
};

export const addRental = (rental) => {
  RENTALS.push({
    id: uuidv4(),
    ...rental,
  });
  console.log(getRentals());
}

export const updateRental = (rental) => {
  const index = RENTALS.findIndex((r) => r.id === rental.id);
  if (index !== -1) {
    RENTALS[index] = {
      ...RENTALS[index],
      ...rental,
    };
  }
  console.log(getRentals());
};