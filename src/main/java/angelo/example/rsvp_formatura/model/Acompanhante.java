package angelo.example.rsvp_formatura.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "acompanhantes")
public class Acompanhante {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Nome do acompanhante é obrigatório")
    @Column(nullable = false)
    private String nome;

    @Column(length = 1)
    private String sexo; 

    private Integer idade; 

    @ManyToOne
    @JoinColumn(name = "convidado_id", nullable = false)
    @JsonIgnore 
    private Convidado convidado;

    public Acompanhante() {
    }

    public Acompanhante(String nome, String sexo, Integer idade) {
        this.nome = nome;
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