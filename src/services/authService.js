import { supabase } from '../lib/supabaseClient'

function requireSupabase() {
  if (!supabase) {
    throw new Error('Supabase is not configured. Check your .env file.')
  }

  return supabase
}

export async function signUp({ name, email, password }) {
  const client = requireSupabase()

  const { data, error } = await client.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      },
    },
  })

  if (error) throw error

  return data
}

export async function signIn({ email, password }) {
  const client = requireSupabase()

  const { data, error } = await client.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw error

  return data
}

export async function signOut() {
  const client = requireSupabase()

  const { error } = await client.auth.signOut()

  if (error) throw error

  return true
}

export async function getCurrentUser() {
  const client = requireSupabase()

  const {
    data: { user },
    error,
  } = await client.auth.getUser()

  if (error) throw error

  return user
}