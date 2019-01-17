-- REG
CREATE TABLE registrations (
    reg_id text PRIMARY KEY,
    exemption_type integer,
    title text,
    description text,
    explanation text,
    owner_id integer,
    email_address text,
    status text,
    submitted_datetime timestamp without time zone,
    owner_name text,
    owner_address text,
    owner_postcode text
);

--CREATE UNIQUE INDEX registrations_pkey ON registrations(reg_id text_ops);



-- TYPES
CREATE TABLE exemptiontypes (
    exemption_type_id integer PRIMARY KEY,
    exemption_type_name text,
    exemption_type_shortname text
);

--CREATE UNIQUE INDEX exemptiontypes_pkey ON exemptiontypes(exemption_type_id int4_ops);
