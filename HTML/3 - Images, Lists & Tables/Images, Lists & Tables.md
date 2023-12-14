# Images in HTML

- The `<img>` tag is used to embed an image in an HTML page.
- Images are not technically inserted into a web page; images are linked to web pages. The `<img>` tag creates a holding space for the referenced image.
- The `<img>` tag has two required attributes:
  - `src` - Specifies the path to the image
  - `alt` - Specifies an alternate text for the image
  - `width` - Specifies the width of the image
  - `height` - Specifies the height of the image


# Lists in HTML

- In HTML, there are two types of lists:
  - Unordered lists - the list items are marked with bullets
  - Ordered lists - the list items are marked with numbers or letters
  
- The `<ul>` tag defines an unordered (bulleted) list.
- `ul` have attributes like `type` and `start` which are used to change the type of bullet and the starting number of the list respectively.

- type attribute can have values like:
  - `disc` - Default. The marker is a filled circle
  - `circle` - The marker is an open circle
  - `square` - The marker is a square
  - `none` - The list items will not be marked

- The `<ol>` tag defines an ordered list.
- `ol` have attributes like `type` and `start` which are used to change the type of bullet and the starting number of the list respectively.

- type attribute can have values like:
  - `1` - Default. The list items will be numbered with numbers (default)
  - `A` - The list items will be numbered with uppercase letters
  - `a` - The list items will be numbered with lowercase letters
  - `I` - The list items will be numbered with uppercase roman numbers
  - `i` - The list items will be numbered with lowercase roman numbers
  - `start` - Specifies the start value for an ordered list item
  - `reversed` - Specifies that the list items will have a reverse numbering

- The `<li>` tag defines a list item.
- The `<li>` tag is used in ordered lists (`<ol>`), unordered lists (`<ul>`)

- The `<dl>` tag defines a description list.
- The `<dl>` tag is used in conjunction with `<dt>` (defines terms/names) and `<dd>` (describes each term/name).


# Tables in HTML

- The `<table>` tag defines an HTML table.
- Each table row is defined with a `<tr>` tag. Each table header is defined with a `<th>` tag. Each table data/cell is defined with a `<td>` tag.
- By default, the text in `<th>` elements are bold and centered.
- By default, the text in `<td>` elements are regular and left-aligned.
- The `<caption>` tag defines a table caption.
- The `<caption>` tag must be inserted immediately after the `<table>` tag
- the `<thead>`, `<tbody>` and `<tfoot>` tags are used to group header, body and footer content in a table.

Attributes in Table | Description
--- | ---
`colspan` | Specifies the number of columns a cell should span
`rowspan` | Specifies the number of rows a cell should span
`border` | Specifies the width of the border around a table
`cellpadding` | Specifies the space between the cell wall and the cell content
`cellspacing` | Specifies the space between cells

