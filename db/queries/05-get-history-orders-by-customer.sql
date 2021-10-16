-- List all orders of a customer

SELECT order_id, created_at::date AS date, ROUND((SUM(price*quantity)*1.13 + tip) *100)/100 AS total_purchase
  FROM order_items
  JOIN orders ON order_id = orders.id
  JOIN menu_items ON menu_item_id = menu_items.id
  WHERE customer_id = 3
  GROUP BY order_id, created_at, tip;