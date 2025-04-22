DROP TABLE IF EXISTS transactions;
DROP TABLE IF EXISTS cards;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id INT GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    date_joined DATE NOT NULL DEFAULT CURRENT_DATE,
    about VARCHAR(1000) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE cards(
    id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    minimum DECIMAL(5,2) NOT NULL,
    balance DECIMAL(6,2) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE transactions (
    id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    card_id INT NOT NULL,
    payee VARCHAR(100) NOT NULL,
    amount DECIMAL(6,2) NOT NULL,
    date_paid DATE NOT NULL DEFAULT CURRENT_DATE,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (card_id) REFERENCES cards(id)
);



INSERT INTO users (name,email,date_joined,about)
VALUES
    (
        'Sam McGinnes',
        'ragingunfire@gmail.com',
        '2024-04-20',
        'I heart my sexy girlfriend.'
    );

INSERT INTO cards (user_id, name, minimum, balance)
VALUES
    (
        1,
        'Nationwide',
        -300.00,
        1000.00
    ),
    (
        1,
        'Monzo',
        -500.00,
        560.00
    );

INSERT INTO transactions (user_id, card_id, payee, amount, date_paid)
VALUES
    (
        1,
        1,
        'Tesco',
        -10.95,
        '2025-04-01'
    ),
    (
        1,
        1,
        'Londis',
        -6.00,
        '2025-04-01'
    ),
    (
        1,
        1,
        'Monzo',
        50.00,
        '2025-04-03'
    ),
    (
        1,
        2,
        'Monzo',
        -50.00,
        '2025-04-04'
    );