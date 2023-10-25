import { MAIN } from "./main";

export class voteClass {

    constructor(data, listener) {
        this.name = data.name;
        this.cosName = data.cosName;
        this.referencia = data.referencia;
        this.votos = data.votos;
        this.id = data.id
        this.listener = listener
    }

    addNominee() {
        const nomineeCont = document.getElementById("nominees");
        var div = document.createElement('div');
        div.classList.add('costume');
        div.id = this.id
        var p = document.createElement('p');
        p.innerText = this.cosName.toString().toUpperCase()
        div.appendChild(p)
        var small = document.createElement('small')
        small.innerText = this.referencia.toString().toLowerCase()
        div.appendChild(small)
        var pn = document.createElement('p');
        pn.classList.add('right')
        pn.innerText = `by: ${this.name.toString().toUpperCase()}`
        div.appendChild(pn)
        nomineeCont.appendChild(div)

        this.addListener()
    }



    addListener() {
        let el = document.getElementById(this.id)
        el.addEventListener("click", () => {
            this.listener(this.id)

            if (el.classList.contains('selected')) {
                ///el.classList.remove('selected')
            } else {
                let v = document.getElementById('voter')
                if (v != null) v.remove()
                let allSelected = document.getElementsByClassName('selected');
                for (let index = 0; index < allSelected.length; index++) {
                    allSelected[index].classList.remove('selected');
                }
                el.classList.add('selected');

                this.appendVoter()
                this.addBtnListeners()
            }
        })
    }

    appendVoter() {
        let el = document.getElementById(this.id)

        var div = document.createElement('div');
        div.classList.add('voter');
        div.id = 'voter'

        var btn1 = document.createElement('button');
        var btn3 = document.createElement('button');
        var btn5 = document.createElement('button');
        btn1.innerText = '+1'
        btn1.id = 'uno'
        div.appendChild(btn1)
        btn3.innerText = '+3'
        btn3.id = 'tres'
        div.appendChild(btn3)
        btn5.id = 'cinco'
        btn5.innerText = '+5'
        div.appendChild(btn5)

        el.appendChild(div)
    }

    addBtnListeners() {
        document.getElementById('uno').addEventListener("click", () => {
            document.getElementById('puntos').innerText = 1
            document.getElementById('disfraz').innerText = this.cosName
            document.getElementById('confirmPP').showModal()
        })
        document.getElementById('tres').addEventListener("click", () => {
            document.getElementById('puntos').innerText = 3
            document.getElementById('disfraz').innerText = this.cosName
            document.getElementById('confirmPP').showModal()
        })
        document.getElementById('cinco').addEventListener("click", () => {
            document.getElementById('puntos').innerText = 5
            document.getElementById('disfraz').innerText = this.cosName
            document.getElementById('confirmPP').showModal()
        })
    }

}

// Firestore data converter
export const voteClassConverter = {
    toFirestore: (vote) => {
        return {
            name: vote.name,
            cosName: vote.cosName,
            referencia: vote.referencia,
            votos: vote.votos,
            id: vote.id
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new voteClass(data);
    }
};