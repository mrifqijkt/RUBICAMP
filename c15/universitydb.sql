CREATE TABLE mahasiswa(
    nim CHARACTER(4)PRIMARY KEY NOT NULL,
    nama VARCHAR(100)NOT NULL,
    alamat VARCHAR(100)NOT NULL,
    umur INTEGER NOT NULL,
    IDJURUSAN CHARACTER(4) NOT NULL,
    FOREIGN KEY (IDJURUSAN) REFERENCES jurusan (IDJURUSAN)
);

INSERT INTO mahasiswa(nim,nama,alamat,IDJURUSAN,umur)
VALUES("M001","rifqi","jakarta","J122",17),
("M002","gema","bandung","J133",18),
("M003","fahmi","bandung","J144",22),
("M004","yudi","medan","J155",21),
("M005","adi","jawa","J166",20);

CREATE TABLE jurusan(
IDJURUSAN CHARACTER(4)PRIMARY KEY NOT NULL,
namajurusan VARCHAR(100)NOT NULL
);

INSERT INTO jurusan(IDJURUSAN,namajurusan)
VALUES("J122","ipa"),
("J133","ips"),
("J144","mtk"),
("J155","pkn");

INSERT INTO jurusan(IDJURUSAN,namajurusan) VALUES ("J166","sbk");

CREATE TABLE dosen(
IDDOSEN CHARACTER(4)PRIMARY KEY NOT NULL,
namadosen VARCHAR(100)NOT NULL
);

INSERT INTO dosen(IDDOSEN,namadosen)
VALUES("D133","rubi henjaya");

INSERT INTO dosen(IDDOSEN,namadosen)
VALUES("D144","riki cuaca"),
("D155","rizki bilar"),
("D166","aldi taher"),
("D177","bunda corla");

CREATE TABLE matakuliah(
IDMATAKULIAH CHARACTER(4)PRIMARY KEY NOT NULL,
namamatakuliah VARCHAR(100)NOT NULL,
sks INTEGER NOT NULL
);

INSERT INTO matakuliah(IDMATAKULIAH,namamatakuliah,sks)
VALUES("T144","seni",9),
("T155","musik",9),
("T166","budaya",11),
("T177","sains",13);

INSERT INTO matakuliah(IDMATAKULIAH,namamatakuliah,sks) VALUES ("T188","Data Maining","9");

CREATE TABLE mengikuti(
  nom INTEGER PRIMARY KEY AUTOINCREMENT,
  nim CHARACTER (4) NOT NULL,
  IDDOSEN CHARACTER(4)NOT NULL,
  IDMATAKULIAH CHARACTER(4)NOT NULL,
  FOREIGN KEY (nim)REFERENCES mahasiswa(nim),
  FOREIGN KEY (IDDOSEN)REFERENCES dosen(IDDOSEN),
  FOREIGN KEY (IDMATAKULIAH)REFERENCES matakuliah(IDMATAKULIAH)
);

ALTER TABLE mengikuti add column NILAI CHARACTER(1);
 

INSERT INTO mengikuti(nom,nim,IDDOSEN,IDMATAKULIAH,NILAI)
VALUES(1,"M001","D133","T144","C"),
(2,"M002","D144","T155","D"),
(3,"M003","D155","T166","A"),
(4,"M004","D177","T177","A"),
(5,"M005","D177","T188","E");


-- soal 1

SELECT nim,nama,alamat,umur,jurusan.IDJURUSAN FROM mahasiswa INNER JOIN jurusan ON mahasiswa.IDJURUSAN = jurusan.IDJURUSAN;


-- soal 2

SELECT nim,nama,alamat,IDJURUSAN,umur FROM mahasiswa WHERE mahasiswa.umur < 20; 


-- soal 3

SELECT * FROM mahasiswa INNER JOIN mengikuti ON mahasiswa.nim = mengikuti.nim;

SELECT nama,matakuliah.namamatakuliah,NILAI FROM mahasiswa INNER JOIN mengikuti ON mahasiswa.nim = mengikuti.nim INNER JOIN matakuliah ON mengikuti.IDMATAKULIAH = matakuliah.IDMATAKULIAH WHERE mengikuti.NILAI = "A" OR "B";


-- soal 4

SELECT mahasiswa.*,(matakuliah.sks) AS total_sks FROM mahasiswa INNER JOIN mengikuti ON mengikuti.nim = mahasiswa.nim INNER JOIN matakuliah ON mengikuti.IDMATAKULIAH = matakuliah.IDMATAKULIAH GROUP BY mahasiswa.nim HAVING SUM (total_sks) > 10;


-- soal 5

SELECT mahasiswa.nama,matakuliah.namamatakuliah FROM mahasiswa INNER JOIN mengikuti ON mengikuti.nim = mahasiswa.nim INNER JOIN matakuliah ON mengikuti.IDMATAKULIAH = matakuliah.IDMATAKULIAH WHERE matakuliah.namamatakuliah = "Data Maining";


-- soal 6

SELECT dosen.IDDOSEN,dosen.namadosen,COUNT( DISTINCT mengikuti.nim) AS totalmahasiswa FROM mengikuti INNER JOIN dosen ON mengikuti.IDDOSEN = dosen.IDDOSEN GROUP BY dosen.IDDOSEN;


-- soal 7

SELECT nama,umur FROM mahasiswa ORDER BY umur asc;


-- soal 8

SELECT mahasiswa.nama,mahasiswa.nim,jurusan.namajurusan,dosen.namadosen,matakuliah.namamatakuliah,nilai FROM mahasiswa INNER JOIN mengikuti ON mahasiswa.nim = mengikuti.nim INNER JOIN matakuliah ON mengikuti.IDMATAKULIAH = matakuliah.IDMATAKULIAH INNER JOIN dosen ON mengikuti.IDDOSEN = dosen.IDDOSEN INNER JOIN jurusan ON mahasiswa.IDJURUSAN = jurusan.IDJURUSAN WHERE mengikuti.nilai BETWEEN "D" AND "E";

