import {
  getRentals,
  getRentalById,
  deleteRentalById,
  addRental,
  updateRental,
} from '../model/rental.model.js';
import createError from 'http-errors';

// List view
export const viewAllRentals = async (req, res) => {
  const rentals = await getRentals();

  res.render('list', {
    rentals,
  });
};
// List API
export const apiAllRentals = async (req, res) => {
  const rentals = await getRentals();
  res.json(rentals);
};
// Delete view
export const viewDeleteRental = async (req, res, next) => {
  const { id } = req.params;
  
  const rental = await getRentalById(id);
  if(!rental) return next(createError(400, 'Rental not found'));

  res.render('delete', {
    rental,
  });
};
// Delete API
export const apiDeleteRental = async (req, res, next) => {
  const { id } = req.params;

  const rental = await getRentalById(id);
  if(!rental) return next(createError(400, 'Rental not found'));

  await deleteRentalById(id);
  res.redirect('/');
};
// New view
export const viewAddNewRental = (req, res) => {
  res.render('new');
};
// New API
export const apiAddNewRental = async (req, res) => {
  const {
    name, description, price, location, bedrooms, bathrooms, link,
  } = req.body;

  await addRental({
    name,
    description,
    image: "https://picsum.photos/200",
    price,
    location,
    bedrooms,
    bathrooms,
    link,
  });
  res.redirect('/');
};
// Edit view
export const viewEditRental = async (req, res, next) => {
  const { id } = req.params;
  const rental = await getRentalById(id);
  if(!rental) return next(createError(400, 'Rental not found'));

  res.render('edit', {
    rental,
  });
};
// Edit API
export const apiEditRental = async (req, res, next) => {
  const {
    name, description, price, location, bedrooms, bathrooms, link,
  } = req.body;
  const { id } = req.params;
  const rental = await getRentalById(id);
  if(!rental) return next(createError(400, 'Rental not found'));
  
  // don't update image - this will be fixed in Storage module of Learn path
  const updatedRental = {
    ...rental,
    name,
    description,
    price,
    location,
    bedrooms,
    bathrooms,
    link,
  }

  await updateRental(updatedRental);
  res.redirect('/');
};
