import Button from '../components/Button'
import Input from '../components/Input'
import Textarea from '../components/Textarea'

export default function CreateList() {
  return (
    <section className="mx-auto max-w-2xl py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-950">Create new list</h1>
        <p className="mt-2 text-gray-600">
          Add the basic details. You can use Gift List for birthdays, weddings, personal wishlists, holidays, home needs, or anything else.
        </p>
      </div>

      <form className="space-y-5 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
        <Input id="title" label="List title" type="text" placeholder="My wishlist" />

        <div className="grid gap-5 sm:grid-cols-2">
          <Input
            id="purpose"
            label="Purpose"
            type="text"
            placeholder="Birthday, home, wedding, personal..."
          />

          <Input id="targetDate" label="Target date optional" type="date" />
        </div>

        <Textarea
          id="description"
          label="Description"
          rows="4"
          placeholder="Tell people what this list is for..."
        />

        <Button>Create list</Button>
      </form>
    </section>
  )
}