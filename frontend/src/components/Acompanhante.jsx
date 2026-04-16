// Acompanhante.jsx
// Item de acompanhante no formulário

function Acompanhante({ numero, onRemove, onChange, dados }) {
    const handleChange = (campo, valor) => {
        onChange(dados.id, { ...dados, [campo]: valor })
    }

    return (
        <div className="card mb-3 acomp-item">
            <div className="card-body">
                <button
                    type="button"
                    className="btn btn-sm btn-danger float-end"
                    onClick={() => onRemove(dados.id)}
                >
                    ×
                </button>

                <h6>Acompanhante {numero}</h6>

                <div className="row g-2">
                    <div className="col-md-6">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nome"
                            value={dados.nome || ''}
                            onChange={(e) => handleChange('nome', e.target.value)}
                            maxLength={200}
                            pattern="[\p{L}\s'\-]+"
                            title="Nome deve conter apenas letras, espaços, hífens e apóstrofos"
                            required
                        />
                    </div>

                    <div className="col-md-6">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Sobrenome"
                            value={dados.sobrenome || ''}
                            onChange={(e) => handleChange('sobrenome', e.target.value)}
                            maxLength={100}
                            pattern="[\p{L}\s'\-]*"
                            title="Sobrenome deve conter apenas letras, espaços, hífens e apóstrofos"
                        />
                    </div>

                    <div className="col-md-6">
                        <select
                            className="form-select"
                            value={dados.sexo || 'M'}
                            onChange={(e) => handleChange('sexo', e.target.value)}
                        >
                            <option value="M">Masculino</option>
                            <option value="F">Feminino</option>
                            <option value="O">Outro</option>
                        </select>
                    </div>

                    <div className="col-md-6">
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Idade"
                            min="0"
                            max="150"
                            value={dados.idade || ''}
                            onChange={(e) => handleChange('idade', e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Acompanhante