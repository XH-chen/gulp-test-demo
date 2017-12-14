/*
* @Author: Administrator
* @Date:   2017-12-14 09:32:36
* @Last Modified by:   Administrator
* @Last Modified time: 2017-12-14 09:34:19
*/
var arr = ["123","234","345"];
const newarr = arr.map(function(item){
	return "this is the "+item;
})
console.log(newarr);