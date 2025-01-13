---
sidebar_label: "Git"
sidebar_position: 000
---

import GitLogo from '@site/static/img/git.png';
import DisplayLogo from '@site/src/components/DisplayLogo';

# Git

<DisplayLogo logo={GitLogo}/>

Git is a distributed version control system for tracking changes in source code during software development. It is designed for coordinating work among programmers, but it can be used to track changes in any set of files.

## Start new repo

```bash
git init
```

## Check the status of the repo

```bash
git status
```

<details>

<summary>Output</summary>

```bash
On branch main
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   hello.py

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	world.py

no changes added to commit (use "git add" and/or "git commit -a")
```

</details>

## Add and commit file

```bash
git add hello.py
git commit -m "initial"
```

<details>

<summary>Output</summary>

```bash
[main (root-commit) fa151bd] initial
 1 file changed, 1 insertion(+)
 create mode 100644 hello.py
```

</details>

## Push to remote repo

```bash
git push
```

## Discard changes made to file

```bash
git restore hello.py
```

## Discard all changes made

```bash
git reset --hard
```

## Remove a file from git tracking

```bash
git rm --cached hello.py
```

## View git history

Ommit the `--oneline` flag to see the full commit message

```bash
git log --oneline
```

<details>

<summary>Output</summary>

```bash
13dacc5 (HEAD -> main) add new file
fa151bd initial
```

</details>

## Got to previous commit

```bash
git reset <git_sha>
```

## Clone remote repo

```bash
git clone git@github.com:username/reponame.git
```

## Branches

### Create a new branch

```bash
git branch improvements
```

### Switch to a branch

```bash
git checkout improvements
```

### View all branches

```bash
git branch
```
