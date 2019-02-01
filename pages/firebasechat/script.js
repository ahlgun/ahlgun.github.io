// FIREBASE
const auth = firebase.auth();

// INPUT VALUES
let signupEmail = document.getElementById('signupEmail');
let signupName = document.getElementById('signupName');
let signupPassword = document.getElementById('signupPassword');
let loginEmail = document.getElementById('loginEmail');
let loginPassword = document.getElementById('loginPassword');
let btnLogin = document.getElementById('btnLogin');
let btnSignUp = document.getElementById('btnSignUp');
let btnLogout = document.getElementById('btnLogout');
let btnPost = document.getElementById('btnPostMessage');

let msgAmount;

// SIGN UP
btnSignup.addEventListener('click', e => {
	let promise = auth.createUserWithEmailAndPassword(signupEmail.value, signupPassword.value);
	promise.then(user => {
		createNewUser(user.uid, signupName.value, signupEmail.value);
	});
	promise.catch(e => {
		console.log(e.message)
	});
});

// CREATE USER
function createNewUser(uid, name, email) {
  	firebase.database().ref('users/' + uid).set({name: name, email: email, online: true});
  	setCurrentUser(name, email, uid);
}

// SET USER
function setCurrentUser(name, email, id) {
	localStorage.setItem('currentUserName', name); 
	localStorage.setItem('currentUserEmail', email); 
	localStorage.setItem('currentUserId', id);
}

// LOG IN
btnLogin.addEventListener('click', event => {
	let promise = auth.signInWithEmailAndPassword(loginEmail.value, loginPassword.value);
	promise.then(user => {
		firebase.database().ref('users/').once('value', snapshot => {
			let database = snapshot.val();
			for(let object in database) {
				if(database[object].email === loginEmail.value) {
					setCurrentUser(database[object].name, database[object].email, user.uid);
				}
			}
		});
	});
	promise.catch(error => {
		console.log(error.message)
	});
});

// POST
btnPost.addEventListener('click', event => {
	post();
});

function post() {
	let msgText = document.getElementById('messageText').value;
	if(msgText) {
		let id = msgAmount + 1;
    	firebase.database().ref('messages/' + id).set({name:currentUserName, message:msgText, time:new Date().toLocaleString(), likes:null, dislikes:null, id:id});
    	msgText = '';
    	document.getElementById('messageText').value = '';
	}
}

// LOG OUT
btnLogout.addEventListener('click', e => {
	setUserStateOnline(false);
	auth.signOut();
	popup('You are now logged out.');
});

function setUserStateOnline(state) {
	firebase.database().ref('users/' + currentUserId).set({
		name: currentUserName,
    	email: currentUserEmail,
    	online: state
    });
}

function updateCurrentUser() {
	currentUserName = localStorage.getItem('currentUserName');
	currentUserEmail = localStorage.getItem('currentUserEmail');
	currentUserId = localStorage.getItem('currentUserId');
}

function clearCurrentUser() {
	localStorage.setItem('currentUserName', undefined);
	localStorage.setItem('currentUserEmail', undefined);
	localStorage.setItem('currentUserId', undefined);
	updateCurrentUser();
}

function displayCurrentUser(id) {
	if(id === currentUserId) {
		popup('Logged in as: ' + currentUserName);
	}
}

function getArrayLength(array) {
	if(array == null) return 0;
	else {
		sum = 0;
		for(let i=0; i<array.length; i++) {
			sum++;
		}
		return sum;
	}
}

function updateMessages(data) {
	document.getElementById('messages').innerHTML = '';
	msgAmount = 0;
	for(let obj in data) {
		let current = data[obj];
		let msgId = msgAmount + 1;
		let msg = document.createElement('div');
		msg.className = 'message';
		msg.id = msgAmount + 1;
		let name = document.createElement('p');
		name.innerHTML = current.name;
		name.className = 'name';
		msg.appendChild(name);
		let message = document.createElement('p');
		message.innerHTML = current.message;
		message.className = 'msg';
		msg.appendChild(message);
		let time = document.createElement('p');
		time.innerHTML = current.time;
		time.className = 'time';
		msg.appendChild(time);
		let like = document.createElement('span');
		like.innerHTML = getArrayLength(current.likes) + ' <i class="fa fa-check" aria-hidden="true"></i>';
		like.addEventListener('click', () => {addLike(msgId);});
		msg.appendChild(like);
		let dislike = document.createElement('span');
		dislike.innerHTML = getArrayLength(current.dislikes) + ' <i class="fa fa-times" aria-hidden="true"></i>';
		dislike.addEventListener('click', () => {addDislike(msgId);});
		msg.appendChild(dislike);
		document.getElementById('messages').appendChild(msg);
		msgAmount++;
	}
}

auth.onAuthStateChanged(user => {
	if(user) {
		displayChatPage();
		updateCurrentUser();
		displayCurrentUser(user.uid);
		setUserStateOnline(true);
		addEnterEvent();
		firebase.database().ref('messages/').on('value', snapshot => {
			updateMessages(snapshot.val());
			document.getElementById('messages').scrollTop = document.getElementById('messages').scrollHeight;
		});
		firebase.database().ref('users/').on('value', snapshot => {
			checkOnlineUsers(snapshot.val());
		});
	}
	else displayLoginPage();
});

function addEnterEvent() {
	document.getElementById('messageText').addEventListener('keydown', e => {
    	if (e.keyCode == 13) {
        	post();
    	}
	});
}

function displayLoginPage() {
	document.getElementById('chat').classList.add('hide');
	document.getElementById('login').classList.remove('hide');
}

function displayChatPage() {
	document.getElementById('chat').classList.remove('hide');
	document.getElementById('login').classList.add('hide');
}

function checkOnlineUsers(database) {
	document.getElementById('users').innerHTML = '';
	for(let object in database) {
		displayUser(database[object]);
	}
}

function displayUser(user) {
	let p = document.createElement('p');
		p.innerHTML = user.name;
		if(user.online) p.innerHTML += '<span class="online"> <i class="fa fa-circle" aria-hidden="true"></i><span>';
		else p.innerHTML += '<span class="offline"> <i class="fa fa-circle" aria-hidden="true"></i><span>';
	document.getElementById('users').appendChild(p);
}

function popup(message) {
    var x = document.getElementById("snackbar");
    x.className = "show";
    x.innerHTML = message;
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

function arrayValue(array, id, type) {
	let currentUser = localStorage.getItem('currentUserName');
	if(!array) {
		firebase.database().ref('messages/' + id + type).set([currentUser]);
		return;
	}
    for(var i in array){
        if(array[i]==currentUser){
			var index = array.indexOf(currentUser);
            array.splice(index,1);
            if (!array.length) firebase.database().ref('messages/' + id + type).set(null);
            else 			   firebase.database().ref('messages/' + id + type).set(array);
			return;
		}
	}
	array.push(currentUser);
	firebase.database().ref('messages/' + id + type).set(array);
}

function addLike(id) {
	firebase.database().ref('messages/' + id).once('value', snapshot => {
		let current = snapshot.val();
		arrayValue(snapshot.val().likes, id, '/likes');
	});
}

function addDislike(id) {
	firebase.database().ref('messages/' + id).once('value', snapshot => {
		let current = snapshot.val();
		arrayValue(snapshot.val().dislikes, id, '/dislikes');
	});
}

