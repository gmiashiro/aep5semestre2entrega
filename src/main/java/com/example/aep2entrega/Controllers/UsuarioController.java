package com.example.aep2entrega.Controllers;

import com.example.aep2entrega.Entitys.Cidadao;
import com.example.aep2entrega.Entitys.Gestor;
import com.example.aep2entrega.Services.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:63342")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping("/login/cidadao")
    public ResponseEntity<Cidadao> loginCidadao(@RequestParam String cpf) {
        return ResponseEntity.ok(usuarioService.realizarLoginCidadao(cpf));
    }

    @PostMapping("/gestor")
    public ResponseEntity<?> cadastrarGestor(@RequestBody Gestor gestor, @RequestParam String confirmacaoSenha) {
        try {
            Gestor novoGestor = usuarioService.cadastrarGestor(gestor, confirmacaoSenha);
            return ResponseEntity.ok(novoGestor);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login/gestor")
    public ResponseEntity<?> loginGestor(@RequestParam String email, @RequestParam String senha) {
        try {
            Gestor gestor = usuarioService.realizarLoginGestor(email, senha);
            return ResponseEntity.ok(gestor);
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }
}
