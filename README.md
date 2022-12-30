# Express PDF TO HTML Docker Container

## For Mac | Linux

this command will build the image, which will download chromium 
first to make sure puppeteer can run without a problem.
```
source build.sh
```

the following statement will run your container (html-pdf) and expose port 3000. it will also bind your current directory with the app folder.

```
source run.sh 
```
