// Must destroy require cache or else Eleventy won't work dynamically
delete require.cache[require.resolve('./_metadata.11ty')]
delete require.cache[require.resolve('./_nav.11ty')]
let metadata = require('./_metadata.11ty')
let nav = require('./_nav.11ty')
let logo = require('./_logo.11ty')

module.exports = function layout (params) {
  params.lang = 'en'
  let { Title, Description, pageTitle } = metadata(params)
  let { Navigation, Next='', GitHub='' } = nav(params)
  return `
<html
  class="
   h-full
  "
>
<head>
  <title>${ Title }</title>
  <meta name="description" content="${ Description }">
  <link rel="stylesheet" type="text/css" href="/_static/css/styles.css">
  <link rel="stylesheet" type="text/css" href="/_static/css/index.css">
  <link rel="stylesheet" type="text/css" href="/_static/css/prism.css">
</head>
<body
  class="
    font-sans
    overflow-hidden-lg
  "
>
  <div
    class="
      h-full-lg
      grid-lg
    "
  >
    <header
      class="
        pt-1
        pr2
        pb-1
        pl2
        sticky
        static-lg
        flex
        justify-between
        items-center
        top0
        bg-g9
        col-start-1
        col-end-3
      "
    >
      ${logo({ classes: 'text-p0 fill-current h-logo' })}
    </header>
    <aside
      id=arc-menu
      class="
        h-full
        fixed
        left-sidebar
        static-lg
        p2
        overflow-auto
        sidebar-w
        transition-x
        col-start-1
        col-end-2
        row-start-2
        bg-g0
      "
    >
      ${ Navigation }
    </aside>
    <main
      class="
        col-start-2
        p3
        overflow-auto
      "
    >
      <h1
        class="
          mb1
        "
      >
        ${ pageTitle }
      </h1>
      ${ params.layoutContent }<br>
      ${ GitHub }<br>
      ${ Next }<br><br>
    </main>
  </div>
</body>
</html>`
}
