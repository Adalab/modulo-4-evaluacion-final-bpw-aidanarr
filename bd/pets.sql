CREATE DATABASE memorablePets;
USE memorablePets;

CREATE TABLE pets (
	id int auto_increment primary key not null,
    name VARCHAR(45) not null,
    species VARCHAR(45) not null,
    sex VARCHAR(45) not null,
    isAlive boolean,
    descr VARCHAR(255) not null
);

INSERT INTO `memorablepets`.`pets` (`name`, `species`, `sex`, `isAlive`, `descr`) VALUES ('Luka', 'perro', 'h', '0', 'El perrete más chiquitín del mundo. Vivía por y para su mamá (y la comida).');
INSERT INTO `memorablepets`.`pets` (`name`, `species`, `sex`, `isAlive`, `descr`) VALUES ('Niko', 'hamster', 'm', '0', 'Un hamster con muy mala leche.');
INSERT INTO `memorablepets`.`pets` (`name`, `species`, `sex`, `isAlive`, `descr`) VALUES ('Lola', 'ninfa', 'h', '0', 'Se escapó en nochevieja, la muy desagradecida.');
INSERT INTO `memorablepets`.`pets` (`name`, `species`, `sex`, `isAlive`, `descr`) VALUES ('Pepa', 'perro', 'h', '0', 'Pepita linda, era un angelito.');
INSERT INTO `memorablepets`.`pets` (`name`, `species`, `sex`, `isAlive`, `descr`) VALUES ('Nala', 'perro', 'h', '1', 'La mamá de Luka, tiene mucho aguante.');
INSERT INTO `memorablepets`.`pets` (`name`, `species`, `sex`, `isAlive`, `descr`) VALUES ('Gaia', 'gato', 'h', '0', 'Es un ser perfecto.');
INSERT INTO `memorablepets`.`pets` (`name`, `species`, `sex`, `isAlive`, `descr`) VALUES ('Señor Dorotencio', 'tortuga', 'm', '0', 'Le gustaba esconderse detrás de los armarios.');
INSERT INTO `memorablepets`.`pets` (`name`, `species`, `sex`, `isAlive`, `descr`) VALUES ('Tata', 'perro', 'h', '1', 'Tatita bebé, amante de los tequeños. Es un perrito langosta.');
INSERT INTO `memorablepets`.`pets` (`name`, `species`, `sex`, `isAlive`, `descr`) VALUES ('Macarena', 'perro', 'h', '1', 'Tiene orejas preciosas y una voz muy aguda.');
INSERT INTO `memorablepets`.`pets` (`name`, `species`, `sex`, `isAlive`, `descr`) VALUES ('Nikito', 'hamster', 'm', '0', 'El hamster de mi prima. Se copió del nombre del mío.');
INSERT INTO `memorablepets`.`pets` (`name`, `species`, `sex`, `isAlive`, `descr`) VALUES ('Dana', 'cobaya', 'h', '0', 'Le daban unos espasmos un poco raros.');
INSERT INTO `memorablepets`.`pets` (`name`, `species`, `sex`, `isAlive`, `descr`) VALUES ('Estrella', 'perro', 'h', '0', 'Era más lista que el hambre.');
INSERT INTO `memorablepets`.`pets` (`name`, `species`, `sex`, `isAlive`, `descr`) VALUES ('Huevo pelao', 'perro', 'm', '0', 'No sabemos su nombre real.');
INSERT INTO `memorablepets`.`pets` (`name`, `species`, `sex`, `isAlive`, `descr`) VALUES ('Mosqui', 'mosca', 'm', '1', 'Cualquier mosca puede ser mosqui.');
