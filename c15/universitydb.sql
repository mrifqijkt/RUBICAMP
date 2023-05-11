--mahasiswa
nim(PK)  nama   alamat   jurusan(FK) umur
M001     rifqi  jakarta  ipa         17
M002     gema   bandung  ips         18
M003     fahmi  bandung  mtk         20
M004     yudi   medan    pkn         21

--nilai
nim(PK)  nama   nilai
M001     rifqi  C
M002     gema   C
M003     fahmi  B
M004     yudi   A

--jurusan
IDJURUSAN(PK)   namajurusan
J122            ipa
J133            ips
J144            mtk
J155            pkn

--dosen
IDDOSEN(PK)    namadosen
D133           rubi henjaya

--matakuliah
IDMATAKULIAH(PK)    namamatakuliah    sks 
T144                seni              9
T155                musik             9
T166                budaya            11
T177                sains             13

CREATE TABLE mahasiswa(
    nim CHARACTER(4)PRIMARY KEY NOT NULL,
    nama VARCHAR(100)NOT NULL,
    alamat VARCHAR(100)NOT NULL,
    jurusan VARCHAR(50)NOT NULL,
    umur INTEGER NOT NULL
);

INSERT INTO mahasiswa(nim,nama,alamat,jurusan,umur)
VALUES("M001","rifqi","jakarta","ipa",17),
("M002","gema","bandung","ips",18),
("M003","fahmi","bandung","mtk",20),
("M004","yudi","medan","pkn",21);

CREATE TABLE jurusan(
IDJURUSAN CHARACTER(4)PRIMARY KEY NOT NULL,
namajurusan VARCHAR(100)NOT NULL
);

INSERT INTO jurusan(IDJURUSAN,namajurusan)
VALUES("J122","ipa"),
("J133","ips"),
("J144","mtk"),
("J155","pkn");

CREATE TABLE dosen(
IDDOSEN CHARACTER(4)PRIMARY KEY NOT NULL,
namadosen VARCHAR(100)NOT NULL
);

INSERT INTO dosen(IDDOSEN,namadosen)
VALUES("D133","rubi henjaya");

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
(2,"M002","D133","T155","C"),
(3,"M003","D133","T166","A"),
(4,"M004","D133","T177","A");

SELECT nim,nama,alamat,jurusan,umur FROM mahasiswa WHERE mahasiswa.umur < 20; 

SELECT * FROM mahasiswa INNER JOIN mengikuti on mahasiswa.nim = mengikuti.nim;

SELECT nama,matakuliah.namamatakuliah,NILAI FROM mahasiswa INNER JOIN mengikuti ON mahasiswa.nim = mengikuti.nim INNER JOIN matakuliah ON mengikuti.IDMATAKULIAH = matakuliah.IDMATAKULIAH WHERE mengikuti.NILAI = "A" OR "B";