-- ============================================================
-- SpotFinder — Full Database Setup
-- Run this entire file in Supabase SQL Editor
-- ============================================================

-- Floors table
CREATE TABLE IF NOT EXISTS floors (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  display_order INT NOT NULL
);

-- Spots table
CREATE TABLE IF NOT EXISTS spots (
  id TEXT PRIMARY KEY,
  floor_id TEXT REFERENCES floors(id),
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  capacity INT NOT NULL,
  x_percent FLOAT NOT NULL,
  y_percent FLOAT NOT NULL,
  status TEXT DEFAULT 'available',
  updated_at TIMESTAMPTZ DEFAULT now(),
  updated_by UUID
);

-- Status log for rate limiting
CREATE TABLE IF NOT EXISTS status_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  spot_id TEXT REFERENCES spots(id),
  user_id UUID NOT NULL,
  new_status TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Row Level Security
ALTER TABLE spots ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can view spots" ON spots;
DROP POLICY IF EXISTS "Auth users can update status" ON spots;
CREATE POLICY "Anyone can view spots" ON spots FOR SELECT USING (true);
CREATE POLICY "Auth users can update status" ON spots FOR UPDATE USING (true) WITH CHECK (auth.uid() IS NOT NULL);

ALTER TABLE status_log ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can insert log" ON status_log;
DROP POLICY IF EXISTS "Anyone can read log" ON status_log;
CREATE POLICY "Anyone can insert log" ON status_log FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Anyone can read log" ON status_log FOR SELECT USING (true);

-- Enable Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE spots;

-- ============================================================
-- SEED FLOORS
-- ============================================================
INSERT INTO floors (id, name, display_order) VALUES
  ('basement', 'Basement', 0),
  ('first', 'First Floor', 1),
  ('second', 'Second Floor', 2),
  ('third', 'Third Floor', 3)
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- SEED SPOTS — ALL 206 SPOTS
-- ============================================================
INSERT INTO spots (id, floor_id, name, type, capacity, x_percent, y_percent) VALUES
-- BASEMENT (64 spots)
('B1','basement','Carrel B1','carrel',1,33.5,44.5),
('B2','basement','Carrel B2','carrel',1,33.5,41.5),
('B3','basement','Carrel B3','carrel',1,33.5,39.0),
('B4','basement','Carrel B4','carrel',1,33.5,36.5),
('B5','basement','Carrel B5','carrel',1,33.5,34.0),
('B6','basement','Carrel B6','carrel',1,33.5,31.5),
('B7','basement','Carrel B7','carrel',1,33.5,29.0),
('B8','basement','Carrel B8','carrel',1,33.5,26.5),
('B9','basement','Carrel B9','carrel',1,33.0,20.5),
('B10','basement','Carrel B10','carrel',1,35.5,20.5),
('B11','basement','Carrel B11','carrel',1,38.0,20.5),
('B12','basement','Carrel B12','carrel',1,40.0,20.5),
('B13','basement','Carrel B13','carrel',1,42.0,20.5),
('B14','basement','Carrel B14','carrel',1,44.0,20.5),
('B15','basement','Carrel B15','carrel',1,46.0,20.5),
('B16','basement','Carrel B16','carrel',1,62.0,20.0),
('B17','basement','Carrel B17','carrel',1,64.0,20.0),
('B18','basement','Carrel B18','carrel',1,66.0,20.0),
('B19','basement','Carrel B19','carrel',1,68.0,20.0),
('B20','basement','Carrel B20','carrel',1,72.0,22.0),
('B21','basement','Carrel B21','carrel',1,72.0,24.0),
('B22','basement','Carrel B22','carrel',1,72.0,26.0),
('B23','basement','Carrel B23','carrel',1,72.0,28.0),
('B24','basement','Carrel B24','carrel',1,72.0,30.0),
('B25','basement','Carrel B25','carrel',1,72.0,32.0),
('B26','basement','Carrel B26','carrel',1,72.0,34.0),
('B27','basement','Carrel B27','carrel',1,72.0,36.5),
('B28','basement','Carrel B28','carrel',1,72.0,38.5),
('B29','basement','Carrel B29','carrel',1,72.0,40.5),
('B30','basement','Carrel B30','carrel',1,63.0,49.0),
('B31','basement','Carrel B31','carrel',1,63.0,51.0),
('B32','basement','Carrel B32','carrel',1,63.0,53.0),
('B33','basement','Carrel B33','carrel',1,63.0,55.0),
('B34','basement','Carrel B34','carrel',1,63.0,57.0),
('B35','basement','Carrel B35','carrel',1,63.0,59.0),
('B36','basement','Carrel B36','carrel',1,63.0,61.0),
('B37','basement','Carrel B37','carrel',1,63.0,63.0),
('B38','basement','Carrel B38','carrel',1,63.0,65.0),
('B39','basement','Carrel B39','carrel',1,63.0,67.0),
('B40','basement','Carrel B40','carrel',1,63.0,69.0),
('B41','basement','Carrel B41','carrel',1,63.0,71.0),
('B42','basement','Computer Station B42','computer',1,55.5,48.0),
('B43','basement','Carrel B43','carrel',1,50.5,53.0),
('B44','basement','Study Room B44','study_room',6,45.5,55.0),
('B45','basement','Study Room B45','study_room',6,42.5,55.0),
('B46','basement','Group Table B46','group_table',5,40.0,63.5),
('B47','basement','Group Table B47','group_table',5,45.0,62.0),
('B48','basement','Study Room B48','study_room',6,40.0,76.5),
('B49','basement','Study Room B49','study_room',6,44.5,76.0),
('B50','basement','Study Room B50','study_room',6,46.0,82.0),
('B51','basement','Study Room B51','study_room',6,49.0,82.0),
('B52','basement','Study Room B52','study_room',6,52.0,82.0),
('B53','basement','Study Room B53','study_room',6,55.0,82.0),
('B54','basement','Group Table B54','group_table',5,50.5,76.0),
('B55','basement','Group Table B55','group_table',5,55.5,26.0),
('B56','basement','Group Table B56','group_table',5,55.5,29.0),
('B57','basement','Group Table B57','group_table',5,55.5,31.5),
('B58','basement','Group Table B58','group_table',5,55.5,34.0),
('B59','basement','Group Table B59','group_table',5,55.5,36.5),
('B60','basement','Group Table B60','group_table',5,55.5,39.0),
('B61','basement','Group Table B61','group_table',5,55.5,41.5),
('B62','basement','Group Table B62','group_table',5,48.0,23.5),
('B63','basement','Group Table B63','group_table',5,51.5,23.5),
('B64','basement','Group Table B64','group_table',5,55.5,23.5),

