---
Sidebar_label: Bash
sidebar_position: 2
---

# Bash

Bash is a Unix shell and command language that is the default shell on Linux and macOS. It is also available on Windows 10 via the Windows Subsystem for Linux (WSL). Bash is a powerful tool that allows you to interact with your computer using text commands.

## Check your bash version

```bash
bash --version
```

<details>
<summary>Output</summary>

```bash
GNU bash, version 5.1.16(1)-release (x86_64-pc-linux-gnu)
Copyright (C) 2020 Free Software Foundation, Inc.
License GPLv3+: GNU GPL version 3 or later <http://gnu.org/licenses/gpl.html>

This is free software; you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.
```

</details>

## Navigation

### Check the current path

```bash
pwd
```

<details>
<summary>Output</summary>

```bash
/home/user/Documents
```

</details>

### Change directory

```bash
cd /path/to/directory
```

### Go to the home directory

```bash
cd
```

### List files and directories

Additional flags can be used to get more information about the files and directories.
example:

<details>

<summary>Popular Flags</summary>

- `-l` to get a long listing
- `-a` to show hidden files
- `-h` to show file sizes in human-readable format
- `-n` to show user and group IDs

</details>

```bash
ls
```

<details>
<summary>Output</summary>

```bash
file1.txt file2.txt directory1
```

</details>

## Files and Folders

### Create a new directory

```bash
mkdir new_directory
```

### Create a new file

```bash
touch new_file.txt

touch file1.txt file2.txt   # create multiple files

touch file{1..5}.txt        # create multiple files with a range

touch file{1,2,3}.txt       # create multiple files with a list
```

### Copy a file

```bash
cp path/of/file1.txt path/to/file2.txt
```

### Move a file

```bash
mv path/of/file1.txt path/to/file2.txt
```

### Remove a file

```bash
rm file1.txt
```

### Remove a directory

```bash
rm -r directory1
```

### Search for a file

```bash
find /home/user/Documents -name "file1.txt"

find /home/user/Documents -iname "file1.txt"    # search for case insensitive
```

<details>
<summary>Output</summary>
    
```bash
/home/user/Documents/file1.txt
```

</details>


## How to clear the terminal

```bash
clear
```


## Run command with higher privileges

```bash
sudo your_command
```
