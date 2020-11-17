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
- ~~infinite scrolling~~
  - some bug didn't update state, couldn't make my own implementation
- ~~loading animations~~
  - data load quick enough
- js Map obj >> obj literal
  - can't b/c redux only wants serializable data.
  - marginal gains anyways
- wireframe + style w/ figma
- sprites return 404 from pokeapi
  - https://pokeres.bastionbot.org/images/pokemon/###.png has modern sprites
    - should cache w/ cache API
  - some other links are fine. but bastionbot imgs are nice.
- pokeapi is case sensitive. validate uri param.
- pokemon num padStart
- evil-icons.io

## Additional Considerations (implement as feature toggles)

- ~~lazy vs eager loading/caching~~
  - irrelevant without pagination
- cache location?
  - directly in state vs indexedDB

## Bonus Points?:

- tests?

## Fun Additions:

- [ ] ~~3D sprites~~ sprite viewer
- [x] Next/prev navigation in details view
- [x] more capable filter
- [ ] "quick view" (toggle)

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
