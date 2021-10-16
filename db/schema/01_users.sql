DROP TABLE IF EXISTS customers CASCADE;

CREATE TABLE customers (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone_number VARCHAR(255),
  password TEXT NOT NULL,
  address VARCHAR(255),
  city VARCHAR(255),
  province VARCHAR(255),
  postal_code VARCHAR(255),
  member_since TIMESTAMP DEFAULT Now(),
  is_active BOOLEAN DEFAULT TRUE
);