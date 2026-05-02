-- ============================================================
-- SpotFinder — Corrected Coordinates
-- Run in Supabase SQL Editor to update all spot positions
-- ============================================================

-- BASEMENT
-- Left carrel column (B1-B8): at x≈30%, going from y≈37% (B1, bottom) up to y≈24% (B8, top)
UPDATE spots SET x_percent=30.0, y_percent=37.0 WHERE id='B1';
UPDATE spots SET x_percent=30.0, y_percent=35.0 WHERE id='B2';
UPDATE spots SET x_percent=30.0, y_percent=33.0 WHERE id='B3';
UPDATE spots SET x_percent=30.0, y_percent=31.0 WHERE id='B4';
UPDATE spots SET x_percent=30.0, y_percent=29.0 WHERE id='B5';
UPDATE spots SET x_percent=30.0, y_percent=27.0 WHERE id='B6';
UPDATE spots SET x_percent=30.0, y_percent=25.0 WHERE id='B7';
UPDATE spots SET x_percent=30.0, y_percent=23.0 WHERE id='B8';

-- Top row carrels (B9-B15): at y≈18%, spanning x from 44% to 58%
UPDATE spots SET x_percent=44.5, y_percent=18.0 WHERE id='B9';
UPDATE spots SET x_percent=46.5, y_percent=18.0 WHERE id='B10';
UPDATE spots SET x_percent=48.5, y_percent=18.0 WHERE id='B11';
UPDATE spots SET x_percent=50.5, y_percent=18.0 WHERE id='B12';
UPDATE spots SET x_percent=52.5, y_percent=18.0 WHERE id='B13';
UPDATE spots SET x_percent=54.5, y_percent=18.0 WHERE id='B14';
UPDATE spots SET x_percent=56.5, y_percent=18.0 WHERE id='B15';

-- Right top carrels (B16-B19): at y≈18%, x from 62% to 71%
UPDATE spots SET x_percent=62.5, y_percent=18.0 WHERE id='B16';
UPDATE spots SET x_percent=65.0, y_percent=18.0 WHERE id='B17';
UPDATE spots SET x_percent=67.5, y_percent=18.0 WHERE id='B18';
UPDATE spots SET x_percent=70.0, y_percent=18.0 WHERE id='B19';

-- Right column carrels (B20-B29): at x≈74%, y from 21% down to 40%
UPDATE spots SET x_percent=74.0, y_percent=21.0 WHERE id='B20';
UPDATE spots SET x_percent=74.0, y_percent=23.0 WHERE id='B21';
UPDATE spots SET x_percent=74.0, y_percent=25.0 WHERE id='B22';
UPDATE spots SET x_percent=74.0, y_percent=27.0 WHERE id='B23';
UPDATE spots SET x_percent=74.0, y_percent=29.0 WHERE id='B24';
UPDATE spots SET x_percent=74.0, y_percent=31.0 WHERE id='B25';
UPDATE spots SET x_percent=74.0, y_percent=33.0 WHERE id='B26';
UPDATE spots SET x_percent=74.0, y_percent=35.0 WHERE id='B27';
UPDATE spots SET x_percent=74.0, y_percent=37.0 WHERE id='B28';
UPDATE spots SET x_percent=74.0, y_percent=39.0 WHERE id='B29';

-- Right side carrel column (B30-B41): at x≈65%, y from 45% to 68%
UPDATE spots SET x_percent=65.0, y_percent=45.0 WHERE id='B30';
UPDATE spots SET x_percent=65.0, y_percent=47.0 WHERE id='B31';
UPDATE spots SET x_percent=65.0, y_percent=49.0 WHERE id='B32';
UPDATE spots SET x_percent=65.0, y_percent=51.0 WHERE id='B33';
UPDATE spots SET x_percent=65.0, y_percent=53.0 WHERE id='B34';
UPDATE spots SET x_percent=65.0, y_percent=55.0 WHERE id='B35';
UPDATE spots SET x_percent=65.0, y_percent=57.0 WHERE id='B36';
UPDATE spots SET x_percent=65.0, y_percent=59.0 WHERE id='B37';
UPDATE spots SET x_percent=65.0, y_percent=61.0 WHERE id='B38';
UPDATE spots SET x_percent=65.0, y_percent=63.0 WHERE id='B39';
UPDATE spots SET x_percent=65.0, y_percent=65.0 WHERE id='B40';
UPDATE spots SET x_percent=65.0, y_percent=67.0 WHERE id='B41';

