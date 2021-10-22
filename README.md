Welcome to CUP N' CAKEZ!
=========

## Description

Cup 'N CakeZ is a full stack project that aims to unite people and businesses, built around the idea that communication is key. It provides a way for the customers of a restaurant to not only place an order online, but make special requests. For the restaurant owner, it is possible to let the user know how long it will take for their order to be ready, offering a personalised experience.

This project is a simpler version of [Ritual](https://ritual.co/), for a single restaurant. It uses [Twilio](twilio.com) service to implement an SMS communication between the client and the restaurant. This project was proposed by [Lighthouse Labs](https://lighthouselabs.ca/).

## User Story

As a customer, I would like to leave for a pickup, knowing that my order is already being prepared. I also like to know how long it will take for it to be ready, so I can plan myself accordingly.

As a business, I want to expand my customer base, by showing what I have to offer. I want my customers to be able to order right away, knowing that their order is already being taken care of.

## The Store

### The front of the Store
Where the customer arrives, after the Login/Register step.
!["The Front Store"](https://github.com/hyjin123/food-pickup-ordering/blob/master/docs/Front-Store.png?raw=true)

### The back of the Store
Where the restaurant has access to an overview of previous orders, and can inform customers about preparation time and when their order is ready for pickup.
!["The Back Store"](https://github.com/hyjin123/food-pickup-ordering/blob/master/docs/Backstore-Page.png?raw=true)

### Registration Page
For new customers!
!["The Register Page"](https://github.com/hyjin123/food-pickup-ordering/blob/master/docs/Register-Page.png?raw=true)

### Customer history page
Customers may check the status of their order and keep track of previous orders.
!["The Orders History Page"](https://github.com/hyjin123/food-pickup-ordering/blob/master/docs/My-Orders-Page.png?raw=true)

## Getting Started

1. Fork this repository, then clone your fork of this repository.
2. Install dependencies using the `npm install` command.
3. Fix to binaries for sass by running `npm rebuild node-sass`.
4. Build or reset the database with the `npm run db:reset` command.
5. Start the web server using the `npm run local` command. The app will be served at http://localhost:8080/.
6. Go to http://localhost:8080/ in your browser.

## Navigating the Store

### Client Side
1. `Login` using your email and password. If no account, visit the `Register` page to register using your information.
2. On the main page, scroll through the menu or search what you would like in the search bar.
3. Add the food by clicking on the `Add-To-Cart` button and the item should appear on your cart on the right hand side.
4. Add a tip or notes if applicable. You can also clear your cart if you want to start over again.
5. Click the `Order Now` button if you are ready to order.
6. You should receive a confirmation SMS on your phone.
7. When the owner updates the prep-time, you will receive another SMS with the preparation time.
8. When the owner finishes preparing the order, you will receive another SMS informing you that you can pick up your order!
9. You can view your order history in the My Orders page in the navigation bar.

### Restaurant Side
1. When a user puts on a new order, an SMS is sent to the restaurant/owner number.
2. Login using the owner email and password. (set in `id = 1` in `customers` table)
3. The system pages shows the orders.
4. Update the prep-time information. That will send an SMS to the user informing the preparation time.
5. When the order is ready, inform the user by SMS by clicking on Finished!

## Dependencies

1. Bcrypt
2. Chalk
3. Cookie-session
4. Dotenv
5. EJS
6. Express
7. Morgan
8. Pg
9. Pg-native
10. Sass
11. Twilio
12. Twilio-cli

## Dev-Dependencies

1. Nodemon

