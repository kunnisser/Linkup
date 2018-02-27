class XHR {
    constructor () {
        return this;
    }

    request (url, params) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.send(params || ''); //发送数据
            xhr.onload = ()=>{
                if ( (xhr.status >=200 && xhr.status < 300) || xhr.status == 304 ) {
                     this.serverData = JSON.parse(xhr.response);
                    resolve(this.serverData);
                }else{
                    reject();
                }
            };
        })
    }

    post (url, params) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('POST', url);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send(JSON.stringify(params)); //发送数据
            xhr.onload = ()=>{
                if ( (xhr.status >=200 && xhr.status < 300) || xhr.status == 304 ) {
                    this.serverData = JSON.parse(xhr.response);
                    resolve(this.serverData);
                }else{
                    reject();
                }
            };
        })
    }
}

export default XHR;