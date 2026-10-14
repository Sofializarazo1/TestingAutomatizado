# language: es
Característica: Inicio de sesión
  Como afiliado de la Obra Social de los Trabajadores de Hogwarts
  Quiero iniciar sesión con mis credenciales
  Para acceder a los servicios de la obra social

  Esquema del escenario: Validar credenciales de inicio de sesión (<id>)
    Dado que estoy en la página de inicio de sesión
    Cuando ingreso el correo "<correo>" y la contraseña "<clave>"
    Y presiono el botón ingresar
    Entonces debería ver el mensaje "<resultado_esperado>"

    Ejemplos:
      | id     | correo           | clave        | resultado_esperado                                                  |
      | LOG-01 |                  |              | Por favor, completa ambos campos.                                   |
      | LOG-02 |                  | hermione2025 | Por favor, completa ambos campos.                                   |
      | LOG-03 |                  | 123          | Por favor, completa ambos campos.                                   |
      | LOG-04 | ron@hogwarts.com |              | Por favor, completa ambos campos.                                   |
      | LOG-05 | ron@hogwarts.com | hermione2025 | Acceso autorizado. Redirección a la página principal.               |
      | LOG-06 | ron@hogwarts.com | 123          | Usuario correcto, pero la contraseña es incorrecta.                |
      | LOG-07 | vyvs@mail.com    |              | Por favor, completa ambos campos.                                   |
      | LOG-08 | vyvs@mail.com    | hermione2025 | El usuario no es correcto                                           |
      | LOG-09 | vyvs@mail.com    | 123          | El usuario no es correcto                                           |
      | LOG-10 | harry.com        |              | Por favor, completa ambos campos.                                   |
      | LOG-11 | harry.com        | hermione2025 | Por favor, ingrese un correo electrónico válido.                   |
      | LOG-12 | harry.com        | 123          | Por favor, ingrese un correo electrónico válido.                   |

  Escenario: LOG-13 - Advertir después de tres intentos fallidos consecutivos
    Dado que estoy en la página de inicio de sesión
    Cuando intento iniciar sesión 3 veces con el correo "ron@hogwarts.com" y la contraseña "123"
    Entonces debería ver la advertencia de bloqueo "Atención, su cuenta está a punto de ser bloqueada."
