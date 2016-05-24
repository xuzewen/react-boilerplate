import * as types from './types'
import fetch from 'isomorphic-fetch'

export function getNews(type="social"){
    let key = 'faf10506f4b71ba3113a8125f92d0e7f'
    let num = 10
    let url = `http://api.huceo.com/${type}/?key=${key}&num=${num}`
    return dispatch => {
        fetch(url,{
            'web-preferences': {
                'web-security': false
            }
        }).then(checkStatus)
          .then(parseJSON)
          .then(result => {
                dispatch(success(result))
            }).catch(err => {
                dispatch(error(err))
            })
    }
}

export function changeType(typeName){
    return {
        type: types.FETCH_CHANGE_TYPE,
        typeName: typeName
    }
}

function success(result){
    return {
        type: types.FETCH_SUCCESS,
        data: result
    }
}

function error(err){
    return {
        type: types.FETCH_ERROR,
        error: err
    }
}


function checkStatus(response) {
  if ((response.status >= 200 && response.status < 300) || response.status == 304) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

function parseJSON(response) {
  return response.json()
}
