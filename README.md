# Discourse Get Comment Count

A universal wrapper to dynamically update the number of comments an article has garnered from its Discourse counterpart

## Prerequisites

It's expected that your target demographic uses semi-modern browsers - as long as they support `document.querySelector` and `window.fetch`, everything will work well.

## Usage

The simple-to-use method is easy - just download the contents the dropin folder (there's 2 files) and put them in their respective location - the hbs file (if you're using [Ghost](https://ghost.org)) should be placed in the `partials` folder of your theme and called (i.e. `{{ > comment-template}}`) in your post template. The `comments.js` file should be configured (if you're using the default template it's already configured) based on which selectors should be used, and loaded like any other javascript code

## Issues + support

Feel free to create an issue if you have any questions, feature requests or found a bug. As of now, there's no specific template, but if this gets too much traction, I'll put something in place. If you want to contact me directly, feel free to [email me](mailto:me@vikaspotluri.ml), or message me on [telegram](https://t.me/vikaspotluri123) or [facebook messenger](https://m.me/vikaspotluri).

## Contributing

Feel free to create a Pull Request if you think any changes should be made. You don't have to explain yourself, but be able to if requested.
