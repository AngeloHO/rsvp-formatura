package angelo.example.rsvp_formatura.service;

import angelo.example.rsvp_formatura.model.Convidado;
import angelo.example.rsvp_formatura.repository.ConvidadoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ConvidadoService {

    @Autowired
    private ConvidadoRepository repository;

    public Convidado salvar(Convidado convidado) {
        // Validar se o email já está cadastrado
        if (convidado.getEmail() != null && !convidado.getEmail().isEmpty()) {
            Optional<Convidado> existente = repository.findByEmail(convidado.getEmail());
            if (existente.isPresent()) {
                throw new IllegalArgumentException("Você já registrou sua resposta anteriormente. Não é possível fazer um novo registro.");
            }
        }
        
        return repository.save(convidado);
    }

    public List<Convidado> listarTodos() {
        return repository.findAll();
    }
}