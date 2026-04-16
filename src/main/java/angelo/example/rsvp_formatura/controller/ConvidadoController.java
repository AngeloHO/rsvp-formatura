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
public class ConvidadoController {

    @Autowired
    private ConvidadoService service;

    @PostMapping
    public ResponseEntity<?> confirmarPresenca(@Valid @RequestBody Convidado convidado) {
        try {
            Convidado salvo = service.salvar(convidado);


            Map<String, Object> resposta = new HashMap<>();
            resposta.put("convidado", salvo);
            resposta.put("totalPessoas", salvo.getTotalPessoas());
            resposta.put("message", "Confirmação registrada com sucesso!");

            return ResponseEntity.ok(resposta);
        } catch (IllegalArgumentException e) {
            Map<String, String> erro = new HashMap<>();
            erro.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(erro);
        } catch (Exception e) {
            Map<String, String> erro = new HashMap<>();
            erro.put("message", "Erro ao processar solicitação: " + e.getMessage());
            erro.put("error", e.getClass().getSimpleName());
            e.printStackTrace(); // Log do erro completo no console
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(erro);
        }
    }

    @GetMapping
    public List<Convidado> listarTodos() {
        return service.listarTodos();
    }

    /**
     * GET /api/convidados/estatisticas
     * Retorna estatísticas gerais do evento
     */
    @GetMapping("/estatisticas")
    public ResponseEntity<Map<String, Object>> getEstatisticas() {
        Map<String, Object> stats = new HashMap<>();

        List<Convidado> todos = service.listarTodos();
        long confirmados = todos.stream().filter(c -> "S".equals(c.getPresencaConfirmada())).count();
        long recusados = todos.stream().filter(c -> "N".equals(c.getPresencaConfirmada())).count();

        stats.put("totalConvidados", todos.size());
        stats.put("totalConfirmados", confirmados);
        stats.put("totalRecusados", recusados);
        stats.put("totalPessoas", service.getTotalPessoasConfirmadas());
        stats.put("totalAdultos", service.getTotalAdultosConfirmados());
        stats.put("totalCriancas", service.getTotalCriancasConfirmadas());

        return ResponseEntity.ok(stats);
    }

    /**
     * GET /api/convidados/resumo
     * Retorna um resumo detalhado por convidado
     */
    @GetMapping("/resumo")
    public ResponseEntity<List<Map<String, Object>>> getResumo() {
        List<Convidado> todos = service.listarTodos();

        List<Map<String, Object>> resumo = todos.stream()
                .filter(c -> "S".equals(c.getPresencaConfirmada()))
                .map(c -> {
                    Map<String, Object> item = new HashMap<>();
                    item.put("nome", c.getNome());
                    item.put("email", c.getEmail());
                    item.put("telefone", c.getTelefone());
                    item.put("totalPessoas", c.getTotalPessoas());
                    item.put("quantidadeAcompanhantes", c.getAcompanhantes().size());
                    item.put("acompanhantes", c.getAcompanhantes().stream().map(a -> {
                        Map<String, Object> acomp = new HashMap<>();
                        acomp.put("nome", a.getNome());
                        acomp.put("sobrenome", a.getSobrenome());
                        acomp.put("idade", a.getIdade());
                        acomp.put("tipo", a.isCrianca() ? "Criança" : "Adulto");
                        return acomp;
                    }).toList());
                    return item;
                })
                .toList();

        return ResponseEntity.ok(resumo);
    }
}