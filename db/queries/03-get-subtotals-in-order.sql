-- LIST subtotals in cart: items + taxes (13%) + tip

SELECT ROUND(SUM(price*quantity)*100)/100 AS total_items, ROUND(SUM(price*quantity)*0.13*100)/100 AS tax, ROUND(tip*100)/100 AS tip
  FROM order_items
  JOIN menu_items ON menu_item_id = menu_items.id
  JOIN orders ON order_id = orders.id
  WHERE order_id = 6
  GROUP BY orders.id;