import axios from 'axios';

// API URL here!
const url = '';

// Userkey field is not asked, so we just use one of them...
// This is used for POST

// For deletion and edit, the key is obtained straight from the
// clicked box

const userKeyPOST = ""; // A secret ID would be here

export async function getMessages() {
    const response = await axios.get(url+'/allMessages')
    return response.data;
}

export async function postMessage(message) {
    const response = await axios.post(url + '/newMessage', {"message": message}, {
        headers: { 'userkey': userKeyPOST }
    });
    return response.data;
}

export async function deleteMessage(id, userKey) {
    const response = await axios.delete(url + `/deleteMessage/${id}`, {
        headers: { 'userkey': userKey }
    });
    return response;
}

export async function updateMessage(userKey, id, message) {
    const response = await axios.put(url + '/modifyMessage', { 'message': message, 'id': id }, {
        headers: { 'userkey': userKey }
        })
    return response;
}