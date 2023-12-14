# Headings

- Headings are used to describe the topic of a section of content.
- Headings are defined with the `<h1>` to `<h6>` tags.
- `<h1>` defines the most important heading. `<h6>` defines the least important heading.
- headings are displayed in a larger and bold font.
- Browsers automatically add some space (margin) before and after each heading.
- Heading elements are block-level elements (they always start with a new line).
- Headings are important for SEO (Search Engine Optimization).

```html
<h1>Heading 1</h1>
<h2>Heading 2</h2>
<h3>Heading 3</h3>
<h4>Heading 4</h4>
<h5>Heading 5</h5>
<h6>Heading 6</h6>
```

# Paragraphs

- Paragraphs are defined with the `<p>` tag.
- Browsers automatically add some space (margin) before and after each `<p>` element.
- Paragraphs are block-level elements (they always start with a new line).
- Paragraphs are used to describe a large section of text.

```html
<p>This is a paragraph.</p>
<p>This is another paragraph.</p>
```

# Links

- Links are defined with the `<a>` tag its called **anchor** tag.
- The `href` attribute specifies the URL of the page the link goes to.
- The text between the opening and closing `<a>` tags will be displayed as a hyperlink.
- By default, links will appear as follows in all browsers:
  - An unvisited link is underlined and blue.
  - A visited link is underlined and purple.
  - An active link is underlined and red.
  
- `target="_blank"` attribute specifies that the linked document will be opened in a new window or tab.

```html
<a href="https://www.google.com">Google</a>
<a href="https://www.google.com" target="_blank">Google on New Tab</a>
```
