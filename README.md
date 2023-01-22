## scramble

This mobile app will be a food shopping list that automatically categorises items based on where in the store you can get them, and autopopulates the shopping list with ingredients of a chosen recipe. This is inspired by the desire to cook new and more varied vegan recipes more easily.

#### Try
First install expo-cli: ``npm install --global expo-cli``

Run the frontend:
```
cd frontend
npm i
npx expo start
```
The app uses MongoDB Atlas, so first intall MongoDB and start an instance ``sudo service mongod start``

The app uses npm dotenv package to hide IP address needed for React to communicate with Express. Create a .env file in the root of the frontend folder with ipv4 ``IP_ADDRESS="xxx.xxx.x.x"``

Run the backend
```
cd app
npm i
npm start
```


#### Tech

The app will use the Edmame recipe API and will be built using Express and React Native, using REST APIs. The rationale for the tech stack was to use backend tech I haven't used before, while keeping the frontend familiar. 

#### Aproach

![](images/scramble_crc_diagram.png)
![](images/user_journey.png)
