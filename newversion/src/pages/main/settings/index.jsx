import ContentSection from "./components/content-section"
import GeneralForm from "./components/general-form"

export default function SettingsGeneralPage() {
  return (
    <ContentSection
      title="Общие"
      desc="Настройки и параметры для вашего приложения."
      className="w-full lg:max-w-full"
    >
      <GeneralForm />
    </ContentSection>
  )
}
