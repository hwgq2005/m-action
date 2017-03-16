Action for mobile

Get Start : https://hwgq2005.github.io/m-action

<p align="left">
<a href="https://www.npmjs.com/package/m-action"><img src="https://img.shields.io/npm/dt/m-action.svg" alt="Downloads"> </a><a href="https://www.npmjs.com/package/m-action"><img src="https://img.shields.io/npm/v/m-action.svg" alt="Version"></a> <a href="https://www.npmjs.com/package/m-action"><img src="https://img.shields.io/npm/l/m-action.svg" alt="License"></a>
</p>

### Introduce
Action for mobile

### Install
```
npm install m-action  
```

### Usage
```
var Action = require('m-action');
Action({
	id:'action',
	summary:'这是一段短文',
	actions:[{
		name:'确定',
		callback:function(){

		}
	},{
		name:'返回上一步',
		callback:function(){
			
		}
	}],
	complete:function(){
		// do something ...				
	},

	cancel:function(){
		// do something ...
	}
})
```
### CDN

- https://unpkg.com/m-action/dist/css/m-action.min.css
- https://unpkg.com/m-action/dist/js/m-action.min.js

### Contact

- Weibo：[@hwgq2005](http://www.weibo.com/hwgq2005) 
- Email：hbook@bookcss.com

### License
MIT