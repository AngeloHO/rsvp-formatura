package angelo.example.rsvp_formatura.controller;

import angelo.example.rsvp_formatura.model.Convidado;
import angelo.example.rsvp_formatura.service.ConvidadoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/convidados")
@CrossOrigin(origins = "*") // Permite acesso do frontend
public class ConvidadoController {

    @Autowired
    private ConvidadoService service;

    @PostMapping
    public ResponseEntity<?> confirmarPresenca(@Valid @RequestBody Convidado convidado) {
        try {
            Convidado salvo = service.salvar(convidado);
            return ResponseEntity.ok(salvo);
        } catch (IllegalArgumentException e) {
            Map<String, String> erro = new HashMap<>();
            erro.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(erro);
        }
    }

    @GetMapping
    public List<Convidado> listarTodos() {
        return service.listarTodos();
    }
}