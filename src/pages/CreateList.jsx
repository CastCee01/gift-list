import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from '../components/Button'
import Input from '../components/Input'
import Textarea from '../components/Textarea'
import { getCurrentUser } from '../services/authService'
import { createList } from '../services/listService'

export default function CreateList() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    title: '',
    purpose: '',
    targetDate: '',
    description: '',
  })
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  function handleChange(event) {
    const { id, value } = event.target

    setForm((currentForm) => ({
      ...currentForm,
      [id]: value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setErrorMessage('')
    setIsLoading(true)

    try {
      const user = await getCurrentUser()

      if (!user) {
        navigate('/login')
        return
      }

      const newList = await createList({
        userId: user.id,
        title: form.title,
        purpose: form.purpose,
        targetDate: form.targetDate,
        description: form.description,
      })

      navigate(`/lists/${newList.id}`)
    } catch (error) {
      setErrorMessage(error.message || 'Could not create gift list.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="mx-auto max-w-2xl py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-950">Create gift list</h1>
        <p className="mt-2 text-gray-600">
          Add the basic details. You can use Gift List for birthdays, weddings,
          personal wishlists, holidays, home needs, or anything else.
        </p>
      </div>

      <form
        className="space-y-5 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm"
        onSubmit={handleSubmit}
      >
        <Input
          id="title"
          label="List title"
          type="text"
          placeholder="My birthday wishlist"
          value={form.title}
          onChange={handleChange}
          required
        />

        <Input
          id="purpose"
          label="Purpose"
          type="text"
          placeholder="Birthday, home needs, wedding, wishlist..."
          value={form.purpose}
          onChange={handleChange}
        />

        <Input
          id="targetDate"
          label="Target date optional"
          type="date"
          value={form.targetDate}
          onChange={handleChange}
        />

        <Textarea
          id="description"
          label="Description"
          rows="4"
          placeholder="Add a short note for guests..."
          value={form.description}
          onChange={handleChange}
        />

        {errorMessage && (
          <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMessage}
          </p>
        )}

        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Creating list...' : 'Create list'}
        </Button>
      </form>
    </section>
  )
}