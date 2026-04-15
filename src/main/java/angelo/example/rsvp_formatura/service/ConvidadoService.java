package angelo.example.rsvp_formatura.service;

import angelo.example.rsvp_formatura.model.Acompanhante;
import angelo.example.rsvp_formatura.model.Convidado;
import angelo.example.rsvp_formatura.repository.ConvidadoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ConvidadoService {

    @Autowired
    private ConvidadoRepository repository;

    @Transactional
    public Convidado salvar(Convidado convidado) {
        
        if (convidado.getEmail() != null && !convidado.getEmail().isEmpty()) {
            Optional<Convidado> existente = repository.findByEmail(convidado.getEmail());
            if (existente.isPresent()) {
                throw new IllegalArgumentException("Você já registrou sua resposta anteriormente. Não é possível fazer um novo registro.");
            }
        }

        if(convidado.getAcompanhantes() == null) {
            convidado.setAcompanhantes(new ArrayList<>());
        }

    
        if (convidado.getAcompanhantes() != null && !convidado.getAcompanhantes().isEmpty()) {
    
            convidado.getAcompanhantes().forEach(acompanhante -> {
                acompanhante.setConvidado(convidado);
            });
        }

        return repository.save(convidado);
    }

    public List<Convidado> listarTodos() {
        return repository.findAll();
    }

    /**
     * Retorna o total de pessoas confirmadas (convidados + acompanhantes)
     */
    public int getTotalPessoasConfirmadas() {
        List<Convidado> confirmados = repository.findByPresencaConfirmada("S");
        return confirmados.stream()
                .mapToInt(Convidado::getTotalPessoas)
                .sum();
    }

    /**
     * Retorna o total de adultos confirmados
     */
    public int getTotalAdultosConfirmados() {
        List<Convidado> confirmados = repository.findByPresencaConfirmada("S");
        int adultos = confirmados.size(); // Todos os convidados principais são adultos

        // Soma os acompanhantes adultos (idade >= 12 ou null)
        int acompanhantesAdultos = confirmados.stream()
                .flatMap(c -> c.getAcompanhantes().stream())
                .filter(Acompanhante::isAdulto)
                .mapToInt(a -> 1)
                .sum();

        return adultos + acompanhantesAdultos;
    }

    /**
     * Retorna o total de crianças confirmadas
     */
    public int getTotalCriancasConfirmadas() {
        List<Convidado> confirmados = repository.findByPresencaConfirmada("S");
        return (int) confirmados.stream()
                .flatMap(c -> c.getAcompanhantes().stream())
                .filter(Acompanhante::isCrianca)
                .count();
    }
}