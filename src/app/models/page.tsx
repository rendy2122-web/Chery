import { redirect } from 'next/navigation'

// Redirect the main /models page to the default model showcase
export default function ModelsPage() {
  redirect('/models/eq1')
}