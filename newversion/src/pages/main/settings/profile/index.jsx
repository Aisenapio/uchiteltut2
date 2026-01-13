import ContentSection from "../components/content-section"
import { AccountForm } from "./profile-form"

export default function SettingsProfilePage() {
  return (
    <ContentSection title="Профиль" desc="Обновите данные вашего профиля.">
      <AccountForm />
    </ContentSection>
  )
}
