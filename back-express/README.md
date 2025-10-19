# LOG

## Remember
1. windows shortcuts can be copied/moved and still recognized
1. windows mklink not
1. windows mklink /D when try to copy, it grabs everything.
## 11.1.2024

1.  Originally my-express was in public/canvas_file_caches/githubmine location but there was a warning that the owner of the folder was different from the current user. 
1. I decided to start from scratch with a new repository and work on documents folder
1. ssh-keygen -t ed25519 -C "usergolden25@canvas.ed"
1. config file in .ssh : Host github User nelsonlopezjimenez IdentityFile in ssh id_ed25519
1. Copied and pasted all except node_modules and dot git because it did not want to run. But when it did it gave too many warning about deprecated packages. 
1. Also, when I tried to copy/paste the symlinks in the my-express/public folder it was trying to copy everything. Not sure how git handles symlinks but I will have to recreate them and when pulling from github see what happens with the symlinks in the public folder.
1. npm install express, cors
1. git config --global user.email and user.name added

## in the laptop

1. Keep data in public/bin folder and  create shortcuts and just  move them or make more copies. It apparently recognize them, so no need to open command prompt to create mklinks.
1. Same for zeal: do not move the docfiles. Execute zeal from c/programfiles location. Then navigate to preferences tab and select the location in public folder
1. Shortcut were created for public/bin/npm-cache, public/bin/npmversion/npm-4.24.2024 move to roaming, and public/bin/verdaccio shortcut and move to roaming.
1. verdaccio run with no problem version 5.11. It is not the most updated, but the version 5.30 showed issues and I have not tried even version 6

## Question about mklinks

1. move or to recreate?
1. In %public%/my-express/public/example.nel symlink target in public/videos/ so I cloned example.nel.git repository in that location and now it is working.
1. in %userprofile%/Documents/GITHUBREPOS/my-express/pubic is empty and it will stay like that for  a while until it becomes clear how link, symlinks or shortcuts are dealt with.


# README for my-express server on new laptop image (2023)

## path to githubmine: /c/users/public/CANVAS_FILE_CACHES/my-express/.git

## path to local: C:\Users\adm\Documents\GIT_LOCAL_REPOS\my-express\public

## git init on 11.8.2023

