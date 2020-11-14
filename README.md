# Samaritan Frontend Assignment

Technical frontend assignment for Samaritan

---

## Requirements:

- React
- React Router
- Redux
- Fetch API

## Considerations:

- global css
  - small app anyways
- debounce filter (lodash)
- failed fetch retry (promiseRetry)
- infinite scrolling
- loading animations
- js Map obj >> obj literal
- wireframe + style w/ figma
- sprites return 404 from pokeapi
  - https://pokeres.bastionbot.org/images/pokemon/###.png has modern sprites
- pokemon num padStart
- evil-icons.io

## Additional Considerations (implement as feature toggles)

- lazy vs eager loading/caching
- cache location?
  - directly in state vs indexedDB

## Bonus Points?:

- tests?

## Fun Additions:

- 3D sprites
- Next/prev navigation in details view
- more capable filter
- "quick view" (toggle)

---

## [Figma Wireframe](https://www.figma.com/file/DxO5kPOiwBBfHQwcBxWIk2/Samaritan-Pokedex)

---

## Project Decision Justifications

### Bootstrap from zero:

> Show that I understand and am able to use frameworks typically used in frontend web development.

### Directory Structure:

> I typically separate code into concerns, but wanted to try my hand at co-location / organizing by feature.

### Global CSS over CSS modules, SASS, styled components, etc.

> Since this is a small application, I felt that it would be largely unnecessary to concern myself with using anything more than native CSS. Along the same vein of reasoning, I am not concerned about clashes in this context.
