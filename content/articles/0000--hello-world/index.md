---
created: '2018-01-01'
updated: '2018-02-02'
banner: '../../../src/images/neature.jpg'
title: 'Hello World'
topic: 'Web'
icon: 'desktop'
tags:
  - 'Meta'
  - 'Markdown'
project: 'HelloWorld'
toc: true
github: 'https://github.com'
reddit: 'https://reddit.com'
medium: 'https://medium.com'
draft: false
---

# Welcome to Markdown in Gatsby

*Hello World!*

This article is meant to be used as a feature/style demonstration for the article markdown capabilities on this website. It has been adapted from the Remark Kitchen Sink on one of the Gatsby starter websites.

From Gatsby's [Remark Kitchen Sink](https://using-remark.gatsbyjs.org/hello-world-kitchen-sink/): *Markdown parsing in Gatsby is done with [gatsby-transformer-remark][1], which uses the excellent [remark][2] under the hood. Alongside remark we also use [gatsby-remark-smartypants][6], which provides smart punctuation through [retext-smartypants][7]. This is intended as a quick reference and showcase. For more complete info, see [John Gruber's original spec](http://daringfireball.net/projects/markdown/) and the [GitHub-flavored Markdown info page](http://github.github.com/github-flavored-markdown/). The examples on this page cover the basic Markdown syntax and are adapted from [Markdown Here's Cheatsheet][3] ([CC-BY][4]).*

---

# Meta Information

## Frontmatter

Gatsby's core markdown system through remark utilizes what is commonly refereed to as frontmatter. Frontmatter is a section of meta information at the beginning of a markdown document describing the context of the markdown file itself. The creator defines attributes which the site in turn uses to create a richer experience for the reader.

For my website, I use the following frontmatter properties:

- **created**
  - Description: Date when the article was created
  - Type: String, in the form of a date as "YYYY-MM-DD"
  - Usage: Required
- **updated**
  - Description: Date when the article was most recently updated (same value as **created** if never updated)
  - Type: String, in the form of a date as "YYYY-MM-DD"
  - Usage: Required
- **banner**
  - Description: Path to the image file for the article's banner
  - Type: String, relative path
  - Usage: Required
- **title**
  - Description: Title of the article, as rendered on the page
  - Type: String
  - Usage: Required
- **tags**
  - Description: Tags used to describe the contents of the article
  - Type: List of Strings
  - Usage: Reccomended
- **topic**
  - Description: The high-level topic or subject matter of the article
  - Type: String
  - Usage: Required
- **icon**
  - Description: Name of the icon corresponding to the **topic**
  - Type: String, must be one of the free solid icons over on [FontAwesome](https://fontawesome.com/icons?d=gallery&s=solid&m=free), case sensitive
  - Usage: Required
- **project**
  - Description: Name of the project entry in `/projects` that the article is about, if it is about one
  - Type: String, case sensitive
  - Usage: Optional
- **misc**
  - Description: Name of the misc entry in `/misc` that the article is about, if it is about one
  - Type: String, case sensitive
  - Usage: Optional
- **toc**
  - Description: Whether or not an automatically generated table-of-contents should be shown at the beginning of the article
  - Type: Boolean
  - Usage: Optional
- **github**
  - Description: Link to an issue on Github which serves as a comment section for the article
  - Type: String, in the form of a URL
  - Usage: Required
- **reddit**
  - Description: Link to a post on Reddit which serves as a comment section for the article
  - Type: String, in the form of a URL
  - Usage: Optional
- **medium**
  - Description: Link to a post on Medium which serves as a comment section for the article
  - Type: String, in the form of a URL
  - Usage: Optional
- **draft**
  - Description: Whether or not the article is a draft, where a draft should not be published to the site
  - Type: Boolean
  - Usage: Optional

Below is an example of what the frontmatter may look like for some article

```text
---
created: '2018-01-01'
updated: '2018-01-15'
banner: '../../../src/images/neature.jpg'
title: 'Why Frontmatter Matters'
tags:
  - 'Markdown'
  - 'Gatsby'
  - 'Meta'
topic: 'Web'
icon: 'desktop'
project: 'MadeUpProject'
misc: 'MadeUpMisc'
toc: true
github: 'https://www.github.com'
reddit: 'https://www.reddit.com'
medium: 'https://www.medium.com'
draft: true
---

# Frontmatter and You

Lorem ipsum dolor sit amet, consectetur adipiscing elit...
```

In the example the article was **created** on January 1st, 2018, but was **updated** two weeks later on January 15th, 2018. The **banner** image is a placeholder image located in the `src/images` folder of the website. The **title** represents what the title will actually be on the page (as opposed to the url). The **tags**, if any of them previously didn't exist, will become searchable fields over in `/search`, linking back ot this page. The **topic** and corresponding FontAwesome **icon** describe what sort of category the article as a whole falls under and is also searchable. Both the **project** and **misc** fields are specified here with fake names for example's sake, however normally one or neither of them would be present. The **toc** field is set to `true`, so a table-of-contents will be generated and rendered just above the article. The **github**, **reddit**, and **medium** fields have placeholder links to their respective homepages, however normally each one will link directly to a linked version of this article. This gives the reader a button to click at the end of the article to go check/add to the comments. Finally the **draft** field is set to `true`, so this fake article wouldn't actually show up anywhere on the website until the field was changed to `false`.

Any of the reccomended/optional frontmatter fields can be left out, which results in their corresponding component to not render. For boolean fields like **toc** and **draft**, excluding them from the file is treated the same as setting them to `false`.

## Fields

Fields represent a data source more internal to Gatsby and don't actually come up when writing an article. They do, however, effect how an article is rendered. Articles receive **slug**, **tagSlugs**, **targetTag**, and **number** fields, which correspond to the article url, urls for each article tag, the tag that matches the associated project or misc entry, and what number article this is, respectively. The actual url for the article (as well as the number) comes from the name of the folder containing the article's markdown file and any associated data files.

## Misc

Some additional data is pulled through GraphQL in Gatsby that you again don't need to consider when writing an article, but is useful to know about. This information includes **htmlAst**, **timeToRead**, and **tableOfContents**, which represents the actual contents of the article file, an estimation of how long it takes to read the article, and the actual information stored in the auto-generated table-of-contents, respectively.

# Remark Markdown

The following sections demonstrate the styling of features specific to Gatsby's remark markdown implementation.

## Headers

```text
# H1
## H2
### H3
#### H4
##### H5
###### H6

Alternatively, for H1 and H2, an underline-ish style:

Alt-H1
======

Alt-H2
------
```

(Check above for examples of H1 and H2)

### H3

#### H4

##### H5

###### H6

## Text Emphasis

```text
Emphasis, aka italics, with *asterisks* or _underscores_.

Strong emphasis, aka bold, with **asterisks** or __underscores__.

Combined emphasis with **asterisks and _underscores_**.

Strikethrough uses two tildes. ~~Scratch this.~~
```

Emphasis, aka italics, with _asterisks_ or _underscores_.

Strong emphasis, aka bold, with **asterisks** or **underscores**.

Combined emphasis with **asterisks and _underscores_**.

Strikethrough uses two tildes. ~~Scratch this.~~

## Lists

In this example, leading and trailing spaces are shown with with dots: ⋅

```text
1. First ordered list item
2. Another item
⋅⋅⋅* Unordered sub-list.
1. Actual numbers don't matter, just that it's a number
⋅⋅⋅1. Ordered sub-list
4. And another item.

To have a line break without a paragraph, you will need to use two trailing spaces.⋅⋅
Note that this line is separate, but within the same paragraph.⋅⋅

* Unordered list can use asterisks
- Or minuses
+ Or pluses
```

1.  First ordered list item
2.  Another item
    * Unordered sub-list.
3.  Actual numbers don't matter, just that it's a number
    1.  Ordered sub-list
4.  And another item.

To have a line break without a paragraph, you will need to use two trailing spaces.  
Note that this line is separate, but within the same paragraph.  

* Unordered list can use asterisks
- Or minuses
* Or pluses

## Links

There are two ways to create links.

```text
[I'm an inline-style link](https://www.google.com)

[I'm an inline-style link with title](https://www.google.com "Google's Homepage")

[I'm a reference-style link][Arbitrary case-insensitive reference text]

[I'm a relative reference to a repository file](../../../src/images/neature.jpg)

[You can use numbers for reference-style link definitions][1]

Or leave it empty and use the [link text itself].

URLs and URLs in angle brackets will automatically get turned into links.
http://www.example.com or <http://www.example.com> and sometimes
example.com (but not on GitHub, for example).

Some text to show that the reference links can follow later.

[arbitrary case-insensitive reference text]: https://www.mozilla.org
[1]: http://slashdot.org
[link text itself]: http://www.reddit.com
```

[I'm an inline-style link](https://www.google.com)

[I'm an inline-style link with title](https://www.google.com "Google's Homepage")

[I'm a reference-style link][arbitrary case-insensitive reference text]

[I'm a relative reference to a repository file](../../../src/images/neature.jpg)

[You can use numbers for reference-style link definitions][1]

Or leave it empty and use the [link text itself].

URLs and URLs in angle brackets will automatically get turned into links.
http://www.example.com or <http://www.example.com> and sometimes example.com
(but not on GitHub, for example).

Some text to show that the reference links can follow later.

[arbitrary case-insensitive reference text]: https://www.mozilla.org
[1]: http://slashdot.org
[link text itself]: http://www.reddit.com

## Images

```text
Here's some pictures (hover to see the title text):

Internal File (with no alt text)
![](../../../src/images/neature.jpg)

Inline-style:
![alt text](https://pbs.twimg.com/profile_images/875556871427375106/Xuq8DypK_bigger.jpg "Logo Title Text 1")

Reference-style:
![alt text][logo]

[logo]: https://pbs.twimg.com/profile_images/875556871427375106/Xuq8DypK_bigger.jpg "Logo Title Text 2"
```

Here's some pictures (hover to see the title text):

Internal File (with no alt text)
![](../../../src/images/neature.jpg)

Inline-style:
![alt text](https://pbs.twimg.com/profile_images/875556871427375106/Xuq8DypK_bigger.jpg "Logo Title Text 1")

Reference-style:
![alt text][logo]

[logo]: https://pbs.twimg.com/profile_images/875556871427375106/Xuq8DypK_bigger.jpg "Logo Title Text 2"

## Tables

Tables aren't part of the core Markdown spec, but they are part of our implementation. They are an easy way of adding tables to your email -- a task that would otherwise require copy-pasting from another application.

```text
Colons can be used to align columns.

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

There must be at least 3 dashes separating each header cell. The outer pipes (|) are optional, and you don't need to make the raw Markdown line up prettily. You can also use inline Markdown.

Markdown | Less | Pretty
--- | --- | ---
*Still* | `renders` | **nicely**
1 | 2 | 3
```

Colons can be used to align columns.

| Tables        |      Are      |  Cool |
| ------------- | :-----------: | ----: |
| col 3 is      | right-aligned | $1600 |
| col 2 is      |   centered    |   $12 |
| zebra stripes |   are neat    |    $1 |

There must be at least 3 dashes separating each header cell. The outer pipes (|) are optional, and you don't need to make the raw Markdown line up prettily. You can also use inline Markdown.

| Markdown | Less      | Pretty     |
| -------- | --------- | ---------- |
| _Still_  | `renders` | **nicely** |
| 1        | 2         | 3          |

## Footnotes

Footnotes are also not a core feature of markdown, but they're a common extension feature. The footnote syntax looks like this:

```markdown
This line has a footnote [^1]. Scroll down or click the link to see it.
This line also has a footnote [^2].
```

That renders like this:

This line has a footnote [^1]. Scroll down or click the link to see it.
This line also has a footnote [^2].

[^1]: This footnote appears at the bottom of the page
[^2]: This foonote appears after the first one. Click the arrows to return to their references

## Blockquotes

```text
> Blockquotes are very handy in email to emulate reply text.
> This line is part of the same quote.

Quote break.

> This is a very long line that will still be quoted properly when it wraps. Oh boy let's keep writing to make sure this is long enough to actually wrap for everyone. Oh, you can _put_ **Markdown** into a blockquote.
```

> Blockquotes are very handy in email to emulate reply text.
> This line is part of the same quote.

Quote break.

> This is a very long line that will still be quoted properly when it wraps. Oh boy let's keep writing to make sure this is long enough to actually wrap for everyone. Oh, you can put **Markdown** into a blockquote.

## Horizontal Rule

```
Three or more...

---

Hyphens

***

Asterisks

___

Underscores
```

Three or more...

---

Hyphens

---

Asterisks

---

Underscores

## Line Breaks

Here are some things to try out:

```
Here's a line for us to start with.

This line is separated from the one above by two newlines, so it will be a *separate paragraph*.

This line is also a separate paragraph, but...
This line is only separated by a single newline, so it's a separate line in the *same paragraph*.
```

Here's a line for us to start with.

This line is separated from the one above by two newlines, so it will be a
_separate paragraph_.

This line is also begins a separate paragraph, but...\
This line is only separated by a single newline, so it's a separate line in the _same
paragraph_.



[1]: https://www.gatsbyjs.org/packages/gatsby-transformer-remark/
[2]: http://remark.js.org/
[3]: https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet
[4]: https://creativecommons.org/licenses/by/3.0/
[5]: https://www.gatsbyjs.org/packages/gatsby-remark-autolink-headers/
[6]: https://www.gatsbyjs.org/packages/gatsby-remark-smartypants/
[7]: https://github.com/wooorm/retext-smartypants


# Remark Markdown Addons

## gatsby-remark-autolink-headers

Notice how each heading on this page has a clickable anchor tag next to it when hover over it with your mouse. Full documentation can be found [here](https://www.gatsbyjs.org/packages/gatsby-remark-autolink-headers/)

## gatsby-remark-images

Creates responsive images with additional effects. See the [Images](#images) section above, specifically the internal file example. Full documentation can be found [here](https://www.gatsbyjs.org/packages/gatsby-remark-images/)

## gatsby-remark-embed-video

Allows for a responsive embeedding of videos from ppular platforms, including YouTube, Twitch, Vimeo, and VideoPress. Full documentation can be found [here](https://www.gatsbyjs.org/packages/gatsby-remark-embed-video/)

```text
`video: https://www.youtube.com/watch?v=v5ai8iNSK9Q`
`youtube: https://www.youtube.com/watch?v=v5ai8iNSK9Q`
`youtube: v5ai8iNSK9Q`
```

`youtube: https://www.youtube.com/watch?v=v5ai8iNSK9Q`

## gatsby-remark-responsive-iframe

Simple embedding support for any kind of iframe. Full documentation support can be found [here](https://www.gatsbyjs.org/packages/gatsby-remark-responsive-iframe)

## gatsby-remark-prismjs

Support for styling blocks of code in remark, with additional features including language syntax and line highlighting. Full documentation can be found [here](https://www.gatsbyjs.org/packages/gatsby-remark-prismjs/?=prism) and [here](https://prismjs.com/)

Below is some sample code with Javascript syntax highlighting, where lines 1 and 4 are being emphasized.

```javascript{1,4}
import React from 'react'
import  { Link } from 'gatsby'

class BlogPage extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello</h1>
        <p>Welcome</p>
        <Link to="/">Go back to the homepage</Link>
      </div>
    );
  }
}
```

## gatsby-remark-emojis

Support for emojis in markdown. Full list of supported emojis can be found [here](https://github.com/matchilling/gatsby-remark-emojis/blob/master/emoji.md)

```text
(Remove the spaces between the colons and their corresponding labels below)
Emojis : joy : inline : ok_hand : with : fire : text : 100 :
```

Emojis :joy: inline :ok_hand: with :fire: text :100:

## gatsby-remark-external-links

Adds support for linking to external sites within Markdown. Additionally, adds `target: _blank` and `rel: nofollow noopened noreferrer` to each external link ([learn more here](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types)). Full documentation can be found [here](https://www.gatsbyjs.org/packages/gatsby-remark-external-links)

# HTML in Markdown

You can also use raw HTML in your Markdown, and it'll mostly work pretty well.

```html
<dl>
  <dt>Definition list</dt>
  <dd>Is something people use sometimes.</dd>

  <dt>Markdown in HTML</dt>
  <dd>Does *not* work **very** well. Use HTML <em>tags</em>.</dd>
</dl>
```

<dl>
  <dt>Definition list</dt>
  <dd>Is something people use sometimes.</dd>

  <dt>Markdown in HTML</dt>
  <dd>Does *not* work **very** well. Use HTML <em>tags</em>.</dd>
</dl>

# Misc

## Embedding Custom Components

Using [RehypeReact](https://github.com/rhysd/rehype-react) you can create custom components which can be referenced from within markdown files and rendered in the body of your article.

For example, I've created a CopyButton component that simply copies the contents of its associated code block. Here's what this looks like in Markdown:

```text
(Add an additional tick (`) before each of the two ticks below to render the codeblock properly)

<copy-button></copy-button>
``text
Click the Copy button to copy this text to your clipboard
``
```

And rendered on the page:

<copy-button></copy-button>
```text
Click the Copy button to copy this text to your clipboard!
```

**This has been a full demonstration of the Markdown features enabled for this site. Check out this website's [source code](https://github.com/carsonkk/carsonkk.com) for the implementation of any of the addons or custom components shown above.** :tada:
