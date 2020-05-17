DROP DATABASE IF EXISTS pldb;
DROP USER IF EXISTS pldb_user@localhost;

CREATE DATABASE pldb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER pldb_user@localhost IDENTIFIED BY '#97XGE4gh!!!';
GRANT ALL PRIVILEGES ON pldb.* TO pldb_user@localhost;
