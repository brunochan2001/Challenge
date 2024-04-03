# Challenge Frontend

Una Aplicacion de Next que muestra los productos por usuarios.

## Notas de desarrollo

### Organización de tareas

Decidí organizar mis tareas (iniciales) en una [lista de tareas pendientes](https://github.com/brunochan2001/Challenge/issues/1).

Los commits tienen un "ID de tarea" antes de un mensaje de descripción para que sea más fácil comprender los cambios de código en el futuro. Los ID de las tareas provienen de la lista de tareas pendientes (por ejemplo, `[i-6] Agregue test para los productos`).

### Decisión de librerias

- En cuanto a la tecnología central, Nextjs era una apuesta segura para poner el repositorio en funcionamiento rápidamente.
- Utilicé Typescript por su tipado estático y sus ventajas sobre el mantenimiento, los prop-types y el flujo.
- Para el diseño, utilicé Nextui porque tiene componentes listos para usar.
- Decidí usar Tailwind CSS debido a que es fácil de usar y altamente personalizable.
- Utilicé Apollo para GraphQL debido a su amplia gama de características y funcionalidades que facilitan la integración y gestión de consultas GraphQL.
- Para los test solo usé jest. Por el momento solo escribí pruebas de renderizacion de productos pasando parametros para traer productos espécificos.

### Pensamientos adicionales

- Se han cumplido todos los requisitos.
- Crear varios productos no tenía claro el diseño, así que me tomé la libertad de crear una tabla dentro de un modal donde añado cada producto que agregaré.

### Cómo ejecutar localmente

1. Clona el repositorio

2. Instalar dependencias

```bash
npm install
```

3. Ejecute un entorno de desarrollo

```bash
npm run dev
```

4. Ejecutar pruebas

```bash
npm run test
```
