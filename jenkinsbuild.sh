#!/bin/bash
RELEASEVERSION=$1
SNAPSHOTVERSION=$2
RELEASETAGFILE="RELEASE.TAG"
RELEASEBUILD="FALSE"
BUMPLEVEL="BUILD"
RELEASEMODE="FALSE"
BUILDBACKEND="FALSE"
BUILDUI="FALSE"
WORKINGBRANCH="NONE"
PREBUMPVERSION="0.0.0"
POSTBUMPVERSION="0.0.0"

set_release_version_sbt () {
    SBTRELEASELINE="version in ThisBuild := \"${RELEASEVERSION}\""
    echo $SBTRELEASELINE
    cp version.sbt version.sbt.tmp
    echo $SBTRELEASELINE > version.sbt
    #Tag that the version file has been set to release mode
    echo $RELEASETAGFILE
    touch $RELEASETAGFILE
}

set_snapshot_version_sbt () {
    SBTSNAPSHOTLINE="version in ThisBuild := \"${SNAPSHOTVERSION}-0000\""
    echo $SBTSNAPSHOTLINE
    cp version.sbt version.sbt.tmp
    echo $SBTSNAPSHOTLINE > version.sbt
}

bump_version_sbt () {

    SBTFILE=$(cat version.sbt)
    BUMPEDVERSION=$(bump_version_sbt_build_py "$SBTFILE" "$1")

    echo "Updating with: "$BUMPEDVERSION
    if [ -n "$BUMPEDVERSION" ]; then
        echo $BUMPEDVERSION > version.sbt
    fi

}

get_version_sbt () {
    SBTFILE=$(cat version.sbt)
    bump_version_sbt_build_py "$SBTFILE" "$1"
}

bump_version_sbt_major () {
    bump_version_sbt "MAJOR"
}
bump_version_sbt_minor () {
    bump_version_sbt "MINOR"
}

bump_version_sbt_patch () {
    bump_version_sbt "PATCH"
}

bump_version_sbt_build () {
     bump_version_sbt "BUILD"
}

bump_version_sbt_last () {
    bump_version_sbt "LAST"
}

strip_snapshot_from_sbt_version () {
    sed -i -r 's/-[0-9]+-SNAPSHOT//' version.sbt 
}

insert_snapshot_in_sbt_version () {
    sed -i -r 's/\"$/-0000-SNAPSHOT\"/' version.sbt
}

get_version_grump_file_py () {
    
VERSIONFILE_ARG="$1" SELECTOR_ARG="$2" python - << END
import re
import os
import json
from pprint import pprint
data={}
with open(os.environ['VERSIONFILE_ARG'],"r") as data_file:
    data = json.load(data_file)

#get version
version_number=re.findall(r'\d+',data["version"])
last_part = re.findall(r'[A-Za-z"-]*$',data["version"])

results = map(int,version_number)
results_size = len(results)

version_part=""
for ndx, v in enumerate(results):
    if ndx<2:
        version_part+="%d."%v
    if ndx==2:
        version_part+="%d"%v
    if ndx>2:
        version_part+="-%04d"%v

print(version_part)

END
}


get_version_from_sbt_string_py () {
    
VERSION_ARG="$1" SELECTOR_ARG="$2" python - << END
import re
import os
#print os.environ['VERSION_ARG']
#print os.environ['SELECTOR_ARG']
##Isolate parts of the version string##
first_part = re.findall(r'^[a-zA-Z :="]+',os.environ['VERSION_ARG'])
version_number=re.findall(r'\d+',os.environ['VERSION_ARG'])
last_part = re.findall(r'[A-Za-z"-]*$',os.environ['VERSION_ARG'])
results = map(int,version_number)
results_size = len(results)

version_part=""
for ndx, v in enumerate(results):
    if ndx<2:
        version_part+="%d."%v
    if ndx==2:
        version_part+="%d"%v
    if ndx>2:
        version_part+="-%04d"%v

print(version_part)

END
}

