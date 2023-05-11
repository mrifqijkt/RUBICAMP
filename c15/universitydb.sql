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

SELECT umur FROM mahasiswa WHERE