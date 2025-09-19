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
    <a href="">¿No tienes cuenta? Crear una</a>
    <a href="../index.html"> Volver a inicio</a>
</form>
`

const registerContent = `
<h3>Registro</h3>
                    <p>Completa todos los datos para poder registrarte.</p>
                    <form action="" method="post">
                        <div>
                            <label for="name">Nombre</label>
                            <input type="text" name="name" placeholder="ingresa tu nombre">
                        </div>
                        <div>
                            <label for="lastname">Apellido</label>
                            <input type="text" name="lastname" placeholder="ingresa tu apellido">
                        </div>
                        <div>
                            <label for="birthdate">Fecha de Nacimiento.</label>
                            <input type="date" name="birthdate" placeholder="ingresa tu fecha de nacimiento">
                        </div>
                        <div>
                            <label for="email">Email</label>
                            <input type="email" name="email" placeholder="ingresa tu email">
                        </div>
                        <div>
                            <label for="password">Password</label>
                            <input type="password" name="password" placeholder="ingresa tu password">
                        </div>
                        <button class="button" id="register-button">Registrarse</button>
                        <a class="swap" id="">¿No tienes cuenta? <span id="swap-btn">Crear una</span></a>
                        <a href="../index.html"> Volver a inicio</a>
`

const $ = (selector) => document.querySelector(selector);

// SWAP

$('#swap-btn').addEventListener('click', () => {
    const estadoBox = $('.card-ingreso')
    if ($('#swap-btn').textContent === 'Crear una') {
        estadoBox.innerHTML = registerContent
        return
    }
    estadoBox.innerHTML = inicioContent
})
// Inicio de sesión




// Registro