-- B42 computer station (center)
UPDATE spots SET x_percent=57.0, y_percent=44.0 WHERE id='B42';

-- B43 carrel (center-left)
UPDATE spots SET x_percent=52.0, y_percent=49.0 WHERE id='B43';

-- B44-B45 study rooms (upper center)
UPDATE spots SET x_percent=45.5, y_percent=51.0 WHERE id='B44';
UPDATE spots SET x_percent=43.0, y_percent=51.0 WHERE id='B45';

-- B46-B47 group tables
UPDATE spots SET x_percent=40.5, y_percent=59.0 WHERE id='B46';
UPDATE spots SET x_percent=46.0, y_percent=57.5 WHERE id='B47';

-- B48-B53 study rooms (lower section)
UPDATE spots SET x_percent=40.0, y_percent=72.0 WHERE id='B48';
UPDATE spots SET x_percent=45.0, y_percent=71.5 WHERE id='B49';
UPDATE spots SET x_percent=47.5, y_percent=78.0 WHERE id='B50';
UPDATE spots SET x_percent=51.0, y_percent=78.0 WHERE id='B51';
UPDATE spots SET x_percent=54.0, y_percent=78.0 WHERE id='B52';
UPDATE spots SET x_percent=57.0, y_percent=78.0 WHERE id='B53';

-- B54 group table
UPDATE spots SET x_percent=51.0, y_percent=71.5 WHERE id='B54';

-- B55-B61 group tables (center column, x≈57)
UPDATE spots SET x_percent=57.0, y_percent=23.5 WHERE id='B55';
UPDATE spots SET x_percent=57.0, y_percent=26.5 WHERE id='B56';
UPDATE spots SET x_percent=57.0, y_percent=29.5 WHERE id='B57';
UPDATE spots SET x_percent=57.0, y_percent=32.5 WHERE id='B58';
UPDATE spots SET x_percent=57.0, y_percent=35.5 WHERE id='B59';
UPDATE spots SET x_percent=57.0, y_percent=38.5 WHERE id='B60';
UPDATE spots SET x_percent=57.0, y_percent=41.5 WHERE id='B61';

-- B62-B64 group tables (top center)
UPDATE spots SET x_percent=48.5, y_percent=21.0 WHERE id='B62';
UPDATE spots SET x_percent=52.0, y_percent=21.0 WHERE id='B63';
UPDATE spots SET x_percent=57.0, y_percent=21.0 WHERE id='B64';

-- ============================================================
-- FIRST FLOOR
-- ============================================================

-- F1 group table (bottom center, near entrance)
UPDATE spots SET x_percent=53.5, y_percent=80.5 WHERE id='F1';

-- F2-F3 couch tables
UPDATE spots SET x_percent=52.0, y_percent=74.5 WHERE id='F2';
UPDATE spots SET x_percent=57.0, y_percent=74.5 WHERE id='F3';

-- F4-F12 group tables (right-center area)
UPDATE spots SET x_percent=61.5, y_percent=73.0 WHERE id='F4';
UPDATE spots SET x_percent=61.5, y_percent=68.5 WHERE id='F5';
UPDATE spots SET x_percent=67.0, y_percent=72.5 WHERE id='F6';
UPDATE spots SET x_percent=67.0, y_percent=68.0 WHERE id='F7';
UPDATE spots SET x_percent=67.0, y_percent=63.5 WHERE id='F8';
UPDATE spots SET x_percent=67.0, y_percent=59.0 WHERE id='F9';
UPDATE spots SET x_percent=67.0, y_percent=54.5 WHERE id='F10';
UPDATE spots SET x_percent=63.0, y_percent=59.5 WHERE id='F11';
UPDATE spots SET x_percent=63.0, y_percent=51.5 WHERE id='F12';

