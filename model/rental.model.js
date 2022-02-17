import { readFile } from "fs/promises";

const RENTALS = JSON.parse(
  await readFile(new URL("../data/fake-rentals.json", import.meta.url))
);

export const getAllRentals = () => RENTALS.sort((a, b) => b.id - a.id);

export const getRentalById = (id) =>
  RENTALS.find((rental) => rental.id === Number(id));

export const deleteRentalById = (id) => {
  const index = RENTALS.findIndex((rental) => rental.id === Number(id));
  if (index !== -1) {
    RENTALS.splice(index, 1);
  }
};

export const addRental = (rental) =>
  RENTALS.push({
    id: RENTALS.length + 1,
    description:
      "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quaerat.",
    image: "http://placehold.it/100x100",
    location: "San Francisco, CA",
    bedrooms: "3",
    bathrooms: "2",
    link: "http://www.example.com",
    geometry: {
      type: "Point",
      coordinates: [-122.4194155, 37.7749295],
    },
    ...rental,
  });

export const updateRental = (rental) => {
  const index = RENTALS.findIndex((r) => r.id === Number(rental.id));
  if (index !== -1) {
    RENTALS[index] = {
      ...RENTALS[index],
      ...rental,
    };
  }
};
