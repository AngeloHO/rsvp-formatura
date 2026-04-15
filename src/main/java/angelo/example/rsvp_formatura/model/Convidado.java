package angelo.example.rsvp_formatura.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "convidados")
public class Convidado {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Nome é obrigatório")
    @Column(nullable = false)
    private String nome;

    @NotBlank(message = "Sobrenome é obrigatório")
    @Column(nullable = false)
    private String sobrenome;

    @NotBlank(message = "A presença é obrigatória")
    @Column(name = "presenca_confirmada", length = 1)
    private String presencaConfirmada; // 'S' ou 'N'

    private String telefone;

    @Email(message = "Email inválido")
    private String email;

    private String sexo;


    @OneToMany(mappedBy = "convidado", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Acompanhante> acompanhantes = new ArrayList<>();


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

    public String getSobrenome() {
        return sobrenome;
    }

    public void setSobrenome(String sobrenome) {
        this.sobrenome = sobrenome;
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


    public List<Acompanhante> getAcompanhantes() {
        return acompanhantes;
    }

    public void setAcompanhantes(List<Acompanhante> acompanhantes) {

        this.acompanhantes.clear();


        if (acompanhantes != null) {
            acompanhantes.forEach(this::adicionarAcompanhante);
        }
    }


    public void adicionarAcompanhante(Acompanhante acompanhante) {
        this.acompanhantes.add(acompanhante);
        acompanhante.setConvidado(this);
    }


    public void removerAcompanhante(Acompanhante acompanhante) {
        acompanhantes.remove(acompanhante);
        acompanhante.setConvidado(null);
    }


    public int getTotalPessoas() {
        return 1 + acompanhantes.size();
    }
}