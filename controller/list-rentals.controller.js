import {
  getAllRentals,
  getRentalById,
  deleteRentalById,
  addRental,
  updateRental,
} from "../model/rental.model.js";

export const listAllRentals = (req, res) => {
  res.render("list", {
    rentals: getAllRentals(),
  });
};

export const deleteRental = (req, res) => {
  const { id } = req.params;
  const rental = getRentalById(id);

  if (!rental) {
    res.status(404).send("Rental not found");
  } else {
    res.render("delete", {
      rental,
    });
  }
};

export const doDeleteRental = (req, res) => {
  const { id } = req.params;
  deleteRentalById(id);
  res.redirect("/");
};

export const addNewRental = (req, res) => {
  res.render("new");
};

export const doAddNewRental = (req, res) => {
  const { name, price } = req.body;
  addRental({ name, price });
  res.redirect("/");
};

export const editRental = (req, res) => {
  const { id } = req.params;
  res.render("edit", {
    rental: getRentalById(id),
  });
};

export const doEditRental = (req, res) => {
  const { name, price } = req.body;
  const { id } = req.params;
  const rental = getRentalById(id);

  if (!rental) {
    res.status(404).send("Rental not found");
  } else {
    updateRental({...rental, name, price});
    res.redirect("/");
  }
};
