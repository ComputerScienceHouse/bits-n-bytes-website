import { useState, useEffect, useCallback } from "react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Package, Plus, Trash2, RefreshCw, X, AlertCircle, ChevronRight } from "lucide-react"

const SLOTS_PER_SHELF = 4

type ItemRecord = {
  id: number | string
  name: string
  price?: number
}

type SlotItem = ItemRecord & {
  shelf_content_id: string
  quantity: number
}

type ShelfContents = Record<number, SlotItem[]>

const apiHeaders = {
  'Content-Type': 'application/json',
  'Authorization': import.meta.env.VITE_PUBLIC_API_AUTH ?? "",
}

function emptyShelf(): ShelfContents {
  const c: ShelfContents = {}
  for (let s = 0; s < SLOTS_PER_SHELF; s++) c[s] = []
  return c
}

export default function InventoryPage() {
  const [allItems, setAllItems] = useState<ItemRecord[]>([])
  const [shelfIds, setShelfIds] = useState<string[]>([])
  const [pendingShelves, setPendingShelves] = useState<Set<string>>(new Set())
  const [shelves, setShelves] = useState<Record<string, ShelfContents>>({})
  const [loadingAll, setLoadingAll] = useState(false)
  const [loadingShelf, setLoadingShelf] = useState<Record<string, boolean>>({})
  const [addState, setAddState] = useState<Record<string, { itemId: string; quantity: string }>>({})
  const [actionLoading, setActionLoading] = useState<Record<string, boolean>>({})
  const [newShelfInput, setNewShelfInput] = useState('')
  const [error, setError] = useState<string | null>(null)

  const fetchItems = useCallback(async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_PUBLIC_API_ENDPOINT}/get_items`, { headers: apiHeaders })
      if (!res.ok) throw new Error()
      setAllItems(await res.json())
    } catch {
      setError('Failed to load items catalog')
    }
  }, [])

  const fetchAllShelves = useCallback(async () => {
    setLoadingAll(true)
    try {
      const res = await fetch(`${import.meta.env.VITE_PUBLIC_API_ENDPOINT}/shelves`, { headers: apiHeaders })
      if (!res.ok) throw new Error()
      const data: { shelf_id: number | string; slots: { slot_id: number; items: SlotItem[] }[] }[] = await res.json()

      const newShelves: Record<string, ShelfContents> = {}
      const ids: string[] = []
      for (const shelf of data) {
        const sid = String(shelf.shelf_id)
        ids.push(sid)
        const contents = emptyShelf()
        for (const slot of shelf.slots) contents[slot.slot_id] = slot.items
        newShelves[sid] = contents
      }

      setShelves(prev => {
        const merged: Record<string, ShelfContents> = { ...newShelves }
        setPendingShelves(pending => {
          for (const pid of pending) {
            if (!newShelves[pid]) merged[pid] = prev[pid] ?? emptyShelf()
          }
          return pending
        })
        return merged
      })
      setShelfIds(prev => {
        const pendingOnly = prev.filter(id => !ids.includes(id))
        return [...ids, ...pendingOnly]
      })
    } catch {
      setError('Failed to load shelves')
    } finally {
      setLoadingAll(false)
    }
  }, [])

  const fetchShelf = useCallback(async (shelfId: string) => {
    setLoadingShelf(prev => ({ ...prev, [shelfId]: true }))
    try {
      const res = await fetch(`${import.meta.env.VITE_PUBLIC_API_ENDPOINT}/shelf/${shelfId}`, { headers: apiHeaders })
      const contents = emptyShelf()
      if (res.ok) {
        const slots: { slot_id: number; items: SlotItem[] }[] = await res.json()
        for (const slot of slots) contents[slot.slot_id] = slot.items
      }
      setShelves(prev => ({ ...prev, [shelfId]: contents }))
    } finally {
      setLoadingShelf(prev => ({ ...prev, [shelfId]: false }))
    }
  }, [])

  useEffect(() => {
    fetchItems()
    fetchAllShelves()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const addShelf = () => {
    const id = newShelfInput.trim()
    if (!id || shelfIds.includes(id)) return
    setShelfIds(prev => [...prev, id])
    setPendingShelves(prev => new Set(prev).add(id))
    setShelves(prev => ({ ...prev, [id]: emptyShelf() }))
    setNewShelfInput('')
  }

  const removePendingShelf = (shelfId: string) => {
    setShelfIds(prev => prev.filter(id => id !== shelfId))
    setPendingShelves(prev => { const s = new Set(prev); s.delete(shelfId); return s })
    setShelves(prev => { const n = { ...prev }; delete n[shelfId]; return n })
  }

  const addItemToSlot = async (shelfId: string, slotId: number) => {
    const key = `${shelfId}-${slotId}`
    const state = addState[key]
    if (!state?.itemId) return
    setActionLoading(prev => ({ ...prev, [key]: true }))
    try {
      const res = await fetch(`${import.meta.env.VITE_PUBLIC_API_ENDPOINT}/shelf/${shelfId}/slot/${slotId}`, {
        method: 'POST',
        headers: apiHeaders,
        body: JSON.stringify({ item_id: Number(state.itemId), quantity: Number(state.quantity) || 1 }),
      })
      if (!res.ok) throw new Error()
      setAddState(prev => ({ ...prev, [key]: { itemId: '', quantity: '1' } }))
      setPendingShelves(prev => { const s = new Set(prev); s.delete(shelfId); return s })
      await fetchShelf(shelfId)
    } catch {
      setError(`Failed to add item to Shelf ${shelfId}, Slot ${slotId}`)
    } finally {
      setActionLoading(prev => ({ ...prev, [key]: false }))
    }
  }

  const removeItemFromSlot = async (shelfId: string, slotId: number, itemId: number | string) => {
    const key = `remove-${shelfId}-${slotId}-${itemId}`
    setActionLoading(prev => ({ ...prev, [key]: true }))
    try {
      const res = await fetch(`${import.meta.env.VITE_PUBLIC_API_ENDPOINT}/shelf/${shelfId}/slot/${slotId}`, {
        method: 'DELETE',
        headers: apiHeaders,
        body: JSON.stringify({ item_id: Number(itemId) }),
      })
      if (!res.ok) throw new Error()
      await fetchShelf(shelfId)
    } catch {
      setError(`Failed to remove item from Shelf ${shelfId}, Slot ${slotId}`)
    } finally {
      setActionLoading(prev => ({ ...prev, [key]: false }))
    }
  }

  const totalItems = shelfIds.reduce((acc, sid) => {
    const shelf = shelves[sid]
    if (!shelf) return acc
    return acc + Object.values(shelf).reduce((s, items) => s + items.length, 0)
  }, 0)

  return (
    <div className="min-h-screen pt-20 pb-10 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="p-2 rounded-lg bg-purple-500/20 border border-purple-500/30">
                <Package className="h-5 w-5 text-purple-300" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Inventory</h1>
            </div>
            <p className="text-sm text-muted-foreground pl-1">
              {shelfIds.length} shelf{shelfIds.length !== 1 ? 'ves' : ''} &middot; {totalItems} item slot{totalItems !== 1 ? 's' : ''} filled
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => { fetchItems(); fetchAllShelves() }}
            disabled={loadingAll}
            className="self-start sm:self-auto gap-2 border-white/20 hover:border-white/40"
          >
            <RefreshCw className={`h-4 w-4 ${loadingAll ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="flex items-start gap-3 p-4 bg-red-950/40 border border-red-500/40 rounded-xl text-sm text-red-300">
            <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
            <span className="flex-1">{error}</span>
            <button
              className="shrink-0 hover:text-red-200 transition-colors"
              onClick={() => setError(null)}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Empty state */}
        {shelfIds.length === 0 && !loadingAll && (
          <div className="text-center py-20 text-muted-foreground">
            <Package className="h-12 w-12 mx-auto mb-4 opacity-30" />
            <p className="font-medium">No shelves yet</p>
            <p className="text-sm mt-1">Add a shelf ID below to get started</p>
          </div>
        )}

        {/* Loading state */}
        {loadingAll && shelfIds.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <RefreshCw className="h-8 w-8 mx-auto mb-4 opacity-50 animate-spin" />
            <p className="text-sm">Loading shelves...</p>
          </div>
        )}

        {/* Shelves */}
        <div className="space-y-4">
          {shelfIds.map(shelfId => {
            const shelfData = shelves[shelfId]
            const isLoading = loadingShelf[shelfId]
            const isPending = pendingShelves.has(shelfId)

            return (
              <div
                key={shelfId}
                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden"
              >
                {/* Shelf Header */}
                <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <ChevronRight className="h-4 w-4 text-purple-400" />
                    <span className="font-semibold text-sm sm:text-base">Shelf {shelfId}</span>
                    {isPending && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-500/15 text-yellow-400 border border-yellow-500/25 font-medium">
                        Unsaved
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    {isLoading && (
                      <RefreshCw className="h-3.5 w-3.5 text-muted-foreground animate-spin" />
                    )}
                    {isPending && (
                      <button
                        className="text-xs text-red-400 hover:text-red-300 transition-colors"
                        onClick={() => removePendingShelf(shelfId)}
                      >
                        Discard
                      </button>
                    )}
                  </div>
                </div>

                {/* Slots Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
                  {Array.from({ length: SLOTS_PER_SHELF }, (_, j) => {
                    const slotId = j
                    const slotItems = shelfData?.[slotId] ?? []
                    const addKey = `${shelfId}-${slotId}`
                    const addCurrent = addState[addKey] ?? { itemId: '', quantity: '1' }

                    return (
                      <div key={slotId} className="bg-black/30 p-4 flex flex-col gap-3">
                        {/* Slot label */}
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold uppercase tracking-wider text-purple-300/70">
                            Slot {slotId}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {slotItems.length} item{slotItems.length !== 1 ? 's' : ''}
                          </span>
                        </div>

                        {/* Items list */}
                        <div className="flex-1 space-y-2 min-h-[60px]">
                          {slotItems.length === 0 ? (
                            <div className="flex items-center justify-center h-full min-h-[48px] rounded-lg border border-dashed border-white/10 text-xs text-muted-foreground">
                              Empty
                            </div>
                          ) : (
                            slotItems.map(item => {
                              const removeKey = `remove-${shelfId}-${slotId}-${item.id}`
                              return (
                                <div
                                  key={item.shelf_content_id}
                                  className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2 group"
                                >
                                  <div className="flex-1 min-w-0">
                                    <div className="text-sm font-medium truncate leading-tight">{item.name}</div>
                                    <div className="text-xs text-muted-foreground mt-0.5">
                                      Qty: <span className="text-foreground/80 font-medium">{item.quantity}</span>
                                    </div>
                                  </div>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="h-8 w-8 p-0 text-red-400/60 hover:text-red-300 hover:bg-red-900/25 shrink-0 opacity-60 group-hover:opacity-100 transition-all"
                                    disabled={actionLoading[removeKey]}
                                    onClick={() => removeItemFromSlot(shelfId, slotId, item.id)}
                                  >
                                    {actionLoading[removeKey]
                                      ? <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                                      : <Trash2 className="h-3.5 w-3.5" />
                                    }
                                  </Button>
                                </div>
                              )
                            })
                          )}
                        </div>

                        {/* Add item form */}
                        <div className="pt-3 border-t border-white/10 space-y-2">
                          <Select
                            value={addCurrent.itemId}
                            onValueChange={val =>
                              setAddState(prev => ({
                                ...prev,
                                [addKey]: { ...addCurrent, itemId: val },
                              }))
                            }
                          >
                            <SelectTrigger className="h-9 text-sm border-white/15 bg-white/5">
                              <SelectValue placeholder="Select item..." />
                            </SelectTrigger>
                            <SelectContent>
                              {allItems.map(item => (
                                <SelectItem key={item.id} value={String(item.id)}>
                                  {item.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <div className="flex gap-2">
                            <Input
                              type="number"
                              min={1}
                              value={addCurrent.quantity}
                              onChange={e =>
                                setAddState(prev => ({
                                  ...prev,
                                  [addKey]: { ...addCurrent, quantity: e.target.value },
                                }))
                              }
                              className="h-9 text-sm w-20 shrink-0 border-white/15 bg-white/5"
                              placeholder="Qty"
                            />
                            <Button
                              size="sm"
                              className="h-9 flex-1 text-sm bg-purple-600/80 hover:bg-purple-500/80 border-0"
                              disabled={!addCurrent.itemId || actionLoading[addKey]}
                              onClick={() => addItemToSlot(shelfId, slotId)}
                            >
                              {actionLoading[addKey]
                                ? <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                                : <><Plus className="h-3.5 w-3.5 mr-1" />Add</>
                              }
                            </Button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        {/* Add Shelf */}
        <div className="rounded-2xl border border-dashed border-white/15 p-4 sm:p-5">
          <p className="text-sm font-medium text-muted-foreground mb-3">Add a shelf</p>
          <div className="flex gap-3">
            <Input
              type="text"
              placeholder="Shelf ID..."
              value={newShelfInput}
              onChange={e => setNewShelfInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addShelf()}
              className="h-10 max-w-[180px] border-white/15 bg-white/5"
            />
            <Button
              onClick={addShelf}
              disabled={!newShelfInput.trim()}
              className="h-10 bg-purple-600/80 hover:bg-purple-500/80 border-0 gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Shelf
            </Button>
          </div>
        </div>

      </div>
    </div>
  )
}