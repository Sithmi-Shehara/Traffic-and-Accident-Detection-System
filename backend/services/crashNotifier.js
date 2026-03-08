const nodemailer = require('nodemailer');
const { getPool } = require('../config/database');

const buildTransporter = () => {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = Number(process.env.SMTP_PORT || 465);
  const secure = port === 465;

  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn('[crash-notifier] SMTP_USER/SMTP_PASS not set. Emails will not send.');
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
};

const formatCrashEmailText = (row) => {
  const lines = [
    `Emergency Alert: ${row.violation_type}`,
    `Violation ID: ${row.id}`,
    `Number Plate: ${row.number_plate || 'N/A'}`,
    `Source: ${row.source_endpoint || 'N/A'}`,
    `Time: ${row.created_at ? new Date(row.created_at).toISOString() : 'N/A'}`,
    `Image URL: ${row.image_url || 'N/A'}`
  ];
  return lines.join('\n');
};

const formatCrashEmailHtml = (row) => {
  const time = row.created_at ? new Date(row.created_at).toISOString() : 'N/A';
  const imageLink = row.image_url
    ? `<a href="${row.image_url}" style="color:#2563eb;text-decoration:none;">View Image</a>`
    : 'N/A';

  return `
    <div style="font-family:Arial,Helvetica,sans-serif;background:#f8fafc;padding:24px;">
      <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;">
        <div style="background:#b91c1c;color:#fff;padding:16px 20px;">
          <div style="font-size:14px;letter-spacing:1px;text-transform:uppercase;opacity:.9;">Emergency Alert</div>
          <div style="font-size:20px;font-weight:700;margin-top:4px;">${row.violation_type}</div>
        </div>
        <div style="padding:20px;">
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:6px 0;color:#64748b;">Violation ID</td><td style="padding:6px 0;font-weight:600;">${row.id}</td></tr>
            <tr><td style="padding:6px 0;color:#64748b;">Number Plate</td><td style="padding:6px 0;font-weight:600;">${row.number_plate || 'N/A'}</td></tr>
            <tr><td style="padding:6px 0;color:#64748b;">Source</td><td style="padding:6px 0;font-weight:600;">${row.source_endpoint || 'N/A'}</td></tr>
            <tr><td style="padding:6px 0;color:#64748b;">Time</td><td style="padding:6px 0;font-weight:600;">${time}</td></tr>
            <tr><td style="padding:6px 0;color:#64748b;">Image</td><td style="padding:6px 0;font-weight:600;">${imageLink}</td></tr>
          </table>
        </div>
      </div>
    </div>
  `;
};

const startCrashNotifier = async () => {
  const toEmail = process.env.ALERT_EMAIL;
  if (!toEmail) {
    console.warn('[crash-notifier] ALERT_EMAIL not set. Notifier disabled.');
    return;
  }

  const transporter = buildTransporter();
  if (!transporter) {
    return;
  }

  const pool = getPool();
  const intervalMs = Number(process.env.ALERT_POLL_MS || 10000);
  let lastSeenId = 0;

  try {
    const [rows] = await pool.query(
      "SELECT MAX(id) AS maxId FROM violations WHERE violation_type IN ('crash','crash with fire','crash_with_fire')"
    );
    lastSeenId = Number(rows?.[0]?.maxId || 0);
    console.log(`[crash-notifier] Starting from lastSeenId=${lastSeenId}`);
  } catch (error) {
    console.error('[crash-notifier] Failed to initialize lastSeenId:', error.message);
  }

  const poll = async () => {
    try {
      const [rows] = await pool.query(
        `
          SELECT id, violation_type, number_plate, image_url, source_endpoint, created_at
          FROM violations
          WHERE violation_type IN ('crash','crash with fire','crash_with_fire') AND id > ?
          ORDER BY id ASC
        `,
        [lastSeenId]
      );

      for (const row of rows) {
        const mail = {
          from: `"Traffic Alert Center" <${process.env.SMTP_USER}>`,
          to: toEmail,
          subject: `Emergency Alert: ${row.violation_type} #${row.id}`,
          text: formatCrashEmailText(row),
          html: formatCrashEmailHtml(row)
        };

        await transporter.sendMail(mail);
        console.log(`[crash-notifier] Sent crash alert for id=${row.id}`);
        lastSeenId = row.id;
      }
    } catch (error) {
      console.error('[crash-notifier] Poll error:', error.message);
    }
  };

  setInterval(poll, intervalMs);
  console.log(`[crash-notifier] Polling every ${intervalMs}ms`);
};

module.exports = { startCrashNotifier };
