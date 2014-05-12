#folder info
This folder contains HTML files used by Simon JS.

**Both files will only work properly if opened from the `<project-root>/target-<version>/` folder, using a webserver** *

To ease development, you may place a `config.js` inside this folder. It will be copied to the `<project-root>/target-<version>/`
along with the HTML files.

##index-debug.html
this file will use the non-minified, non-merged versions of the compiled TypeScript Simon JS library files from the local file system.

##index.html
this file will use the minified, merged versions of the compiled TypeScript Simon JS library files.

------------------

\* for instance, select "Open in Browser" in the [Webstorm]() context menu