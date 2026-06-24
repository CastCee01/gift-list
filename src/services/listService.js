import { supabase } from '../lib/supabaseClient'

function requireSupabase() {
  if (!supabase) {
    throw new Error('Supabase is not configured. Check your .env file.')
  }

  return supabase
}

function createSlug(title) {
  const baseSlug = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

  const suffix = Date.now().toString(36)

  return `${baseSlug || 'gift-list'}-${suffix}`
}

export async function getLists(userId) {
  const client = requireSupabase()

  const { data, error } = await client
    .from('gift_lists')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error

  return data
}

export async function createList({
  userId,
  title,
  description = '',
  purpose = '',
  targetDate = null,
  isPublic = true,
  coverImageUrl = '',
}) {
  const client = requireSupabase()

  const { data, error } = await client
    .from('gift_lists')
    .insert({
      user_id: userId,
      title,
      description,
      purpose,
      target_date: targetDate || null,
      slug: createSlug(title),
      is_public: isPublic,
      cover_image_url: coverImageUrl,
    })
    .select()
    .single()

  if (error) throw error

  return data
}

export async function getListById(id) {
  const client = requireSupabase()

  const { data, error } = await client
    .from('gift_lists')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error

  return data
}

export async function getPublicListBySlug(slug) {
  const client = requireSupabase()

  const { data, error } = await client
    .from('gift_lists')
    .select('*')
    .eq('slug', slug)
    .eq('is_public', true)
    .single()

  if (error) throw error

  return data
}

export async function deleteList(id) {
  const client = requireSupabase()

  const { error } = await client.from('gift_lists').delete().eq('id', id)

  if (error) throw error

  return true
}