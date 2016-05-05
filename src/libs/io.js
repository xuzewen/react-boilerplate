
import md5 from 'md5';
import io from './reqwest';
import cache from './cache';
import config from './config';

let {user_platform_domain, spider_domain} = config;
let AsynDataCache = cache.getCacheModule("AsynDataCachePC");


let ajax = {
    get:function(path, param, callback, errorCallback, option){

        //如果没有user_platform_domain就添加
        let domain = path.indexOf("/spider/api/") != -1 ? spider_domain : user_platform_domain
        path = path.indexOf("http://") == -1 ? domain + path : path;
        option = Object.assign({
            type:"jsonp",
            method:"get"
        }, option || {});


        //console.log( isSameuser_platform_domain )
        param  = param || {};
        if( !param.ver ){
            param.ver = "1.0";
        }

        //删除明显多余的参数传递

        if( param ){
            for(let key in param){
                if( param[key] == undefined || param[key] == null  || param[key] == ""){
                    delete param[key];
                }
            }
        }

        let isResult = false
        io({
            url:path,
            //对请求进行简单的加密
            data:param,
            type:option.type,
            // dataType:option.dataType,
            // timeout:30000,
            // withCredentials:true,
            error:function(result, status){
                isResult = true;
                result = result.msg || {msg:"请求失败，请稍后再试"};
                errorCallback && errorCallback(result);
            },
            success:function(result){
                isResult = true;
                callback && callback(result)
            }

        });

        setTimeout(function(){
            if(isResult == false){
                errorCallback && errorCallback({msg:"网络超时"})
            }
        }, 60000);
    },

    /**
        多个相同的请求将会进行排队，第一个请求回来以后，直接交还数据给所有请求，
        请求合并
    */
    cacheKeyMap :{
        /**
            "asdfkjdlfja":{
                loading:false, true
                loaded:true, false
                callback:[]
                errorCallback:[]
                data:
            }
        */
    },
    //从缓存中拿数据，也会把数据缓存起来
    getCache:function(path, param, callback, errorCallback){

        let self = this;
        let cacheKey = this.generateCacheKey( path, param );
        let cacheData = null;

        var cache = this.cacheKeyMap[cacheKey]

        //数据已经在内存中了 内存缓存
        if( cache && cache.loaded == true && cache.success){
            callback( cache.data )
            return ;
        }

        //数据正在请求中
        if( cache && cache.loading == true){
            cache.callback.push( callback )
            cache.errorCallback.push( errorCallback );
            return ;
        }

        cache = this.cacheKeyMap[cacheKey] = {
            loading:true,
            loaded:false,
            success:true,
            callback:[callback],
            errorCallback:[errorCallback],
            data:null
        };

        //本地缓存
        if( (cacheData = AsynDataCache.get( cacheKey )) && cacheData.value ){

            cache.data = cacheData.value;
            cache.loading = false;
            cache.loaded = true;
            cache.success = true;
            //通知所有等待的请求，数据可用了
            this.emitWaitCacheQuery( cacheKey );
            //后面会再次请求数据缓存最新的
        }

        this.get(path, param, function( result ){

            cache.data = result;
            cache.loading = false;
            cache.loaded = true;
            cache.success = true;
            self.emitWaitCacheQuery( cacheKey );

            //对data未空的数据不做缓存
            if( result.data && (result.data.length || Object.keys(result.data).length) ){
                //持久化数据保存
                AsynDataCache.set(cacheKey, result, Date.now() );
            }else{
                AsynDataCache.remove(cacheKey);
            }


        }, function(result){

            cache.data = result;
            cache.loading = false;
            cache.loaded = true;
            cache.success = false;
            self.emitWaitCacheQuery( cacheKey );

            try{
                AsynDataCache.remove(cacheKey);
            }catch(e){}

        });
    },
    emitWaitCacheQuery(cacheKey){
        var cache = this.cacheKeyMap[cacheKey]
        if(cache && cache.callback.length){
            for(var i=0; i<cache.callback.length; i++){

                if( cache.success ){
                    cache.callback[i](cache.data);
                }else{
                    cache.errorCallback[i](cache.data);
                }

                cache.callback.splice(i, 1);
                cache.errorCallback.splice(i, 1);
                i--;

            }
        }
    },
    //加密参数
    md5Param:function( param ){

        let paramList = [];
        //固定加密参数
        param["__sign__"] = "39a7daceb6a952257bc874f30553f8eb";

        for(let key in param){
            paramList.push(key+"="+param[key]);
        }

        param.md5 = md5( paramList.sort().join("") );

        delete param["__sign__"];

        return param;
    },
    //文具请求 api 和 请求参数 制作唯一的缓存 key
    generateCacheKey:function(api, param){

        let key = md5( api +  JSON.stringify(param || {}) );
        return key;

    },
    a:1

}

window.yuantu_io = ajax;

module.exports = ajax;
