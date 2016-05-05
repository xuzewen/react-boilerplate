const IS_LOCAL_STORGEl  = window.localStorage;
/**
 cache.set(key, value, expire);
 cache.get(key)
 */
const cache = {
    cacheMap:{

    },
    set:function(key, value, expire){

        if( IS_LOCAL_STORGEl ){
            return window.localStorage.setItem(key, value);
        }

        return null;
    },
    get:function( key ){
        if( IS_LOCAL_STORGEl ){
            return window.localStorage.getItem( key );
        }
        return null;
    },
    remove:function(key){
        if( IS_LOCAL_STORGEl ){
            return window.localStorage.removeItem( key );
        }
        return null;
    },
    getCordId:function(){
        this.get("corpId");
    },
    getCacheModule:function( name ){
        name = name || "yuantu-cache";
        if( !this.cacheMap[ name ] ){
            this.cacheMap[name] = new CacheModule( name );
        }

        return this.cacheMap[name];

    },
    removeCacheModule:function(name){
        name = name || "yuantu-cache";
        this.cacheMap[ name ] = null;
        this.remove( name );
    }
};

/**
 构造一个多页面传值的module

 var abcCache = new cache.CacheModule("abc");

 abcCache.set("key", "value", "name");

 abcCache.get("key") // {value:"value", name:"name"}

 var t = Date.now();
 md5("abdslfjalkdjfla");
 console.log(Date.now() - t)
 */
function CacheModule( name ){

    this.name = name;
    this.module = {};
    this.init();
}

CacheModule.prototype = {

    init:function(){
        try{
            //console.log(JSON.stringify(cache.get(this.name)))
            this.module = JSON.parse(cache.get(this.name)) || {};
        }catch(e){
            this.module = {};
        }
    },
    set:function( key, value, name ){

        this.module[key] = {
            value:value,
            name:name
        };

        this.save();
    },
    get:function(key){
        return this.module[key] || {};
    },
    remove:function(key){
        if(this.module[key]){
            delete this.module[key];
            this.save();
        }
    },
    save:function(){
        //异步保存数据
        let name = this.name;
        let module = this.module;
        setTimeout(function(){
            cache.set(name, JSON.stringify( module ) );
        },0);
    },
    clear:function(){

        this.module = {};
        this.save();
    }
}

module.exports = cache