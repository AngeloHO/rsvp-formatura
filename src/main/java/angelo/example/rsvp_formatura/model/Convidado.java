package angelo.example.rsvp_formatura.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "convidados")
public class Convidado {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Nome é obrigatório")
    @Size(min = 2, max = 100, message = "Nome deve ter entre 2 e 100 caracteres")
    @Pattern(regexp = "^[\\p{L}\\s'-]+$", message = "Nome deve conter apenas letras, espaços, hífens e apóstrofos")
    @Column(nullable = false, length = 100)
    private String nome;

    @NotBlank(message = "Sobrenome é obrigatório")
    @Size(min = 2, max = 100, message = "Sobrenome deve ter entre 2 e 100 caracteres")
    @Pattern(regexp = "^[\\p{L}\\s'-]+$", message = "Sobrenome deve conter apenas letras, espaços, hífens e apóstrofos")
    @Column(nullable = false, length = 100)
    private String sobrenome;

    @NotBlank(message = "A presença é obrigatória")
    @Pattern(regexp = "^[SN]$", message = "Presença confirmada deve ser 'S' ou 'N'")
    @Column(name = "presenca_confirmada", length = 1)
    private String presencaConfirmada; // 'S' ou 'N'

    @Size(max = 20, message = "Telefone deve ter no máximo 20 caracteres")
    @Pattern(regexp = "^[0-9()\\s-]*$", message = "Telefone deve conter apenas números, parênteses, espaços e hífens")
    @Column(length = 20)
    private String telefone;

    @Email(message = "Email inválido")
    @Size(max = 255, message = "Email deve ter no máximo 255 caracteres")
    @Column(length = 255)
    private String email;

    @Pattern(regexp = "^[MFO]$", message = "Sexo deve ser 'M', 'F' ou 'O'")
    @Column(length = 1)
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