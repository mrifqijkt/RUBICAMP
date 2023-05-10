
-- mahasiswa

NIM(PK)   nama   alamat           jurusan(FK)
M001      rifqi  JL.jakarta raya  ekonomi

-- jurusan
IDJURUSAN(PK)  namajurusan  
J122           ekonomi      

--dosen
IDDOSEN(PK)    nama
D133           rubi henjaya

--matakuliah
IDMATAKULIAH(PK)  nama  sks 
T144              seni  2   


CREATE TABLE mahasiswa(
NIM VARCHAR(50)PRIMARY KEY NOT NULL,
nama VARCHAR(100)NOT NULL,
alamat VARCHAR(100)NOT NULL,
jurusan VARCHAR(100)NOT NULL
);

INSERT INTO mahasiswa(NIM,nama,alamat,jurusan)
VALUES("M001","rifqi","JL.jakarta raya","ekonomi");

CREATE TABLE jurusan(
IDJURUSAN VARCHAR(50)PRIMARY KEY NOT NULL,
namajurusan VARCHAR(100)NOT NULL
);

INSERT INTO jurusan(IDJURUSAN,namajurusan)
VALUES("J122","ekonomi");

CREATE TABLE dosen(
IDDOSEN VARCHAR(50)PRIMARY KEY NOT NULL,
nama VARCHAR(100)NOT NULL
);

INSERT INTO dosen(IDDOSEN,nama)
VALUES("D133","rubi henjaya");

CREATE TABLE matakuliah(
IDMATAKULIAH VARCHAR(50)PRIMARY KEY NOT NULL,
nama VARCHAR(100)NOT NULL,
sks INTEGER NOT NULL
);

INSERT INTO matakuliah(IDMATAKULIAH,nama,sks)
VALUES("T144","seni",3);