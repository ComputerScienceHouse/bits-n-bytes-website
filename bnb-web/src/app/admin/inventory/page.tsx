'use client'

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Package, Plus, Trash2, RefreshCw } from "lucide-react"

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
  'Authorization': process.env.NEXT_PUBLIC_API_AUTH ?? "",
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/get_items`, { headers: apiHeaders })
      if (!res.ok) throw new Error()
      setAllItems(await res.json())
    } catch {
      setError('Failed to load items catalog')
    }
  }, [])

  const fetchAllShelves = useCallback(async () => {
    setLoadingAll(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/shelves`, { headers: apiHeaders })
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
        // keep pending shelves that haven't been saved yet
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/shelf/${shelfId}`, { headers: apiHeaders })
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/shelf/${shelfId}/slot/${slotId}`, {
        method: 'POST',
        headers: apiHeaders,
        body: JSON.stringify({ item_id: Number(state.itemId), quantity: Number(state.quantity) || 1 }),
      })
      if (!res.ok) throw new Error()
      setAddState(prev => ({ ...prev, [key]: { itemId: '', quantity: '1' } }))
      // shelf is now persisted — remove from pending
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/shelf/${shelfId}/slot/${slotId}`, {
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

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-background to-background/50">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Package className="h-7 w-7" />
            <h1 className="text-3xl font-bold">Inventory Management</h1>
          </div>
          <Button variant="outline" onClick={() => { fetchItems(); fetchAllShelves() }} disabled={loadingAll}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loadingAll ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-900/20 border border-red-600 rounded-md text-red-400 text-sm flex justify-between items-center">
            <span>{error}</span>
            <button className="underline ml-4" onClick={() => setError(null)}>dismiss</button>
          </div>
        )}

        {shelfIds.length === 0 && !loadingAll && (
          <div className="text-center text-muted-foreground py-16">
            No shelves found. Add a shelf by ID below to get started.
          </div>
        )}

        <div className="border-2 border-foreground/30 rounded-lg overflow-hidden bg-black/30">
          {shelfIds.map(shelfId => {
            const shelfData = shelves[shelfId]
            const isLoading = loadingShelf[shelfId]
            const isPending = pendingShelves.has(shelfId)

            return (
              <div key={shelfId}>
                <div className="bg-foreground/10 px-4 py-2 flex items-center justify-between border-b border-foreground/20">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">Shelf {shelfId}</span>
                    {isPending && (
                      <span className="text-xs text-yellow-500/80 italic">unsaved — add an item to create</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {isLoading && <span className="text-xs text-muted-foreground">Loading...</span>}
                    {isPending && (
                      <button
                        className="text-xs text-red-400 hover:underline"
                        onClick={() => removePendingShelf(shelfId)}
                      >
                        discard
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-4 divide-x divide-foreground/20">
                  {Array.from({ length: SLOTS_PER_SHELF }, (_, j) => {
                    const slotId = j
                    const slotItems = shelfData?.[slotId] ?? []
                    const addKey = `${shelfId}-${slotId}`
                    const addCurrent = addState[addKey] ?? { itemId: '', quantity: '1' }

                    return (
                      <div key={slotId} className="p-3 flex flex-col gap-2 min-h-[180px]">
                        <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">
                          Slot {slotId}
                        </div>

                        <div className="flex-1 space-y-1">
                          {slotItems.length === 0 ? (
                            <div className="text-xs text-muted-foreground italic">Empty</div>
                          ) : (
                            slotItems.map(item => {
                              const removeKey = `remove-${shelfId}-${slotId}-${item.id}`
                              return (
                                <div
                                  key={item.shelf_content_id}
                                  className="flex items-center justify-between gap-1 bg-foreground/5 border border-foreground/10 rounded px-2 py-1"
                                >
                                  <div className="flex-1 min-w-0">
                                    <div className="text-xs font-medium truncate">{item.name}</div>
                                    <div className="text-xs text-muted-foreground">qty: {item.quantity}</div>
                                  </div>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="h-6 w-6 p-0 text-red-400 hover:text-red-300 hover:bg-red-900/20 shrink-0"
                                    disabled={actionLoading[removeKey]}
                                    onClick={() => removeItemFromSlot(shelfId, slotId, item.id)}
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>
                              )
                            })
                          )}
                        </div>

                        <div className="space-y-1.5 pt-2 border-t border-foreground/10">
                          <Select
                            value={addCurrent.itemId}
                            onValueChange={val =>
                              setAddState(prev => ({
                                ...prev,
                                [addKey]: { ...addCurrent, itemId: val },
                              }))
                            }
                          >
                            <SelectTrigger className="h-7 text-xs">
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
                          <div className="flex gap-1">
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
                              className="h-7 text-xs w-16 shrink-0"
                              placeholder="Qty"
                            />
                            <Button
                              size="sm"
                              className="h-7 flex-1 text-xs"
                              disabled={!addCurrent.itemId || actionLoading[addKey]}
                              onClick={() => addItemToSlot(shelfId, slotId)}
                            >
                              <Plus className="h-3 w-3 mr-1" />
                              Add
                            </Button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="h-3 bg-foreground/15 border-t border-b border-foreground/20" />
              </div>
            )
          })}
        </div>

        <div className="mt-4 flex items-center gap-3">
          <Input
            type="text"
            placeholder="Shelf ID..."
            value={newShelfInput}
            onChange={e => setNewShelfInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addShelf()}
            className="w-36"
          />
          <Button variant="outline" onClick={addShelf} disabled={!newShelfInput.trim()}>
            <Plus className="h-4 w-4 mr-2" />
            Add Shelf
          </Button>
        </div>
      </div>
    </div>
  )
}
