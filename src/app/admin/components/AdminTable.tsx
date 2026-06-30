'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Plus, Search, Trash2, ChevronLeft, ChevronRight } from 'lucide-react'
import DeleteConfirmModal from './DeleteConfirmModal'
import { useToast } from './Toast'

type FormatType = 'boolean' | 'date' | 'datetime' | 'status' | 'fileSize' | 'currencyM' | 'rating' | 'durationMs' | 'fallback'

interface Column {
  key: string
  label: string
  formatType?: FormatType
}

function formatCellValue(value: unknown, type: FormatType): string {
  switch (type) {
    case 'boolean':
      return value ? 'Active' : 'Inactive'
    case 'date':
      return value ? new Date(value as string).toLocaleDateString('id-ID') : '-'
    case 'datetime':
      return value ? new Date(value as string).toLocaleString('id-ID') : '-'
    case 'status': {
      const statusMap: Record<string, string> = {
        PUBLISHED: 'Published',
        DRAFT: 'Draft',
        ARCHIVED: 'Archived',
      }
      return statusMap[value as string] || String(value ?? '-')
    }
    case 'fileSize':
      return `${(Number(value) / 1024).toFixed(1)} KB`
    case 'currencyM': {
      const val = Number(value)
      return val ? `Rp ${(val / 1_000_000).toFixed(0)}M` : '-'
    }
    case 'rating':
      return `${value} ★`
    case 'durationMs': {
      const d = Number(value)
      return d ? `${d / 1000}s` : '6s'
    }
    case 'fallback':
      return value ? String(value) : '-'
    default:
      return String(value ?? '-')
  }
}

interface AdminTableProps {
  title: string
  data: Record<string, unknown>[]
  columns: Column[]
  createHref: string
  createLabel: string
  rowHrefPattern?: string   // e.g. "/admin/dealers/{id}/edit"
  rowHrefField?: string      // field to replace in pattern, e.g. "id"
  searchable?: boolean
  searchPlaceholder?: string
  filterable?: boolean
  filterField?: string
  filterOptions?: { label: string; value: string }[]
  onDelete?: (id: string) => Promise<void>
  deleteField?: string // field to show in confirmation (e.g. 'title', 'name')
  pageSize?: number
}

export default function AdminTable({
  title,
  data,
  columns,
  createHref,
  createLabel,
  rowHrefPattern,
  rowHrefField,
  searchable = true,
  searchPlaceholder = 'Search...',
  filterable = false,
  filterField,
  filterOptions,
  onDelete,
  deleteField = 'title',
  pageSize = 20,
}: AdminTableProps) {
  const { addToast } = useToast()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('')
  const [page, setPage] = useState(1)
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; item: Record<string, unknown> | null }>({
    isOpen: false,
    item: null,
  })
  const [deletingId, setDeletingId] = useState<string | null>(null)

  // Filter and search data
  const filteredData = useMemo(() => {
    let result = data

    // Apply search
    if (search) {
      const q = search.toLowerCase()
      result = result.filter((item) =>
        columns.some((col) => {
          const val = item[col.key]
          return val && String(val).toLowerCase().includes(q)
        })
      )
    }

    // Apply filter
    if (filter && filterField) {
      result = result.filter((item) => String(item[filterField]) === filter)
    }

    return result
  }, [data, search, filter, columns, filterField])

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize))
  const paginatedData = filteredData.slice((page - 1) * pageSize, page * pageSize)

  // Reset page when search/filter changes
  useMemo(() => {
    if (page > totalPages) setPage(1)
  }, [search, filter, totalPages, page])

  const handleDeleteClick = (item: Record<string, unknown>) => {
    setDeleteModal({ isOpen: true, item })
  }

  const handleDeleteConfirm = async () => {
    if (!deleteModal.item || !onDelete) return
    const item = deleteModal.item
    setDeletingId(item.id as string)
    try {
      await onDelete(item.id as string)
      setDeleteModal({ isOpen: false, item: null })
      addToast('success', 'Item deleted successfully')
    } catch (err) {
      addToast('error', err instanceof Error ? err.message : 'Failed to delete')
    } finally {
      setDeletingId(null)
    }
  }

  const getItemName = (item: Record<string, unknown>) => {
    return (item[deleteField] as string) || ''
  }

  // Empty state
  if (data.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-heading font-semibold text-gray-900">{title}</h2>
        </div>
        <div className="p-12 text-center">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="w-8 h-8 text-gray-300" />
          </div>
          <p className="text-gray-500 font-medium">No data yet</p>
          <p className="text-sm text-gray-400 mt-1">
            Get started by creating a new entry.
          </p>
          <Link
            href={createHref}
            className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-chery-red text-white rounded-lg text-sm font-medium hover:bg-chery-red-dark transition-colors"
          >
            <Plus className="w-4 h-4" />
            {createLabel}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 className="font-heading font-semibold text-gray-900">{title}</h2>
            <div className="flex items-center gap-3">
              {searchable && (
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder={searchPlaceholder}
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); setPage(1) }}
                    className="pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50 w-48 lg:w-56"
                  />
                </div>
              )}
              {filterable && filterOptions && filterField && (
                <select
                  value={filter}
                  onChange={(e) => { setFilter(e.target.value); setPage(1) }}
                  className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chery-red/50"
                >
                  <option value="">All</option>
                  {filterOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              )}
              <Link
                href={createHref}
                className="inline-flex items-center gap-2 px-4 py-2 bg-chery-red text-white rounded-lg text-sm font-medium hover:bg-chery-red-dark transition-colors"
              >
                <Plus className="w-4 h-4" />
                {createLabel}
              </Link>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-50">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap"
                  >
                    {col.label}
                  </th>
                ))}
                {(onDelete || rowHrefPattern) && (
                  <th className="text-right px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap w-20">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + 1} className="px-6 py-12 text-center text-gray-400 text-sm">
                    No results matched your search
                  </td>
                </tr>
              ) : (
                paginatedData.map((item) => {
                  const href = rowHrefPattern && rowHrefField
                    ? rowHrefPattern.replace(`{${rowHrefField}}`, String(item[rowHrefField] ?? ''))
                    : ''
                  const isDeleting = deletingId === item.id
                  return (
                    <tr
                      key={item.id as string}
                      className={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${isDeleting ? 'opacity-50' : ''}`}
                    >
                      {columns.map((col) => (
                        <td key={col.key} className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                          {col.formatType
                            ? formatCellValue(item[col.key], col.formatType)
                            : String(item[col.key] ?? '-')}
                        </td>
                      ))}
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {href && (
                            <Link
                              href={href}
                              className="text-sm text-chery-red hover:text-chery-red-dark font-medium transition-colors"
                            >
                              Edit
                            </Link>
                          )}
                          {onDelete && (
                            <button
                              onClick={(e) => {
                                e.preventDefault()
                                handleDeleteClick(item)
                              }}
                              disabled={isDeleting}
                              className="text-sm text-gray-400 hover:text-red-500 transition-colors p-1"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-3 border-t border-gray-100 flex items-center justify-between">
            <p className="text-xs text-gray-400">
              Showing {(page - 1) * pageSize + 1} - {Math.min(page * pageSize, filteredData.length)} of {filteredData.length}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-gray-600" />
              </button>
              <span className="text-xs text-gray-500 font-medium">{page} / {totalPages}</span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, item: null })}
        onConfirm={handleDeleteConfirm}
        itemName={deleteModal.item ? getItemName(deleteModal.item) : undefined}
      />
    </>
  )
}