var Promise  = require("bluebird"),
	which    = require("which").sync,
	exec     = which("fontcustom"),
	fontProc = require("child_process").spawn.bind(null, exec);


function fontcustom(options) {

	var promise = Promise.defer(),
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
			val = options[option].split(" ");
			addArg("--" + option + "=" + val.pop());
			val.forEach(addArg);
		}
	}

	var fp = fontProc(args);

	if (noisy) {
		fp.stdout.pipe(process.stdout);
		fp.stderr.pipe(process.stderr);
	}

	fp.on("exit", function(code) {
		if (code) {
			promise.reject("An error occurred converting svgs to font icon");
		} else {
			promise.resolve();
		}
	});

	return promise;
}

module.exports = fontcustom;
