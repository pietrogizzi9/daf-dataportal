import fetch from 'isomorphic-fetch'
import page from './data/dataset'
import det from './data/datasetdetail'
import { serviceurl } from './config/serviceurl.js'

export const REQUEST_DATASETS = 'REQUEST_DATASETS'
export const RECEIVE_DATASETS = 'RECEIVE_DATASETS'
export const DELETE_DATASETS = 'DELETE_DATASETS'
export const SELECT_DATASET = 'SELECT_DATASET'
export const REQUEST_DATASET_DETAIL = 'REQUEST_DATASET_DETAIL'
export const RECEIVE_DATASET_DETAIL = 'RECEIVE_DATASET_DETAIL'
export const REQUEST_LOGIN = 'REQUEST_LOGIN'
export const RECEIVE_LOGIN = 'RECEIVE_LOGIN'
export const REMOVE_LOGGED_USER = 'REMOVE_LOGGED_USER'
export const RECEIVE_ORGANIZATION = 'RECEIVE_ORGANIZATION'
export const RECEIVE_REGISTRATION = 'RECEIVE_REGISTRATION'
export const RECEIVE_REGISTRATION_ERROR = 'RECEIVE_REGISTRATION_ERROR'
export const RECEIVE_ACTIVATION = 'RECEIVE_ACTIVATION'
export const RECEIVE_ACTIVATION_ERROR = 'RECEIVE_ACTIVATION_ERROR'
export const RECEIVE_ADD_DATASET = 'RECEIVE_ADD_DATASET'
export const RECEIVE_ONTOLOGIES = 'RECEIVE_ONTOLOGIES'


/*********************************** REDUX ************************************************ */

function receiveDataset(json) {
  console.log('receiveDataset');
  //This function creates an action that a reducer can handle 
  //Action are payload of information that sends data from the application to the store
  //Store doesn't have any other way to get data
  //Action are not responsible for update the state (only reducers) !!! 
  return {
      type: RECEIVE_DATASETS,
      datasets: json,
      receivedAt: Date.now(),
      ope: 'RECEIVE_DATASETS'
  }
}

function requestDatasets() {
  return {
    type: REQUEST_DATASETS
  }
}

function requestDatasetDetail(selectDataset) {
  return {
    type: REQUEST_DATASET_DETAIL
  }
}

function requestLogin() {
  return {
    type: REQUEST_LOGIN
  }
}

function receiveDatasetDetail(json) {
  return {
      type: RECEIVE_DATASET_DETAIL,
      dataset: json,
      receivedAt: Date.now(),
      ope: 'RECEIVE_DATASET_DETAIL'
  }
}

function receiveAddDataset(response) { 
  return {
      type: RECEIVE_ADD_DATASET,
      user: response,
      receivedAt: Date.now(),
      ope: 'RECEIVE_ADD_DATASET'
  }
}

function removeLoggedUser() {
  console.log('removeLoggedUser');
  return {
      type: REMOVE_LOGGED_USER,
      receivedAt: Date.now(),
      ope: 'REMOVE_LOGGED_USER'
  }
}

function receiveLogin(response) { 
  return {
      type: RECEIVE_LOGIN,
      user: response,
      receivedAt: Date.now(),
      ope: 'RECEIVE_LOGIN'
  }
}

function receiveOntologies(response) {
  return {
      type: RECEIVE_ONTOLOGIES,
      ontologies: response,
      error: '',
      receivedAt: Date.now(),
      ope: 'RECEIVE_ONTOLOGIES'
  }
}

function receiveOrganization(response) {  
  return {
      type: RECEIVE_ORGANIZATION,
      org: response,
      receivedAt: Date.now(),
      ope: 'RECEIVE_ORGANIZATION'
  }
}

