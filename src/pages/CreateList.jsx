import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from '../components/Button'
import Input from '../components/Input'
import Textarea from '../components/Textarea'
import { useLanguage } from '../i18n/LanguageContext'
import { getCurrentUser } from '../services/authService'
import { createList } from '../services/listService'

export default function CreateList() {
  const navigate = useNavigate()
  const { t } = useLanguage()

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
      setErrorMessage(error.message || t('createListErrorFallback'))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="mx-auto max-w-2xl py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-950">
          {t('createListTitle')}
        </h1>
        <p className="mt-2 text-gray-600">
          {t('createListDescription')}
        </p>
      </div>

      <form
        className="space-y-5 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm"
        onSubmit={handleSubmit}
      >
        <Input
          id="title"
          label={t('listTitleLabel')}
          type="text"
          placeholder={t('listTitlePlaceholder')}
          value={form.title}
          onChange={handleChange}
          required
        />

        <Input
          id="purpose"
          label={t('purposeLabel')}
          type="text"
          placeholder={t('purposePlaceholder')}
          value={form.purpose}
          onChange={handleChange}
        />

        <Input
          id="targetDate"
          label={t('targetDateLabel')}
          type="date"
          value={form.targetDate}
          onChange={handleChange}
        />

        <Textarea
          id="description"
          label={t('descriptionLabel')}
          rows="4"
          placeholder={t('descriptionPlaceholder')}
          value={form.description}
          onChange={handleChange}
        />

        {errorMessage && (
          <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMessage}
          </p>
        )}

        <Button type="submit" disabled={isLoading}>
          {isLoading ? t('createListSubmitting') : t('createListSubmit')}
        </Button>
      </form>
    </section>
  )
}