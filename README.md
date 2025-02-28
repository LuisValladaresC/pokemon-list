# Detalles del Proyecto

| NOTA: cada parte del codigo fue desarrollada siguiendo la reglas establecidas, y estare encantado de explicar a detalle su comportamiento si se desea.

## Hitos

- Pokemon List muesta un listado de 20 pokemones. 
- Cada Pokemon dentro del listado esta agrupado en tarjetas cuyo contenido esta compuesto por su nombre e imagen.
- El listado con la informacion de los pokemones se descarga desde `PokeAPI`, posteriormente se almacena en el Store manejado mediante `Redux`, y finalmente, este store es almacenado de manera persistente gracias a `Redux Persist` 
- La interfaz posee botones de paginacion para mostrar un nuevo listado de Pokemons. Una vez descargados se almacenan en el estado, y se agregan a los pokemons existentes. Por tal motivo, si se navega a una pagina previamente visitada este diseño evita repetir solicitudes a la `PokeAPI` pues siempre priorizara la informacion almacenada en el store.
- Al hacer clic sobre alguno de los pokemons se mostraran los detalles del mismo en la tarjeta, y al hacer clic nuevamente se ocultaran.
- Los detalles de un pokemon son solicitados al momento de hacer clic en la tarjeta correspondiente al Pokemon, se almacenan en el store para evitar repetir solicitudes al API, y, de igual manera, esta informacion sera almacena de manera persistente.
- La interfaz cuenta con un input de busqueda que permitira buscar un pokemon mediante su nombre.
- La interfaz es totalmente responsiva y se adapta desde dispositivos de 320px de ancho en adeltante. Tambien se incorporo un diseño para "Dark Mode"

## Estructura del Proyecto

- La interfaz se maneja desde el componente `App`, la cual, solicita diversos componente que se encuentran en la carpeta `src/components`
- El tipado se maneja en la carpeta `src/types`
- Las solicitudes a la API de `PokeAPI` se realizan desde `src/services`
- El manejo del estado global de Redux se realiza desde `src/store`

## Herramientas Utilizadas

Para llevar a cabo el proyecto se utilizo `React`, `React Redux`, `Redux Persist`, `TypeScript` y `TaiwindCSS`.