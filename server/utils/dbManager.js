import mongoose from "mongoose";

/* ══════════════════════════════════════════════════════════════
   DB CONNECTION MANAGER
   Handles dynamic, cached connections to each institute's
   isolated database. The master connection (default mongoose
   connection) holds the Institute registry. Each institute's
   own data lives in a separate database on the SAME MongoDB
   cluster, just a different database name.
══════════════════════════════════════════════════════════════ */

// Cache of open connections so we don't reconnect on every request
const connectionCache = {};

/**
 * Get (or create) a connection to a specific institute's database.
 * @param {string} dbName - the institute's database name
 * @returns {mongoose.Connection}
 */
export const getInstituteConnection = (dbName) => {
  if (connectionCache[dbName]) {
    return connectionCache[dbName];
  }

  // Reuse the same cluster host, just point to a different database
  const baseUri = process.env.MONGO_URI;
  // Replace the database name in the URI with the institute's dbName
  const uri = baseUri.replace(/\/[^/?]+(\?|$)/, `/${dbName}$1`);

  const conn = mongoose.createConnection(uri, {
    maxPoolSize: 5,
  });

  conn.on("connected", () => {
    console.log(`✅ Connected to institute DB: ${dbName}`);
  });
  conn.on("error", (err) => {
    console.log(`❌ Error connecting to institute DB (${dbName}):`, err.message);
  });

  connectionCache[dbName] = conn;
  return conn;
};

/**
 * Register a model on a specific institute connection.
 * Use this instead of mongoose.model() directly for tenant-scoped models.
 * @param {mongoose.Connection} conn
 * @param {string} modelName
 * @param {mongoose.Schema} schema
 */
export const getTenantModel = (conn, modelName, schema) => {
  return conn.models[modelName] || conn.model(modelName, schema);
};