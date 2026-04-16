package angelo.example.rsvp_formatura.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "acompanhantes")
public class Acompanhante {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Nome do acompanhante é obrigatório")
    @Size(min = 2, max = 200, message = "Nome deve ter entre 2 e 200 caracteres")
    @Pattern(regexp = "^[\\p{L}\\s'-]+$", message = "Nome deve conter apenas letras, espaços, hífens e apóstrofos")
    @Column(nullable = false, length = 200)
    private String nome;

    @Size(max = 100, message = "Sobrenome deve ter no máximo 100 caracteres")
    @Pattern(regexp = "^[\\p{L}\\s'-]*$", message = "Sobrenome deve conter apenas letras, espaços, hífens e apóstrofos")
    @Column(length = 100)
    private String sobrenome;

    @Pattern(regexp = "^[MFO]$", message = "Sexo deve ser 'M', 'F' ou 'O'")
    @Column(length = 1)
    private String sexo; 

    @Min(value = 0, message = "Idade deve ser maior ou igual a 0")
    @Max(value = 150, message = "Idade deve ser menor ou igual a 150")
    @Column
    private Integer idade; 

    @ManyToOne
    @JoinColumn(name = "convidado_id", nullable = false)
    @JsonIgnore 
    private Convidado convidado;

    public Acompanhante() {
    }

    public Acompanhante(String nome, String sobrenome, String sexo, Integer idade) {
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.sexo = sexo;
        this.idade = idade;
    }


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

    public String getSexo() {
        return sexo;
    }

    public void setSexo(String sexo) {
        this.sexo = sexo;
    }

    public Integer getIdade() {
        return idade;
    }

    public void setIdade(Integer idade) {
        this.idade = idade;
    }

    public Convidado getConvidado() {
        return convidado;
    }

    public void setConvidado(Convidado convidado) {
        this.convidado = convidado;
    }


    public boolean isCrianca() {
        return idade != null && idade < 12;
    }

   
    public boolean isAdulto() {
        return idade == null || idade >= 12;
    }
}