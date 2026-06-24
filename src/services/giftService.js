import { supabase } from '../lib/supabaseClient'

function requireSupabase() {
  if (!supabase) {
    throw new Error('Supabase is not configured. Check your .env file.')
  }

  return supabase
}

export async function getGiftsByListId(listId) {
  const client = requireSupabase()

  const { data, error } = await client
    .from('gift_items')
    .select('*')
    .eq('list_id', listId)
    .neq('status', 'removed')
    .order('created_at', { ascending: false })

  if (error) throw error

  return data
}

export async function createGift({
  listId,
  name,
  description = '',
  price = null,
  currency = 'MZN',
  productUrl = '',
  imageUrl = '',
  priority = 'medium',
}) {
  const client = requireSupabase()

  const { data, error } = await client
    .from('gift_items')
    .insert({
      list_id: listId,
      name,
      description,
      price: price || null,
      currency,
      product_url: productUrl,
      image_url: imageUrl,
      priority,
      status: 'available',
    })
    .select()
    .single()

  if (error) throw error

  return data
}

export async function updateGift(id, updates) {
  const client = requireSupabase()

  const { data, error } = await client
    .from('gift_items')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error

  return data
}

export async function deleteGift(id) {
  const client = requireSupabase()

  const { data, error } = await client
    .from('gift_items')
    .update({
      status: 'removed',
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error

  return data
}