function receiveActivationSuccess(ok, json) {  
  if(ok=='ok')
  return {
      type: RECEIVE_ACTIVATION,
      message: 'Attivazione avvenuta con successo !!!',
      error: 0,
      receivedAt: Date.now(),
      ope: 'RECEIVE_ACTIVATION'
  }
  else{
    if(json.code==1){
      console.log("messaggio errore codificato: " + json.message);
      return {
          type: RECEIVE_ACTIVATION_ERROR,
          error: 1,
          message: json.message,
          receivedAt: Date.now(),
          ope: 'RECEIVE_ACTIVATION_ERROR'
      }
    }else{
      console.log("messaggio errore non codificato!!!");
      return {
          type: RECEIVE_ACTIVATION_ERROR,
          error: 1,
          message: 'Errore durante l\'attivazione riprovare più tardi',
          receivedAt: Date.now(),
          ope: 'RECEIVE_ACTIVATION_ERROR'
      }
    }
  }
}

function receiveActivationError(json) {  
  return {
      type: RECEIVE_ACTIVATION_ERROR,
      error: 1,
      message: 'Errore durante l\'attivazione riprovare più tardi',
      receivedAt: Date.now(),
      ope: 'RECEIVE_ACTIVATION_ERROR'
  }
}

function receiveRegistrationSuccess(ok, json) {  
  if(ok=='ok')
  return {
      type: RECEIVE_REGISTRATION,
      message: 'Registrazione avvenuta con successo !!!',
      error: 0,
      receivedAt: Date.now(),
      ope: 'RECEIVE_REGISTRATION'
  }
  else{
    if(json.code==1){
      console.log("messaggio errore codificato: " + json.message);
      return {
          type: RECEIVE_REGISTRATION_ERROR,
          error: 1,
          message: json.message,
          receivedAt: Date.now(),
          ope: 'RECEIVE_REGISTRATION_ERROR'
      }
    }else{
      console.log("messaggio errore non codificato !!!");
      return {
          type: RECEIVE_REGISTRATION_ERROR,
          error: 1,
          message: 'Errore durante la registrazione riprovare più tardi',
          receivedAt: Date.now(),
          ope: 'RECEIVE_REGISTRATION_ERROR'
      }
    }
  }
}

function receiveRegistrationError(json) {  
  return {
      type: RECEIVE_REGISTRATION_ERROR,
      error: 1,
      message: json,
      receivedAt: Date.now(),
      ope: 'RECEIVE_REGISTRATION_ERROR'
  }
}

function cleanDataset(json) {
  //This function creates an action that a reducer can handle 
  return {
    type: DELETE_DATASETS,
    datasets: null,
    receivedAt: Date.now()
  }
}

/************************************************************************************************* */

/*********************************** REGISTRATION ************************************************ */
export function registerUser(nome, cognome, username, email, pw, pw2) {
  console.log("Called action registerUser");
  var url = serviceurl.apiURLSecurity + '/ipa/registration/request';

  //TODO: remove basic authentication from register service 
  var input = {
    'uid': username,
    'givenname': nome,
    'sn': cognome,
    'mail': email,
    'userpassword': pw,
  };
  var ok = '';
  return dispatch => {
    if(pw===pw2){
    return fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + serviceurl.auth
      },
      body: JSON.stringify(input)
    })
    .then(response => {
        if (response.ok) {
           response.json().then(json => {
            console.log(json);
            dispatch(receiveRegistrationSuccess('ok', json))
          });
        } else {
          response.json().then(json => {
            console.log(json);
            dispatch(receiveRegistrationSuccess('ko', json))
          });
        }
      })
    .catch(error => dispatch(receiveRegistrationError(error)))
    } else{
      dispatch(receiveRegistrationError('I campi Password e Ripeti Password non coincidono'))
    }
  }
}

export function activateUser(token) {
  console.log("Called action activateUser");
  var url = serviceurl.apiURLSecurity + '/ipa/registration/confirm?token=' + token;
  //TODO: remove basic authentication from register service 
  return dispatch => {
    return fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + serviceurl.auth
      }
    }).then(response => {
      if (response.ok) {
         response.json().then(json => {
          console.log(json);
          dispatch(receiveActivationSuccess('ok', json))
        });
      } else {
        response.json().then(json => {
          console.log(json);
          dispatch(receiveActivationError('ko', json))
        });
      }
    }).catch(error => dispatch(receiveActivationError(error)))
  }
}
/****************************************************************************************** */