-- F13-F21 adjustable computers (3x3 grid)
UPDATE spots SET x_percent=59.5, y_percent=63.0 WHERE id='F13';
UPDATE spots SET x_percent=56.0, y_percent=63.0 WHERE id='F14';
UPDATE spots SET x_percent=52.5, y_percent=63.0 WHERE id='F15';
UPDATE spots SET x_percent=59.5, y_percent=58.5 WHERE id='F16';
UPDATE spots SET x_percent=56.0, y_percent=58.5 WHERE id='F17';
UPDATE spots SET x_percent=52.5, y_percent=58.5 WHERE id='F18';
UPDATE spots SET x_percent=59.5, y_percent=54.0 WHERE id='F19';
UPDATE spots SET x_percent=56.0, y_percent=54.0 WHERE id='F20';
UPDATE spots SET x_percent=52.5, y_percent=54.0 WHERE id='F21';

-- F22-F25 group tables (upper-right cluster)
UPDATE spots SET x_percent=63.5, y_percent=27.5 WHERE id='F22';
UPDATE spots SET x_percent=65.5, y_percent=31.0 WHERE id='F23';
UPDATE spots SET x_percent=67.5, y_percent=27.5 WHERE id='F24';
UPDATE spots SET x_percent=67.5, y_percent=33.5 WHERE id='F25';

-- F26-F30 group tables (right column)
UPDATE spots SET x_percent=77.0, y_percent=36.0 WHERE id='F26';
UPDATE spots SET x_percent=77.0, y_percent=32.5 WHERE id='F27';
UPDATE spots SET x_percent=77.0, y_percent=29.0 WHERE id='F28';
UPDATE spots SET x_percent=77.0, y_percent=24.5 WHERE id='F29';
UPDATE spots SET x_percent=77.0, y_percent=21.0 WHERE id='F30';

-- F31-F55 group tables (upper scattered area)
UPDATE spots SET x_percent=72.0, y_percent=11.5 WHERE id='F31';
UPDATE spots SET x_percent=64.5, y_percent=13.0 WHERE id='F32';
UPDATE spots SET x_percent=60.5, y_percent=11.0 WHERE id='F33';
UPDATE spots SET x_percent=59.5, y_percent=16.5 WHERE id='F34';
UPDATE spots SET x_percent=58.5, y_percent=19.5 WHERE id='F35';
UPDATE spots SET x_percent=58.0, y_percent=23.5 WHERE id='F36';
UPDATE spots SET x_percent=56.0, y_percent=21.0 WHERE id='F37';
UPDATE spots SET x_percent=53.5, y_percent=19.0 WHERE id='F38';
UPDATE spots SET x_percent=54.0, y_percent=23.5 WHERE id='F39';
UPDATE spots SET x_percent=49.5, y_percent=19.0 WHERE id='F40';
UPDATE spots SET x_percent=50.0, y_percent=22.5 WHERE id='F41';
UPDATE spots SET x_percent=48.0, y_percent=26.0 WHERE id='F42';
UPDATE spots SET x_percent=47.0, y_percent=22.0 WHERE id='F43';
UPDATE spots SET x_percent=45.0, y_percent=17.0 WHERE id='F44';
UPDATE spots SET x_percent=55.5, y_percent=10.5 WHERE id='F45';
UPDATE spots SET x_percent=53.5, y_percent=5.5  WHERE id='F46';
UPDATE spots SET x_percent=51.5, y_percent=10.0 WHERE id='F47';
UPDATE spots SET x_percent=49.5, y_percent=5.5  WHERE id='F48';
UPDATE spots SET x_percent=47.5, y_percent=5.5  WHERE id='F49';
UPDATE spots SET x_percent=46.5, y_percent=11.0 WHERE id='F50';
UPDATE spots SET x_percent=40.0, y_percent=10.5 WHERE id='F51';
UPDATE spots SET x_percent=37.0, y_percent=15.0 WHERE id='F52';
UPDATE spots SET x_percent=34.0, y_percent=10.5 WHERE id='F53';
UPDATE spots SET x_percent=34.0, y_percent=15.0 WHERE id='F54';
UPDATE spots SET x_percent=30.0, y_percent=10.5 WHERE id='F55';

-- ============================================================
-- SECOND FLOOR
-- ============================================================

-- S1-S7 top-right carrels (row at top-right)
UPDATE spots SET x_percent=74.5, y_percent=14.5 WHERE id='S1';
UPDATE spots SET x_percent=72.5, y_percent=12.5 WHERE id='S2';
UPDATE spots SET x_percent=70.5, y_percent=12.5 WHERE id='S3';
UPDATE spots SET x_percent=68.5, y_percent=12.5 WHERE id='S4';
UPDATE spots SET x_percent=66.5, y_percent=12.5 WHERE id='S5';
UPDATE spots SET x_percent=64.0, y_percent=12.5 WHERE id='S6';
UPDATE spots SET x_percent=62.0, y_percent=12.5 WHERE id='S7';

