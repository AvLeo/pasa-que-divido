const inicioContent = `
<h3>Ingresar</h3>
    <p>Accede con tu cuenta para continuar.</p>
    <form action="" method="post">
    <div>
        <label for="email">Email</label>
        <input type="email" name="email" placeholder="ingresa tu email">
    </div>
    <div>
        <label for="password">Password</label>
        <input type="password" name="password" placeholder="ingresa tu password">
    </div>
    <button type="submit" class="button">Entrar</button>
    <a class="swap">¿No tienes cuenta? <span id="swap-btn">Crear una</span></a>
    <a href="../index.html"> Volver a inicio</a>
</form>
`

const registerContent = `
<h3>Registro</h3>
                    <p>Completa todos los datos para poder registrarte.</p>
                    <form action="" method="post">
                        <div>
                            <label for="name">Nombre</label>
                            <input type="text" name="name" id="name-registro" placeholder="ingresa tu nombre">
                        </div>
                        <div>
                            <label for="lastname">Apellido</label>
                            <input type="text" name="lastname" id="lastname-registro" placeholder="ingresa tu apellido">
                        </div>
                        <div>
                            <label for="birthdate">Fecha de Nacimiento.</label>
                            <input type="date" name="birthdate" placeholder="ingresa tu fecha de nacimiento">
                        </div>
                        <div>
                            <label for="email">Email</label>
                            <input type="email" name="email" id="email-registro" placeholder="ingresa tu email">
                        </div>
                        <div>
                            <label for="password">Password</label>
                            <input type="password" name="password" id="pass-registro" placeholder="ingresa tu password">
                        </div>
                        <button class="button" id="registro-btn">Registrarse</button>
                        <a class="swap">¿Ya tienes cuenta? <span id="swap-btn">Inicia sesión</span></a>
                        <a href="../index.html"> Volver a inicio</a>
`

const $ = (selector) => document.querySelector(selector);

const isLoged = () => !!localStorage.getItem('loged');
const path = window.location.pathname
const pathRequiredLogin = [
    "/pages/home.html",
    "/pages/mis-gastos.html",
    "/pages/grupos.html",
]

console.log(path, isLoged(), pathRequiredLogin.includes(path));
if (isLoged() && !pathRequiredLogin.includes(path)) {
    window.location.href = "./pages/home.html";
} else if (!isLoged() && pathRequiredLogin.includes(path)) {

    window.location.href = "./pages/ingresar.html";
}

if (!localStorage.getItem('usuarios')) {
    localStorage.setItem('usuarios', JSON.stringify([
        { nombre: "test", apellido: "test", password: "123456", email: "test@gmail.com" }
    ]));
}

// Inicio de sesión

const setLogin = (user) => localStorage.setItem("loged", JSON.stringify({ ...user }))

$("#ingresar-btn").addEventListener("click", (e) => {
    e.preventDefault()
    const email = $("#email-ingreso")
    const password = $("#pass-ingreso")

    const user = JSON.parse(localStorage.getItem('usuarios')).find(user => user.email === email.value && password.value === user.password)
    console.log(user);

    if (!user) {
        email.classList.add("error")
        password.classList.add("error")

        return
    }

    setLogin(user)
    window.location.href = "./pages/home.html"
})



// Registro

const setRegistro = (user) => {
    const users = JSON.parse(localStorage.getItem("usuarios"))
    users.push(user)
    localStorage.setItem("usuarios", JSON.stringify(users))
}

const attachRegistroEvent = () => {
    $("#registro-btn")?.addEventListener('click', (e) => {
        e.preventDefault()
        const email = $('#email-registro')?.value.trim()
        const nombre = $('#name-registro')?.value.trim()
        const apellido = $('#lastname-registro')?.value.trim()
        const password = $('#pass-registro')?.value.trim()

        if (!email || !nombre || !apellido || !password) {
            alert("Completa todos los campos.")
            return
        }

        const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]")
        const yaExiste = usuarios.some(user => user.email === email)

        if (yaExiste) {
            alert("Ese correo ya está registrado.")
            return
        }

        setRegistro({ email, nombre, apellido, password })

        alert("Registro exitoso. Ahora puedes iniciar sesión.")
        $('.card-ingreso').innerHTML = inicioContent
        attachEvent()
    })
}

// LOGOUT 

$("#cerrar-sesion")?.addEventListener("click", () => localStorage.removeItem("loged"))

// SWAP

const swapConector = (estado) => {
    const estadoBox = $('.card-ingreso')
    console.log(estado);

    if ($('#swap-btn').textContent === 'Crear una') {
        estadoBox.innerHTML = registerContent
    } else {
        estadoBox.innerHTML = inicioContent
    }

    attachEvent()
}

const attachEvent = () => {
    $('#swap-btn')?.addEventListener('click', () => {
        swapConector($('#swap-btn').textContent);
    });

    attachRegistroEvent()
}

attachEvent()
