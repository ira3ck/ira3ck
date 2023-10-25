class Main {

    constructor() {
        console.log('Iniciando APP')
        this.objects()
        this.events()
    }

    nominees = [];
    selectedID = 0;
    uid = null;
    user = null;

    clearNominees() {
        this.nomineeCont.innerHTML = '';
        nominees = [];
    }

    nomineeListener(id) {
        this.selectedID = id
        console.log({ selectedID: this.selectedID })
    };

    signedOut() {
        this.need_sign_in.hidden = false;
        this.only_signed.hidden = true;
    }
    signedIn() {
        this.need_sign_in.hidden = true;
        this.only_signed.hidden = false;
    }

    setUID(_uid) {
        this.uid = _uid
    }
    setUser(_user) {
        this.user = _user
    }

    setVoteData(_votoCant) {
        this.votoCant = _votoCant
    }

    objects() {
        this.nomineeCont = document.getElementById("nominees");
        this.only_signed = document.getElementById("only-signed");
        this.need_sign_in = document.getElementById("need-sign-in");
        this.sign_in_btn = document.getElementById("sign-in-btn");
        this.confirmPP = document.getElementById('confirmPP');
        this.noVoto = document.getElementById('noVoto');
        this.siVoto = document.getElementById('siVoto');
    }

    events() {
        this.noVoto.addEventListener("click", () => {
            document.getElementById('confirmPP').close();
        })

        this.siVoto.addEventListener("click", this.voteListener)
    }
}

export const MAIN = new Main()