-- S8-S11 carrels (right column below S1)
UPDATE spots SET x_percent=59.0, y_percent=17.5 WHERE id='S8';
UPDATE spots SET x_percent=59.0, y_percent=20.0 WHERE id='S9';
UPDATE spots SET x_percent=59.0, y_percent=22.5 WHERE id='S10';
UPDATE spots SET x_percent=59.0, y_percent=25.0 WHERE id='S11';

-- S12 top center-right carrel
UPDATE spots SET x_percent=60.5, y_percent=11.5 WHERE id='S12';

-- S13-S20 top-center row carrels
UPDATE spots SET x_percent=55.0, y_percent=14.0 WHERE id='S13';
UPDATE spots SET x_percent=53.0, y_percent=14.0 WHERE id='S14';
UPDATE spots SET x_percent=50.5, y_percent=14.0 WHERE id='S15';
UPDATE spots SET x_percent=48.5, y_percent=14.0 WHERE id='S16';
UPDATE spots SET x_percent=46.5, y_percent=14.0 WHERE id='S17';
UPDATE spots SET x_percent=44.5, y_percent=14.0 WHERE id='S18';
UPDATE spots SET x_percent=42.5, y_percent=14.0 WHERE id='S19';
UPDATE spots SET x_percent=40.5, y_percent=14.0 WHERE id='S20';

-- S21-S24 top-left carrels
UPDATE spots SET x_percent=37.5, y_percent=14.0 WHERE id='S21';
UPDATE spots SET x_percent=35.5, y_percent=14.0 WHERE id='S22';
UPDATE spots SET x_percent=33.5, y_percent=14.0 WHERE id='S23';
UPDATE spots SET x_percent=31.5, y_percent=14.0 WHERE id='S24';

-- S25-S30 left column carrels
UPDATE spots SET x_percent=29.5, y_percent=18.5 WHERE id='S25';
UPDATE spots SET x_percent=30.5, y_percent=21.5 WHERE id='S26';
UPDATE spots SET x_percent=30.5, y_percent=24.0 WHERE id='S27';
UPDATE spots SET x_percent=30.5, y_percent=26.5 WHERE id='S28';
UPDATE spots SET x_percent=28.5, y_percent=29.0 WHERE id='S29';
UPDATE spots SET x_percent=32.5, y_percent=29.5 WHERE id='S30';

-- S31-S32 group tables (top center)
UPDATE spots SET x_percent=47.5, y_percent=20.5 WHERE id='S31';
UPDATE spots SET x_percent=51.5, y_percent=20.5 WHERE id='S32';

-- S33-S36 computer stations
UPDATE spots SET x_percent=48.5, y_percent=27.5 WHERE id='S33';
UPDATE spots SET x_percent=51.5, y_percent=27.5 WHERE id='S34';
UPDATE spots SET x_percent=68.5, y_percent=27.5 WHERE id='S35';
UPDATE spots SET x_percent=72.5, y_percent=27.5 WHERE id='S36';

-- S37-S41 group tables (left-center area)
UPDATE spots SET x_percent=26.5, y_percent=35.5 WHERE id='S37';
UPDATE spots SET x_percent=31.5, y_percent=35.5 WHERE id='S38';
UPDATE spots SET x_percent=30.5, y_percent=33.5 WHERE id='S39';
UPDATE spots SET x_percent=33.0, y_percent=35.0 WHERE id='S40';
UPDATE spots SET x_percent=35.0, y_percent=32.0 WHERE id='S41';

-- S42-S43 carrels
UPDATE spots SET x_percent=32.0, y_percent=38.0 WHERE id='S42';
UPDATE spots SET x_percent=34.0, y_percent=38.0 WHERE id='S43';

-- S44 computer
UPDATE spots SET x_percent=39.5, y_percent=40.0 WHERE id='S44';

