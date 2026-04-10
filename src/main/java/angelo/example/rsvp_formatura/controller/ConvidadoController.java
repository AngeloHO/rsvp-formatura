package angelo.example.rsvp_formatura.controller;

import angelo.example.rsvp_formatura.model.Convidado;
import angelo.example.rsvp_formatura.service.ConvidadoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/convidados")
@CrossOrigin(origins = "*") // Permite acesso do frontend
public class ConvidadoController {

    @Autowired
    private ConvidadoService service;

    @PostMapping
    public ResponseEntity<Convidado> confirmarPresenca(@Valid @RequestBody Convidado convidado) {
        Convidado salvo = service.salvar(convidado);
        return ResponseEntity.ok(salvo);
    }

    @GetMapping
    public List<Convidado> listarTodos() {
        return service.listarTodos();
    }
}