const $g = (selector) => document.querySelector(selector)

const showGruposTop = (grupos) => {
    const sectionGrupos = ["primary", "secondary", "tertiary"]
    const sectionG = $g("#section-grupos")

    if (grupos.length >= 4) {

        const firstThree = grupos.slice(0, 3).map((g, index) => {
            const miembros = g.miembros.map(m => `<small>${m}</small>`)
            return `
            <div class=${sectionGrupos[index]}>
                    <img src="../img/grupos/grupo-amigos1.webp" alt="" width="150px">
                    <div>
                        <h4>${g.nombre}</h4>
                        <div class="miembros-grupo">
                            ${miembros}
                        </div>
                    </div>
                </div>
            `}
        )

        const rest = grupos.slice(3).map(g => {
            const miembros = g.miembros.map(m => `<small>${m}</small>`)
            return `
                <article class="">
                    <img src="../img/grupos/grupo-amigos3.webp" alt="" width="150px">
                        <div>
                            <h4>${g.nombre}</h4>
                            <div class="miembros-grupo">
                                ${miembros}
                            </div>
                        </div>
                </article>
            `
        })

        return sectionG.innerHTML = `
        ${firstThree}
        <div class="others">
            <div>
                ${rest}
            </div>
        </div>
        `

    } else if (grupos.length >= 1) {
        const firstThree = grupos.slice(0, 3).map((g, index) => {
            const miembros = g.miembros.map(m => `<small>${m}</small>`)
            return `
            <div class=${sectionGrupos[index]}>
                    <img src="../img/grupos/grupo-amigos1.webp" alt="" width="150px">
                    <div>
                        <h4>${g.nombre}</h4>
                        <div class="miembros-grupo">
                            ${miembros}
                        </div>
                    </div>
                </div>
            `}
        )
        return sectionG.innerHTML = `
        ${firstThree}
        <div class="others">
            <div>
            </div>
        </div>
        `
    } else {
        return sectionG.innerHTML = `<div class='primary animate__animated animate__flash'>
        <h3>PUEDES CREAR GRUPOS EN INICIO</h3>
        </div>
        `
    }

}

const showGrupos = (grupos) => {
    let box;

    if (grupos.length > 0) {
        box = grupos.map(grupo => {
            const miembros = grupo.miembros.map(m => `<small>${m}</small>`)
            return `
            <article class="animate__animated animate__slideInLeft grupo-card">
            <h4>${grupo.nombre}</h4>
            <div class="detalle">
                <img src="../img/usuario.webp" alt="" width="20px" height="20px">
                    <p>${grupo.miembros.length}</p>
            </div>
            <div class="miembros-grupo">
            ${miembros.join("")}
            </div>
        </article>
        `})
    } else {
        box = '<h4 class="animate__animated animate__hinge">Crea grupossss...</h4>'
    }

    $g("#section-grupos").innerHTML = `
        <h3>Grupos</h3>
        ${typeof box === "string" ? box : box.join("")}
    `
}



const getGrupos = () => {
    const grupos = localStorage.getItem("grupos")
    if (!grupos) return []
    return JSON.parse(grupos)
}

const setGrupo = ({ nombre, miembros }) => {
    const grupos = getGrupos()

    grupos.push({
        nombre,
        miembros: miembros.split(",").map(miembro => miembro.trim())
    })

    localStorage.setItem("grupos", JSON.stringify(grupos))

    return grupos
}

$g("#crearGrupo")?.addEventListener("click", (e) => {
    e.preventDefault()
    const nombreGrupo = $g("#nombre-grupo")?.value.trim()
    const miembros = $g("#miembros")?.value.trim()

    const grupos = setGrupo({
        nombre: nombreGrupo,
        miembros
    })

    return showGrupos(grupos)
})


window.addEventListener("load", () => {

    const pathname = window.location.pathname
    const grupos = getGrupos()
    pathname.includes("home") ? showGrupos(grupos) : showGruposTop(grupos)
})