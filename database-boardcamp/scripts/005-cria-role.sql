import dotenv from "dotenv";
dotenv.config();

DO
$$
BEGIN
  IF NOT EXISTS (
    SELECT FROM pg_catalog.pg_roles WHERE rolname='bootcamp_role'
  ) THEN
    CREATE ROLE bootcamp_role WITH SUPERUSER CREATEDB CREATEROLE LOGIN ENCRYPTED PASSWORD process.env.USERPASSWORD;
  END IF;
END
$$;