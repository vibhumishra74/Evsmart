
CREATE DATABASE EVsmart;

-- download extension "uuid-ossp"
create extension if not exists "uuid-ossp";
CREATE TABLE users(
    user_id uuid PRIMARY KEY UNIQUE NOT NULL DEFAULT uuid_generate_v4(),
    user_firstname VARCHAR(245) NOT NULL,
    user_lastname VARCHAR(245) NOT NULL,
    user_phone BIGINT NOT NULL UNIQUE,
    user_email VARCHAR(245) NOT NULL UNIQUE,
    user_password VARCHAR(64) NOT NULL,
    user_verification BOOLEAN NOT NULL DEFAULT false,
    user_role VARCHAR(255) NOT NUll DEFAULT 'Normal',
    cs_status BOOLEAN NOT NULL DEFAULT false,
    user_created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    user_updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

--timestamp trigger for user
CREATE OR REPLACE FUNCTION trigger_set_timestamp_users()
RETURNS TRIGGER AS $$
BEGIN
  NEW.user_updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

--trigger  forusers
CREATE TRIGGER set_timestamp_users
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp_users();

-- charging stion table
CREATE TABLE charging_station(
  cs_id uuid PRIMARY KEY UNIQUE NOT NULL DEFAULT uuid_generate_v4(),
  cs_phone BIGINT NOT NULL,
  cs_openat TIME NOT NULL DEFAULT '00:00:00',
  cs_closeat TIME NOT NULL DEFAULT '23:59:59',
  cs_longitude NUMERIC(12,9) NOT NULL,
  cs_latitude NUMERIC(12,9) NOT NULL,
  cs_cost NUMERIC(9,2) NOT NULL,
  cs_verification BOOLEAN NOT NULL DEFAULT false,
  cs_created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  cs_updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  user_id uuid UNIQUE NOT NULL REFERENCES users (user_id)
);


--timestamp trigger for CS
CREATE OR REPLACE FUNCTION trigger_set_timestamp_cs()
RETURNS TRIGGER AS $$
BEGIN
  NEW.cs_updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

--trigger  for CS
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON charging_station
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp_cs();

-- Review Table
CREATE TABLE review(
  review_id uuid PRIMARY KEY UNIQUE NOT NULL DEFAULT uuid_generate_v4(),
  review_star NUMERIC(2,1) NOT NULL,
  review_comment VARCHAR(245) NOT NULL,
  review_created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  review_updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  cs_id uuid UNIQUE NOT NULL REFERENCES charging_station (cs_id),
  user_id uuid UNIQUE NOT NULL REFERENCES users (user_id) 
);

--timestamp trigger for review table
CREATE OR REPLACE FUNCTION trigger_set_timestamp_review()
RETURNS TRIGGER AS $$
BEGIN
  NEW.review_updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

--trigger for review table
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON review
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp_review();


-- test chargins station
INSERT INTO charging_station(cs_phone,cs_openat,cs_closeat,cs_longitude,cs_latitude,cs_cost,user_id)
VALUES(9990372304,'10:00:00','22:00:00',-45.7895442,-89.448245,800.56,'f720a607-53fb-4505-a622-6ac8498dbe29');

INSERT INTO charging_station(cs_phone,cs_openat,cs_closeat,cs_longitude,cs_latitude,cs_cost,user_id)
VALUES(9990372304,'10:00','22:00:00',45.785442,-88.448245,800.5656,'30ad5faa-7341-47d2-b806-7a887d3fdd38');

INSERT INTO charging_station(cs_phone,cs_longitude,cs_latitude,cs_cost,user_id)
VALUES(9990372304,45.7895442,-89.4248245,800.56,'757370fc-81cd-4b63-b470-4a5c1280cc37');

INSERT INTO charging_station(cs_phone,cs_openat,cs_closeat,cs_longitude,cs_latitude,cs_cost,user_id)
VALUES(9990372304,'10:00:00','22:00:00',45.7895442,-89.448245,800.56,'399baafe-8a6c-48ac-affd-101f2c64f59b');
-- test users
INSERT INTO users(user_firstname,user_lastname,user_phone,user_email,user_password)
VALUES('naman','gupta',99996420326,'guptanaman401@gmail.com','123456');

ALTER TABLE charging_station
ADD user_email VARCHAR(245) NOT NULL REFERENCES users (user_email) DEFAULT users (user_email);

ALTER TABLE users
ALTER COLUMN user_role VARCHAR(255) NOT NUll DEFAULT 'Normal',;

-- --ALTER TABLE users
-- ALTER TABLE users
-- DROP COLUMN user_create_date;
-- DROP COLUMN user_updated_date;
-- ALTER TABLE users
-- ADD user_verification BOOLEAN NOT NULL DEFAULT false;
-- ALTER TABLE users
-- ADD user_role CHAR(255) NOT NUll DEFAULT 'Normal';
-- ALTER TABLE users
-- ADD user_created_at TIMESTAMPTZ NOT NULL DEFAULT NOW();
-- ALTER TABLE users
-- ADD user_updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();

ALTER TABLE users
ALTER COLUMN user_id uuid PRIMARY KEY UNIQUE NOT NULL DEFAULT uuid_generate_v4();

ALTER TABLE charging_station
ALTER COLUMN cs_longitude NUMERIC(12,9) NOT NULL;
ALTER TABLE charging_station
ALTER COLUMN cs_latitude NUMERIC(12,9) NOT NULL;
ALTER TABLE charging_station
ALTER COLUMN user_id uuid FOREIGN KEY UNIQUE NOT NULL REFERENCES users (user_id);
-- --UPADTE THE ROWS
-- UPDATE users
-- SET user_password = 123456789
-- WHERE user_email = 'guptanaman40@gmail.com';