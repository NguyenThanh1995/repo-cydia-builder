#!/bin/bash

apt-ftparchive packages ./debs > ./Packages
bzip2 -c9k ./Packages > ./Packages.bz2

exit 0