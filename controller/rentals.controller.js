import {
  getRentals,
  getRentalById,
  deleteRentalById,
  addRental,
  updateRental,
} from '../model/rental.model.js';
import { deleteBlob, uploadBlob } from '../services/blobstorage.js';

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
export const viewDeleteRental = async (req, res) => {
  const { id } = req.params;
  const rental = await getRentalById(id);

  if (!rental) {
    res.status(404).send('Rental not found');
  } else {
    res.render('delete', {
      rental,
    });
  }
};
// Delete API
export const apiDeleteRental = async (req, res) => {
  const { id } = req.params;

  const rental = await getRentalById(id);
  await deleteBlob(rental.image);
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
    name, description, price, city, bedrooms, bathrooms, link,
  } = req.body;
  let imageBlob = null;

  if (req.file) {
    imageBlob = await uploadBlob(req.file);
  }

  await addRental({
    name,
    description,
    image: imageBlob && imageBlob.image ? imageBlob.image : null,
    price,
    city,
    bedrooms,
    bathrooms,
    link,
  });
  res.redirect('/');
};
// Edit view
export const viewEditRental = async (req, res) => {
  const { id } = req.params;
  const rental = await getRentalById(id);
  res.render('edit', {
    rental,
  });
};
// Edit API
export const apiEditRental = async (req, res) => {
  const {
    name, description, price, city, bedrooms, bathrooms, link,
  } = req.body;
  const { id } = req.params;
  const rental = await getRentalById(id);
  let imageBlob = null;

  if (!rental) {
    res.status(404).send('Rental not found');
  } else {
    if (req.file) {
      await deleteBlob(rental.image);
      imageBlob = await uploadBlob(req.file);
    }

    await updateRental(id, {
      ...rental,
      name,
      description,
      image: imageBlob && imageBlob.image ? imageBlob.image : rental.image,
      price,
      city,
      bedrooms,
      bathrooms,
      link,
    });
    res.redirect('/');
  }
};