-- FIRST FLOOR (55 spots)
('F1','first','Group Table F1','group_table',4,53.5,80.0),
('F2','first','Couch Table F2','couch_table',5,52.0,74.0),
('F3','first','Couch Table F3','couch_table',5,56.5,74.0),
('F4','first','Group Table F4','group_table',5,61.0,72.5),
('F5','first','Group Table F5','group_table',5,61.0,68.0),
('F6','first','Group Table F6','group_table',5,66.5,72.0),
('F7','first','Group Table F7','group_table',5,66.5,68.0),
('F8','first','Group Table F8','group_table',5,66.5,64.0),
('F9','first','Group Table F9','group_table',5,66.5,60.0),
('F10','first','Group Table F10','group_table',5,66.5,55.5),
('F11','first','Group Table F11','group_table',5,63.0,60.0),
('F12','first','Group Table F12','group_table',5,63.0,52.0),
('F13','first','Adjustable Computer F13','adjustable_computer',2,58.5,63.5),
('F14','first','Adjustable Computer F14','adjustable_computer',2,55.0,63.5),
('F15','first','Adjustable Computer F15','adjustable_computer',2,51.5,63.5),
('F16','first','Adjustable Computer F16','adjustable_computer',2,58.5,59.0),
('F17','first','Adjustable Computer F17','adjustable_computer',2,55.0,59.0),
('F18','first','Adjustable Computer F18','adjustable_computer',2,51.5,59.0),
('F19','first','Adjustable Computer F19','adjustable_computer',2,58.5,54.5),
('F20','first','Adjustable Computer F20','adjustable_computer',2,55.0,54.5),
('F21','first','Adjustable Computer F21','adjustable_computer',2,51.5,54.5),
('F22','first','Group Table F22','group_table',4,63.0,28.0),
('F23','first','Group Table F23','group_table',4,65.0,31.5),
('F24','first','Group Table F24','group_table',4,67.0,28.0),
('F25','first','Group Table F25','group_table',4,67.0,33.5),
('F26','first','Group Table F26','group_table',4,76.0,36.0),
('F27','first','Group Table F27','group_table',4,76.0,33.0),
('F28','first','Group Table F28','group_table',4,76.0,30.0),
('F29','first','Group Table F29','group_table',4,76.0,25.0),
('F30','first','Group Table F30','group_table',4,76.0,22.0),
('F31','first','Group Table F31','group_table',4,71.5,12.0),
('F32','first','Group Table F32','group_table',4,64.0,13.5),
('F33','first','Group Table F33','group_table',4,60.0,11.5),
('F34','first','Group Table F34','group_table',4,59.0,17.0),
('F35','first','Group Table F35','group_table',4,58.0,20.0),
('F36','first','Group Table F36','group_table',4,57.5,24.5),
('F37','first','Group Table F37','group_table',4,55.5,21.5),
('F38','first','Group Table F38','group_table',4,53.0,19.5),
('F39','first','Group Table F39','group_table',4,53.5,24.0),
('F40','first','Group Table F40','group_table',4,49.0,19.5),
('F41','first','Group Table F41','group_table',4,49.5,23.0),
('F42','first','Group Table F42','group_table',4,47.5,26.5),
('F43','first','Group Table F43','group_table',4,46.5,22.5),
('F44','first','Group Table F44','group_table',4,44.5,17.5),
('F45','first','Group Table F45','group_table',4,55.0,11.0),
('F46','first','Group Table F46','group_table',4,53.0,5.5),
('F47','first','Group Table F47','group_table',4,51.0,10.0),
('F48','first','Group Table F48','group_table',4,49.0,5.5),
('F49','first','Group Table F49','group_table',4,47.0,5.5),
('F50','first','Group Table F50','group_table',4,46.0,11.0),
('F51','first','Group Table F51','group_table',4,39.5,10.5),
('F52','first','Group Table F52','group_table',4,36.5,15.0),
('F53','first','Group Table F53','group_table',4,33.5,10.5),
('F54','first','Group Table F54','group_table',4,33.5,15.0),
('F55','first','Group Table F55','group_table',4,29.5,10.5),