bump_version_sbt_build_py () {
    
VERSION_ARG="$1" SELECTOR_ARG="$2" python - << END
import re
import os
#print os.environ['VERSION_ARG']
#print os.environ['SELECTOR_ARG']
##Isolate parts of the version string##
first_part = re.findall(r'^[a-zA-Z :="]+',os.environ['VERSION_ARG'])
version_number=re.findall(r'\d+',os.environ['VERSION_ARG'])
last_part = re.findall(r'[A-Za-z"-]*$',os.environ['VERSION_ARG'])
results = map(int,version_number)
results_size = len(results)

if os.environ['SELECTOR_ARG'] == "MAJOR" and results_size > 0:
    results[0]+=1
elif os.environ['SELECTOR_ARG'] == "MINOR" and results_size > 1:
    results[1]+=1
elif os.environ['SELECTOR_ARG'] == "PATCH" and results_size > 2:
    results[2]+=1
elif os.environ['SELECTOR_ARG'] == "BUILD" and results_size > 3:
    results[3]+=1
elif os.environ['SELECTOR_ARG'] == "LAST":
    results[-1]+=1

version_part=""
for ndx, v in enumerate(results):
    if ndx<2:
        version_part+="%d."%v
    if ndx==2:
        version_part+="%d"%v
    if ndx>2:
        version_part+="-%04d"%v

os.environ['POSTBUMPVERSION'] = version_part

print(first_part[0]+ version_part +last_part[0])

END
}

bump_version_grump_build_py () {
    
VERSIONFILE_ARG="$1" SELECTOR_ARG="$2" python - << END
import re
import os
import json
from pprint import pprint

data={}
with open(os.environ['VERSIONFILE_ARG'],"r") as data_file:
    data = json.load(data_file)
    #print(data["version"])

#get version
version_number=re.findall(r'\d+',data["version"])
last_part = re.findall(r'[A-Za-z"-]*$',data["version"])

results = map(int,version_number)
results_size = len(results)

if os.environ['SELECTOR_ARG'] == "MAJOR" and results_size > 0:
    results[0]+=1
elif os.environ['SELECTOR_ARG'] == "MINOR" and results_size > 1:
    results[1]+=1
elif os.environ['SELECTOR_ARG'] == "PATCH" and results_size > 2:
    results[2]+=1
elif os.environ['SELECTOR_ARG'] == "BUILD" and results_size > 3:
    results[3]+=1
elif os.environ['SELECTOR_ARG'] == "LAST":
    results[-1]+=1

version_part=""
for ndx, v in enumerate(results):
    if ndx<2:
        version_part+="%d."%v
    if ndx==2:
        version_part+="%d"%v
    if ndx>2:
        version_part+="-%04d"%v

os.environ['POSTBUMPVERSION']=version_part

data["version"]=version_part+last_part[0]
with open(os.environ['VERSIONFILE_ARG'],"w") as data_file:
    json.dump(data,data_file,indent=4)

END
}


strip_snapshot_from_grump_version_file () {
    
VERSIONFILE_ARG="$1" SELECTOR_ARG="$2" python - << END
import re
import os
import json
from pprint import pprint
data={}
with open(os.environ['VERSIONFILE_ARG'],"r") as data_file:
    data = json.load(data_file)
    print(data["version"])

#get version
version_number=re.findall(r'\d+',data["version"])
last_part = re.findall(r'[A-Za-z"-]*$',data["version"])

results = map(int,version_number)
results_size = len(results)

version_part=""
for ndx, v in enumerate(results):
    if ndx<2:
        version_part+="%d."%v
    if ndx==2:
        version_part+="%d"%v

#print("Version to put in .json file: "+version_part)
data["version"]=version_part
with open(os.environ['VERSIONFILE_ARG'],"w") as data_file:
    json.dump(data,data_file,indent=4)

END
}

