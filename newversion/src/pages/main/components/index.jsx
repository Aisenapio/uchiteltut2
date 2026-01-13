import { Header } from "@/components/layout/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getComponentDemo } from "./component-demos";

const componentsData = [
  // UI Components
  {
    category: "UI Компоненты",
    components: [
      {
        name: "Accordion",
        path: "ui/accordion",
        description: "Вертикально складывающийся компонент для отображения контента в раскрывающихся секциях. Используется для создания FAQ, списков с деталями и других интерактивных элементов.",
      },
      {
        name: "Alert",
        path: "ui/alert",
        description: "Компонент для отображения важных сообщений пользователю. Поддерживает различные варианты стилизации для разных типов уведомлений (информация, предупреждение, ошибка, успех).",
      },
      {
        name: "Alert Dialog",
        path: "ui/alert-dialog",
        description: "Модальное диалоговое окно для подтверждения действий пользователя. Используется для критических операций, требующих подтверждения перед выполнением.",
      },
      {
        name: "Avatar",
        path: "ui/avatar",
        description: "Компонент для отображения аватаров пользователей. Поддерживает изображения, инициалы и fallback-варианты при отсутствии изображения.",
      },
      {
        name: "Badge",
        path: "ui/badge",
        description: "Небольшой компонент для отображения меток, статусов и категорий. Используется для тегов, счетчиков и индикаторов состояния.",
      },
      {
        name: "Breadcrumb",
        path: "ui/breadcrumb",
        description: "Навигационный компонент для отображения иерархии страниц. Помогает пользователям понять их текущее местоположение в приложении.",
      },
      {
        name: "Button",
        path: "ui/button",
        description: "Базовый компонент кнопки с различными вариантами стилизации (default, destructive, outline, secondary, ghost, link) и размерами. Поддерживает иконки и состояния загрузки.",
      },
      {
        name: "Calendar",
        path: "ui/calendar",
        description: "Компонент календаря для выбора дат. Интегрируется с date-fns для работы с датами и поддерживает различные режимы выбора (одиночная дата, диапазон).",
      },
      {
        name: "Card",
        path: "ui/card",
        description: "Универсальный компонент карточки для группировки контента. Включает заголовок, описание, контент и футер. Используется для отображения структурированной информации.",
      },
      {
        name: "Chart",
        path: "ui/chart",
        description: "Компонент для отображения графиков и диаграмм на основе Recharts. Поддерживает различные типы визуализации данных (линейные, столбчатые, круговые графики).",
      },
      {
        name: "Chart Skeleton",
        path: "ui/chart-skeleton",
        description: "Skeleton-компонент для отображения состояния загрузки графиков. Используется для улучшения UX во время загрузки данных.",
      },
      {
        name: "Checkbox",
        path: "ui/checkbox",
        description: "Компонент чекбокса для выбора одного или нескольких элементов из списка. Поддерживает неопределенное состояние и интеграцию с формами.",
      },
      {
        name: "Collapsible",
        path: "ui/collapsible",
        description: "Компонент для создания раскрывающихся и сворачивающихся секций контента. Используется для создания интерактивных элементов интерфейса.",
      },
      {
        name: "Command",
        path: "ui/command",
        description: "Компонент командной панели с поиском и фильтрацией. Используется для создания меню команд, поиска и навигации по приложению.",
      },
      {
        name: "Dialog",
        path: "ui/dialog",
        description: "Модальное диалоговое окно для отображения важной информации или форм. Поддерживает различные размеры и варианты использования.",
      },
      {
        name: "Drawer",
        path: "ui/drawer",
        description: "Боковая панель, выезжающая с края экрана. Используется для мобильных интерфейсов и дополнительного контента. Адаптивен для разных размеров экрана.",
      },
      {
        name: "Dropdown Menu",
        path: "ui/dropdown-menu",
        description: "Выпадающее меню с различными опциями. Поддерживает вложенные меню, разделители и иконки. Используется для контекстных действий.",
      },
      {
        name: "Form",
        path: "ui/form",
        description: "Компонент формы с валидацией на основе react-hook-form и zod. Обеспечивает структурированную работу с формами и обработку ошибок.",
      },
      {
        name: "Input",
        path: "ui/input",
        description: "Базовый компонент поля ввода текста. Поддерживает различные типы (text, email, password, number и др.) и состояния (disabled, error).",
      },
      {
        name: "Label",
        path: "ui/label",
        description: "Компонент метки для полей формы. Обеспечивает доступность и связь между меткой и соответствующим полем ввода.",
      },
      {
        name: "Pagination",
        path: "ui/pagination",
        description: "Компонент пагинации для навигации по страницам данных. Поддерживает различные варианты отображения и настройки количества элементов на странице.",
      },
      {
        name: "Popover",
        path: "ui/popover",
        description: "Всплывающее окно, появляющееся рядом с элементом-триггером. Используется для отображения дополнительной информации или действий.",
      },
      {
        name: "Progress",
        path: "ui/progress",
        description: "Компонент индикатора прогресса. Используется для отображения статуса выполнения задачи или загрузки данных.",
      },
      {
        name: "Radio Group",
        path: "ui/radio-group",
        description: "Группа радиокнопок для выбора одного варианта из нескольких. Используется в формах для выбора единственного значения.",
      },
      {
        name: "Scroll Area",
        path: "ui/scroll-area",
        description: "Компонент области прокрутки с кастомным скроллбаром. Обеспечивает единообразный стиль прокрутки во всех браузерах.",
      },
      {
        name: "Select",
        path: "ui/select",
        description: "Компонент выпадающего списка для выбора одного значения из списка опций. Поддерживает поиск, группировку и кастомные опции.",
      },
      {
        name: "Separator",
        path: "ui/separator",
        description: "Визуальный разделитель для группировки контента. Используется для создания четких границ между секциями интерфейса.",
      },
      {
        name: "Sheet",
        path: "ui/sheet",
        description: "Боковая панель, выезжающая с края экрана. Альтернатива Drawer с дополнительными возможностями настройки позиционирования.",
      },
      {
        name: "Sidebar",
        path: "ui/sidebar",
        description: "Компонент боковой панели навигации. Поддерживает сворачивание, группировку элементов и адаптивное поведение.",
      },
      {
        name: "Skeleton",
        path: "ui/skeleton",
        description: "Компонент-заглушка для отображения состояния загрузки. Используется для улучшения восприятия времени загрузки контента.",
      },
      {
        name: "Stats Card Skeleton",
        path: "ui/stats-card-skeleton",
        description: "Специализированный skeleton для карточек статистики. Используется при загрузке данных дашборда.",
      },
      {
        name: "Switch",
        path: "ui/switch",
        description: "Компонент переключателя (toggle) для булевых значений. Используется для включения/выключения функций и настроек.",
      },
      {
        name: "Table",
        path: "ui/table",
        description: "Компонент таблицы для отображения структурированных данных. Включает заголовки, строки, ячейки и поддерживает сортировку и фильтрацию.",
      },
      {
        name: "Table Skeleton",
        path: "ui/table-skeleton",
        description: "Skeleton-компонент для состояния загрузки таблиц. Отображает структуру таблицы во время загрузки данных.",
      },
      {
        name: "Tabs",
        path: "ui/tabs",
        description: "Компонент вкладок для организации контента в отдельные панели. Используется для группировки связанного контента.",
      },
      {
        name: "Textarea",
        path: "ui/textarea",
        description: "Компонент многострочного текстового поля. Используется для ввода длинных текстов, комментариев и описаний.",
      },
      {
        name: "Tooltip",
        path: "ui/tooltip",
        description: "Всплывающая подсказка, появляющаяся при наведении на элемент. Используется для отображения дополнительной информации.",
      },
    ],
  },
  // Custom Components
  {
    category: "Кастомные Компоненты",
    components: [
      {
        name: "Back Button",
        path: "back-button",
        description: "Кнопка для возврата на предыдущую страницу. Использует навигацию React Router для перехода назад в истории браузера.",
      },
      {
        name: "Calendar Date Picker",
        path: "calendar-date-picker",
        description: "Комбинированный компонент календаря и выбора даты. Объединяет функциональность календаря с удобным интерфейсом выбора.",
      },
      {
        name: "Command Menu",
        path: "command-menu",
        description: "Меню команд с поиском для быстрого доступа к функциям приложения. Использует Command компонент для создания командной панели.",
      },
      {
        name: "Confirm Dialog",
        path: "confirm-dialog",
        description: "Диалог подтверждения для критических действий. Обеспечивает безопасность при выполнении необратимых операций.",
      },
      {
        name: "Copy Button",
        path: "copy-button",
        description: "Кнопка для копирования текста в буфер обмена. Включает визуальную обратную связь при успешном копировании.",
      },
      {
        name: "Date Input",
        path: "date-input",
        description: "Поле ввода для даты с валидацией. Обеспечивает удобный ввод даты с поддержкой различных форматов.",
      },
      {
        name: "Date Picker",
        path: "date-picker",
        description: "Компонент выбора даты с календарем. Интегрируется с date-fns для форматирования и работы с датами.",
      },
      {
        name: "Date Range Picker",
        path: "date-range-picker",
        description: "Компонент для выбора диапазона дат. Позволяет выбрать начальную и конечную дату для фильтрации данных.",
      },
      {
        name: "Logo",
        path: "logo",
        description: "Компонент логотипа приложения. Поддерживает различные варианты отображения (светлый/темный) в зависимости от темы.",
      },
      {
        name: "Long Text",
        path: "long-text",
        description: "Компонент для отображения длинного текста с возможностью обрезки и раскрытия. Используется для предварительного просмотра контента.",
      },
      {
        name: "Password Input",
        path: "password-input",
        description: "Специализированное поле ввода для паролей с возможностью показать/скрыть пароль. Включает индикатор силы пароля.",
      },
      {
        name: "Search",
        path: "search",
        description: "Компонент поиска с фильтрацией результатов в реальном времени. Используется для поиска по контенту приложения.",
      },
      {
        name: "Search Input",
        path: "search-input",
        description: "Поле ввода для поиска с иконкой и очисткой. Обеспечивает удобный интерфейс для ввода поисковых запросов.",
      },
      {
        name: "Search Provider",
        path: "search-provider",
        description: "Провайдер контекста для глобального поиска по приложению. Обеспечивает единую точку доступа к функции поиска.",
      },
      {
        name: "Select Dropdown",
        path: "select-dropdown",
        description: "Расширенный компонент выпадающего списка с дополнительными возможностями фильтрации и кастомизации.",
      },
      {
        name: "Theme Provider",
        path: "theme-provider",
        description: "Провайдер темы для управления светлой и темной темой приложения. Обеспечивает переключение и сохранение предпочтений.",
      },
      {
        name: "Theme Switch",
        path: "theme-switch",
        description: "Переключатель темы для быстрого изменения между светлой и темной темой. Интегрируется с Theme Provider.",
      },
    ],
  },
  // Layout Components
  {
    category: "Компоненты Макета",
    components: [
      {
        name: "App Sidebar",
        path: "layout/app-sidebar",
        description: "Главная боковая панель навигации приложения. Включает меню, переключатель команд и информацию о пользователе.",
      },
      {
        name: "Header",
        path: "layout/header",
        description: "Компонент заголовка страницы. Используется для отображения заголовков, действий и навигации на страницах.",
      },
      {
        name: "Nav Group",
        path: "layout/nav-group",
        description: "Группа навигационных элементов в сайдбаре. Обеспечивает структурированную организацию пунктов меню.",
      },
      {
        name: "Nav User",
        path: "layout/nav-user",
        description: "Компонент отображения информации о пользователе в сайдбаре. Включает аватар, имя и меню действий.",
      },
      {
        name: "Team Switcher",
        path: "layout/team-switcher",
        description: "Компонент переключения между командами/организациями. Позволяет пользователю выбирать активную команду.",
      },
    ],
  },
  // Charts Components
  {
    category: "Компоненты Графиков",
    components: [
      {
        name: "Line Chart (Simple)",
        path: "charts/line-simple",
        description: "Простой линейный график с одной линией. Используется для отображения трендов и изменений во времени.",
      },
      {
        name: "Line Chart (Multiple)",
        path: "charts/line-multiple",
        description: "Линейный график с несколькими линиями для сравнения разных метрик. Включает легенду и tooltip.",
      },
      {
        name: "Area Chart",
        path: "charts/area",
        description: "График с заливкой (Area Chart) с градиентами. Используется для отображения объемов и наложенных данных.",
      },
      {
        name: "Bar Chart",
        path: "charts/bar",
        description: "Столбчатый график для сравнения категориальных данных. Поддерживает несколько серий данных.",
      },
      {
        name: "Stacked Bar Chart",
        path: "charts/bar-stacked",
        description: "Стековый столбчатый график для отображения составных данных. Каждый столбец показывает части целого.",
      },
      {
        name: "Pie Chart",
        path: "charts/pie",
        description: "Круговая диаграмма (Pie Chart) с внутренним радиусом (donut chart). Используется для отображения пропорций.",
      },
      {
        name: "Radar Chart",
        path: "charts/radar",
        description: "Радарный график для отображения многомерных данных. Полезен для сравнения нескольких метрик одновременно.",
      },
      {
        name: "Mini Line Chart",
        path: "charts/mini-line",
        description: "Мини-линейный график для встраивания в карточки статистики. Компактный вариант для быстрого обзора трендов.",
      },
      {
        name: "Общий доход",
        path: "total-revenue",
        description: "Компонент карточки для отображения общего дохода с мини-графиком тренда. Включает текущее значение, процент изменения и визуализацию динамики дохода.",
      },
      {
        name: "Бюджеты - Сводный",
        path: "budget-summary",
        description: "Компонент для отображения сводной информации о бюджетах с переключателем между категориями (десктоп/мобильный) и столбчатым графиком. Показывает общие бюджеты за период с возможностью переключения между метриками.",
      },
    ],
  },
  // Statistics Components
  {
    category: "Компоненты Статистики",
    components: [
      {
        name: "Dashboard 2 Style",
        path: "stats/dashboard-2",
        description: "Карточка статистики с иконкой в цветном круге, значением, процентом изменения, прибылью и ссылкой 'Просмотреть отчет'. Используется в dashboard-2.",
      },
      {
        name: "Dashboard 3 Style",
        path: "stats/dashboard-3",
        description: "Карточка статистики с бейджем иконки, значением, процентом с трендом вверх/вниз и текстом сравнения. Используется в dashboard-3.",
      },
      {
        name: "Dashboard with Chart",
        path: "stats/dashboard-with-chart",
        description: "Карточка статистики с мини-графиком справа, значением, процентом изменения и описанием. Используется в dashboard-1 и dashboard-5.",
      },
      {
        name: "Dashboard 6 Style",
        path: "stats/dashboard-6",
        description: "Компактная карточка статистики с мини-графиком, значением, изменением в денежном формате и процентом. Используется в dashboard-6.",
      },
      {
        name: "Analytics Style",
        path: "stats/analytics",
        description: "Карточка статистики с фоном muted, значением в денежном формате и трендом с процентами и абсолютным значением. Используется в analytics boards.",
      },
      {
        name: "Simple Stats",
        path: "stats/simple",
        description: "Простая карточка статистики с иконкой, значением и описанием. Используется в UsersStats и других простых случаях.",
      },
      {
        name: "Subscribers Style",
        path: "stats/subscribers",
        description: "Карточка статистики с большим значением (text-4xl), иконкой и описанием. Интерактивная с hover эффектом. Используется в SubscribersStats.",
      },
    ],
  },
  // Error Components
  {
    category: "Компоненты Ошибок",
    components: [
      {
        name: "Forbidden",
        path: "errors/forbidden",
        description: "Компонент страницы ошибки 403 (Доступ запрещен). Отображается когда у пользователя нет прав доступа к ресурсу.",
      },
      {
        name: "General Error",
        path: "errors/general-error",
        description: "Универсальный компонент для отображения общих ошибок. Используется для обработки непредвиденных ошибок.",
      },
      {
        name: "Maintenance Error",
        path: "errors/maintenance-error",
        description: "Компонент страницы технического обслуживания (503). Отображается во время планового обслуживания системы.",
      },
      {
        name: "Not Found Error",
        path: "errors/not-found-error",
        description: "Компонент страницы ошибки 404 (Не найдено). Отображается когда запрашиваемый ресурс не существует.",
      },
      {
        name: "Unauthorized Error",
        path: "errors/unauthorized-error",
        description: "Компонент страницы ошибки 401 (Не авторизован). Отображается когда требуется аутентификация для доступа к ресурсу.",
      },
    ],
  },
];

