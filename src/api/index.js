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

const login=getData('/manager/login')

const uploads=getData('/upload')

const newCar=getData('/manager/newCar')

const getDetail=getData('/manager/getDetail')

const getCarList=getData('/manager/getCarList')

const getApplyList=getData('/manager/getApplyList')

const getAppointList=getData('/manager/getAppointList')

const getBrand=getData('/manager/getBrand');

const getWheel=getData('/getWheel');

const getHotBrand=getData('/getHotBrand');

const getSuggest=getData('/manager/getSuggest');

const getAdmin=getData('/manager/getAdmin');

const setCarStatus=getData('/manager/setCarStatus');

const setApplyStatus=getData('/manager/setApplyStatus');

const setAppointStatus=getData('/manager/setAppointStatus');

const setSuggestStatus=getData('/manager/setSuggestStatus');

const setAdmin=getData('/manager/setAdmin');

const deleteAdmin=getData('/manager/deleteAdmin');

const setBrand=getData('/manager/setBrand');

const deleteBrand=getData('/manager/deleteBrand');

const setWheel=getData('/manager/setWheel');

const setHotBrand=getData('/manager/setHotBrand');

const deleteCar=getData('/manager/deleteCar');

const deleteSuggest=getData('/manager/deleteSuggest');

const deleteAppoint=getData('/manager/deleteAppoint');

const deleteApply=getData('/manager/deleteApply');

export{
	uploads,
	newCar,
	getDetail,
	getCarList,
	getApplyList,
	getAppointList,
	getBrand,
	getWheel,
	getHotBrand,
	getSuggest,
	getAdmin,
	setCarStatus,
	setApplyStatus,
	setAppointStatus,
	setSuggestStatus,
	setAdmin,
	deleteAdmin,
	setBrand,
	deleteBrand,
	setWheel,
	setHotBrand,
	login,
	deleteCar,
	deleteApply,
	deleteAppoint,
	deleteSuggest
}

export default{
	uploads,
	newCar,
	getDetail,
	getCarList,
	getApplyList,
	getAppointList,
	getBrand,
	getWheel,
	getHotBrand,
	getSuggest,
	getAdmin,
	setCarStatus,
	setApplyStatus,
	setAppointStatus,
	setSuggestStatus,
	setAdmin,
	deleteAdmin,
	setBrand,
	deleteBrand,
	setWheel,
	setHotBrand,
	login,
	deleteCar,
	deleteApply,
	deleteAppoint,
	deleteSuggest
}