insert_snapshot_in_grump_version_file () {

VERSIONFILE_ARG="$1" python - << END
import re
import os
import json
from pprint import pprint
data={}
with open(os.environ['VERSIONFILE_ARG'],"r") as data_file:
    data = json.load(data_file)
    #print(data["version"])

#get version
version_number=re.findall(r'\d+',data["version"])

results = map(int,version_number)
results_size = len(results)

version_part=""
for ndx, v in enumerate(results):
    if ndx<2:
        version_part+="%d."%v
    if ndx==2:
        version_part+="%d"%v

#print("Version to put in .json file: "+version_part)
data["version"]=version_part+"-0000"
with open(os.environ['VERSIONFILE_ARG'],"w") as data_file:
    json.dump(data,data_file,indent=4)

END

}

build_ssbackend_snapshot () {
    
    echo "Now building: build_ssbackend_snapshot $1"
    
    git checkout $1

    chmod 777 ./activator
    sh ./activator clean
    sh ./activator reload
    sh ./activator compile
    sh ./activator test:compile
    sh ./activator dist
    sh ./activator universal:publish

    SBT_BUILD_INFO=$(<version.sbt)
    PREBUMPVERSION=$(get_version_from_sbt_string_py "$SBT_BUILD_INFO")
    
    bump_version_sbt_build

    SBT_BUILD_INFO=$(<version.sbt)
    POSTBUMPVERSION=$(get_version_from_sbt_string_py "$SBT_BUILD_INFO")
    git commit -m"Jenkins built snapshot version: $PREBUMPVERSION : $BUILD_ID. The next build version will be: $POSTBUMPVERSION" version.sbt
    git push origin $1
}

build_ssbackend_release () {
    echo "Now building: build_ssbackend_release $1"

    git checkout $1
    
    strip_snapshot_from_sbt_version

    chmod 777 ./activator
    sh ./activator clean
    sh ./activator reload
    sh ./activator compile
    sh ./activator test:compile
    sh ./activator dist
    sh ./activator universal:publish

    SBT_BUILD_INFO=$(<version.sbt)
    PREBUMPVERSION=$(get_version_from_sbt_string_py "$SBT_BUILD_INFO")
    
    insert_snapshot_in_sbt_version
    bump_version_sbt_patch

    SBT_BUILD_INFO=$(<version.sbt)
    POSTBUMPVERSION=$(get_version_from_sbt_string_py "$SBT_BUILD_INFO")
    
    git commit -m"Jenkins built a release on: $PREBUMPVERSION , next release version: $POSTBUMPVERSION at $SBT_BUILD_INFO : $BUILD_ID" version.sbt
    git tag "v$PREBUMPVERSION"
    git push origin $1
    git push --tags
}

build_ssui_snapshot () {
    echo "Building: build_ssui_snapshot $1"
    git checkout $1
    git pull

    npm install --production
    npm install -g bower

    npm install -g grunt-cli
    npm install -g karma-jasmine

    npm install jasmine --save-dev
    npm install jasmine-core --save-dev

    npm install karma-jasmine --save-dev

    npm uninstall grunt-contrib-compress
    npm uninstall grunt-contrib-uglify
    npm uninstall grunt-contrib-cssmin
    npm uninstall grunt-contrib-copy
    npm uninstall grunt-processhtml

    npm install karma-phantomjs-launcher --save-dev
    npm install karma --save-dev
    npm install karma-cli
    npm install grunt --save-dev
    npm install grunt-wiredep --save-dev
    npm install grunt-contrib-less --save-dev
    npm install grunt-contrib-compress --save-dev
    npm install grunt-contrib-uglify --save-dev
    npm install grunt-processhtml --save-dev
    npm install grunt-contrib-copy --save-dev
    npm install grunt-contrib-jshint --save-dev
    npm install grunt-contrib-cssmin --save-dev
    npm install grunt-contrib-clean --save-dev
    npm install grunt-nexus-deployer --save-dev
    npm install grunt-bump --save-dev
    npm install grunt-karma --save-dev
    npm install grunt-shell --save-dev
    bower install

    grunt dist
    grunt nexusDeployer:snapshot
    PREBUMPVERSION=$(get_version_grump_file_py "package.json")
    bump_version_grump_build_py "package.json" "BUILD"
    POSTBUMPVERSION=$(get_version_grump_file_py "package.json")

    git commit -m"Jenkins commit ui next snapshot version: $POSTBUMPVERSION  $SBT_BUILD_INFO : $BUILD_ID" "package.json"
    git push origin $1
    git push --tags

}

