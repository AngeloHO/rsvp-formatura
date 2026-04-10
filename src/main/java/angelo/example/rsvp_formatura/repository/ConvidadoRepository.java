package angelo.example.rsvp_formatura.repository;

import angelo.example.rsvp_formatura.model.Convidado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ConvidadoRepository extends JpaRepository<Convidado, Long> {
    Optional<Convidado> findByEmail(String email);
}