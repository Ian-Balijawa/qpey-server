FROM node:14

#create a working directory 
WORKDIR /usr/src/qpey

#copy package.json
COPY package.json ./

# Install app dependencies
RUN npm install 

#copy all the source code includng the installed dependencies into the working directory
COPY . .

#build the app to produce valid javascript  index.js file
RUN npm build

EXPOSE  8080
CMD ["npm","start"]
USER node