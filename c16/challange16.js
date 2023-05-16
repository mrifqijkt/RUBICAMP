class Car {
    constructor(varian, door, seat, tyre, year, warranty) {
        this.varian = varian;
        this.door = door;
        this.seat = seat;
        this.year = year;
        this.tyre = tyre;
        this.warranty = warranty;
    }
}

class Tyre {
    constructor(brand, size) {
        this.brand = brand;
        this.size = size;
    }
}

class Agya extends Car {
    constructor(year) {
        super('Agya', 5, 5, 'dunlop 15 inch', year, '1 year');
        this.type = 'Agya';
    }
}

class Rush extends Car {
    constructor(year) {
        super('Rush', 5, 5, 'bridgestone 17 inch', year, '3 years');
        this.type = 'Rush';
    }
}

class Alya extends Car {
    constructor(year) {
        super('Alya', 5, 5, 'michellin 15 inch', year, '5 years');
        this.type = 'Alya';
    }
}

class CarFactory {
    constructor() {
        this.cars = [];
    }

    static acak() {
        return Math.floor(Math.random() * 9);
    }

    produksi(tahun) {
        for (let i = 0; i < CarFactory.acak(); i++) {
            this.cars.push(new Agya(tahun));
        }
        for (let i = 0; i < CarFactory.acak(); i++) {
            this.cars.push(new Rush(tahun));
        }
        for (let i = 0; i < CarFactory.acak(); i++) {
            this.cars.push(new Alya(tahun));
        }
    }

    warranty(year) {
        console.log('Daftar mobil yang telah diproduksi:');
        this.cars.forEach((content) => {
            console.log(`
            Nama Mobil: ${content.type}
            varian: ${content.varian}
            door: ${content.door}
            seat: ${content.seat}
            tyre: ${content.tyre}
            year: ${content.year} 
            warranty: ${content.warranty} 
            Masa berlaku garansi: ${
                year - content.year > parseInt(content.warranty) ? 'Tidak berlaku' : 'Masih berlaku'
            }
            
            `);
        });
    }
}

let pabrik = new CarFactory();

pabrik.produksi(2020);
pabrik.warranty(2025);
