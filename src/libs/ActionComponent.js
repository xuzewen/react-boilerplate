
import React from 'react';

/**		


		|---事件(emit)------
		|
		|
		|
		|---需求(demand)----

*/




let ActionStore = {
	
	_demands:{},
	
	_database:{},
	

	setAction( key, data ){

		this._database[key] = data;
		this.fire( key, data);

	},

	addDemandListener(type, data, cb){

		if(!this._demands[type]){
			this._demands[type] = [];
		}

		this._demands[type].push( cb );
	},

	removeDemandListenr(type, cb){
		var demands = this._demands[type];
		if( demands && demands.length ){

			for(var i=0; i<demands.length; i++){
				if( demands[i] == cb ){
					demands.splice(i, 1);
					break;
				}
			}
		}
	},

	fire( key ){

		let result = this._database[key];
		let demands = this._demands[key];

		if( demands == undefined ){
			return ;
		}
		//如果 action 的结果是直接量
		for(let i=0; i<demands.length; i++){
			demands[i](result);
		}
	
	}
};


export default class Component extends React.Component{

	constructor(props){
		super( props )
		this._demands = []
	}
	// 事件  不需要返回
	emit(type, data){
		// console.log(type, data)
		ActionStore.setAction( type, data );
	}

	// 需求  需要返回
	demand(type, data, cb){
		
		if( typeof data == "function" ){
			cb = data;
			data = null;
		}

		if(cb){
			this._demands.push( {type:type, callback:cb} );
			ActionStore.addDemandListener( type, data, cb);
		}else{
			ActionStore.addDemandListener( type, data, (result) => {
				this.setState(result)
			})
		}
	}

	//清除定时器
    componentWillUnmount(){
    	for(var i=0; i<this._demands.length; i++){
    		ActionStore.removeDemandListenr(this._demands[i].type, this._demands.callback)
    	}
    }
}

window.ActionStore = ActionStore;




