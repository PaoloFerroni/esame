const URL = "https://restcountries.com/v3.1/region/";
const SEL_CONTINENTE = document.getElementById('selContinente');
const BTN_PLAY = document.getElementById('play');
const DOMANDA = document.getElementById('domanda');
const FLAGS = document.getElementById('flags');

const ESITO = document.getElementById('esito');
const PARTITE = document.getElementById('partite');
const VITTORIE = document.getElementById('vittorie');

let continente = "";
let nPartite = 0;
let nVittorie = 0;

BTN_PLAY.disabled = true; // finchè non scegli un continente, non puoi gicare
SEL_CONTINENTE.value = "";

// Scelta continente
SEL_CONTINENTE.addEventListener('click', function () {
    // console.log("Hai cliccato sul selettore dei continenti");
    DOMANDA.textContent = "";
    ESITO.textContent = "";
    

    if (SEL_CONTINENTE.value == "") {
        BTN_PLAY.disabled = true;

    } else {
        continente = SEL_CONTINENTE.value;
        console.log(continente); 
        FLAGS.innerHTML = "";
        BTN_PLAY.disabled = false;
    }
})

// Gioco
BTN_PLAY.addEventListener('click', function () {
    // console.log("Hai cliccato su play");
    FLAGS.innerHTML = "";
    DOMANDA.textContent = "";
    ESITO.textContent = "";
    
    nPartite++;
    BTN_PLAY.disabled = true;   //  gioco in corso

    fetch(URL + continente)
        .then(r => r.json())
        .then(stati => {
            console.log( " fetch - stati");
            const arrStati = [];
            
            let i = 0;
            // scelgo a caso 3 stati
            while (i < 3) {
                let num = numRandom(stati.length);
                // console.log( "numero random (0-" + stati.length + ") = " + num);
                for (let st of arrStati) {
                    if (st.id == num) {      // questo stato è gia stato scelto
                        console.log("ce l'ho già");
                        num = -1;
                    }
                }
                if (num > -1 && stati[num].capital != "" && stati[num].capital != undefined) {
                    console.log("stato[" + num + "] = " + stati[num].name.common);
                    arrStati.push(new Stato(i, num, stati[num].name.common, stati[num].flags.png, stati[num].capital));
                    i++
                }
            }
            //console.log("arrStati " + arrStati);

            rCapitale = numRandom(3);
            // console.log(rCapitale);
            DOMANDA.textContent = arrStati[rCapitale].capital + " è la capitale di quale stato?"

            for (const stato of arrStati) {
                // console.log(stato.id + " - nome: " + stato.name + " - capitale: " + stato.capital);
                const CARD = document.createElement('div');
                CARD.setAttribute('style', "width: 18rem; height: 20rem; background-color: #956ede; margin: 1rem; overflow: hidden;")
                CARD.setAttribute('id', "card" + stato.ord);
                
                const IMG_FLAG = document.createElement('img');
                IMG_FLAG.setAttribute('src', stato.flag);
                IMG_FLAG.setAttribute('class', "card-img-top h-50" );
                IMG_FLAG.setAttribute('id', "flag" + stato.ord);
                IMG_FLAG.setAttribute('style',"padding: 4px 4px 0 4px;");
                IMG_FLAG.setAttribute('alt', "bandiera " + stato.name)
                IMG_FLAG.disabled = false;
                CARD.appendChild(IMG_FLAG);

                CARD_BD = document.createElement('div');
                CARD_BD.setAttribute('class', "card-body min-vh-100");
                CARD_BD.setAttribute('id', "cBody" + stato.ord);
                // CARD_BD.setAttribute('style', "height: 35%;");

                const STATO = document.createElement('h3');
                STATO.setAttribute('class', "h3");
                STATO.setAttribute('id', "stato" + stato.ord);
                STATO.setAttribute('style', "margin-left: 1rem;");
                STATO.textContent = stato.name;

                CARD_BD.appendChild(STATO);
                CARD.appendChild(CARD_BD);

                FLAGS.appendChild(CARD);

                IMG_FLAG.addEventListener('click', function() {
                    if (!IMG_FLAG.disabled) {
                        console.log("hai clickato " + IMG_FLAG.id + " - disabled = " + IMG_FLAG.disabled);
                        checkResp (stato.ord, rCapitale);
                        displCapitali(arrStati);
                    } else
                        console.log("hai clickato " + IMG_FLAG.id + " - ma non avrebbe dovuto rispondere è disabled = " + IMG_FLAG.disabled) + " !!!";
                     
                })
            }
    })
})

function checkResp(nResp, nCap) {
    console.log("lo stato giusto è " + nCap);

    // verifiico se la risposta è corretta
    if (nResp == nCap) {
        ESITO.textContent = "E' giusto!!!";
        ESITO.setAttribute('class', "bg-success text-white");
        
        VITTORIE.textContent = "Vittorie " + ++nVittorie; 

    } else {
        ESITO.textContent = "Mi spiace, è sbagliato";
        ESITO.setAttribute('class', "bg-danger text-white");
    }
    // aggiorno i contatori
    // console.log("Partite = " + nPartite + " - Vittorie " + nVittorie);
    PARTITE.textContent = "Partite   " + nPartite;
}    

function displCapitali(arr) {
    for (stato of arr) {
        // disabilito le 3 bandiere
        const BTN = document.getElementById('flag' + stato.ord);
        BTN.disabled = true;
        console.log("BTN - id = " + BTN.id + " - disabled = " + BTN.disabled);
        
        // mostro le capitali dei 3 stati
        // preparo i campi delle capitali, ma non li appendo
        const CAPITALE = document.createElement('h4');
        CAPITALE.setAttribute('style', "margin-left: 1rem;");
        CAPITALE.setAttribute('id', "capitale" + stato.ord);
        CAPITALE.textContent = stato.capital;
        document.getElementById('cBody' + stato.ord).appendChild(CAPITALE);
    }

    BTN_PLAY.disabled = false;      // riabilito il play
}

function numRandom (maxN) {
    return (parseInt(Math.random() * maxN))
}
