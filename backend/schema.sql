DROP TABLE IF EXISTS playlist;

CREATE TABLE playlist (
  id SERIAL PRIMARY KEY,
  name varchar(8000),
  data varchar(8000),
  is_deleted INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
