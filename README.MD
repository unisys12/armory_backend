# Destiny Armory Defined (Backend)

Built very hastily, so a To-Do-List is in order

- More Dynamic Routing: Before anything else! Create dynamic routes so that I can get rid of all the routers. Should be able to do this with one route file.
- Add tests... ya... I know. Did you not read the first line?

* Endpoints
  `http://localhost:3001/api/emblems/` lists all the emblems, displaying on their `displayProperties` property.
  `http://localhost:3001/api/emblems/2182330181` returns a single Emblem by ID (hash value), displaying on their `displayProperties` property.

Other Item Categories currently in the API are as follows,

- Ships
- Sparrows
- Emblems
- Ghosts
- Ornaments
- Weapons

Grouping and other features have not been implemented yet.
