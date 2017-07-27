# Tutorial: Using TDD with Riot+mocha+chai 
TDD using mocha+chai to test Riot tags.
Riot is a React- like user interface library http://riotjs.com.
Mocha is a feature-rich JavaScript test framework https://mochajs.org/
Chai is a BDD / TDD assertion library http://chaijs.com/

## Installation
You can read the tutorial, or just install the repo.

``` 
git clone https://github.com/vitogit/tdd-mocha-chai-riot
cd tdd-mocha-chai-riot
npm install
```
And then just `npm test` to run the tests.

## Tutorial
This is a simple tutorial about how to setup an environment to do TDD (Test driven development) using karma+mocha+chai to test Riot tags and their properties and functions.You are going to need the last version of Node. Download it from here https://nodejs.org/en/download/ 

We are going to use phantomJs because we need to test the DOM, so an easy setup is to use Karma to run the test.

### Dependencies
Create a new folder called tdd-mocha-chai-riot and generate the package.json file like this
```
mkdir tdd-mocha-chai-riot
npm init
```

`npm init` will generate the package.json file, it will ask you for some info, use the defaults values. Then edit package.json and add the devDependencies (this is how it will look https://github.com/vitogit/tdd-mocha-chai-riot/blob/master/package.json) 
```
  "devDependencies": {
    "chai": "^3.5.0",
    "karma": "^0.13.21",
    "karma-chai": "^0.1.0",
    "karma-mocha": "^0.2.2",
    "karma-mocha-reporter": "^1.2.1",
    "karma-phantomjs-launcher": "^1.0.0",
    "karma-riot": "^1.0.1",
    "mocha": "^2.4.5",
    "phantomjs-prebuilt": "^2.1.4",
    "riot": "^2.3.15"
  }
```

Or also you can execute this:
```
npm install chai karma karma-chai karma-mocha karma-mocha-reporter karma-phantomjs-launcher karma-riot phantomjs-prebuilt riot --save-dev
```

### Config
Then we need to create a new file to config Karma, create a new file karma.conf.js with this content
```
module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha','chai','riot'],
    plugins: [
      'karma-mocha',
      'karma-mocha-reporter',
      'karma-phantomjs-launcher',
      'karma-chai',
      'karma-riot'
    ],
    files: [
      'node_modules/chai/chai',
      'src/**/*.tag',
      'test/**/*.js'
    ],
    preprocessors: {
      '**/*.tag': ['riot']
    },
    browsers: ['PhantomJS'],
    reporters: ['mocha'],
    failOnEmptyTestSuite: false,
    singleRun: true  
  })
}
```

Then edit the scripts section from the package.json file, so when we run `npm test` or `npm run test` it will start karma and execute the tests.
```
  "scripts": {
       "test": "karma start"
  }
```

### First TDD iteration: a hello tag exists
Each step in the tutorial is related to a commit https://github.com/vitogit/tdd-mocha-chai-riot/commits/master so you can see the changes.

Let’s setup our first test, create a test folder, create a hello-spec.js file and copy this code
```javascript
describe('Hello world spec', function() {
})
```

Try `npm test` (or npm run test), to see if karma is running fine, you should see
```
SUMMARY:
V 0 tests completed
```

I added failOnEmptyTestSuite: false in the karma.config.js file because by default Karma returns an error if you have an empty test. 

Our goal is to create a tag that prints Hello {name} inside a H1 tag. So to write the test, the first thing we need to do is to create a tag in the dom called ‘hello’. We just use this line 
`var html = document.createElement('hello')` and then we are going to append that node to the body `document.body.appendChild(html)`
and mount it, like this `riot.mount('hello')`
This is going to return an array of tags. Since we just added one, we are going to write this to get the mounted tag: 
`tag = riot.mount('hello')[0]`
Then we will check if the tag exist (not undefined and not null) with the mocha method `expect(tag).to.exist`
So the test code will look like this

```javascript
describe('Hello world spec', function() {
  it('mounts a hello tag', function() {
    var html = document.createElement('hello')
    document.body.appendChild(html)
    tag = riot.mount('hello')[0]  
    expect(tag).to.exist
  })
})
```
Run the test again `npm test`, and of course it will fail with `expected undefined to be truthy`
So we need to create the tag. To do so, we create a new ‘src’ folder and a hello.tag file with this content:
```
<hello>
</hello>
```
Run `npm test` again, and it will pass. So we completed the first TDD iteration.

### Second TDD iteration: has a name property
Now that we know that the tag exist we can add also this `expect(tag.isMounted).to.be.true` to check if it was mounted, because riot tags have a isMounted property.  In general it’s not recommended to have two expectations in the same test, but as we are testing the same behavior I think it's fine . You can read more here http://betterspecs.org/#single . We can update the expectation description to “mount a hello tag” to describe exactly what we are testing.

The next goal is: given a name parameter, print Hello {name}. We need a property called name, so we can pass it as a parameter (when mounting) and write Hello {name}. Let's write a failing test like this
```javascript
  it('has a name property ', function() {
    var html = document.createElement('hello')
    document.body.appendChild(html)
    tag = riot.mount('hello')[0]
    expect(tag.name).to.exist
  }) 
```  

Run the test and of course it fails. Let’s make it pass. Edit the hello.tag and write this:
```html
<hello>
  <script>
    this.name = ''
  </script>
</hello>
```
This way, Riot will know that our tag has a "name" property. Run the test again and it will work. 

### Refactor: Move duplicate code to before hook
Now that we have confidence that the code is good, let's refactor it a little bit. As you can see we have duplicate code in our tests. Let’s use the mocha before hook, so it will only execute one time. Move the duplicate code to a before hook, editing the tests
```javascript
  before(function() {
    var html = document.createElement('hello')
    document.body.appendChild(html)
    tag = riot.mount('hello')[0]
  }); 
```
Run the tests again, and it should pass.

### Third iteration: mounts a hello tag with a setted name
Our next goal is to mount the tag passing the name property. Let´s write the failing test
```javascript
  it('mounts a hello tag with a setted name', function() {  
    tag = riot.mount('hello', {name: 'Carl'})[0]
    expect(tag.name).to.be.eq('Carl')
  }) 
```
It will  fail with:     `expected '' to equal 'Carl'`, so to make it work we need to use the "opts" functionality that Riot gives us. Just update the hello.tag like this
```html
<hello>
  <script>
    this.name = opts.name
  </script>
</hello>
```
Run the test again, and the last test pass, but the second test is not working. What´s happening? 
This shows why TDD is useful: when we introduce new functionality we can break the old code. So how can we fix this? It´s easy, the problem is that it’s expecting a string, but it’s undefined. So we change the code a little, so if opts.name is undefined then we use an empty string.
```html
<hello>
  <script>
    this.name = opts.name || ''
  </script>
</hello>
```
Run the test again and it should pass.

### Refactor: Using karma autowatch to automatically run the tests
Running `npm test` each time could be a little slow, so we can add `autoWatch: true` to our karma.conf.js so it will rerun the test each time a file is modified. Also remove the `singleRun: true,”` line. This will run the tests each time we save the files, so we can have a fast feedback loop when doing TDD.

Now if we ‘run test’ again, karma will wait for changes. Let´s edit a test just to confirm this. For instance, we can change the second expectation to `expect(tag.isMounted).to.be.false` and then check the console. karma automatically run the test and shows the failing test. Let´s fix the tests again changing `expect(tag.isMounted).to.be.true` and now all tests will pass.

### Fourth iteration: prints \<h1>Hello {name}\</h1>
Next, we want to show the Hello {name} inside a H1 tag, so let's write a new test and learn how to use the querySelector method.
```javascript
  it('prints <h1>Hello {name}</h1> ', function() {  
    tag = riot.mount('hello', {name: 'Carl'})[0]
    var tagText = document.querySelector('hello > h1').textContent
    expect(tagText).to.be.eq('Hello Carl') 
  }) 
```
As you can see we are using `document.querySelector('hello > h1').textContent`. This will search for a h1 tag inside a hello tag and get the textContent. We don't need to run the tests because it will run automatically and it will fail. So to make it work we edit the hello.tag like this.
```html
<hello>
  <h1>Hello {name}</h1>
  <script>
    this.name = opts.name || ''
  </script>
</hello>
```
Now if you check the console all tests will pass.

### Fifth iteration: Transform name to uppercase
We can also add functions to our tag and test those functions. Let’s write a simple test that call a custom function called uppercase and expect the name to be converted to uppercase:
```javascript
  it('transform the name to uppercase', function() {
      tag = riot.mount('hello', {name: 'Carl'})[0]
      tag.uppercase()
      expect(tag.name).to.be.eq('CARL')
  })
```
We have a failing test in line 31, because uppercase is not a function of our hello tag. So let’s create it.
We are going to add a new function called uppercase like this
```javascript
    this.uppercase = function() {
          this.name = this.name.toUpperCase();
    }
```
and now all tests will pass.

I hope you liked the tutorial. We learnt how to setup mocha+chai+karma to test riot tags, how to autorun the tests and how to test Riot tag's properties and functions. 
