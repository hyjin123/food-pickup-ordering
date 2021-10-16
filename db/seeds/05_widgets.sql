INSERT INTO menu_items (name, description, price, image_url, in_stock)
VALUES
('Espresso Macchiato', 'With the just right amount of milk, foamed. Creamy taste in a warm cup.', 2.5, 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80', TRUE),
('Caramel Cafe with Cookie', 'Drink or Dessert - why not both? Foamed coffee and a cookie to make the day more sweet.', 3, 'https://images.unsplash.com/photo-1604298458655-ae6e04213678?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2FyYW1lbCUyMGNhZmV8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', TRUE),
('Coffee-to-go', 'Practical. Because in a busy day, go with coffee on the way!', 2, 'https://images.unsplash.com/photo-1629170564024-1ed6c5b9ce45?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=435&q=80', TRUE),
('Minimalistic', 'Sit and drink. Straightforward and simple.', 1.5, 'https://images.unsplash.com/photo-1504630083234-14187a9df0f5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80', TRUE),
('Coffee as Dessert in a Cup', 'Not only coffee. We add milk, chocolate, cinnamon and chantilly, to make this dessert-in-a-cup the perfect combination.', 3, 'https://images.unsplash.com/photo-1590080876209-c70d0f0bf6a3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=580&q=80', TRUE),
('Double Waffles with Berries', 'Comfort waffles with a touch of color. Berries are the ideal combination to spike things up!', 4, 'https://images.unsplash.com/photo-1541599188778-cdc73298e8fd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=440&q=80', TRUE),
('Cheerful Cakes', 'Shaped as a cookie, we baked a cake! Varied berries and fruits offer a unique experience each time. Feeling adventurous?', 1.2, 'https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1887&q=80', TRUE),
('Strong Chocolate Bar Pie', 'The complementary taste of the dark chocolate balances with the creamy filling of this puff pastry. All in a single serving bar of deliciousness!', 1.2, 'https://images.unsplash.com/photo-1565200003367-2fc0cac4bffd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80', TRUE),
('Chocolate Cupcake', 'It is cake. It is chocolate cake. It is also round, in a cup.', 1, 'https://images.unsplash.com/photo-1587668178277-295251f900ce?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80', TRUE),
('Strawberry Cupcake', 'Where the sweety meets the juicy. A lifting option with a cheerful touch of color in your day.', 1, 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80', TRUE);

INSERT INTO orders (customer_id, created_at, updated_at, prep_time, note, tip)
VALUES
(1, '2021-02-03 10:43:11.00', '2021-02-03 10:43:11.00', '00:40:00.00', 'Food seems delicious!', 0),
(2, '2021-03-25 18:22:10.00', '2021-03-25 18:22:10.00', '00:40:00.00', 'Do you serve cold coffee?', 0),
(2, '2021-03-23 08:35:11.00', '2021-03-23 08:35:11.00', '00:40:00.00', 'Last time my coffee was delicious. Cant wait to try the dessets, too!', 1),
(3, '2021-01-18 11:08:21.00', '2021-01-18 11:08:21.00', '00:40:00.00', 'Because why not?', 0),
(3, '2021-01-19 11:05:01.00', '2021-01-19 11:05:01.00', '00:40:00.00', 'Have a nice day =)', 0.9),
(3, '2021-03-01 13:15:22.00', '2021-03-01 13:15:22.00', '00:40:00.00', 'Love the service. Will recommend!', 5),
(4, '2021-01-01 11:30:25.00', '2021-01-01 11:30:25.00', '00:40:00.00', 'I am new in the city.', 0),
(4, '2021-01-02 10:15:15.00', '2021-01-02 10:15:15.00', '00:40:00.00', 'May I get an extra cookie?', 1),
(4, '2021-01-10 09:55:02.00', '2021-01-10 09:55:02.00', '00:40:00.00', 'Please, put a lot of cream!', 2),
(4, '2021-03-21 11:40:15.00', '2021-03-21 11:40:15.00', '00:40:00.00', 'I will be there right on time.', 3);

INSERT INTO order_items (order_id, menu_item_id, quantity)
VALUES
(1, 7, 2),
(1, 4, 1),
(2, 2, 1),
(3, 2, 1),
(3, 8, 2),
(4, 5, 1),
(5, 3, 3),
(6, 1, 1),
(6, 2, 1),
(6, 10, 1),
(6, 7, 3),
(7, 4, 1),
(7, 6, 1),
(8, 2, 1),
(9, 5, 1),
(10, 6, 3),
(10, 3, 3);