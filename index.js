var argv = require("minimist")(process.argv.slice(2)),
    regex = /^:/,
    parsedUrl = [],
    parserFormatUrl = [],
    resObj = {};

function onError(msg) {
    console.log("ERROR: " + msg);
    process.exit(1);
}

function onInfo(msg) {
    console.log("INFO: " + msg);
}

function cleanUrl(url) {
    return url.replace(/.*?:\/\//g, "");
}

function parseQueryString(obj, queryString) {
    var keyValPairs = [];

    if (queryString.length) {
        keyValPairs = queryString.split("&");
        for (var pairNum in keyValPairs) {
            var keyVal = keyValPairs[pairNum].split("=");
            if (!keyVal[0].length) {
                continue;
            }
            if (typeof obj[keyVal[0]] === "undefined") {
                obj[keyVal[0]] = [];
            }
            obj[keyVal[0]].push(keyVal[1]);
        }
    }
}

function castArrayToNum(array) {
    var temp = array.map(function (value) {
        if (!isNaN(value)) {
            return +value;
        } else {
            return value;
        }
    });

    if(temp.length === 1){
    	temp = temp[0];
    }

    return temp;
}

if (argv.length < 2) {
    onError("the url doesn't match with the format provided" );
}

parserFormatUrl = cleanUrl(argv._[0]).split('/');

parsedUrl = cleanUrl(argv._[1]).split('/');

if (parserFormatUrl.length !== parsedUrl.length) {
    onError("url dont match with the format url provided");
}

parserFormatUrl.forEach(function(value, index, array) {
    var extract = parsedUrl[index].split("?");

    if (array.length - 1 === index) {
        if (extract.length > 1) {
            parseQueryString(resObj, extract[1]);
        }
    }

    if (regex.test(value)) {
        var key = value.substring(1, value.length);
        resObj[key] = extract[0];
    }
});

for (var key in resObj) {
    switch (Object.prototype.toString.call(resObj[key])) {
        case "[object Array]":
            resObj[key] = castArrayToNum(resObj[key]);
            break;
        case "[object String]":
            if (!isNaN(resObj[key])) {
                resObj[key] = +resObj[key];
            }
            break;
    }
}

console.log("Result object: ");
console.dir(resObj);