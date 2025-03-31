package entornos.taller.controller;

import entornos.taller.model.Usuario;
import entornos.taller.security.JwtUtil;
import entornos.taller.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Usuario usuario) {
        usuarioService.registrar(usuario);
        return ResponseEntity.ok(Map.of("mensaje", "Usuario registrado exitosamente"));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        Optional<Usuario> usuarioOpt = usuarioService.encontrarPorNombreUsuario(request.get("nombreUsuario"));
        if(!usuarioOpt.isPresent()) {
            return ResponseEntity.badRequest().body("Usuario no encontrado");
        }
        if (usuarioOpt.isPresent() && usuarioService.validarPassword(request.get("password"), usuarioOpt.get().getPassword())) {
            String token = jwtUtil.generateToken(usuarioOpt.get().getNombreUsuario());
            return ResponseEntity.ok(Map.of("token", token));
        }
        return ResponseEntity.status(401).body(Map.of("error", "Credenciales inválidas"));
    }
}