-- S45-S50 group tables row
UPDATE spots SET x_percent=40.0, y_percent=33.0 WHERE id='S45';
UPDATE spots SET x_percent=41.5, y_percent=33.0 WHERE id='S46';
UPDATE spots SET x_percent=43.0, y_percent=33.0 WHERE id='S47';
UPDATE spots SET x_percent=44.5, y_percent=33.0 WHERE id='S48';
UPDATE spots SET x_percent=46.0, y_percent=33.0 WHERE id='S49';
UPDATE spots SET x_percent=47.5, y_percent=33.0 WHERE id='S50';

-- S51-S56 group tables row (right center)
UPDATE spots SET x_percent=60.5, y_percent=31.0 WHERE id='S51';
UPDATE spots SET x_percent=62.0, y_percent=31.0 WHERE id='S52';
UPDATE spots SET x_percent=63.5, y_percent=31.0 WHERE id='S53';
UPDATE spots SET x_percent=65.0, y_percent=31.0 WHERE id='S54';
UPDATE spots SET x_percent=66.5, y_percent=31.0 WHERE id='S55';
UPDATE spots SET x_percent=68.0, y_percent=31.0 WHERE id='S56';

-- S57 large table (far right)
UPDATE spots SET x_percent=70.0, y_percent=34.0 WHERE id='S57';

-- S58 large table (center)
UPDATE spots SET x_percent=54.5, y_percent=43.0 WHERE id='S58';

-- S59-S60 carrels (left-center)
UPDATE spots SET x_percent=38.0, y_percent=52.5 WHERE id='S59';
UPDATE spots SET x_percent=40.0, y_percent=52.5 WHERE id='S60';

-- S61-S62 carrels (lower section)
UPDATE spots SET x_percent=43.5, y_percent=76.5 WHERE id='S61';
UPDATE spots SET x_percent=43.5, y_percent=73.5 WHERE id='S62';

-- S63-S70 enclosed carrels (2 rows x 3-4 cols)
UPDATE spots SET x_percent=47.0, y_percent=71.5 WHERE id='S63';
UPDATE spots SET x_percent=48.5, y_percent=71.5 WHERE id='S64';
UPDATE spots SET x_percent=50.0, y_percent=71.5 WHERE id='S65';
UPDATE spots SET x_percent=47.0, y_percent=73.5 WHERE id='S66';
UPDATE spots SET x_percent=48.5, y_percent=73.5 WHERE id='S67';
UPDATE spots SET x_percent=50.0, y_percent=73.5 WHERE id='S68';
UPDATE spots SET x_percent=47.0, y_percent=75.5 WHERE id='S69';
UPDATE spots SET x_percent=48.5, y_percent=75.5 WHERE id='S70';

-- S71-S73 group tables (lower section)
UPDATE spots SET x_percent=47.0, y_percent=79.5 WHERE id='S71';
UPDATE spots SET x_percent=51.0, y_percent=79.5 WHERE id='S72';
UPDATE spots SET x_percent=54.5, y_percent=76.5 WHERE id='S73';

-- S74-S76 carrels + S77 computer (center area)
UPDATE spots SET x_percent=60.0, y_percent=41.5 WHERE id='S74';
UPDATE spots SET x_percent=62.0, y_percent=41.5 WHERE id='S75';
UPDATE spots SET x_percent=64.0, y_percent=41.5 WHERE id='S76';
UPDATE spots SET x_percent=66.0, y_percent=41.5 WHERE id='S77';

-- ============================================================
-- THIRD FLOOR (no changes needed — simple layout)
-- ============================================================
UPDATE spots SET x_percent=50.0, y_percent=44.5 WHERE id='T1';
UPDATE spots SET x_percent=52.0, y_percent=44.5 WHERE id='T2';
UPDATE spots SET x_percent=54.0, y_percent=44.5 WHERE id='T3';
UPDATE spots SET x_percent=56.0, y_percent=44.5 WHERE id='T4';
UPDATE spots SET x_percent=58.0, y_percent=44.5 WHERE id='T5';
UPDATE spots SET x_percent=60.0, y_percent=44.5 WHERE id='T6';
UPDATE spots SET x_percent=62.0, y_percent=44.5 WHERE id='T7';
UPDATE spots SET x_percent=37.0, y_percent=31.0 WHERE id='T8';
UPDATE spots SET x_percent=43.0, y_percent=31.0 WHERE id='T9';
UPDATE spots SET x_percent=53.0, y_percent=31.0 WHERE id='T10';
