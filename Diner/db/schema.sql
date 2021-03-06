-- DROP TABLE IF EXISTS happens;
-- DROP TABLE IF EXISTS sumos;
DROP TABLE IF EXISTS attendance;
-- DROP TABLE IF EXISTS menus;
DROP TABLE IF EXISTS happen_menus;
-- DROP TABLE IF EXISTS dishes;
DROP TABLE IF EXISTS menu_dishes;

-- CREATE TABLE happens(
--   id INTEGER PRIMARY KEY AUTOINCREMENT,
--   theme TEXT,
--   rule TEXT, 
--   pic_url TEXT, 
--   space TEXT, 
--   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- CREATE TABLE sumos( 
--   id INTEGER PRIMARY KEY AUTOINCREMENT, 
--   shikona TEXT, 
--   rank TEXT, 
--   weight INTEGER,
--   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

CREATE TABLE attendance(
  id INTEGER PRIMARY KEY AUTOINCREMENT, 
  sumo_id INTEGER, 
  happen_id INTEGER, 
  FOREIGN KEY(sumo_id) REFERENCES sumos(id),
  FOREIGN KEY(happen_id) REFERENCES happens(id), 
  UNIQUE (sumo_id, happen_id) ON CONFLICT IGNORE
); 

-- CREATE TABLE menus(
--   id INTEGER PRIMARY KEY AUTOINCREMENT,
--   tag TEXT,
--   mood TEXT, 
--   img_url TEXT,
--   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

CREATE TABLE happen_menus(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  happen_id INTEGER, 
  menu_id INTEGER, 
  FOREIGN KEY(happen_id) REFERENCES happens(id),
  FOREIGN KEY(menu_id) REFERENCES menus(id),
  UNIQUE (happen_id, menu_id) ON CONFLICT IGNORE
);

-- CREATE TABLE dishes(
--   id INTEGER PRIMARY KEY AUTOINCREMENT,
--   name TEXT,
--   texture TEXT, 
--   flavor TEXT, 
--   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

CREATE TABLE menu_dishes(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  menu_id INTEGER, 
  dish_id INTEGER, 
  FOREIGN KEY(menu_id) REFERENCES menus(id),
  FOREIGN KEY(dish_id) REFERENCES dishes(id),
  UNIQUE (menu_id, dish_id) ON CONFLICT IGNORE
);

-- CREATE TRIGGER happen_trig BEFORE UPDATE ON happens BEGIN
--   UPDATE happens SET updated_at = CURRENT_TIMESTAMP WHERE id = new.id;
-- END;

-- CREATE TRIGGER sumos_trig BEFORE UPDATE ON sumos BEGIN
--   UPDATE sumos SET updated_at = CURRENT_TIMESTAMP WHERE id = new.id;
-- END;

-- CREATE TRIGGER menu_trig BEFORE UPDATE ON menus BEGIN
--   UPDATE menus SET updated_at = CURRENT_TIMESTAMP WHERE id = new.id;
-- END;

-- CREATE TRIGGER dish_trig BEFORE UPDATE ON dishes BEGIN
--   UPDATE dishes SET updated_at = CURRENT_TIMESTAMP WHERE id = new.id;
-- END;


