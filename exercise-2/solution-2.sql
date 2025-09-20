-- Essa solução responde à necessidade do professor Girafales: "Lista de salas com horários livres e ocupados - Pode usar SQL e a linguagem de programação que achar melhor."
-- Solução escrita em MySQL.

CREATE TEMPORARY TABLE TIME_SLOTS (
  slot_start TIME,
  slot_end   TIME
);

INSERT INTO TIME_SLOTS VALUES
('08:00:00','09:00:00'),
('09:00:00','10:00:00'),
('10:00:00','11:00:00'),
('11:00:00','12:00:00'),
('14:00:00','15:00:00'),
('15:00:00','16:00:00');

SELECT
  r.id AS room_id,
  b.name AS building_name,
  ts.slot_start,
  ts.slot_end,
  CASE 
    WHEN cs.id IS NOT NULL THEN 'OCUPADA'
    ELSE 'LIVRE'
  END AS status
FROM ROOM r
JOIN BUILDING b ON b.id = r.building_id
CROSS JOIN TIME_SLOTS ts
LEFT JOIN CLASS_SCHEDULE cs
  ON cs.room_id = r.id
  AND ts.slot_start >= cs.start_time
  AND ts.slot_end   <= cs.end_time
ORDER BY r.id, ts.slot_start;
