# Reveal.js + Markdown

A cross platform editor (build upon the [electron framework](https://github.com/electron/electron)) to author [reveal.js](https://github.com/hakimel/reveal.js) presentation in markdown.

## Syntax
Each slide must be enclosed between `:::slide` and `:::`.
````
:::slide
## Accessibility, for whom?

- Vision impairments
- Limited fine motor control
- Cognitive disabilities (rings a bell? :-P )
- Hearing impairments
- Older people (ourselve tomorrow)
:::
````
to nest slides and get vertical slides ﾠthe outer slide markup must have one more `:` than the inner one, e.g.:
````
::::slide
:::slide
## Resources
### Standards
- [Web Content Accessibility Guidelines (WCAG) 2.0](https://www.w3.org/Translations/WCAG20-it/)
- [Aria roles](https://www.w3.org/TR/wai-aria/roles#role_definitions)
- [Web Content Accessibility Guidelines 2.0 Checklist](https://www.w3.org/TR/2006/WD-WCAG20-20060427/appendixB.html) [dont't miss]
:::
:::slide
### Validators
- [HTML validator](https://validator.w3.org)
- [CSS validator](https://jigsaw.w3.org/css-validator/)
:::
::::
````
To produce a [fragment](https://github.com/hakimel/reveal.js#fragments) append `{fragment}` to a paragraph, e.g.:
````
My paragraph text{fragment}
````
After `fragment` you can specify the style: grow, shrink, fade-out, fade-up, current-visible, highlight-current-blue, highlight-red, highlight-green, highlight-blue. E.g.:
````
My paragraph text{fragment fade-out}
````
To change the transition effect simply choose the one you want from the `transition` menu. 