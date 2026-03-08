const express = require('express');
const { getPool } = require('../config/database');

const router = express.Router();

const parseMeta = (value) => {
  if (!value) return null;
  try {
    return JSON.parse(value);
  } catch (error) {
    return value;
  }
};

// GET /api/violations?limit=100&offset=0
router.get('/', async (req, res) => {
  try {
    const limit = Math.min(Number(req.query.limit || 100), 500);
    const offset = Number(req.query.offset || 0);

    const pool = getPool();
    const [columns] = await pool.query(
      "SHOW COLUMNS FROM violations LIKE 'is_resolved'"
    );
    const hasIsResolved = columns.length > 0;
    const isResolvedSelect = hasIsResolved ? ', is_resolved' : '';

    const [rows] = await pool.query(
      `
        SELECT
          id,
          violation_type,
          number_plate,
          image_url,
          image_filename,
          source_endpoint,
          created_at,
          meta
          ${isResolvedSelect}
        FROM violations
        ORDER BY created_at DESC
        LIMIT ? OFFSET ?
      `,
      [limit, offset]
    );

    const data = rows.map((row) => ({
      ...row,
      meta: parseMeta(row.meta),
    }));

    res.json({ data });
  } catch (error) {
    console.error('Failed to fetch violations:', error.message);
    res.status(500).json({ message: 'Failed to fetch violations' });
  }
});

// GET /api/violations/summary 
router.get('/summary', async (req, res) => {
  try {
    const pool = getPool();
    const [columns] = await pool.query(
      "SHOW COLUMNS FROM violations LIKE 'is_resolved'"
    );

    const hasIsResolved = columns.length > 0;

    const summaryQuery = hasIsResolved
      ? `
          SELECT
            COUNT(*) AS total,
            SUM(CASE WHEN is_resolved = 0 OR is_resolved IS NULL THEN 1 ELSE 0 END) AS pending,
            SUM(CASE WHEN is_resolved = 1 THEN 1 ELSE 0 END) AS resolved,
            SUM(
              CASE 
                WHEN violation_type = 'crash' AND (is_resolved = 0 OR is_resolved IS NULL)
                THEN 1
                ELSE 0
              END
            ) AS crash_pending,
            SUM(
              CASE 
                WHEN (violation_type = 'crash with fire' OR violation_type = 'crash_with_fire')
                  AND (is_resolved = 0 OR is_resolved IS NULL)
                THEN 1
                ELSE 0
              END
            ) AS crash_fire_pending
          FROM violations
        `
      : `
          SELECT
            COUNT(*) AS total,
            COUNT(*) AS pending,
            0 AS resolved,
            SUM(CASE WHEN violation_type = 'crash' THEN 1 ELSE 0 END) AS crash_pending,
            SUM(CASE WHEN violation_type = 'crash with fire' OR violation_type = 'crash_with_fire' THEN 1 ELSE 0 END) AS crash_fire_pending
          FROM violations
        `;

    const [rows] = await pool.query(summaryQuery);

    const summary = rows[0] || { total: 0, pending: 0, resolved: 0, crash_pending: 0, crash_fire_pending: 0 };
    res.json({ data: summary });
  } catch (error) {
    console.error('Failed to fetch violations summary:', error.message);
    res.status(500).json({ message: 'Failed to fetch violations summary' });
  }
});

// PATCH /api/violations/:id/resolve 
router.patch('/:id/resolve', async (req, res) => {
  try {
    const pool = getPool();
    const id = Number(req.params.id);
    console.log(`[violations.resolve] Request for id=${req.params.id} parsed=${id}`);
    if (!Number.isInteger(id) || id <= 0) {
      console.log('[violations.resolve] Invalid id');
      return res.status(400).json({ message: 'Invalid violation id' });
    }

    const [columns] = await pool.query(
      "SHOW COLUMNS FROM violations LIKE 'is_resolved'"
    );
    const hasIsResolved = columns.length > 0;
    console.log(`[violations.resolve] hasIsResolved=${hasIsResolved}`);
    if (!hasIsResolved) {
      return res.status(400).json({ message: 'Column is_resolved does not exist' });
    }

    const [result] = await pool.query(
      'UPDATE violations SET is_resolved = 1 WHERE id = ?',
      [id]
    );
    console.log('[violations.resolve] update result', {
      affectedRows: result.affectedRows,
      changedRows: result.changedRows,
      warningStatus: result.warningStatus
    });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Violation not found' });
    }

    const [rows] = await pool.query(
      'SELECT id, is_resolved FROM violations WHERE id = ? LIMIT 1',
      [id]
    );
    const current = rows[0] || null;
    console.log('[violations.resolve] after update', current);

    return res.json({ message: 'Marked as resolved', data: current });
  } catch (error) {
    console.error('Failed to update violation:', error.message);
    return res.status(500).json({ message: 'Failed to update violation' });
  }
});

module.exports = router;
