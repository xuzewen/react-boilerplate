import fetch from 'isomorphic-fetch'


export const CALL = Symbol('THIS IS A REQUEST')


const root_url = 'http://api.huceo.com'


function fetchApi(url){
    let path = root_url + url
    return fetch(path)
            .then(checkStatus)
            .then(parseJSON)
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

export default store => next => action => {
  const callAPI = action[CALL]

  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  let { url, types} = callAPI

  if (typeof url !== 'string') {
    throw new Error('URL should be a string')
  }

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.')
  }

  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }

  const [ requestType, successType, failureType ] = types
  next(newAction({ type: requestType }))

  function newAction(data) {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[CALL]
    return finalAction
  }


  return fetchApi(url).then(
      result => next(newAction({
        data:result,
        type:successType
      })),
      error => next(newAction({
        type: failureType,
        error: error.msg || 'Something bad happened'
      }))
  )

}