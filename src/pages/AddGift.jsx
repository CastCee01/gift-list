import Button from '../components/Button'
import Input from '../components/Input'
import Textarea from '../components/Textarea'

export default function AddGift() {
  return (
    <section className="mx-auto max-w-2xl py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-950">Add gift</h1>
        <p className="mt-2 text-gray-600">
          Add the gift details so guests know exactly what you would like.
        </p>
      </div>

      <form className="space-y-5 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
        <Input id="name" label="Gift name" type="text" placeholder="Wireless headphones" />

        <Textarea
          id="description"
          label="Description"
          rows="4"
          placeholder="Color, size, model, or any extra details..."
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <Input id="price" label="Price optional" type="number" placeholder="2500" />

          <Input id="currency" label="Currency" type="text" placeholder="MZN" />
        </div>

        <Input
          id="productUrl"
          label="Product link optional"
          type="url"
          placeholder="https://store.com/item"
        />

        <Input
          id="imageUrl"
          label="Image link optional"
          type="url"
          placeholder="https://example.com/image.jpg"
        />

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700" htmlFor="priority">
            Priority
          </label>
          <select
            id="priority"
            className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-purple-700"
            defaultValue="medium"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <Button>Add gift</Button>
      </form>
    </section>
  )
}