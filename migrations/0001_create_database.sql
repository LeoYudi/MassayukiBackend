DROP TABLE IF EXISTS "ProductCategory";

-- CreateTable
CREATE TABLE
    "ProductCategory" (
        "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        "name" TEXT NOT NULL,
        "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

DROP TABLE IF EXISTS "Product";

-- CreateTable
CREATE TABLE
    "Product" (
        "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        "name" TEXT NOT NULL,
        "description" TEXT,
        "price" DECIMAL NOT NULL,
        "categoryId" INTEGER,
        "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "ProductCategory" ("id") ON DELETE SET NULL ON UPDATE CASCADE
    );

DROP TABLE IF EXISTS "Order";

-- CreateTable
CREATE TABLE
    "Order" (
        "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        "customer" TEXT,
        "tableNumber" INTEGER,
        "paid" BOOLEAN NOT NULL,
        "paymentMethod" TEXT,
        "totalPrice" DECIMAL,
        'note' TEXT,
        "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

DROP TABLE IF EXISTS "OrderItem";

-- CreateTable
CREATE TABLE
    "OrderItem" (
        "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        "orderId" INTEGER NOT NULL,
        "productId" INTEGER NOT NULL,
        "amount" INTEGER NOT NULL DEFAULT 1,
        "price" DECIMAL NOT NULL,
        "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
    );

DROP TABLE IF EXISTS "Report";

-- CreateTable
CREATE TABLE
    "Report" (
        "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        "pix" DECIMAL NOT NULL,
        "credit" DECIMAL NOT NULL,
        "debit" DECIMAL NOT NULL,
        "money" DECIMAL NOT NULL,
        "type" TEXT NOT NULL,
        "date" DATETIME NOT NULL,
        "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    );