import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import Button from '../components/Button'
import Input from '../components/Input'
import Textarea from '../components/Textarea'
import { createGift } from '../services/giftService'

export default function AddGift() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    currency: 'MZN',
    productUrl: '',
    imageUrl: '',
    priority: 'medium',
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
      await createGift({
        listId: id,
        name: form.name,
        description: form.description,
        price: form.price,
        currency: form.currency,
        productUrl: form.productUrl,
        imageUrl: form.imageUrl,
        priority: form.priority,
      })

      navigate(`/lists/${id}`)
    } catch (error) {
      setErrorMessage(error.message || 'Could not add gift.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="mx-auto max-w-2xl py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-950">Add gift</h1>
        <p className="mt-2 text-gray-600">
          Add the gift details so guests know exactly what you would like.
        </p>
      </div>

      <form
        className="space-y-5 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm"
        onSubmit={handleSubmit}
      >
        <Input
          id="name"
          label="Gift name"
          type="text"
          placeholder="Wireless headphones"
          value={form.name}
          onChange={handleChange}
          required
        />

        <Textarea
          id="description"
          label="Description"
          rows="4"
          placeholder="Color, size, model, or any extra details..."
          value={form.description}
          onChange={handleChange}
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <Input
            id="price"
            label="Price optional"
            type="number"
            placeholder="2500"
            value={form.price}
            onChange={handleChange}
          />

          <Input
            id="currency"
            label="Currency"
            type="text"
            placeholder="MZN"
            value={form.currency}
            onChange={handleChange}
          />
        </div>

        <Input
          id="productUrl"
          label="Product link optional"
          type="url"
          placeholder="https://store.com/item"
          value={form.productUrl}
          onChange={handleChange}
        />

        <Input
          id="imageUrl"
          label="Image link optional"
          type="url"
          placeholder="https://example.com/image.jpg"
          value={form.imageUrl}
          onChange={handleChange}
        />

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700" htmlFor="priority">
            Priority
          </label>
          <select
            id="priority"
            className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-purple-700"
            value={form.priority}
            onChange={handleChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        {errorMessage && (
          <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMessage}
          </p>
        )}

        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Adding gift...' : 'Add gift'}
        </Button>
      </form>
    </section>
  )
}