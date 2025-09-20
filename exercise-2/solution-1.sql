-- Essa solução responde à necessidade do professor Girafales: "A quantidade de horas que cada professor tem comprometido em aulas - Então faça uma consulta SQL que traga essa informação."
-- Solução escrita em MySQL.

SELECT
  p.id AS professor_id,
  SUM(TIMESTAMPDIFF(HOUR, cs.start_time, cs.end_time)) AS total_hours
FROM PROFESSOR p
JOIN SUBJECT s ON s.id = = p.id
JOIN CLASS c ON c.subject_id = s.id
JOIN CLASS_SCHEDULE cs ON cs.class_id = c.id
GROUP BY p.id
ORDER BY total_hours DESC;
