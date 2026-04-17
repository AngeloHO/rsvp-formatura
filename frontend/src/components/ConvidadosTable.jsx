import { useMemo, useState } from 'react'
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    flexRender,
} from '@tanstack/react-table'

export default function ConvidadosTable({ data }) {
    const [globalFilter, setGlobalFilter] = useState('')

    const rows = useMemo(() => {
        return (data ?? []).flatMap((convidado) => {
            const nomeCompletoPrincipal = [convidado.nome, convidado.sobrenome]
                .filter(Boolean)
                .join(' ')
                .trim()

            const linhaPrincipal = {
                nome: convidado.nome ?? '',
                sobrenome: convidado.sobrenome ?? '',
                presencaConfirmada: convidado.presencaConfirmada === 'S' ? 'Sim' : 'Nao',
                acompanhante: 'Nao'
            }

            const linhasAcompanhantes = (convidado.acompanhantes ?? []).map((acompanhante) => ({
                nome: acompanhante.nome ?? '',
                sobrenome: acompanhante.sobrenome ?? '',
                presencaConfirmada: convidado.presencaConfirmada === 'S' ? 'Sim' : 'Nao',
                acompanhante: nomeCompletoPrincipal || convidado.nome || ''
            }))

            return [linhaPrincipal, ...linhasAcompanhantes]
        })
    }, [data])

    const columns = useMemo(() => [
        { header: 'Nome', accessorKey: 'nome' },
        { header: 'Sobrenome', accessorKey: 'sobrenome' },
        { header: 'Presenca Confirmada', accessorKey: 'presencaConfirmada' },
        { header: 'Acompanhante de', accessorKey: 'acompanhante' },
    ], [])

    const table = useReactTable({
        data: rows,
        columns,
        state: {
            globalFilter,
        },
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageSize: 10,
            },
        },
    })

    return (
        <>
            <div className="d-flex flex-column flex-md-row gap-2 justify-content-between align-items-md-center mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Pesquisar por nome, sobrenome ou responsavel"
                    value={globalFilter}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    style={{ maxWidth: '420px' }}
                />

                <div className="d-flex align-items-center gap-2">
                    <label className="mb-0">Linhas:</label>
                    <select
                        className="form-select"
                        value={table.getState().pagination.pageSize}
                        onChange={(e) => table.setPageSize(Number(e.target.value))}
                    >
                        {[5, 10, 20, 50].map((size) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <table className="table table-striped table-hover align-middle">
                <thead>
                    {table.getHeaderGroups().map((hg) => (
                        <tr key={hg.id}>
                            {hg.headers.map((h) => (
                                <th key={h.id}>
                                    {h.isPlaceholder ? null : flexRender(h.column.columnDef.header, h.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                <tbody>
                    {table.getRowModel().rows.length === 0 && (
                        <tr>
                            <td colSpan={columns.length} className="text-center py-4">
                                Nenhum convidado encontrado.
                            </td>
                        </tr>
                    )}

                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell ?? ((info) => info.getValue()), cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mt-3">
                <small className="text-muted">
                    Mostrando {table.getRowModel().rows.length} de {table.getFilteredRowModel().rows.length} registros filtrados.
                </small>

                <div className="btn-group" role="group" aria-label="Paginacao">
                    <button
                        className="btn btn-outline-secondary"
                        onClick={() => table.firstPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        {'<<'}
                    </button>
                    <button
                        className="btn btn-outline-secondary"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        {'<'}
                    </button>
                    <button
                        className="btn btn-outline-secondary"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        {'>'}
                    </button>
                    <button
                        className="btn btn-outline-secondary"
                        onClick={() => table.lastPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        {'>>'}
                    </button>
                </div>

                <span>
                    Pagina {table.getState().pagination.pageIndex + 1} de {table.getPageCount() || 1}
                </span>
            </div>
        </>
    );
}