-- SECOND FLOOR (77 spots)
('S1','second','Carrel S1','carrel',1,73.5,15.5),
('S2','second','Carrel S2','carrel',1,72.5,13.0),
('S3','second','Carrel S3','carrel',1,70.5,13.0),
('S4','second','Carrel S4','carrel',1,68.5,13.0),
('S5','second','Carrel S5','carrel',1,66.5,13.0),
('S6','second','Carrel S6','carrel',1,64.0,13.0),
('S7','second','Carrel S7','carrel',1,62.0,13.0),
('S8','second','Carrel S8','carrel',1,58.0,18.0),
('S9','second','Carrel S9','carrel',1,58.0,20.5),
('S10','second','Carrel S10','carrel',1,58.0,23.0),
('S11','second','Carrel S11','carrel',1,58.0,25.5),
('S12','second','Carrel S12','carrel',1,59.5,12.0),
('S13','second','Carrel S13','carrel',1,55.0,14.5),
('S14','second','Carrel S14','carrel',1,53.0,14.5),
('S15','second','Carrel S15','carrel',1,50.5,14.5),
('S16','second','Carrel S16','carrel',1,48.5,14.5),
('S17','second','Carrel S17','carrel',1,46.5,14.5),
('S18','second','Carrel S18','carrel',1,44.5,14.5),
('S19','second','Carrel S19','carrel',1,42.5,14.5),
('S20','second','Carrel S20','carrel',1,40.5,14.5),
('S21','second','Carrel S21','carrel',1,37.0,14.5),
('S22','second','Carrel S22','carrel',1,35.0,14.5),
('S23','second','Carrel S23','carrel',1,33.0,14.5),
('S24','second','Carrel S24','carrel',1,31.0,14.5),
('S25','second','Carrel S25','carrel',1,28.5,19.0),
('S26','second','Carrel S26','carrel',1,29.5,22.0),
('S27','second','Carrel S27','carrel',1,29.5,24.5),
('S28','second','Carrel S28','carrel',1,29.5,27.0),
('S29','second','Carrel S29','carrel',1,27.5,29.5),
('S30','second','Carrel S30','carrel',1,31.5,30.0),
('S31','second','Group Table S31','group_table',5,47.0,20.5),
('S32','second','Group Table S32','group_table',5,51.0,20.5),
('S33','second','Computer Station S33','computer',2,48.0,28.0),
('S34','second','Computer Station S34','computer',2,51.0,28.0),
('S35','second','Computer Station S35','computer',2,68.0,28.0),
('S36','second','Computer Station S36','computer',2,72.0,28.0),
('S37','second','Group Table S37','group_table',5,25.0,36.0),
('S38','second','Group Table S38','group_table',5,30.0,36.0),
('S39','second','Group Table S39','group_table',5,29.0,34.0),
('S40','second','Group Table S40','group_table',5,31.5,35.5),
('S41','second','Group Table S41','group_table',5,33.5,32.5),
('S42','second','Carrel S42','carrel',1,31.0,38.5),
('S43','second','Carrel S43','carrel',1,33.0,38.5),
('S44','second','Computer Station S44','computer',2,38.5,40.5),
('S45','second','Group Table S45','group_table',5,39.0,33.5),
('S46','second','Group Table S46','group_table',5,40.0,33.5),
('S47','second','Group Table S47','group_table',5,41.0,33.5),
('S48','second','Group Table S48','group_table',5,42.0,33.5),
('S49','second','Group Table S49','group_table',5,43.0,33.5),
('S50','second','Group Table S50','group_table',5,44.0,33.5),
('S51','second','Group Table S51','group_table',5,60.0,31.5),
('S52','second','Group Table S52','group_table',5,61.0,31.5),
('S53','second','Group Table S53','group_table',5,62.0,31.5),
('S54','second','Group Table S54','group_table',5,63.0,31.5),
('S55','second','Group Table S55','group_table',5,64.0,31.5),
('S56','second','Group Table S56','group_table',5,65.0,31.5),
('S57','second','Large Table S57','large_table',10,68.0,34.5),
('S58','second','Large Table S58','large_table',6,53.5,43.5),
('S59','second','Carrel S59','carrel',1,37.0,53.5),
('S60','second','Carrel S60','carrel',1,39.0,53.5),
('S61','second','Carrel S61','carrel',1,42.5,79.5),
('S62','second','Carrel S62','carrel',1,42.5,76.5),
('S63','second','Enclosed Carrel S63','carrel_enclosed',1,46.0,74.0),
('S64','second','Enclosed Carrel S64','carrel_enclosed',1,47.5,74.0),
('S65','second','Enclosed Carrel S65','carrel_enclosed',1,49.0,74.0),
('S66','second','Enclosed Carrel S66','carrel_enclosed',1,46.0,76.5),
('S67','second','Enclosed Carrel S67','carrel_enclosed',1,47.5,76.5),
('S68','second','Enclosed Carrel S68','carrel_enclosed',1,49.0,76.5),
('S69','second','Enclosed Carrel S69','carrel_enclosed',1,46.0,78.5),
('S70','second','Enclosed Carrel S70','carrel_enclosed',1,47.5,78.5),
('S71','second','Group Table S71','group_table',5,46.5,82.5),
('S72','second','Group Table S72','group_table',5,50.5,82.5),
('S73','second','Group Table S73','group_table',5,54.0,79.0),
('S74','second','Carrel S74','carrel',1,59.0,42.0),
('S75','second','Carrel S75','carrel',1,61.0,42.0),
('S76','second','Carrel S76','carrel',1,63.0,42.0),
('S77','second','Computer Station S77','computer',2,64.5,42.0),

-- THIRD FLOOR (10 spots)
('T1','third','Carrel T1','carrel',1,50.0,44.5),
('T2','third','Carrel T2','carrel',1,52.0,44.5),
('T3','third','Carrel T3','carrel',1,54.0,44.5),
('T4','third','Carrel T4','carrel',1,56.0,44.5),
('T5','third','Carrel T5','carrel',1,58.0,44.5),
('T6','third','Carrel T6','carrel',1,60.0,44.5),
('T7','third','Carrel T7','carrel',1,62.0,44.5),
('T8','third','Group Table T8','group_table',4,37.0,31.0),
('T9','third','Group Table T9','group_table',4,43.0,31.0),
('T10','third','Group Table T10','group_table',4,53.0,31.0)
ON CONFLICT (id) DO NOTHING;
