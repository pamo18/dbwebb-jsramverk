DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS coins;
DROP TABLE IF EXISTS countries;
DROP TABLE IF EXISTS common;

CREATE TABLE IF NOT EXISTS users (
    name VARCHAR(60) NOT NULL,
    birthday DATE NOT NULL,
    country VARCHAR(60) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(60) NOT NULL,
    pamocoin DECIMAL(18,2) DEFAULT 0,
    bthcoin DECIMAL(18,2) DEFAULT 0,
    krona DECIMAL(18,2) DEFAULT 100,
    UNIQUE(name)
);

CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY,
    user VARCHAR(60) NOT NULL,
    coin VARCHAR(60) NOT NULL,
    amount DECIMAL(18,2) NOT NULL,
    currency VARCHAR(60) NOT NULL,
    price DECIMAL(18,2) NOT NULL,
    total DECIMAL(18,2) NOT NULL,
    purchased DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS coins (
    name VARCHAR(60) NOT NULL,
    label VARCHAR(60) NOT NULL,
    UNIQUE(name)
);

CREATE TABLE IF NOT EXISTS countries (
    country VARCHAR(60) NOT NULL,
    UNIQUE(country)
);

CREATE TABLE IF NOT EXISTS common (
    name VARCHAR(60) NOT NULL,
    item VARCHAR(60) NOT NULL,
    UNIQUE(name)
);

INSERT INTO users(name, birthday, country, email, password)
VALUES
    ("admin", "1/10/2000", "Sweden", "admin@mail.com", "$2a$10$0ssz8u76FmSDXLZ/BVXcBOqG2F/Z0B8AejWEm5uhJVE6UIpZwID.2"),
    ("doe", "1/10/2000", "Sweden", "doe@mail.com", "$2a$10$feE4/FDT1yO6HQLvqFp00O6CTa6DWmyMdtGEZ0208MdMYq1GkAqPC");

INSERT INTO coins
VALUES
    ("pamocoin", "PamoCoin"),
    ("bthcoin", "BTHCoin");

INSERT INTO countries
VALUES
    ("Albania"),
    ("Andorra"),
    ("Armenia"),
    ("Austria"),
    ("Azerbaijan"),
    ("Belarus"),
    ("Belgium"),
    ("Bosnia and Herzegovina"),
    ("Bulgaria"),
    ("Croatia"),
    ("Cyprus"),
    ("Czechia"),
    ("Denmark"),
    ("Estonia"),
    ("Finland"),
    ("France"),
    ("Georgia"),
    ("Germany"),
    ("Greece"),
    ("Hungary"),
    ("Iceland"),
    ("Ireland"),
    ("Italy"),
    ("Kazakhstan"),
    ("Kosovo"),
    ("Latvia"),
    ("Liechtenstein"),
    ("Lithuania"),
    ("Luxembourg"),
    ("Malta"),
    ("Moldova"),
    ("Monaco"),
    ("Montenegro"),
    ("Netherlands"),
    ("North Macedonia"),
    ("Norway"),
    ("Poland"),
    ("Portugal"),
    ("Romania"),
    ("Russia"),
    ("San Marino"),
    ("Serbia"),
    ("Slovakia"),
    ("Slovenia"),
    ("Spain"),
    ("Sweden"),
    ("Switzerland"),
    ("Turkey"),
    ("Ukraine"),
    ("United Kingdom"),
    ("Vatican City");

INSERT INTO common
VALUES
    ("countries", "Sweden,Denmark,Norway");