build_ssui_release () {
    echo "Now building: build_ssui_release $1"
    git checkout $1
    git pull

    strip_snapshot_from_grump_version_file "package.json"

    npm install --production
    npm install -g bower
    
    npm install -g grunt-cli
    npm install -g karma-jasmine

    npm install jasmine --save-dev
    npm install jasmine-core --save-dev

    npm install karma-jasmine --save-dev

    npm install karma-phantomjs-launcher --save-dev
    npm install karma --save-dev
    npm install karma-cli
    npm install grunt --save-dev
    npm install grunt-wiredep --save-dev
    npm install grunt-contrib-less --save-dev
    npm install grunt-contrib-compress --save-dev
    npm install grunt-contrib-uglify --save-dev
    npm install grunt-processhtml --save-dev
    npm install grunt-contrib-copy --save-dev
    npm install grunt-contrib-jshint --save-dev
    npm install grunt-contrib-cssmin --save-dev
    npm install grunt-contrib-clean --save-dev
    npm install grunt-nexus-deployer --save-dev
    npm install grunt-bump --save-dev
    npm install grunt-karma --save-dev
    npm install grunt-shell --save-dev
   
    bower install

    grunt dist
    grunt nexusDeployer:release

    PREBUMPVERSION=$(get_version_grump_file_py "package.json")
    insert_snapshot_in_grump_version_file "package.json"
    
    bump_version_grump_build_py "package.json" "PATCH"
    POSTBUMPVERSION=$(get_version_grump_file_py "package.json")
    
    git commit -m"Jenkins released on version: $PREBUMPVERSION. Next build: $POSTBUMPVERSION" "package.json"
    git tag "v$PREBUMPVERSION"
    git push origin $1
    git push --tags
    
}

for i in "$@"
do
    case $i in
        -r|--release)
            RELEASEMODE="TRUE"
            shift
            ;;

        -b=*|--bump=*)
            BUMPLEVEL="${i#*=}"
            shift
            ;;

        --branch=*)
            WORKINGBRANCH="${i#*=}"
            shift
            ;;

        --backend)
            BUILDBACKEND="TRUE"
            shift
            ;;

        --ui)
            BUILDUI="TRUE"
            shift
            ;;

        --default)
            DEFAULT=BUMPBUILD
            shift
            ;;
        *)

            ;;
    esac
    shift
done

echo "$1"


if [ $BUILDBACKEND == "TRUE" ]; then

    if [ $RELEASEMODE == "TRUE" ]; then

        echo "*** Build backend release on ${WORKINGBRANCH} ***"
        build_ssbackend_release $WORKINGBRANCH
    else
        echo "*** Build backend snapshot on ${WORKINGBRANCH} ***"
        build_ssbackend_snapshot $WORKINGBRANCH
    fi
fi

if [ $BUILDUI == "TRUE" ]; then
    if [ $RELEASEMODE == "TRUE" ]; then
        
        echo "*** Build ui release ${WORKINGBRANCH} ***"
        build_ssui_release $WORKINGBRANCH
    else
        #build_ssui_snapshot
        echo "*** Build ui snapshot ${WORKINGBRANCH} ***"
        build_ssui_snapshot $WORKINGBRANCH
    fi
fi

    


