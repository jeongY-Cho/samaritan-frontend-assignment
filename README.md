# Samaritan Frontend Assignment

Technical frontend assignment for Samaritan

## Build and run

```bash
# first install dependencies with:
npm i

# then:
npm run build

# and serve with:
npx serve ./dist -s
```

## Launch dev server

```
npm i
npm start
```

## _Notes_

- turning off all settings (default), the app behaves exactly as the specs specify.
- additional features:
  - filter option: filter searches the serialized JSON of pokmeon details for matches
  - cache option: requests for pokemon details are cached into `IndexedDB`
  - quick detail option: hovering on the pokemon list item shows a quick view.
  - paginate option: pokemon list is paginated instead of showing all 151 at once.

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
  - use normal pagination instead
- ~~loading animations~~
  - data load quick enough
- js Map obj >> obj literal
  - can't b/c redux only wants serializable data.
  - marginal gains anyways
- wireframe + style w/ figma
- sprites return 404 from pokeapi
  - https://pokeres.bastionbot.org/images/pokemon/###.png has modern sprites
    - ~~should cache w/ cache API~~ browser can decide to cache
  - some other links are fine. but bastionbot imgs are nice.
    - found bastionbot imgs on pokeapi.
- pokeapi is case sensitive. validate uri param.
- pokemon num padStart
- evil-icons.io

## Additional Considerations (implement as feature toggles)

- ~~lazy vs eager loading/caching~~
  - irrelevant without pagination
- cache location?
  - directly in state vs indexedDB

## Fun Additions:

- [ ] ~~3D sprites~~ sprite viewer
- [x] Next/prev navigation in details view
- [x] more capable filter
- [x] "quick view" (toggle)

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