export default function ComponentsPage() {
  return (
    <>
      <Header />
      <div className="space-y-4 p-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Компоненты</h1>
          <p className="text-muted-foreground">
            Полный список всех компонентов, доступных в проекте
          </p>
        </div>

        <div className="space-y-8">
          {componentsData.map((category) => (
            <div key={category.category}>
              <div className="mb-4">
                <h2 className="text-2xl font-semibold mb-1">{category.category}</h2>
                <Separator />
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {category.components.map((component) => (
                  <Card 
                    key={component.name} 
                    className={`h-full flex flex-col ${component.path === "budget-summary" ? "md:col-span-2 lg:col-span-2" : ""}`}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg">{component.name}</CardTitle>
                        <Badge variant="outline" className="text-xs">
                          {component.path}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col gap-4">
                      <CardDescription className="text-sm leading-relaxed">
                        {component.description}
                      </CardDescription>
                      <div className="mt-auto pt-4 border-t">
                        <div className="text-xs font-medium mb-2 text-muted-foreground">
                          Демо:
                        </div>
                        <div className="min-h-[60px] flex items-center justify-center p-2 bg-muted/30 rounded-md">
                          {getComponentDemo(component.path)}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Всего компонентов:</strong>{" "}
            {componentsData.reduce(
              (total, category) => total + category.components.length,
              0
            )}
          </p>
        </div>
      </div>
    </>
  );
}

