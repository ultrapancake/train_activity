$(document).ready(function(){

    var config = {
        apiKey: "AIzaSyAps7A8eUfYJekx1P2_YxyfFe61S-hzFTI",
        authDomain: "monwedrocks.firebaseapp.com",
        databaseURL: "https://monwedrocks.firebaseio.com",
        projectId: "monwedrocks",
        storageBucket: "",
        messagingSenderId: "1037120276780",
        appId: "1:1037120276780:web:2e40442674be8a91f28489"
    };

    firebase.initializeApp(config);

    var database = firebase.database();
})