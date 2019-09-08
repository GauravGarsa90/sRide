1. Installation
    1. install npm
    2. run `npm install` on the root
    3. command to run server is npm run start, this will transpile the code and then run the server
2. MySQL table setup
    1. create a new schema with name sride
    2. run following command to create the table
        CREATE TABLE `sride`.`audit_logs` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `date` VARCHAR(45) NULL,
        `response` TEXT(1000) NULL,
        `was_prime` TINYINT NULL,
        PRIMARY KEY (`id`));
