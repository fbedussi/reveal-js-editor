# Reveal.js + Markdown

A cross platform editor (build upon the [electron framework](https://github.com/electron/electron)) to author [reveal.js](https://github.com/hakimel/reveal.js) presentation in markdown.

## Syntax
Each slide must be enclosed between `:::slide` and `:::`.
To produce a [fragment](https://github.com/hakimel/reveal.js#fragments) append `{fragment}` to a paragraph, e.g.:
````
My paragraph text{fragment}
````
After `fragment` you can specify the style: grow, shrink, fade-out, fade-up, current-visible, highlight-current-blue, highlight-red, highlight-green, highlight-blue. E.g.:
````
My paragraph text{fragment fade-out}
````
To change the transition effect simply choose the one you want from the `transition` menu. 