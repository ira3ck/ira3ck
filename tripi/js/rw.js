import { collection, getDocs, doc, onSnapshot, updateDoc, addDoc, query, orderBy } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import { db, auth } from "./firebase_init.js"
import { voteClass, voteClassConverter } from "./voteClass.js";
import { MAIN } from "./main.js";

//Revisa autenticación

onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        MAIN.setUID(user.uid);
        MAIN.setUser(user);
        MAIN.signedIn();
        readAll();
        console.log(MAIN);
        // ...
    } else {
        // User is signed out
        // ...
        MAIN.signedOut();

        return;
    }
});

const provider = new GoogleAuthProvider();
document.getElementById("sign-in-btn").addEventListener("click", () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
})

document.getElementById("sign-out-btn").addEventListener("click", () => auth.signOut())


document.getElementById("addCostume").addEventListener("click", registerCostume)

async function registerCostume() {
    var name = document.getElementById('name')
    var cosName = document.getElementById('cosName')
    var referencia = document.getElementById('referencia')

    //Buscar si ya existe
    //Si sí existe, preguntar si quiere votar por él
    //si no existe, agregar

    const docRef = await addDoc(collection(db, "disfraces"), {
        name: cosName.value,
        cosName: name.value,
        votos: 0,
        id: "0",
        referencia: referencia.value
    });

    await updateDoc(docRef, {
        id: docRef.id
    });

    cosName.value = ''
    referencia.value = ''
}

document.getElementById('siVoto').addEventListener('click', () => {
    registerVote()
    MAIN.closeDialog()
})

async function registerVote() {
    const docRef = await addDoc(collection(db, "votacion"), {
        uid: MAIN.uid,
        votos: MAIN.votoCant,
        nid: MAIN.id
    });

    await updateDoc(docRef, {
        id: docRef.id
    });
}



var q = query(collection(db, "disfraces"), orderBy("cosName")).withConverter(voteClassConverter)
const unsub = readAll();

function readAll() {
    onSnapshot(q, (querySnapshot) => {
        MAIN.clearNominees();
        querySnapshot.forEach((doc) => {
            let nominee = new voteClass(doc.data(), MAIN.nomineeListener)
            MAIN.nominees.push(nominee)
            nominee.addNominee()
        });
    });
}