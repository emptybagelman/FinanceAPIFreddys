# API

## Routes:

### /users
- GET: 
    - /
    - /:id
    - /email
- POST:
    - /
- UPDATE:
    - /:id


### /cards
- GET: 
    - /
    - /:id
    - /balance/:id
- POST:
    - /
- PATCH:
    - /:id

### /transactions
- GET: 
    - /
    - /:id
    - /card/:card_id
    - /:user_id
    - /:user_id/payee/:payee
- POST:
    - /
- PATCH:
    - /:id
- DELETE:
    - /:id


- GET: 
    - /
- POST:
    - /
- PATCH:
    - /:id
- DELETE:
    - /:id
