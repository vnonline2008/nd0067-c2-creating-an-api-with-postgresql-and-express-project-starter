# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints

> **&#9432; &ensp;*BASE_URL:*** http://localhost:3000

#### Products
- Index: [<span style="color: green;">GET</span>] /products
- Show: [<span style="color: green;">GET</span>] /products/:productId
- Create [token required] [<span style="color: orange;">POST</span>] /products/createProduct
- Delete: [<span style="color: tomato;">DELETE</span>] /products/deleteProduct

#### Users
- Index [token required] [<span style="color: green;">GET</span>] /users
- Show [token required] [<span style="color: green;">GET</span>] /users/:userId
- Create N[token required] [<span style="color: orange;">POST</span>] /users/createUser
- Authenticate: [<span style="color: orange;">POST</span>] /users/auth
- Delete:[token required] [<span style="color: tomato;">DELETE</span>] /users/:userId

#### Orders
- Current Order by user (args: user id)[token required]: [<span style="color: green;">GET</span>] /orders/:userId
- Index: [<span style="color: green;">GET</span>] /orders
- Create new Order: [token required] [<span style="color: orange;">POST</span>] /orders/createOrder
- Update Order status: [token required] [<span style="color: deepskyblue;">PUT</span>] /orders/:orderId/:status
- Delete: [token required] [<span style="color: tomato;">DELETE</span>] /orders/:orderId
- Create new Order detail: [token required] [<span style="color: orange;">POST</span>] /orders/createOrderDetail

## Data Shapes
#### **1. Product**
- id
- name
- price 

***Product Table***

| id                | name                   | price    |
| :-------------    | :------                | :------  |
| integer serial    | varchar(50) not null   | float    |


#### **2. User**
- id
- firstname
- lastname
- username
- password

***User Table***

| id                | firstname     | lastname          | username      | password  |
| :-------------    | :------       | :------           | :-----        | :-----    |
| integer serial    | varchar(50)   | varchar(50)       | varchar(50)   | varchar   |

#### **3. Orders**
- id
- userid
- status (active or complete)

***Orders Table***

| id                | userid        | status            |
| :-------------    | :------       | :------           |
| integer serial    | integer       | varchar(50)       |

#### **3. OrderDetail**
- id
- orderid
- productid
- quantity of each product in the order

***OrderDetail Table***

| id                | orderid       | productid     | quantity      |
| :-------------    | :------       | :------       | :-----        |
| integer serial    | integer       | integer       | integer       |

