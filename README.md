## Run the project locally 
To run the project locally, do the following

- clone or download the repository
- in the console and from within the repository run `yarn install`
- then run `yarn start` and see it run on localhost:3000
- if you want to run all tests, run `yarn test`

## Structure
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

It is structured into 
- the typical `components` folder, containing folders for each React component
- a folder for handling api calls, called `api` 
- and finally a `hooks` folder containing hooks that can be used accross the application.
 
Each component folder contains a
- `index.js` which serves as entry point to the component (Although I could import the component directly, I find it a good practice to use an index file, since it makes later changes much easier)
- a `<component-name>.js` for handling the components display
- a `<component-name>-container.js` for handling its logic
- a `index.css` for styling
- and finally `index.test.js` for component testing.

## Thoughts & decisions
It didn't occur to me as a possibility, that you might not be looking for a complete functional component - which is why I automatically implemented an onClick-handler that lets the user choose a value from the actual dropdown. I hope this is ok.<br>It still fullfills all the requirements.

#### Packages
I tried to act like it was a real project with a bright future, and therefor started out by setting it up propperly by installing `prop-types`, `react-test-renderer` for snapshot testing as well as configuring `eslint`. I also installed `prettier`, but that was just for convenience.
<br>Finally I installed `fontawesome` and set it up to be used across the entire application.
<br>...and ready for coding I was!

### Focus
Having my focus on usability, I decomposed the live search component, although there is no other usecase for e.g. Input, FormItem etc. components in the project.

In order to also make the live search component itself re-usable, I split the data related logic (in this case manager data) and the internal logic for the live search component behaviour into two separate components - `ManagerLiveSearch` and `SearchInput`.

`ManagerLiveSearch` knows all about the data, it fetches it, formats it, handles the search algorithm and the data specific display (rows in dropdown).  
`SearchInput` doesn't care about any of this, but handles all userinteraction and its current value, but simply uses the formatted data and a corresponding display component and search algorithm recieved by `ManagerLiveSearch`.  
This way, there could be many live searches with different data and different displays.

To go even further down the reuseable lane, I extracted the search algorithm into a hook located in the global `hooks` folder (it might be useful for a completly different data) and made it 'key-agnostic', meaning it can handle search also accross other keys provided, not just `firstName` and `lastName`.

### Bonus
I was intrigued by the bonus tasks, which adresses the exact reasons, why I usually use a ready-made component for dropdowns 
<br>- so I had to give it a try :).
<br>Since it was a bonus, I saw an opportunity to explore the concept of hooks, which is why I used them heavily to achieve handling of keyboard events. However I did not memoize and am not sure about the performance part, which is why I deliever the bonus code as PR.
The solution is working, but I would love to discuss it with a colleague and improve accordingly.

Also - since it was the bonus an me running out of time - there no tests covering this bit.
<br>But feel free to try it out though, by simply checking out the branch `keyboard-navigation` and run `yarn start`

### Tests
Each requirement is covered by tests, although my tests cover bits and not an entire requirement. This is because I think that tests should cover only as few things as possible and I'll rather write more than one big tests. 
<br>I've grouped the tests though for better understanding and added the param `--verbose` to the script in `package.json`, so you should see a nice overview of all tests when running `yarn test`.

### Next steps
Next steps would definitely be in diving more into performance. I know I got still things to learn there, especially with hooks. 
Also there could be more tests, since I only covered the basics.  


## Available Scripts
In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn lint`

Runs ESLint on the code.<br />

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
