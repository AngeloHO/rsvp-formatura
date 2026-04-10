package angelo.example.rsvp_formatura.service;

import angelo.example.rsvp_formatura.model.Convidado;
import angelo.example.rsvp_formatura.repository.ConvidadoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConvidadoService {

    @Autowired
    private ConvidadoRepository repository;

    public Convidado salvar(Convidado convidado) {
        return repository.save(convidado);
    }

    public List<Convidado> listarTodos() {
        return repository.findAll();
    }
}