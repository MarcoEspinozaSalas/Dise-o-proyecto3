const express = require('express');
const router = express.Router();
const status = require('http-status');

const firebase = require('firebase-admin')
const serviceAccount = require('../configFireBase/proyectodisenno2-78b51-firebase-adminsdk-ngcvl-6594304f46.json');

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: 'https://fir-angular-auth-cdb4a-default-rtdb.firebaseio.com/'
});


async function saveInformation(uid, email, displayName) {

    try {

        var pool = firebase.firestore();
        await pool.collection('registeredUsers').add({
            uid: uid,
            email: email,
            displayName: displayName
        }).then(() => console.log())
            .catch(() => console.log())

    } catch {
        return false;
    }
}

async function getPlayerInfo(uid) {

    var user;

    try {
        var pool = firebase.firestore();
        await pool.collection('registered Users').where('uid', "==", uid).
            get().then(snapshot => {
                snapshot.forEach(async doc => {
                    user = await doc.data()

                })
            });

        return user;
    } catch (err) {
        return undefined;
    }
}


//------------------------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------------------------//
//Lista de amigos
//------------------------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------------------------//
/*
router.post('/createdFL', async (req, res) => {

    const listOwner = await getPlayerInfo(req.body.idListOwner)
    const listName = req.body.listName;

    var alreadyExist = false;

    try {

        var db = firebase.firestore();

        await db.collection('friendList')
            .get()
            .then(snapshot => {
                snapshot.forEach(async doc => {
                    if (await doc.data().listOwner.uid === listOwner.uid) {
                        alreadyExist = true;
                    }
                });
            });

        if (!alreadyExist) {
          db.collection('friendList').add({
              listOwner: listOwner,
              listName: listName,
              friendList: FLGenerator()

          }).then(response => {
              res.status(status.OK).json({ idFriendList: response.id, ListName: listName});
          }).catch(err => {
              res.status(status.INTERNAL_SERVER_ERROR).json(err);
          });
        }
        else
          res.status(status.OK).json({ message: 'Already Exist' });

    } catch (err) {
        res.status(status.INTERNAL_SERVER_ERROR).json({ error: err });
    }
});


router.get('/getFriendListByOwner', async (req, res) => {

    const idListOwner = req.query.idListOwner;

    try {

        var db = firebase.firestore();

        var data = '';

        db.collection('friendList').where('listOwner.uid', "==", idListOwner).get()
        .then(snapshot => {
          snapshot.forEach(async doc => {
            data = doc.data();
          });
            res.status(status.OK).json({data});
        }).catch(err => {
            res.status(status.INTERNAL_SERVER_ERROR).json(err);
        });

    } catch (err) {
        res.status(status.INTERNAL_SERVER_ERROR).json({ error: err });
    }
});



router.put('/editFriendList', async (req, res) => {

    const idList = req.body.idList;
    const listName = req.body.listName;

    try {

        var db = firebase.firestore();

        db.collection('friendList').doc(idList).update({
            listName: listName

        }).then(response => {
            res.status(status.OK).json({ idFriendList: response.id });
        }).catch(err => {
            res.status(status.INTERNAL_SERVER_ERROR).json(err);
        });

    } catch (err) {
        res.status(status.INTERNAL_SERVER_ERROR).json({ error: err });
    }
});


router.put('/addFriend', async (req, res) => {
    try {

        const idList = req.body.idList;
        const friend= await getPlayerInfo(req.body.idFriend)

        var db = firebase.firestore();

        let ref = db.collection('friendList').doc(idList);

        let updateList = ref.update({
            friendList: firebase.firestore.FieldValue.arrayUnion(friend)

        }).then(response => {
            res.status(status.OK).json({ success: 200 });
        }).catch(err => {
            res.status(status.INTERNAL_SERVER_ERROR).json(err);
        });

    } catch (err) {
        res.status(status.INTERNAL_SERVER_ERROR).json({ error: err });
    }
});

router.put('/removeFriend', async (req, res) => {
    try {

        const idList = req.body.idList;
        const friend= await getPlayerInfo(req.body.idFriend)

        var db = firebase.firestore();

        let ref = db.collection('friendList').doc(idList);

        let updateList = ref.update({
            friendList: firebase.firestore.FieldValue.arrayRemove(friend)

        }).then(response => {
            res.status(status.OK).json({ success: 200 });
        }).catch(err => {
            res.status(status.INTERNAL_SERVER_ERROR).json(err);
        });

    } catch (err) {
        res.status(status.INTERNAL_SERVER_ERROR).json({ error: err });
    }
});
*/
module.exports = router;
