-- List in cart: name, quantity, total price by items
-- Details from a specific order (as history)

SELECT menu_items.name, quantity, ROUND(price*quantity*100)/100 AS total_item
  FROM order_items
  JOIN menu_items ON menu_item_id = menu_items.id
  WHERE order_id = 6;