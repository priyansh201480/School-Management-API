import express from 'express';
import pool from './db.js';
import { addSchoolSchema, listSchema } from './validators.js';
import { haversineKm } from './utils.js';

const router = express.Router();

// POST /addSchool
router.post('/addSchool', async (req, res) => {
  const { error, value } = addSchoolSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ status: 'error', message: error.details[0].message });
  }

  const { name, address, latitude, longitude } = value;
  try {
    const [result] = await pool.execute(
      'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
      [name, address, latitude, longitude]
    );

    return res.status(201).json({
      status: 'success',
      data: { id: result.insertId, name, address, latitude, longitude }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: 'error', message: 'Database error' });
  }
});

// GET /listSchools?lat=..&lng=..
router.get('/listSchools', async (req, res) => {
  const { error, value } = listSchema.validate(req.query);
  if (error) {
    return res.status(400).json({ status: 'error', message: error.details[0].message });
  }

  const { lat, lng } = value;
  try {
    const [rows] = await pool.query(
      'SELECT id, name, address, latitude, longitude FROM schools'
    );

    const enriched = rows.map(r => ({
      ...r,
      distance_km: Number(
        haversineKm(lat, lng, Number(r.latitude), Number(r.longitude)).toFixed(3)
      )
    }));

    enriched.sort((a, b) => a.distance_km - b.distance_km);
    return res.json({ status: 'success', count: enriched.length, data: enriched });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: 'error', message: 'Database error' });
  }
});

export default router;
