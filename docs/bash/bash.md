---
sidebar_label: "Bash"
sidebar_position: 402
---

# CLI

## Navigation

```bash
pwd                 ## Check entire working path

ls                  ## List items in directory
    -l              ## show info
    -a              ## show hidden folder

cd path/to/foldfer  ## change directory
cd ..               ## go back one
cd ~                ## go to root
```

## Files and Folders

```bash
touch filename              ## create file
rm filename                 ## remove file

mkdir foldername            ## create folder
rm -r foldername            ## remove folder

mv <source> <destination>   ## move file/folder
mv currentname newname      ## rename file/folder

cp <source> <destination>   ## copy file/folder
```

## Redirection

```bash
pwd > file.txt              ## direct output to file
pwd >> file.txt             ## append output to file

sort < file.txt             ## standard input

cat nofile 2> error.txt     ## direct errors to file
cat nofile 2>> error.txt    ## append errors to file
```

## Piping

```bash
ls | sort -r 
```

## Find executable

```bash
which python
```

## Expansion & Substitution
 - `*`: one or char
 - `?`: one char 

```bash
ls *.html       ## all that ends in .html
ls pic?.png     ## find anything that is picX.png
ls pic[123].png ## find anything in range. pic1.png pic2.png pic3.png
ls [^a]*        ## will match any files that do NOT start with "a"
```

### Brace Expansion

```bash
touch page{1,2,3}.txt
```

will generate three new files: page1.txt, page2.txt, and page3.txt


## Find

`find <dir> -iname "<file>"`

```bash
find ./ -name "*.md"

## finding by type
find -type d
find -type f

## find by name
find -name hello    ## case sensitive
find -iname hello   ## case insensitive
```

## Grep

`grep PATTERN FILE`

```bash
grep Flask README.md
grep -i Flask README.md     ## add -i to make case insensitive
grep -w git README.md       ## add -w to match wholewords
grep -r "chicken"           ## recursive search which will include all files under a directory
grep -c git README.md       ## print number of matches

## Usefull argumets
-w ## word
-i ## ignore case
-r ## recursive
-c ## match count
-n ## Line Number
-E ## Extended Regex
```

## Permissions

```bash
### Who
## u - user (the owner of the file)
## g - group (members of the group the file belongs to
## o - others (the "world")
## a - all of the above

### What
## - (minus sign) removes the permission
## + (plus sign) grants the permission
## = (equals sign) set a permission and removes others

### Which
## r - the read permission
## w - the write permission
## x - the execute permission

chmod <who><what><which>
chown <user> <file>
```

```bash
chmod +x file.py
```
## Zip

```bash
tar -xvzf /path/to/yourfile.tgz
```

```bash
unzip file.zip -d destination_folder
```

## Packages

### .deb

```bash
sudo dpkg -i package-name-here.deb
```

## Creating A Symlink

** Note ** Full file paths used

```bash
ln -sf full/file/path/file.txt full/file/path/file.txt
```

`f`: overwrite file if it exists