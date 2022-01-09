### How to recover a corrupted Git repository

https://github.com/microsoft/WSL/issues/5026#issuecomment-751779330

```
rm -rf .git &&                    # delete old corrupted repo
git init &&                       # initialise new repo
git remote add origin "${url}" && # link to old repo
git fetch &&                      # get old history
git reset origin/main --hard &&   # force update to old history
git branch -m master main &&      # rename local branch as "main" if needed
git branch -u origin/main         # track local "main" with online "main"
```
