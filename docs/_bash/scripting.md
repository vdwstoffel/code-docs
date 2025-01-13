---
sidebar_label: "Scripting"
---

# Bash

## If/Else
```bash
#! /usr/bin/bash

folder='test_folder'
file='test_file'

if [ -d $folder ] 
then
  echo 'folder logs exists'
  rm -r $folder
else
  echo 'Folder logs does not exists'
  mkdir $folder
fi

if [ ! -f $file ]
then
  echo 'file does not exists'
  touch $file
else 
  echo 'file exists'
  rm $file
fi
```

## Passing Arguments
```bash
#! /usr/bin/bash

first=$1
second=$2

# Check if arguments was passed
if [ $1 ]
then
  echo "First argument: $first"
fi

if [ $2 ]
then
  echo "Second argument: $second"
fi
```

## Check if bin is installed
```bash
#! /usr/bin/bash

# The command -v git command checks if the git command is available in the system's PATH. 
# The output is redirected to /dev/null to discard it.
if command -v git &>/dev/null; 
then
    echo "Git is installed."
    # Print the Git version
    echo "$(git --version)"
else
    echo "Git is not installed."
fi
```