const express = require('express');

// src/controllers/filmsController.js
const filmsService = require('../services/filmsService');

async function list(req, res, next) {
  try {
    const { q, year, genre, actor } = req.query;
    const films = await filmsService.searchFilms({ q, year, genre, actor });
    res.render('films', { title: 'Films', films, filters: { q, year, genre, actor } });
  } catch (err) { next(err); }
}

async function details(req, res, next) {
  try {
    const film = await filmsService.getFilmById(req.params.id);
    if (!film) return res.status(404).render('error', { message: 'Film niet gevonden' });
    res.render('films', { title: film.title, film });
  } catch (err) { next(err); }
}

module.exports = { list, details };
