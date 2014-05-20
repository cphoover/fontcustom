var Promise  = require("bluebird"),
	which    = require("which").sync,
	exec     = which("fontcustom"),
	fontProc = require("child_process").spawn.bind(null, exec);


function fontcustom(options) {

	var deferred = Promise.defer(),
		task    = options.task  || "compile",
		noisy   = options.noisy || false,
		args    = [],
		val;

	function addArg(value){ args.push(value); }

	addArg(task);

	if ( undefined !== options.path ) {
		 addArg(options.path);
	}

	["task", "path", "noisy"].forEach(function(option){
		if(undefined !== options[option]){
			delete options[option];
		}
	});

	for(var option in options){
		if(options.hasOwnProperty(option)){
			if("boolean" === typeof options[option] && options[option]){
				addArg("--" + option);
			} else if("string" === typeof options[option]){
				val = options[option].split(" ");
				addArg("--" + option + "=" + val.pop());
				val.forEach(addArg);
			}
		}
	}

	var fp = fontProc(args);

	if (noisy) {
		fp.stdout.pipe(process.stdout);
		fp.stderr.pipe(process.stderr);
	}

	fp.on("exit", function(code) {
		if (code) {
			deferred.reject("An error occurred converting svgs to font icon");
		} else {
			deferred.resolve();
		}
	});

	return deferred.promise;
}

module.exports = fontcustom;
