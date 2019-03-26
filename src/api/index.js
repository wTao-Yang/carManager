import axios from 'axios';
// const baseURL='http://47.112.4.52:8080';

const baseURL='http://localhost:8088';

function getData(url,method='post'){
	return async(data,callback) => {
		if(method === "post"){
			axios.post(baseURL+url,data).then(result => {
        // result&&result.code == SUCCESS_CODE?callback&&callback(result.data):flag?_.alert('提示',result.desc):'';
        result?callback(result.data):'';
			}).catch(err=>{
			});
		}else{
			axios.get(baseURL+url,{params:data}).then(result =>{
        // result&&result.code == SUCCESS_CODE?callback&&callback(result.data):flag?_.alert('提示',result.desc):'';
        result?callback(result.data):'';
			}).catch(err=>{
			});
		}
	}
};

export{

}