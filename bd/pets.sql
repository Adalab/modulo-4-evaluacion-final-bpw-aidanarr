CREATE DATABASE memorablePets;
USE memorablePets;

CREATE TABLE pets (
	id int auto_increment primary key not null,
    name VARCHAR(45) not null,
    species VARCHAR(45) not null,
    sex VARCHAR(45) not null,
    descr VARCHAR(255) not null
);

INSERT INTO `memorablepets`.`pets` (`name`, `species`, `sex`, `descr`) VALUES ('Luka', 'perro', 'h', 'El perrete más chiquitín del mundo. Vivía por y para su mamá (y la comida).');
INSERT INTO `memorablepets`.`pets` (`name`, `species`, `sex`, `descr`) VALUES ('Niko', 'hamster', 'm', 'Un hamster con muy mala leche.');
INSERT INTO `memorablepets`.`pets` (`name`, `species`, `sex`, `descr`) VALUES ('Lola', 'ninfa', 'h', 'Se escapó en nochevieja, la muy desagradecida.');
INSERT INTO `memorablepets`.`pets` (`name`, `species`, `sex`, `descr`) VALUES ('Pepa', 'perro', 'h', 'Pepita linda, era un angelito.');
INSERT INTO `memorablepets`.`pets` (`name`, `species`, `sex`, `descr`) VALUES ('Nala', 'perro', 'h', 'La mamá de Luka, tiene mucho aguante.');
INSERT INTO `memorablepets`.`pets` (`name`, `species`, `sex`, `descr`) VALUES ('Gaia', 'gato', 'h', 'Es un ser perfecto.');
INSERT INTO `memorablepets`.`pets` (`name`, `species`, `sex`, `descr`) VALUES ('Señor Dorotencio', 'tortuga', 'm', 'Le gustaba esconderse detrás de los armarios.');
INSERT INTO `memorablepets`.`pets` (`name`, `species`, `sex`, `descr`) VALUES ('Tata', 'perro', 'h', 'Tatita bebé, amante de los tequeños. Es un perrito langosta.');
INSERT INTO `memorablepets`.`pets` (`name`, `species`, `sex`, `descr`) VALUES ('Macarena', 'perro', 'h', 'Tiene orejas preciosas y una voz muy aguda.');
INSERT INTO `memorablepets`.`pets` (`name`, `species`, `sex`, `descr`) VALUES ('Nikito', 'hamster', 'm', 'El hamster de mi prima. Se copió del nombre del mío.');
INSERT INTO `memorablepets`.`pets` (`name`, `species`, `sex`, `descr`) VALUES ('Dana', 'cobaya', 'h', 'Le daban unos espasmos un poco raros.');
INSERT INTO `memorablepets`.`pets` (`name`, `species`, `sex`, `descr`) VALUES ('Estrella', 'perro', 'h', 'Era más lista que el hambre.');
INSERT INTO `memorablepets`.`pets` (`name`, `species`, `sex`, `descr`) VALUES ('Huevo pelao', 'perro', 'm', 'No sabemos su nombre real.');
INSERT INTO `memorablepets`.`pets` (`name`, `species`, `sex`, `descr`) VALUES ('Mosqui', 'mosca', 'm', 'Cualquier mosca puede ser mosqui.');
