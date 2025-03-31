// Alternar entre login y registro
document.getElementById('showRegister').addEventListener('click', function() {
    document.getElementById('loginPanel').style.display = 'none';
    document.getElementById('registerPanel').style.display = 'block';
});

document.getElementById('showLogin').addEventListener('click', function() {
    document.getElementById('registerPanel').style.display = 'none';
    document.getElementById('loginPanel').style.display = 'block';
});


// Login
document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const user = document.getElementById('loginUser').value;
    const password = document.getElementById('loginPassword').value;
    let modalMessage = '';
    const response = await fetch('http://localhost:8080/auth/login', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombreUsuario: user, password })
    });
    
    if (response.ok) {
        document.getElementById("loginMessage").innerHTML = '';
        window.location.href = 'panel.html';
    } else {
        document.getElementById("loginMessage").innerHTML='Usuario o contraseña incorrectos. Intenta nuevamente.'
    }
});

// Registro
document.getElementById('registerForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const name = document.getElementById('registerName').value;
    const documentType = document.getElementById('registerDocumentType').value;
    const documentNumber = document.getElementById('registerDocumentNumber').value;
    const email = document.getElementById('registerEmail').value;
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    
    try {
        const response = await fetch('http://localhost:8080/auth/register', { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nombre: name,
                idTipoDocumento: parseInt(documentType),
                numeroDocumento: documentNumber,
                email,
                nombreUsuario: username,
                password
            })
        });
        
        if (response.ok) {
            document.getElementById('registerMessage').innerHTML = 'Registro Exitoso!';
        } else {
            document.getElementById('registerMessage').innerHTML = 'Ha habido un error y el usuario no pudo registrarse. Por favor, inténtalo de nuevo.';
        }
    } catch (error) {
        console.error(error);
        document.getElementById("registerMessage").innerHTML= 'Error de conexión. Inténtelo más tarde.';// Error de conexión
    }
});