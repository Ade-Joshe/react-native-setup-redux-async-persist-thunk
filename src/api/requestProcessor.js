import config from '../../config';
import axios from 'axios';
import EventEmitter from 'eventemitter3';

axios.defaults.headers["Accept"] = "application/json";
axios.defaults.headers["Content-Type"] = "application/json";
axios.defaults.headers["Access-Control-Allow-Origin"] = "*";
axios.defaults.baseURL = config.baseUrl;

var refreshing = false;
var count = 0;

//interceptor
axios.interceptors.response.use(function (response) {
    console.log("success request")
    return response;
}, function (error) {
    console.log("error request", error.config.headers["x-access-token"])
    if (error) {
        let config = error.config;

        if (error && error.response.status === 401 && config.url.toLowerCase() !== '/auth/authenticate') {
            //make refreshtoken request
            if (!refreshing && count <= 5) {
                refreshing = true;
                count++;
                var axiosClient = axios.create();
                return axiosClient.post('/auth/refreshtoken').then(result => {
                    console.log('request processor: ', result)
                    if (result.status === 200) {
                        //reset the access token in the axios default and resend the failed request
                        axios.defaults.headers["x-access-token"] = result.token;
                        refreshing = false;
                        config.headers["x-access-token"] = result.token;
                        return axios(config);
                    }
                }).catch(error => {
                    //something went wrong;
                    refreshing = false;
                    var eventObj = new EventEmitter();
                    eventObj.emit("token_authorized");
                    return Promise.reject({ success: false, status: 401, message: 'authorized access' })
                })
            }
        } else {
            if (error.response.status === 401 && config.url.toLowerCase() === '/auth/loginuser') {
                return Promise.reject(error.response);
            } else {
                return Promise.reject(error);
            }
            // return error;
        }
    } else {
        return Promise.reject(error);
    }
});

class processRequest {
    sendGet(url) { return axios.get(url); }

    sendPost(url, payload = {}) {
        return axios.post(url, payload);
    }

    sendPut(url, payload) {
        return axios.put(url, payload);
    }

    sendDelete(url) {
        return axios.delete(url)
    }
}


export default new processRequest; 