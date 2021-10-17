SELECT order_id, created_at::date AS date, menu_items.name AS item, price, quantity
  FROM order_items
  JOIN orders ON order_id = orders.id
  JOIN menu_items ON menu_item_id = menu_items.id
  WHERE customer_id = 3
    AND created_at + prep_time < Now();