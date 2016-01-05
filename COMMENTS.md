# Comments for Resume Formatter Final Project

* server.js
  * get rid of extra console.log() at the end if you don't need it anymore

* README.md
  * excellent, well written, very clear

* package.json and LICENSE
  * excellent, nothing missing  :)

* gulpfile.js
  * good, well-organized, not too long.
  * consider setting the Sass file sources on lines 28 and 37 to a variable, like you did with testFiles?

* server_test.js
  * hannah montana...  :)
  * good explanatory comments
  * did you mean to leave that debugger on line 86?
  * good tests, you went beyond the most simple things to check some other functionalities

* auth_test.js
  * good, clear, well-structured

* resumes_controller_tests.js
  * you guys are killing me with the bear names  :)

* user_routes.js
  * good error messages

* resume_routes.js
  * good unobstrusive comments make it easy to navigate this file

* user.js
  * Never seen the unique-validator before!  Cool!

* resume.js
  * you weren't kidding about the size of the resume model!  That said, it's well organized and still readable, so nice job.

* lib/
  * consider more informative error messages in eat_auth.js

* index.html
  * Hooray for metadata!  :)
  * The footer is a little div-y; I am unsure what purpose your footer-container class is serving that the footer itself, or the copyright div, couldn't take on.
  * Instead of creating a class called 'main-footer', why not just apply those styles to the footer element?
  * You have an unclosed `<a>` tag in the footer, and a closing `</button>` tag that has no partner...I would go with the `<a>` instead of the `<button>`.
  * Avoid using the `<i>` tag for icons (see more on the proper use of the `<i>` tag at MDN: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/i). 
    * Font Awesome implies that you have to use the `<i>` tag, but you don't.  You can slap the icon class onto any element, and it will insert the icon into the `::before` pseudoelement, regardless.  In this case, I would put the icon class onto the existing `<a>` tag.  Works just fine, and avoids the extraneous `<i>`
  * Hooray for Google analytics!  So cool.  :)

* Templates
  * skills_form_template.html: typo on line 7: 'skils' should be 'skills'
  * FORM templates: major points for making your HTML semantic - however, I would use the `<fieldset>` tag instead of the `<section>` tag, since these are, in fact, forms.
  * I am so impressed with all the moving pieces here!  WELL DONE.

* Sass (I'm not going to go file-by-file, there are too many for that!)
  * Excellent file structure.  WIth so many partials it would be very easy to get lost in the mess, but you have a great job of keeping things neat and tidy.  I like that you were not afraid to do multiple levels of `@import` statements.
  * Colors - nice job adding a level of abstraction to avoid variables with colors in their names
  * Some of your typography partials have wierd tabbing that make it hard to follow the nesting.
  * Same weird tabbing in some of the header partials - make sure to use proper tabbing so you can clearly follow the nesting patterns.  If you end up working with `.sass` instead of `.scss` you will be working with a whitespace-delimited language and thus spacing and tabbing becomes massively important!
  * swal.scss - nice to see some cross-browser stuff!  Isn't that a total PITA?
  * generally speaking, you want to begin all decimal values with a 0, as in 0.5 instead of .5 - very minor, but sometimes that will cause a glitch with Gulp.
  * I saw a few cases where you repeat styles, but overall this looks pretty fantastic.  :)
  * This comment is mostly my opinion, so I'm putting it last, and you can take what you want from it: 
    * Font Awesome is not the way to go if you only need one icon.  You ended up with five directories and a weird class name (fa - that's a terrible class name!) for one icon.  
    * There are a couple of sites you can use that will let you download a single icon, ten icons, a hundred icons, or any number in between, and you only end up with the code you absolutely need.  From a performance/clutter point of view, there's no contest.  
    * Check out:
      * https://icomoon.io/app/#/select 
      * http://fontastic.me/

* entry.js
  * nice and clean, and very concise.

* users/controllers
  * well-styled, easy to read and follow.  Well done.
  * that sweet-alert thing is pretty sweet!  :)

* resume_controller.js
  * this is a long file - which is fine, because it's still readable thanks to your excellent comments.

### NICE JOB, YOU GUYS!  

This is very impressive, and for a non-front-end course you tackled a very front-end-heavy project and did an amazing job with it.