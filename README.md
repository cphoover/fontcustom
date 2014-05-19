# Node Font Custom
Simple node.js wrapper around fontcustom. Takes one argument "options" which is a map that directly corresponds to command line switches. If the command line switch is either enabled or disabled (e.g "debug") it will be enabled by setting it to boolean true in the options map.

The only exception is the ***noisy*** option which specifies if output of the fontcustom child process will be piped to the parent process (defaults to off).

Also with the fontcustom function the default task will be ***compile*** if not specified with a task option. 


## Requirements
* [fontcustom](http://fontcustom.com/#)
    
## Installation
    npm install fontcustom
    
## Usage Example

    var fontcustom = require("../");

    fontcustom({
        "config" : __dirname + "/icons.yml",
        "noisy"  : true,
        "force"  : true
    });


## Promises
fontcustom returns a A+ compliant promise (bluebird.js). The promise is either resolved or rejected depending on the exit code of the fontcustom child process.

***examle usage with gulp: ***

     gulp.task("global:icons", function(cb){
          return fontcustom({
              "path"   : config.icons,
              "output" : path.join(config.public, "icons"),
              "noisy"  : true,
              "force"  : true
          });
      });


As of this writing here are some example fontcustom options:

    fontcustom({
        output            : "./out"                     , 
        /* Where generated files are saved. Set different locations for different file types via a configuration file. */
        
        config            : "./config.yml"              , 
        /* Optional path to a configuration file. Default: ./fontcustom.yml -or- ./config/fontcustom.yml */
        
        templates         : "one two three"             , 
        /* Space-delinated list of files to generate alongside fonts. Use stock templates or choose your own. Default: css preview Possible values: preview, css, scss, scss-rails */
        
        font-name         : "my-custom-font"            , 
        /* The font's name. Also determines the file names of generated templates. Default: fontcustom */
        
        css-selector      : ".custom-icon-{{glyph}}"    , 
        /* Format of generated CSS selector. "{{glyph}}" is substituted for the glyph name. Default: .icon-{{glyph}} */
        preprocessor-path : "./templates/less-template" , 
        /* Optional font path for CSS proprocessor templates. */
        
        autowidth         : true                        , 
        /* Auto-size glyphs to their individual vector widths. */
        
        no-hash           : true                        , 
        /* Generate fonts without asset-busting hashes. */
        
        debug             : true                        , 
        /* Display debugging messages. */
        
        force             : true                        , 
        /* Forces compilation, even if inputs have not changed. */
        quiet             : false                         
        /* Hide status messages. */
    });


## Aditional Resources
 For more documentation/info please visit the fontcustom documentation [here](http://fontcustom.com/)
