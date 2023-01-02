import baseLib from './lib/index'
import {request} from './lib/request'

export default class ColorUISdk {
    constructor({env, version, api}) {
        //默认配置，防止没自定义配置时，出问题。
        env = env||'dev'
        version = version||'1.0.0'
        if (!api.header) {
            api.header = {};
            api.header['Content-Type'] = 'application/json';
        }
        this.env = env;
        this.version = version;
        this.api = api;
        this.ColorUISdkInit();
    }
    ColorUISdkInit() {
        Object.keys(baseLib).forEach(key => {
            if (typeof baseLib[key] === 'function') {
                this[key] = baseLib[key]
            }
            if (typeof baseLib[key] === 'object') {
                //二级方法函数
                Object.keys(baseLib[key]).forEach(k => {
                    if (typeof baseLib[key][k] === 'function' || typeof baseLib[key][k] === 'object') {
                        this[k] = baseLib[key][k]
                    }
                })
            }
        })
        //console.log(this)
    }
    //发起请求
    request(data, loading = false) {
        return new Promise( (resolve, reject) => {
            request(data, loading, {
                env: this.env,
                api: this.api
            }).then(res=> {
                resolve(res);
            }).catch(err=> {
                reject(err)
            });
        });
    }
}
