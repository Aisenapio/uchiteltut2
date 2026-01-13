import * as React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { Line, LineChart, Area, AreaChart, Bar, BarChart, Pie, PieChart, Cell, Radar, RadarChart, PolarGrid, PolarAngleAxis, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Label as RechartsLabel } from "recharts";
import { IconCaretDownFilled, IconCaretUpFilled, IconInfoCircle, IconTrendingDown, IconTrendingUp, IconArrowNarrowRight, IconDots } from "@tabler/icons-react";
import { ArrowDownRight, ArrowUpRight, AlertCircle, Info, CheckCircle2, XCircle, MoreVertical, Package, Users, UserPlus } from "lucide-react";

export const ComponentDemos = {
  "ui/button": () => (
    <div className="flex flex-wrap gap-2">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),

  "ui/badge": () => (
    <div className="flex flex-wrap gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),

  "ui/input": () => (
    <div className="space-y-2 w-full max-w-sm">
      <Input placeholder="Введите текст..." />
      <Input type="email" placeholder="email@example.com" />
      <Input type="password" placeholder="Пароль" />
    </div>
  ),

  "ui/checkbox": () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="demo-checkbox" />
      <Label htmlFor="demo-checkbox">Согласен с условиями</Label>
    </div>
  ),

  "ui/switch": () => (
    <div className="flex items-center space-x-2">
      <Switch id="demo-switch" />
      <Label htmlFor="demo-switch">Включить уведомления</Label>
    </div>
  ),

  "ui/alert": () => (
    <div className="space-y-2">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Информация</AlertTitle>
        <AlertDescription>
          Это информационное сообщение для пользователя.
        </AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <XCircle className="h-4 w-4" />
        <AlertTitle>Ошибка</AlertTitle>
        <AlertDescription>
          Произошла ошибка при выполнении операции.
        </AlertDescription>
      </Alert>
    </div>
  ),

  "ui/avatar": () => (
    <div className="flex gap-2">
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>MC</AvatarFallback>
      </Avatar>
    </div>
  ),

  "ui/progress": () => (
    <div className="space-y-2 w-full max-w-sm">
      <Progress value={33} />
      <Progress value={66} />
      <Progress value={100} />
    </div>
  ),

  "ui/separator": () => (
    <div className="space-y-2">
      <div>Контент сверху</div>
      <Separator />
      <div>Контент снизу</div>
    </div>
  ),

  "ui/tabs": () => (
    <Tabs defaultValue="tab1" className="w-full max-w-md">
      <TabsList>
        <TabsTrigger value="tab1">Вкладка 1</TabsTrigger>
        <TabsTrigger value="tab2">Вкладка 2</TabsTrigger>
        <TabsTrigger value="tab3">Вкладка 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1" className="mt-2">
        Содержимое первой вкладки
      </TabsContent>
      <TabsContent value="tab2" className="mt-2">
        Содержимое второй вкладки
      </TabsContent>
      <TabsContent value="tab3" className="mt-2">
        Содержимое третьей вкладки
      </TabsContent>
    </Tabs>
  ),

  "ui/accordion": () => (
    <Accordion type="single" collapsible className="w-full max-w-md">
      <AccordionItem value="item-1">
        <AccordionTrigger>Первый пункт</AccordionTrigger>
        <AccordionContent>
          Содержимое первого пункта аккордеона.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Второй пункт</AccordionTrigger>
        <AccordionContent>
          Содержимое второго пункта аккордеона.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),

  "ui/card": () => (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Заголовок карточки</CardTitle>
        <CardDescription>Описание карточки</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Содержимое карточки с полезной информацией.</p>
      </CardContent>
    </Card>
  ),

  "ui/textarea": () => (
    <Textarea placeholder="Введите многострочный текст..." className="w-full max-w-sm" />
  ),

  "ui/radio-group": () => (
    <RadioGroup defaultValue="option1">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option1" id="option1" />
        <Label htmlFor="option1">Вариант 1</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option2" id="option2" />
        <Label htmlFor="option2">Вариант 2</Label>
      </div>
    </RadioGroup>
  ),

  "ui/label": () => (
    <div className="space-y-2 w-full max-w-sm">
      <Label htmlFor="demo-label">Метка для поля ввода</Label>
      <Input id="demo-label" placeholder="Связанное поле" />
    </div>
  ),

  "ui/scroll-area": () => (
    <ScrollArea className="h-24 w-full max-w-sm border rounded-md p-4">
      <div className="space-y-2">
        <div>Элемент 1</div>
        <div>Элемент 2</div>
        <div>Элемент 3</div>
        <div>Элемент 4</div>
        <div>Элемент 5</div>
        <div>Элемент 6</div>
        <div>Элемент 7</div>
      </div>
    </ScrollArea>
  ),

  "ui/skeleton": () => (
    <div className="space-y-2 w-full max-w-sm">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  ),

  "back-button": () => (
    <Button variant="outline" onClick={() => window.history.back()}>
      Назад
    </Button>
  ),

  "logo": () => (
    <div className="flex items-center gap-2">
      <div className="h-8 w-8 rounded bg-primary/20 flex items-center justify-center text-xs font-bold">L</div>
      <span className="text-lg font-bold">Logo</span>
    </div>
  ),

  "password-input": () => {
    const [showPassword, setShowPassword] = React.useState(false);
    return (
      <div className="space-y-2 w-full max-w-sm">
        <Input 
          type={showPassword ? "text" : "password"} 
          placeholder="Введите пароль"
        />
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? "Скрыть" : "Показать"}
        </Button>
      </div>
    );
  },

  "search-input": () => (
    <Input placeholder="Поиск..." className="w-full max-w-sm" />
  ),

  "theme-switch": () => (
    <div className="flex items-center space-x-2">
      <Switch />
      <Label>Темная тема</Label>
    </div>
  ),

  "ui/dialog": () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Открыть диалог</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Заголовок диалога</DialogTitle>
          <DialogDescription>
            Это пример модального диалогового окна.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  ),

  "ui/dropdown-menu": () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Профиль</DropdownMenuItem>
        <DropdownMenuItem>Настройки</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Выйти</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),

  "ui/popover": () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Открыть Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-2">
          <h4 className="font-medium">Заголовок</h4>
          <p className="text-sm text-muted-foreground">
            Содержимое popover с полезной информацией.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  ),

  "ui/tooltip": () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Наведите курсор</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Это подсказка</p>
      </TooltipContent>
    </Tooltip>
  ),

  "ui/select": () => (
    <Select defaultValue="option1">
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Выберите..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">Вариант 1</SelectItem>
        <SelectItem value="option2">Вариант 2</SelectItem>
        <SelectItem value="option3">Вариант 3</SelectItem>
      </SelectContent>
    </Select>
  ),

  "ui/alert-dialog": () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Удалить</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Вы уверены?</DialogTitle>
          <DialogDescription>
            Это действие нельзя отменить.
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-2 justify-end">
          <Button variant="outline">Отмена</Button>
          <Button variant="destructive">Удалить</Button>
        </div>
      </DialogContent>
    </Dialog>
  ),

  "ui/breadcrumb": () => (
    <div className="flex items-center gap-1 text-sm">
      <a href="#" className="text-muted-foreground hover:text-foreground">Главная</a>
      <span className="text-muted-foreground">/</span>
      <a href="#" className="text-muted-foreground hover:text-foreground">Страница</a>
      <span className="text-muted-foreground">/</span>
      <span className="text-foreground">Текущая</span>
    </div>
  ),

  "ui/calendar": () => (
    <div className="p-3 border rounded-md inline-block">
      <div className="text-sm font-medium mb-2">Календарь</div>
      <div className="grid grid-cols-7 gap-1 text-xs">
        {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map(day => (
          <div key={day} className="p-1 text-center text-muted-foreground">{day}</div>
        ))}
        {Array.from({ length: 7 }, (_, i) => (
          <div key={i} className="p-1 text-center">{i + 1}</div>
        ))}
      </div>
    </div>
  ),

  "ui/chart": () => (
    <div className="h-20 w-full bg-muted/30 rounded flex items-end justify-center gap-1 p-2">
      {[40, 60, 45, 80, 55, 70, 50].map((height, i) => (
        <div
          key={i}
          className="bg-primary rounded-t"
          style={{ height: `${height}%`, width: '12%' }}
        />
      ))}
    </div>
  ),

  "ui/chart-skeleton": () => (
    <div className="h-20 w-full bg-muted/30 rounded animate-pulse" />
  ),

  "ui/collapsible": () => {
    const [open, setOpen] = React.useState(false);
    return (
      <div className="space-y-2">
        <Button variant="outline" onClick={() => setOpen(!open)}>
          {open ? "Скрыть" : "Показать"} контент
        </Button>
        {open && (
          <div className="p-2 border rounded-md">
            Раскрывающийся контент
          </div>
        )}
      </div>
    );
  },

  "ui/command": () => (
    <div className="p-2 border rounded-md w-full max-w-sm">
      <Input placeholder="Поиск команд..." className="mb-2" />
      <div className="space-y-1 text-sm">
        <div className="p-2 hover:bg-muted rounded cursor-pointer">Команда 1</div>
        <div className="p-2 hover:bg-muted rounded cursor-pointer">Команда 2</div>
      </div>
    </div>
  ),

  "ui/drawer": () => (
    <Button variant="outline">Открыть Drawer</Button>
  ),

  "ui/form": () => (
    <div className="space-y-4 w-full max-w-sm">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="email@example.com" />
      </div>
      <Button type="submit">Отправить</Button>
    </div>
  ),

  "ui/pagination": () => (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm">Назад</Button>
      <Button variant="outline" size="sm">1</Button>
      <Button size="sm">2</Button>
      <Button variant="outline" size="sm">3</Button>
      <Button variant="outline" size="sm">Вперед</Button>
    </div>
  ),

  "ui/sheet": () => (
    <Button variant="outline">Открыть Sheet</Button>
  ),

  "ui/sidebar": () => (
    <div className="p-2 border rounded-md w-48">
      <div className="space-y-1 text-sm">
        <div className="p-2 hover:bg-muted rounded cursor-pointer">Пункт меню 1</div>
        <div className="p-2 hover:bg-muted rounded cursor-pointer">Пункт меню 2</div>
      </div>
    </div>
  ),

  "ui/stats-card-skeleton": () => (
    <div className="space-y-2">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-8 w-32" />
    </div>
  ),

  "ui/table": () => (
    <div className="border rounded-md overflow-hidden w-full max-w-sm">
      <table className="w-full text-sm">
        <thead className="bg-muted">
          <tr>
            <th className="p-2 text-left">Имя</th>
            <th className="p-2 text-left">Статус</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t">
            <td className="p-2">Иван</td>
            <td className="p-2">
              <Badge>Активен</Badge>
            </td>
          </tr>
          <tr className="border-t">
            <td className="p-2">Мария</td>
            <td className="p-2">
              <Badge variant="secondary">Неактивен</Badge>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  ),

  "ui/table-skeleton": () => (
    <div className="space-y-2 w-full max-w-sm">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
    </div>
  ),

  "calendar-date-picker": () => (
    <Button variant="outline">Выбрать дату</Button>
  ),

  "command-menu": () => (
    <Button variant="outline">Открыть меню команд</Button>
  ),

  "confirm-dialog": () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Подтвердить</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Подтверждение</DialogTitle>
          <DialogDescription>
            Вы уверены, что хотите выполнить это действие?
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  ),

  "copy-button": () => (
    <Button variant="outline" onClick={() => navigator.clipboard.writeText("Скопировано!")}>
      Копировать
    </Button>
  ),

  "date-input": () => (
    <Input type="date" className="w-full max-w-sm" />
  ),

  "date-picker": () => (
    <Button variant="outline">Выбрать дату</Button>
  ),

  "date-range-picker": () => (
    <div className="flex gap-2">
      <Button variant="outline" size="sm">От</Button>
      <Button variant="outline" size="sm">До</Button>
    </div>
  ),

  "long-text": () => (
    <div className="w-full max-w-sm">
      <p className="text-sm line-clamp-2">
        Это длинный текст, который будет обрезан и может быть раскрыт для просмотра полного содержимого.
      </p>
    </div>
  ),

  "search": () => (
    <div className="w-full max-w-sm">
      <Input placeholder="Поиск..." />
    </div>
  ),

  "select-dropdown": () => (
    <Select defaultValue="option1">
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">Опция 1</SelectItem>
        <SelectItem value="option2">Опция 2</SelectItem>
      </SelectContent>
    </Select>
  ),

  "layout/app-sidebar": () => (
    <div className="p-2 border rounded-md w-48 bg-muted/30">
      <div className="text-xs font-medium mb-2">Сайдбар</div>
      <div className="space-y-1 text-sm">
        <div className="p-1 rounded">Меню 1</div>
        <div className="p-1 rounded">Меню 2</div>
      </div>
    </div>
  ),

  "layout/header": () => (
    <div className="p-2 border rounded-md w-full max-w-sm flex items-center justify-between">
      <div className="font-semibold">Заголовок</div>
      <Button variant="ghost" size="sm">Действие</Button>
    </div>
  ),

  "layout/nav-group": () => (
    <div className="p-2 border rounded-md w-48">
      <div className="text-xs font-medium mb-2 text-muted-foreground">ГРУППА</div>
      <div className="space-y-1">
        <div className="p-1 text-sm">Пункт 1</div>
        <div className="p-1 text-sm">Пункт 2</div>
      </div>
    </div>
  ),

  "layout/nav-user": () => (
    <div className="flex items-center gap-2 p-2 border rounded-md">
      <Avatar>
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
      <div className="text-sm">
        <div className="font-medium">Пользователь</div>
        <div className="text-xs text-muted-foreground">user@example.com</div>
      </div>
    </div>
  ),

  "layout/team-switcher": () => (
    <div className="p-2 border rounded-md w-full max-w-sm">
      <div className="text-sm font-medium">Команда 1</div>
      <div className="text-xs text-muted-foreground">План: Pro</div>
    </div>
  ),

  "errors/forbidden": () => (
    <div className="p-4 border rounded-md text-center w-full max-w-sm">
      <XCircle className="h-8 w-8 mx-auto mb-2 text-destructive" />
      <div className="font-semibold">403</div>
      <div className="text-sm text-muted-foreground">Доступ запрещен</div>
    </div>
  ),

  "errors/general-error": () => (
    <div className="p-4 border rounded-md text-center w-full max-w-sm">
      <AlertCircle className="h-8 w-8 mx-auto mb-2 text-destructive" />
      <div className="font-semibold">Ошибка</div>
      <div className="text-sm text-muted-foreground">Что-то пошло не так</div>
    </div>
  ),

  "errors/maintenance-error": () => (
    <div className="p-4 border rounded-md text-center w-full max-w-sm">
      <div className="font-semibold mb-2">503</div>
      <div className="text-sm text-muted-foreground">Техническое обслуживание</div>
    </div>
  ),

  "errors/not-found-error": () => (
    <div className="p-4 border rounded-md text-center w-full max-w-sm">
      <div className="font-semibold mb-2">404</div>
      <div className="text-sm text-muted-foreground">Страница не найдена</div>
    </div>
  ),

  "errors/unauthorized-error": () => (
    <div className="p-4 border rounded-md text-center w-full max-w-sm">
      <XCircle className="h-8 w-8 mx-auto mb-2 text-destructive" />
      <div className="font-semibold">401</div>
      <div className="text-sm text-muted-foreground">Не авторизован</div>
    </div>
  ),

  // Статистика - Dashboard 2 стиль (с иконкой в круге и ссылкой)
  "stats/dashboard-2": () => {
    const chartData = Array.from({ length: 7 }, (_, i) => ({ value: Math.random() * 100 }));
    return (
      <Card className="w-full max-w-xs">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
          <CardTitle className="flex items-center gap-2 text-sm font-medium">
            <div className="bg-opacity-25 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600">
              <Users className="text-indigo-400" size={14} />
            </div>
            <span>Пользователи</span>
          </CardTitle>
          <IconDots className="cursor-pointer opacity-60" size={16} />
        </CardHeader>
        <CardContent className="space-y-[10px] px-4 pt-0 pb-4">
          <p className="text-2xl font-bold">4,523,189</p>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 text-emerald-400">
              <ArrowUpRight size={16} />
              <p className="text-xs font-bold">12%</p>
            </div>
            <p className="text-muted-foreground text-xs font-normal">+1,234 сегодня</p>
          </div>
          <div className="bg-muted-foreground h-[0.04px] w-full opacity-50" />
          <div className="flex items-center gap-2">
            <p className="text-xs font-medium">Просмотреть отчет</p>
            <IconArrowNarrowRight size={18} />
          </div>
        </CardContent>
      </Card>
    );
  },

  // Статистика - Dashboard 3 стиль (с бейджем иконки)
  "stats/dashboard-3": () => (
    <Card className="w-full max-w-xs">
      <CardHeader className="pt-4 pb-2">
        <div className="flex w-full items-center justify-between">
          <CardTitle>Доходы</CardTitle>
          <Badge variant="secondary" className="rounded-full p-1">
            <Package size={16} />
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0 pb-4">
        <div className="flex flex-col items-start gap-1">
          <h2 className="text-2xl font-bold">6,132</h2>
          <div className="flex items-center gap-2 font-medium text-emerald-500">
            <p className="text-sm">%15</p>
            <IconTrendingUp size={20} />
          </div>
          <p className="text-sm tracking-tight">по сравнению с предыдущими 30 днями</p>
        </div>
      </CardContent>
    </Card>
  ),

  // Статистика - Dashboard 1/5 стиль (с графиком)
  "stats/dashboard-with-chart": () => {
    const chartData = [
      { value: 45 },
      { value: 52 },
      { value: 48 },
      { value: 61 },
      { value: 55 },
      { value: 58 },
      { value: 62 },
    ];
    const chartConfig = {
      month: {
        label: "month",
        color: "hsl(var(--chart-1))",
      },
    };
    return (
      <Card className="w-full max-w-xs">
        <CardHeader className="flex flex-row items-center justify-between gap-5 space-y-0 pt-4 pb-2">
          <CardTitle className="flex items-center gap-2 truncate text-sm font-medium">
            <Users size={16} />
            Пользователи
          </CardTitle>
          <TooltipProvider>
            <Tooltip delayDuration={50}>
              <TooltipTrigger>
                <IconInfoCircle className="text-muted-foreground scale-90 stroke-[1.25]" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Общее количество пользователей</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardHeader>
        <CardContent className="flex h-[calc(100%_-_48px)] flex-col justify-between py-4">
          <div className="flex flex-col">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div className="text-3xl font-bold">4,682</div>
              <ChartContainer className="w-[70px]" config={chartConfig}>
                <LineChart accessibilityLayer data={chartData}>
                  <Line
                    dataKey="value"
                    type="linear"
                    stroke="var(--color-month)"
                    strokeWidth={1.5}
                    dot={false}
                  />
                </LineChart>
              </ChartContainer>
            </div>
            <p className="text-muted-foreground text-xs">С прошлой недели</p>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-5">
            <div className="text-sm font-semibold">Детали</div>
            <div className="flex items-center gap-1 text-emerald-500">
              <p className="text-[13px] leading-none font-medium">12%</p>
              <IconCaretUpFilled size={18} />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  },

  // Статистика - Dashboard 6 стиль (компактный с графиком)
  "stats/dashboard-6": () => {
    const chartData = [
      { value: 20 },
      { value: 35 },
      { value: 28 },
      { value: 42 },
      { value: 38 },
    ];
    const chartConfig = {
      day: {
        label: "day",
        color: "hsl(var(--chart-1))",
      },
    };
    return (
      <Card className="w-full max-w-xs">
        <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0 pb-1.5 pt-3">
          <CardTitle className="flex items-center gap-1.5 truncate">
            <Users size={11} />
            Платежи
          </CardTitle>
          <TooltipProvider>
            <Tooltip delayDuration={50}>
              <TooltipTrigger>
                <IconInfoCircle className="text-muted-foreground scale-75 stroke-[1.8]" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Всего платежей</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardHeader>
        <CardContent className="flex flex-col justify-between pb-3 pt-0">
          <div className="flex flex-col space-y-0.5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="text-4xl font-bold">₽312</div>
              <ChartContainer className="w-[48px]" config={chartConfig}>
                <LineChart accessibilityLayer data={chartData}>
                  <Line
                    dataKey="value"
                    type="linear"
                    stroke="var(--color-day)"
                    strokeWidth={1.2}
                    dot={false}
                  />
                </LineChart>
              </ChartContainer>
            </div>
            <p className="text-muted-foreground text-xs">За этот месяц</p>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 mt-2">
            <div className="text-xs font-semibold">
              <span className="text-xs text-emerald-500">+₽45</span>
            </div>
            <div className="flex items-center gap-1 text-emerald-500">
              <p className="text-xs leading-none font-medium">15%</p>
              <IconCaretUpFilled size={13} />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  },

  // Статистика - Analytics стиль (с фоном muted)
  "stats/analytics": () => (
    <Card className="bg-muted w-full max-w-xs">
      <CardHeader className="flex flex-row items-center justify-between px-4 pt-2 pb-2">
        <CardTitle className="flex items-center gap-2 text-sm font-medium">
          Продажи
        </CardTitle>
        <TooltipProvider>
          <Tooltip delayDuration={50}>
            <TooltipTrigger>
              <IconInfoCircle className="text-muted-foreground scale-90 stroke-[1.25]" />
            </TooltipTrigger>
            <TooltipContent>Общая сумма продаж</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>
      <CardContent className="px-4 pt-0 pb-3">
        <div className="text-lg font-bold sm:text-2xl">
          ₽4,567,820
        </div>
        <div className="flex items-center gap-1 text-xs font-medium text-emerald-500">
          <span className="inline-block">
            <IconTrendingUp size={20} />
          </span>
          <span>12%</span>
          <span>(+₽456,782)</span>
        </div>
      </CardContent>
    </Card>
  ),

  // Статистика - Users/Subscribers стиль (простая карточка)
  "stats/simple": () => (
    <Card className="w-full max-w-xs">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pt-4 pb-2">
        <CardTitle className="flex items-center gap-2 text-sm font-medium">
          <Users size={16} />
          Всего пользователей
        </CardTitle>
        <TooltipProvider>
          <Tooltip delayDuration={50}>
            <TooltipTrigger>
              <IconInfoCircle className="text-muted-foreground scale-90 stroke-[1.25]" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Общее количество зарегистрированных пользователей</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="text-2xl font-bold">1,234</div>
        <p className="text-muted-foreground text-xs">+12% за этот месяц</p>
      </CardContent>
    </Card>
  ),

  // Статистика - Subscribers стиль (большой размер)
  "stats/subscribers": () => (
    <Card className="w-full max-w-xs cursor-pointer transition-colors hover:bg-accent">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pt-4 pb-2">
        <CardTitle className="flex items-center gap-2">
          <UserPlus size={16} />
          Всего подписчиков
        </CardTitle>
        <TooltipProvider>
          <Tooltip delayDuration={50}>
            <TooltipTrigger>
              <IconInfoCircle className="text-muted-foreground scale-90 stroke-[1.25]" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Общее количество подписчиков</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="text-4xl font-bold">5,678</div>
        <p className="text-muted-foreground text-xs">85% от всех пользователей</p>
      </CardContent>
    </Card>
  ),

  // Графики - Line Chart (простой)
  "charts/line-simple": () => {
    const chartData = [
      { month: "Янв", value: 186 },
      { month: "Фев", value: 305 },
      { month: "Мар", value: 237 },
      { month: "Апр", value: 73 },
      { month: "Май", value: 209 },
      { month: "Июн", value: 214 },
    ];
    const chartConfig = {
      value: {
        label: "Значение",
        color: "var(--chart-1)",
      },
    };
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Простой линейный график</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[200px] w-full">
            <LineChart data={chartData}>
              <Line
                type="monotone"
                dataKey="value"
                stroke="var(--color-value)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    );
  },

  // Графики - Line Chart (с несколькими линиями)
  "charts/line-multiple": () => {
    const chartData = [
      { month: "Янв", desktop: 186, mobile: 80 },
      { month: "Фев", desktop: 305, mobile: 200 },
      { month: "Мар", desktop: 237, mobile: 120 },
      { month: "Апр", desktop: 73, mobile: 190 },
      { month: "Май", desktop: 209, mobile: 130 },
      { month: "Июн", desktop: 214, mobile: 140 },
    ];
    const chartConfig = {
      desktop: {
        label: "Десктоп",
        color: "var(--chart-1)",
      },
      mobile: {
        label: "Мобильный",
        color: "var(--chart-2)",
      },
    };
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Линейный график (несколько линий)</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[200px] w-full">
            <LineChart data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Line
                dataKey="desktop"
                type="monotone"
                stroke="var(--color-desktop)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                dataKey="mobile"
                type="monotone"
                stroke="var(--color-mobile)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    );
  },

  // Графики - Area Chart (с заливкой)
  "charts/area": () => {
    const chartData = [
      { month: "Янв", desktop: 186, mobile: 80 },
      { month: "Фев", desktop: 305, mobile: 200 },
      { month: "Мар", desktop: 237, mobile: 120 },
      { month: "Апр", desktop: 73, mobile: 190 },
      { month: "Май", desktop: 209, mobile: 130 },
      { month: "Июн", desktop: 214, mobile: 140 },
    ];
    const chartConfig = {
      desktop: {
        label: "Десктоп",
        color: "var(--chart-1)",
      },
      mobile: {
        label: "Мобильный",
        color: "var(--chart-2)",
      },
    };
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>График с заливкой (Area)</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[200px] w-full">
            <AreaChart data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <defs>
                <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-desktop)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--color-desktop)" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-mobile)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--color-mobile)" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <Area
                dataKey="mobile"
                type="natural"
                fill="url(#fillMobile)"
                fillOpacity={0.4}
                stroke="var(--color-mobile)"
                stackId="a"
              />
              <Area
                dataKey="desktop"
                type="natural"
                fill="url(#fillDesktop)"
                fillOpacity={0.4}
                stroke="var(--color-desktop)"
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    );
  },

  // Графики - Bar Chart (столбчатый)
  "charts/bar": () => {
    const chartData = [
      { month: "Янв", desktop: 186, mobile: 80 },
      { month: "Фев", desktop: 305, mobile: 200 },
      { month: "Мар", desktop: 237, mobile: 120 },
      { month: "Апр", desktop: 73, mobile: 190 },
      { month: "Май", desktop: 209, mobile: 130 },
      { month: "Июн", desktop: 214, mobile: 140 },
    ];
    const chartConfig = {
      desktop: {
        label: "Десктоп",
        color: "var(--chart-1)",
      },
      mobile: {
        label: "Мобильный",
        color: "var(--chart-2)",
      },
    };
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Столбчатый график (Bar)</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[200px] w-full">
            <BarChart data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
              <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    );
  },

  // Графики - Stacked Bar Chart (стековый столбчатый)
  "charts/bar-stacked": () => {
    const chartData = [
      { month: "Янв", desktop: 186, mobile: 80 },
      { month: "Фев", desktop: 305, mobile: 200 },
      { month: "Мар", desktop: 237, mobile: 120 },
      { month: "Апр", desktop: 73, mobile: 190 },
      { month: "Май", desktop: 209, mobile: 130 },
      { month: "Июн", desktop: 214, mobile: 140 },
    ];
    const chartConfig = {
      desktop: {
        label: "Не оплачено",
        color: "var(--chart-1)",
      },
      mobile: {
        label: "Оплачено",
        color: "var(--chart-2)",
      },
    };
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Стековый столбчатый график</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[200px] w-full">
            <BarChart data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="desktop" stackId="a" fill="var(--color-desktop)" radius={[0, 0, 3, 3]} />
              <Bar dataKey="mobile" stackId="a" fill="var(--color-mobile)" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    );
  },

  // Графики - Pie Chart (круговой)
  "charts/pie": () => {
    const chartData = [
      { name: "Успешные", value: 245, fill: "#22c55e" },
      { name: "Ожидающие", value: 28, fill: "#f59e0b" },
      { name: "Неудачные", value: 12, fill: "#ef4444" },
    ];
    const chartConfig = {
      successful: { label: "Успешные", color: "#22c55e" },
      pending: { label: "Ожидающие", color: "#f59e0b" },
      failed: { label: "Неудачные", color: "#ef4444" },
    };
    const total = chartData.reduce((acc, curr) => acc + curr.value, 0);
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Круговая диаграмма (Pie)</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[200px]">
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                innerRadius={40}
                outerRadius={64}
                strokeWidth={4}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
                <RechartsLabel
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                          <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-lg font-bold">
                            {total}
                          </tspan>
                          <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 16} className="fill-muted-foreground text-xs">
                            Всего
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
          <div className="mt-3 flex flex-col gap-1.5 text-xs">
            {chartData.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.fill }} />
                  <span>{item.name}</span>
                </div>
                <span className="font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  },

  // Графики - Radar Chart (радарный)
  "charts/radar": () => {
    const chartData = [
      { month: "Январь", desktop: 186, mobile: 160 },
      { month: "Февраль", desktop: 185, mobile: 170 },
      { month: "Март", desktop: 207, mobile: 180 },
      { month: "Апрель", desktop: 173, mobile: 160 },
      { month: "Май", desktop: 160, mobile: 190 },
      { month: "Июнь", desktop: 174, mobile: 204 },
    ];
    const chartConfig = {
      desktop: {
        label: "Десктоп",
        color: "var(--chart-1)",
      },
      mobile: {
        label: "Мобильный",
        color: "var(--chart-2)",
      },
    };
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Радарный график (Radar)</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="mx-auto aspect-square h-[200px] w-full">
            <RadarChart data={chartData}>
              <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
              <PolarAngleAxis dataKey="month" />
              <PolarGrid radialLines={false} />
              <Radar
                dataKey="desktop"
                fill="var(--color-desktop)"
                fillOpacity={0}
                stroke="var(--color-desktop)"
                strokeWidth={2}
              />
              <Radar
                dataKey="mobile"
                fill="var(--color-mobile)"
                fillOpacity={0}
                stroke="var(--color-mobile)"
                strokeWidth={2}
              />
            </RadarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    );
  },

  // Графики - Mini Line Chart (мини-график в карточке)
  "charts/mini-line": () => {
    const chartData = [
      { value: 45 },
      { value: 52 },
      { value: 48 },
      { value: 61 },
      { value: 55 },
      { value: 58 },
      { value: 62 },
    ];
    const chartConfig = {
      value: {
        label: "value",
        color: "hsl(var(--chart-1))",
      },
    };
    return (
      <div className="flex items-center gap-4 p-4 border rounded-md">
        <div>
          <div className="text-2xl font-bold">4,682</div>
          <p className="text-xs text-muted-foreground">С прошлой недели</p>
        </div>
        <ChartContainer className="w-[70px]" config={chartConfig}>
          <LineChart accessibilityLayer data={chartData}>
            <Line
              dataKey="value"
              type="linear"
              stroke="var(--color-value)"
              strokeWidth={1.5}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </div>
    );
  },

  // Компонент Общий доход
  "total-revenue": () => {
    const data = [
      { revenue: 10400 },
      { revenue: 14405 },
      { revenue: 9400 },
      { revenue: 8200 },
      { revenue: 7000 },
      { revenue: 9600 },
      { revenue: 11244 },
      { revenue: 26475 },
    ];
    const chartConfig = {
      revenue: {
        label: "Доход",
        color: "var(--primary)",
      },
    };
    return (
      <Card className="w-full max-w-sm h-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-normal">Общий доход</CardTitle>
        </CardHeader>
        <CardContent className="h-[calc(100%_-_52px)] pb-0">
          <div className="text-2xl font-bold">₽15,231.89</div>
          <p className="text-muted-foreground text-xs">+20.1% с прошлого месяца</p>
          <ChartContainer config={chartConfig} className="h-[80px] w-full mt-2">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 0,
              }}
            >
              <Line
                type="monotone"
                strokeWidth={2}
                dataKey="revenue"
                stroke="var(--color-revenue)"
                activeDot={{
                  r: 6,
                }}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    );
  },

  // Компонент Бюджеты - Сводный
  "budget-summary": () => {
    const [activeChart, setActiveChart] = React.useState("desktop");
    const chartData = [
      { date: "2024-04-01", desktop: 222, mobile: 150 },
      { date: "2024-04-02", desktop: 97, mobile: 180 },
      { date: "2024-04-03", desktop: 167, mobile: 120 },
      { date: "2024-04-04", desktop: 242, mobile: 260 },
      { date: "2024-04-05", desktop: 373, mobile: 290 },
      { date: "2024-04-06", desktop: 301, mobile: 340 },
      { date: "2024-04-07", desktop: 245, mobile: 180 },
    ];
    const chartConfig = {
      desktop: {
        label: "Десктоп",
        color: "var(--chart-1)",
      },
      mobile: {
        label: "Мобильный",
        color: "var(--chart-2)",
      },
    };
    const total = {
      desktop: chartData.reduce((acc, curr) => acc + curr.desktop, 0),
      mobile: chartData.reduce((acc, curr) => acc + curr.mobile, 0),
    };
    return (
      <Card className="w-full max-w-4xl">
        <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
          <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
            <CardTitle>Бюджеты - Сводный</CardTitle>
            <CardDescription>
              Показаны общие бюджеты за последние 3 месяца
            </CardDescription>
          </div>
          <div className="flex">
            {["desktop", "mobile"].map((key) => {
              const chart = key;
              return (
                <button
                  key={chart}
                  data-active={activeChart === chart}
                  className="data-[active=true]:bg-muted/50 relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
                  onClick={() => setActiveChart(chart)}
                >
                  <span className="text-muted-foreground text-xs">
                    {chartConfig[chart].label}
                  </span>
                  <span className="text-lg leading-none font-bold sm:text-3xl">
                    {total[key].toLocaleString()}
                  </span>
                </button>
              );
            })}
          </div>
        </CardHeader>
        <CardContent className="px-2 sm:p-6">
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[200px] w-full"
          >
            <BarChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("ru-RU", {
                    month: "short",
                    day: "numeric",
                  });
                }}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-[150px]"
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString("ru-RU", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      });
                    }}
                  />
                }
              />
              <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    );
  },
};

// Функция для получения демо компонента
export function getComponentDemo(path) {
  const DemoComponent = ComponentDemos[path];
  if (DemoComponent) {
    return <DemoComponent />;
  }
  // Если демо нет, показываем заглушку
  return (
    <div className="p-4 border rounded-lg bg-muted/50 text-sm text-muted-foreground">
      Демо недоступно
    </div>
  );
}