/*********************************** LOGIN ************************************************ */
export function setAuthToken(username, pw) {
  const base64 = require('base-64');
  console.log("Called action setAuthToken");
  localStorage.setItem('username', username);
  var headers = new Headers();
  headers.append("Authorization", "Basic " + base64.encode(username + ":" + pw));
  var url = serviceurl.apiURLSecurity + '/token';
  return dispatch => {
      return fetch(url, {
          method: 'GET',
          headers: headers
        })
        .then(response => response.json())
  }
}

export function setApplicationCookie(token) {
  console.log("Called setApplicationCookie");
  var url = serviceurl.apiURLSSOManager + '/secured/retriveCookie/superset';
  return dispatch => {
      return fetch(url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          }
        })
        .then(response => response.json())
        .then(json => {
                let cookie = json.result.split('=');
                console.log('Setto il seguente cookie: '+ cookie[1]);
                document.cookie = "session=" + cookie[1] + "; path=/; domain=.default.svc.cluster.local";
        })
  }
}

export function loginAction(username, token) {
  console.log("Called action loginAction");
  var url = serviceurl.apiURLSecurity + '/ipa/user/' + username;
  return dispatch => {
      dispatch(requestLogin())
      return fetch(url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          }
        })
        .then(response => response.json())
        .then(json => dispatch(receiveLogin(json)))
  }
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  return dispatch => { dispatch(removeLoggedUser()) }
}

export function addUserOrganization(username, token) {
  console.log("Called action addUserOrganization");
  var url = serviceurl.apiURLCatalog + '/ckan/userOrganizations/' + username;
  return dispatch => {
      return fetch(url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          }
        })
        .then(response => response.json())
        .then(json => dispatch(receiveOrganization(json)))
  }
}
/******************************************************************************* */

/******************************** DATASET ************************************** */
function fetchDataset(query) {
  var queryurl='';
  var token = '';
  if(query)
    queryurl='?q=name:*'+query+'*';
  var url = serviceurl.apiURLCatalog + '/ckan/searchDataset' + queryurl;  
  if(localStorage.getItem('username') && localStorage.getItem('token') &&
    localStorage.getItem('username') != 'null' && localStorage.getItem('token') != 'null'){
      token = localStorage.getItem('token')
    }
  return dispatch => {
      dispatch(requestDatasets())
      return fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      })
        .then(response => response.json())
        .then(json => dispatch(receiveDataset(json)))
    }
  }

function fetchDatasetDetail(datasetname) {
  var token = '';
  var url = serviceurl.apiURLCatalog + '/ckan/datasets/'  + datasetname;
  if(localStorage.getItem('username') && localStorage.getItem('token') &&
    localStorage.getItem('username') != 'null' && localStorage.getItem('token') != 'null'){
      token = localStorage.getItem('token')
    }
  return dispatch => {
      dispatch(requestDatasetDetail())
      return fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      })
        .then(response => response.json())
        .then(json => dispatch(receiveDatasetDetail(json)))
    }
  }

export function loadDatasets(query) {
  console.log('Load Dataset action');
  return (dispatch, getState) => {
      return dispatch(fetchDataset(query))
  }
 
}

export function unloadDatasets() {
  console.log('Unload Dataset action');
  return (dispatch, getState) => {
      return dispatch(cleanDataset())
  }
}

export function datasetDetail(datasetname) {
  console.log('Dataset Detail action');
  return (dispatch, getState) => {
      return dispatch(fetchDatasetDetail(datasetname))
  }
}

export function addDataset(json, token) {
  console.log("Called action addDataset");
  var url = serviceurl.apiURLCatalog + "/catalog-ds/add";
  return dispatch => {
      dispatch(requestLogin())
      return fetch(url, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify(json)
        })
        .then(response => response.json())
        .then(json => dispatch(receiveAddDataset(json)))
  }
}
/******************************************************************************* */

export function loadOntologies() {
  console.log('Load Ontologies');
  var url = 'http://localhost:3001/catalog-manager/v1/ontologies';  
  return dispatch => {
      return fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(json => dispatch(receiveOntologies(json)))
    }
  }