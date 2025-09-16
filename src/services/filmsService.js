// src/services/filmsService.js
const filmsDao = require('../dao/films.dao');

async function searchFilms(filters) {
  return filmsDao.search(filters);
}

async function getFilmById(id) {
  return filmsDao.findById(id);
}

module.exports = { searchFilms, getFilmById };
