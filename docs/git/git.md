---
sidebar_label: "Git"
sidebar_position: 000
---

# Git

## Start new repo

```bash
git init
git remote add origin git@github.com:<username>/<repo_name>.git
git add <file>
git commit -m "initial commit"
git push
```

## Making Changes

```bash
git status                  # See changes
git add file.py             # Add files/folder to staging
git commit -m "my message"  # commit changes
git push                    # push to remote repo

git restore file.js         # discard any changes made
```

## Merging

```bash
git fetch
git merge origin/<branch_name>
git commit                  # if any conflict resole else just push
git push
```

## Go to previous commit

```bash
git log --oneline
git reset sha_hash
```

## Stashing

```bash
git stash
git stash pop
```

## Cleaning changes

```bash
git reset --hard # remove/reset tracked files
git clean -df # remove untracked files
```

## Undoing a commit

```bash
git reset --soft HEAD~1
```

## Unstage all changes

```bash
git reset
```
