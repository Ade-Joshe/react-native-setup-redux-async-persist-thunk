import processRequest from '../../api/requestProcessor';

const handleLogin = (data) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            var state = getState();
            return processRequest.sendPost('/auth/authenticate', data)
                .then(result => {
                    if (result.status === 200)
                        return resolve({ success: true, data: result.data })
                    else {
                        return resolve({ success: false, data: result })
                    }
                })
                .catch((error) => {
                    return resolve({ success: false, data: error })
                })
        })
    }
}


export {
    handleLogin
}