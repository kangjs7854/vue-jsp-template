/*
 * @Date: 2020-08-13 11:13:16
 * @LastEditors: kjs
 * @LastEditTime: 2020-08-13 11:32:48
 * @FilePath: \智慧住院\js\http.js
 */

function get(url, params = {}, headers = {}) {
    url += '?';
    for (let key in params) {
        url += key + '=' + params[key] + '&';
    }
    const instance = axios.create({
        timeout: 1000 * 10,
        headers
    });

    return instance.get(url)
        .then((res) => {
            return res.data;
        })
        .catch(error => {
            console.log('error', error);
        })
}

function post(url, params = {}) {
    const instance = axios.create({
        timeout: 1000 * 10,
        headers: {
            'Content-Type': 'application/json'
        }
    })
    Object.assign(params, {
        timesamp: new Date().getTime(),//时间戳
        sign: ''
    })
    return instance.post(url, qs.stringify(params))
        .then((res) => {
            if (!res.data || res.data.code == undefined) {
                // do sometings

            }
            return res.data
        })
        .catch((error) => {
            console.log('error', error);
        })
}

(function () {
    if (typeof window.$http == 'undefined') {
        window.$http = {
            post,
            get
        }
    }
    console.log($http);
})()