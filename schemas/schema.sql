-- Table for product_categories
DROP TABLE IF EXISTS product_categories;

CREATE TABLE
  IF NOT EXISTS product_categories (
    id INTEGER PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

-- Table for products
DROP TABLE IF EXISTS products;

CREATE TABLE
  IF NOT EXISTS products (
    id INTEGER PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    category_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES product_categories (id) ON DELETE SET NULL
  );

-- Table for orders
DROP TABLE IF EXISTS orders;

CREATE TABLE
  IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY,
    customer VARCHAR(255),
    table_number INT,
    paid TINYINT NOT NULL,
    payment_method VARCHAR(255),
    total_price DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

-- Table for order details (many-to-many relationship between orders and products)
DROP TABLE IF EXISTS order_items;

CREATE TABLE
  IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY,
    order_id INT,
    product_id INT,
    amount INT NOT NULL DEFAULT 1,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders (id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
  );