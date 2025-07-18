#!/bin/bash


## --[ STEP 0 ]---------------------------------------------
# This will cause the shell to exit immediately if a simple command exits with a nonzero exit value.
set -Eeuo pipefail


## --[ STEP 1 ]---------------------------------------------
echo "Building..."
rm -rf ./build
mkdir -p ./build
npm run build


## --[ STEP 2 ]---------------------------------------------
echo "index HTML and favicon"
cp ./public/index.html ./build/
cp ./public/favicon.ico ./build/


## --[ STEP 3 ]---------------------------------------------
echo "Make available JS and images..."

cp -R ./public/images ./build
# you can speed things up by using symbolic links instead of copying files
# something like the below, but make sure to modify the file paths
# ln -s /Users/valera/dev/valera-rozuvan/react-from-scratch/public/images /Users/valera/dev/valera-rozuvan/react-from-scratch/build/images

cp -R ./public/js ./build
# you can speed things up by using symbolic links instead of copying files
# something like the below, but make sure to modify the file paths
# ln -s /Users/valera/dev/valera-rozuvan/react-from-scratch/public/js /Users/valera/dev/valera-rozuvan/react-from-scratch/build/js


## --[ STEP 4 ]---------------------------------------------
# Comment out the below 6 lines if you want to have source maps for debugging.
echo "Uglify..."
uglifyjs --compress --mangle --output ./build/main.min.js -- ./build/main.js
sed -i -- 's/main/main.min/g' ./build/index.html
rm -rf "./build/index.html--"
rm -rf "./build/main.js"
rm -rf "./build/main.js.map"


## --[ STEP 5 ]---------------------------------------------
# If we got here - all is good ;)
echo "Done!"
exit 0
