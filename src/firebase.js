import * as firebase from 'firebase'
var firebaseConfig = {
    apiKey: "AIzaSyBZQDOQOrexkgUwauYy6NRgRGa0yGOzq_M",
    authDomain: "spyco-34e82.firebaseapp.com",
    databaseURL: "https://spyco-34e82.firebaseio.com",
    projectId: "spyco-34e82",
    storageBucket: "spyco-34e82.appspot.com",
    messagingSenderId: "384091952144",
    appId: "1:384091952144:web:be7395204ca9c1dde9e695",
    measurementId: "G-F08K7XN77R"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const database = firebase.database().ref('/notes')