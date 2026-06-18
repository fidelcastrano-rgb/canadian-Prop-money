-- Schema SQL to initialize Cloudflare D1 tables
-- Tables: customers, orders, order_items, order_status_history, email_logs

CREATE TABLE IF NOT EXISTS customers (
  id TEXT PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  country TEXT NOT NULL,
  province TEXT NOT NULL,
  city TEXT NOT NULL,
  address TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  order_number TEXT UNIQUE NOT NULL,
  customer_id TEXT NOT NULL,
  subtotal REAL NOT NULL,
  shipping REAL NOT NULL,
  discount REAL NOT NULL,
  total REAL NOT NULL,
  payment_method TEXT NOT NULL,
  status TEXT NOT NULL,
  created_at TEXT NOT NULL,
  payment_instructions TEXT,
  email_history TEXT,
  email_sent_at TEXT,
  last_email_subject TEXT,
  payment_deadline TEXT,
  FOREIGN KEY (customer_id) REFERENCES customers (id)
);

CREATE TABLE IF NOT EXISTS order_items (
  id TEXT PRIMARY KEY,
  order_id TEXT NOT NULL,
  product_id TEXT NOT NULL,
  product_name TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  price REAL NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders (id)
);

CREATE TABLE IF NOT EXISTS order_status_history (
  id TEXT PRIMARY KEY,
  order_id TEXT NOT NULL,
  status TEXT NOT NULL,
  created_at TEXT NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders (id)
);

CREATE TABLE IF NOT EXISTS email_logs (
  id TEXT PRIMARY KEY,
  order_id TEXT NOT NULL,
  email_type TEXT NOT NULL,
  recipient TEXT NOT NULL,
  status TEXT NOT NULL,
  created_at TEXT NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders (id)
);

CREATE TABLE IF NOT EXISTS payment_methods (
  id TEXT PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  enabled INTEGER NOT NULL, -- 1 for true, 0 for false
  instructions TEXT NOT NULL
);

