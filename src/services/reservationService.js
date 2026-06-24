import { supabase } from '../lib/supabaseClient'

function requireSupabase() {
  if (!supabase) {
    throw new Error('Supabase is not configured. Check your .env file.')
  }

  return supabase
}

export async function reserveGift({
  giftItemId,
  listId,
  guestName,
  guestEmail = null,
  message = null,
}) {
  const client = requireSupabase()

  const { data, error } = await client
    .rpc('reserve_gift', {
      p_gift_item_id: giftItemId,
      p_list_id: listId,
      p_guest_name: guestName,
      p_guest_email: guestEmail || null,
      p_message: message || null,
    })

  if (error) throw error

  return data
}

export async function getReservationsByListId(listId) {
  const client = requireSupabase()

  const { data, error } = await client
    .from('reservations')
    .select('*')
    .eq('list_id', listId)
    .eq('status', 'active')

  if (error) throw error

  return data
}