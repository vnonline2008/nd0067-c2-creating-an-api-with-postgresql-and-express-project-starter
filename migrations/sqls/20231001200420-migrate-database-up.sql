/* Replace with your SQL commands */
CREATE TABLE "user" (
    id SERIAL,
    firstName VARCHAR(50),
    lastName VARCHAR(50),
    username VARCHAR(50),
    password VARCHAR,
    PRIMARY KEY (id)
);

INSERT INTO "user" (firstName, lastName, username, password) VALUES ('postgres', 'postgres', 'admin', 'postgres');

CREATE TABLE product (
    id SERIAL,
    name VARCHAR(50) NOT NULL,
    price FLOAT,
    PRIMARY KEY (id)
);

CREATE TABLE "order" (
    id SERIAL,
    userId INTEGER REFERENCES "user"(id) ON DELETE CASCADE,
    status VARCHAR(50),
    PRIMARY KEY (id)
);

CREATE TABLE orderDetail(
    id SERIAL,
    orderId INTEGER REFERENCES "order"(id) ON DELETE CASCADE,
    productId INTEGER REFERENCES product(id) ON DELETE CASCADE,
    quantity INTEGER,
    PRIMARY KEY (id)
);