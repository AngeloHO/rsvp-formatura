package angelo.example.rsvp_formatura.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "convidados")
public class Convidado {

    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Nome é obrigatório")
    @Column(nullable = false)
    private String nome;

    @NotBlank(message = "A presença é obrigatória")
    @Column(name = "presenca_confirmada", length = 1)
    private String presencaConfirmada; // 'S' ou 'N'

    private String telefone;

    @Email(message = "Email inválido")
    private String email;

    private String sexo;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getPresencaConfirmada() {
        return presencaConfirmada;
    }

    public void setPresencaConfirmada(String presencaConfirmada) {
        this.presencaConfirmada = presencaConfirmada;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSexo() {
        return sexo;
    }

    public void setSexo(String sexo) {
        this.sexo = sexo;
    }
}