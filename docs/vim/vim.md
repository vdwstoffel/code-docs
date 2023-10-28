---
sidebar_label: "Vim"
---

# Vim

## Command Mode

| Command | Description              |
| ------- | ------------------------ |
| `:q`    | Exit Vim                 |
| `:q!`   | Exit and discard changes |
| `:w`    | Write changes            |
| `wq`    | Write and quit           |
| `u`     | Undo last action         |
| `dd`    | delete current line      |
| `yy`    | yank (copy) whole line   |
| `p`     | Paste                    |

## Insert Mode

| Command     | Description               |
| ----------- | ------------------------- |
| `i`         | Insert before cursor      |
| `a`         | Insert after cursor       |
| `o`         | insert on new line        |
| `shift + i` | Open at beginning of line |
| `shift + a` | Open at end of line       |
| `shift + o` | Open on line above        |
| `esc`       | exit insert mode          |

## Visual Mode

| Command     | Description                    |
| ----------- | ------------------------------ |
| `v`         | Enter/exit visual mode         |
| `shift + v` | Enter line mode                |
| `d`         | delete highlighted text        |
| `y`         | yanking: copy highlighted text |

## Advanced

Combine keystrokes in Command Mode:

| Command                          | Description                           |
| -------------------------------- | ------------------------------------- |
| `dw`                             | Delete until end of word              |
| `ci"`                            | Change inner `"`. `"` can be replaced |
| `%`                              | Go to other side of bracket           |
| `gg`                             | Go to start of file                   |
| `shift + g`                      | got to end of file                    |
| `shift + g` + `44` + `shift + g` | go to line 44                         |
| `zz`                             | center highlighted line               |

## Searching

| Command             | Description                                                  |
| ------------------- | ------------------------------------------------------------ |
| `/hello`            | Search for hello                                             | 
| `n`/`shift + n`     | Go to next/previous search result                            |
| `shift + #`         | got to next instant of highlighted word when in command mode |
| `:%s/word1/word2/g` | replaces all of `word1` with `word2`                         |

## Settings

```bash
:set numbers # enable line numbers
:set relativenumber # set relative nunmber froim the cursoW
:set paste # use ctrl + shift + p to paste from clipboard
```

### Setting file

Setting file localated at ~/.vimrc

Example basic settings

```bash
set number
set tabstop=4
set shiftwidth=4
set autoindent
set mouse=a
colorscheme slate
```
