var Module=typeof pyodide._module!=="undefined"?pyodide._module:{};if(!Module.expectedDataFileDownloads){Module.expectedDataFileDownloads=0;Module.finishedDataFileDownloads=0}Module.expectedDataFileDownloads++;(function(){var loadPackage=function(metadata){var PACKAGE_PATH;if(typeof window==="object"){PACKAGE_PATH=window["encodeURIComponent"](window.location.pathname.toString().substring(0,window.location.pathname.toString().lastIndexOf("/"))+"/")}else if(typeof location!=="undefined"){PACKAGE_PATH=encodeURIComponent(location.pathname.toString().substring(0,location.pathname.toString().lastIndexOf("/"))+"/")}else{throw"using preloaded data can only be done on a web page or in a web worker"}var PACKAGE_NAME="more-itertools.data";var REMOTE_PACKAGE_BASE="more-itertools.data";if(typeof Module["locateFilePackage"]==="function"&&!Module["locateFile"]){Module["locateFile"]=Module["locateFilePackage"];err("warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)")}var REMOTE_PACKAGE_NAME=Module["locateFile"]?Module["locateFile"](REMOTE_PACKAGE_BASE,""):REMOTE_PACKAGE_BASE;var REMOTE_PACKAGE_SIZE=metadata.remote_package_size;var PACKAGE_UUID=metadata.package_uuid;function fetchRemotePackage(packageName,packageSize,callback,errback){var xhr=new XMLHttpRequest;xhr.open("GET",packageName,true);xhr.responseType="arraybuffer";xhr.onprogress=function(event){var url=packageName;var size=packageSize;if(event.total)size=event.total;if(event.loaded){if(!xhr.addedTotal){xhr.addedTotal=true;if(!Module.dataFileDownloads)Module.dataFileDownloads={};Module.dataFileDownloads[url]={loaded:event.loaded,total:size}}else{Module.dataFileDownloads[url].loaded=event.loaded}var total=0;var loaded=0;var num=0;for(var download in Module.dataFileDownloads){var data=Module.dataFileDownloads[download];total+=data.total;loaded+=data.loaded;num++}total=Math.ceil(total*Module.expectedDataFileDownloads/num);if(Module["setStatus"])Module["setStatus"]("Downloading data... ("+loaded+"/"+total+")")}else if(!Module.dataFileDownloads){if(Module["setStatus"])Module["setStatus"]("Downloading data...")}};xhr.onerror=function(event){throw new Error("NetworkError for: "+packageName)};xhr.onload=function(event){if(xhr.status==200||xhr.status==304||xhr.status==206||xhr.status==0&&xhr.response){var packageData=xhr.response;callback(packageData)}else{throw new Error(xhr.statusText+" : "+xhr.responseURL)}};xhr.send(null)}function handleError(error){console.error("package error:",error)}var fetchedCallback=null;var fetched=Module["getPreloadedPackage"]?Module["getPreloadedPackage"](REMOTE_PACKAGE_NAME,REMOTE_PACKAGE_SIZE):null;if(!fetched)fetchRemotePackage(REMOTE_PACKAGE_NAME,REMOTE_PACKAGE_SIZE,function(data){if(fetchedCallback){fetchedCallback(data);fetchedCallback=null}else{fetched=data}},handleError);function runWithFS(){function assert(check,msg){if(!check)throw msg+(new Error).stack}Module["FS_createPath"]("/","lib",true,true);Module["FS_createPath"]("/lib","python3.7",true,true);Module["FS_createPath"]("/lib/python3.7","site-packages",true,true);Module["FS_createPath"]("/lib/python3.7/site-packages","more_itertools",true,true);Module["FS_createPath"]("/lib/python3.7/site-packages/more_itertools","__pycache__",true,true);Module["FS_createPath"]("/lib/python3.7/site-packages/more_itertools","tests",true,true);Module["FS_createPath"]("/lib/python3.7/site-packages/more_itertools/tests","__pycache__",true,true);Module["FS_createPath"]("/lib/python3.7/site-packages","more_itertools-4.3.0-py3.7.egg-info",true,true);function DataRequest(start,end,audio){this.start=start;this.end=end;this.audio=audio}DataRequest.prototype={requests:{},open:function(mode,name){this.name=name;this.requests[name]=this;Module["addRunDependency"]("fp "+this.name)},send:function(){},onload:function(){var byteArray=this.byteArray.subarray(this.start,this.end);this.finish(byteArray)},finish:function(byteArray){var that=this;Module["FS_createPreloadedFile"](this.name,null,byteArray,true,true,function(){Module["removeRunDependency"]("fp "+that.name)},function(){if(that.audio){Module["removeRunDependency"]("fp "+that.name)}else{err("Preloading file "+that.name+" failed")}},false,true);this.requests[this.name]=null}};function processPackageData(arrayBuffer){Module.finishedDataFileDownloads++;assert(arrayBuffer,"Loading data file failed.");assert(arrayBuffer instanceof ArrayBuffer,"bad input to processPackageData");var byteArray=new Uint8Array(arrayBuffer);var curr;var compressedData={data:null,cachedOffset:242172,cachedIndexes:[-1,-1],cachedChunks:[null,null],offsets:[0,1304,2585,3797,4900,6167,7566,9045,10303,11476,12844,14177,15372,16569,17847,19035,20216,21524,22863,24172,25361,26699,27967,29338,30238,31561,32668,33935,35303,36440,37721,38928,39993,41348,42538,43879,45213,46497,47866,49148,50378,51322,53012,54739,56088,57434,58927,60359,61894,63037,64551,66035,67502,68906,70275,71755,73036,74395,75940,77434,78680,80196,81642,83037,84432,85745,87353,88629,90077,91331,92660,93984,95159,96621,97989,99718,101197,102481,103889,105413,106888,108152,109621,110913,111875,112814,113824,114764,115764,116663,117824,118955,119985,121219,122375,123356,124415,125520,126454,127310,128289,129251,130147,131229,132302,133111,134073,135116,135856,136530,137456,138330,139133,140096,140817,141745,142790,143775,144586,145524,146385,147188,148240,149116,150102,150993,151645,152873,154159,155438,156574,157909,159130,160306,161458,162653,163822,165033,166237,167595,169072,170439,171832,173527,174985,176344,177732,178651,180036,181334,182758,184010,185132,186396,187690,188864,190248,191506,192823,194119,195264,196397,197759,199133,199975,201044,202294,203487,204724,205977,207236,208103,209241,210734,211951,213415,214574,215706,216988,218101,219234,220354,221724,223008,224128,225484,226665,227784,228883,229864,231260,231540,231867,232182,232501,232812,233123,233432,233769,234099,234442,234779,235910,237039,238234,239352,240530,241725],sizes:[1304,1281,1212,1103,1267,1399,1479,1258,1173,1368,1333,1195,1197,1278,1188,1181,1308,1339,1309,1189,1338,1268,1371,900,1323,1107,1267,1368,1137,1281,1207,1065,1355,1190,1341,1334,1284,1369,1282,1230,944,1690,1727,1349,1346,1493,1432,1535,1143,1514,1484,1467,1404,1369,1480,1281,1359,1545,1494,1246,1516,1446,1395,1395,1313,1608,1276,1448,1254,1329,1324,1175,1462,1368,1729,1479,1284,1408,1524,1475,1264,1469,1292,962,939,1010,940,1e3,899,1161,1131,1030,1234,1156,981,1059,1105,934,856,979,962,896,1082,1073,809,962,1043,740,674,926,874,803,963,721,928,1045,985,811,938,861,803,1052,876,986,891,652,1228,1286,1279,1136,1335,1221,1176,1152,1195,1169,1211,1204,1358,1477,1367,1393,1695,1458,1359,1388,919,1385,1298,1424,1252,1122,1264,1294,1174,1384,1258,1317,1296,1145,1133,1362,1374,842,1069,1250,1193,1237,1253,1259,867,1138,1493,1217,1464,1159,1132,1282,1113,1133,1120,1370,1284,1120,1356,1181,1119,1099,981,1396,280,327,315,319,311,311,309,337,330,343,337,1131,1129,1195,1118,1178,1195,447],successes:[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]};compressedData.data=byteArray;assert(typeof Module.LZ4==="object","LZ4 not present - was your app build with  -s LZ4=1  ?");Module.LZ4.loadPackage({metadata:metadata,compressedData:compressedData});Module["removeRunDependency"]("datafile_more-itertools.data")}Module["addRunDependency"]("datafile_more-itertools.data");if(!Module.preloadResults)Module.preloadResults={};Module.preloadResults[PACKAGE_NAME]={fromCache:false};if(fetched){processPackageData(fetched);fetched=null}else{fetchedCallback=processPackageData}}if(Module["calledRun"]){runWithFS()}else{if(!Module["preRun"])Module["preRun"]=[];Module["preRun"].push(runWithFS)}};loadPackage({files:[{filename:"/lib/python3.7/site-packages/more_itertools/more.py",start:0,end:70020,audio:0},{filename:"/lib/python3.7/site-packages/more_itertools/recipes.py",start:70020,end:84980,audio:0},{filename:"/lib/python3.7/site-packages/more_itertools/__init__.py",start:84980,end:85067,audio:0},{filename:"/lib/python3.7/site-packages/more_itertools/__pycache__/more.cpython-37.pyc",start:85067,end:152492,audio:0},{filename:"/lib/python3.7/site-packages/more_itertools/__pycache__/recipes.cpython-37.pyc",start:152492,end:168535,audio:0},{filename:"/lib/python3.7/site-packages/more_itertools/__pycache__/__init__.cpython-37.pyc",start:168535,end:168754,audio:0},{filename:"/lib/python3.7/site-packages/more_itertools/tests/test_recipes.py",start:168754,end:188591,audio:0},{filename:"/lib/python3.7/site-packages/more_itertools/tests/__init__.py",start:188591,end:188591,audio:0},{filename:"/lib/python3.7/site-packages/more_itertools/tests/test_more.py",start:188591,end:259263,audio:0},{filename:"/lib/python3.7/site-packages/more_itertools/tests/__pycache__/__init__.cpython-37.pyc",start:259263,end:259418,audio:0},{filename:"/lib/python3.7/site-packages/more_itertools/tests/__pycache__/test_recipes.cpython-37.pyc",start:259418,end:291689,audio:0},{filename:"/lib/python3.7/site-packages/more_itertools/tests/__pycache__/test_more.cpython-37.pyc",start:291689,end:387953,audio:0},{filename:"/lib/python3.7/site-packages/more_itertools-4.3.0-py3.7.egg-info/requires.txt",start:387953,end:387971,audio:0},{filename:"/lib/python3.7/site-packages/more_itertools-4.3.0-py3.7.egg-info/top_level.txt",start:387971,end:387986,audio:0},{filename:"/lib/python3.7/site-packages/more_itertools-4.3.0-py3.7.egg-info/dependency_links.txt",start:387986,end:387987,audio:0},{filename:"/lib/python3.7/site-packages/more_itertools-4.3.0-py3.7.egg-info/PKG-INFO",start:387987,end:424126,audio:0},{filename:"/lib/python3.7/site-packages/more_itertools-4.3.0-py3.7.egg-info/SOURCES.txt",start:424126,end:424706,audio:0}],remote_package_size:246268,package_uuid:"a91705d7-9feb-4d37-9a78-147d6d43dac0"})})();