var argv = require("minimist")(process.argv.slice(2)),
    regex = /^:/,
    parsedUrl = [],
    parserFormatUrl = [],
    resObj = {};

var onError = function(msg) {
    console.log("ERROR: " + msg);
    process.exit(1);
};
var onInfo = function(msg) {
    console.log("INFO: " + msg);
};

var cleanUrl = function(url) {
    return url.replace(/.*?:\/\//g, "");
};

var parseQueryString = function(obj, queryString) {
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
};

var castArrayToNum = function(array) {
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
};

//check params
if (argv.length < 2) {
    onError("the url doesn't match with the format provided" );
}

//parse elements of format url
parserFormatUrl = cleanUrl(argv._[0]).split('/');

//parse elements of url
parsedUrl = cleanUrl(argv._[1]).split('/');

//check parseable path number of levels
if (parserFormatUrl.length !== parsedUrl.length) {
    onError("url dont match with the format url provided");
}

//build object
parserFormatUrl.forEach(function(value, index, array) {
    //check if the param is a query string
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

//check and convert string numbers to numbers
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