class Stato {
    ord;             // numero ordine nell'array dei selezionati
    id;               // indice nel json da API
    name;
    flag;
    capital; 

    constructor (ord, id, name, flag, capital) {
        this.ord = ord;
        this.id = id;
        this.name = name;
        this.flag = flag;
        this.capital = capital;
    }
} 