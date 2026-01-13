import { z } from "zod"
import { useForm } from "react-hook-form"
import { IconMailPlus, IconSend } from "@tabler/icons-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import SelectDropdown from "@/components/select-dropdown"
import { userTypes } from "../data/data"


const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email обязателен." })
    .email({ message: "Email неверный." }),
  role: z.string().min(1, { message: "Роль обязательна." }),
  desc: z.string().optional(),
})

export function UsersInviteDialog({ open, onOpenChange }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", role: "", desc: "" },
  })

  const onSubmit = (values) => {
    form.reset()
    toast({
      title: "Вы отправили следующие значения:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    })
    onOpenChange(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset()
        onOpenChange(state)
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-left">
          <DialogTitle className="flex items-center gap-2">
            <IconMailPlus /> Пригласить пользователя
          </DialogTitle>
          <DialogDescription>
            Пригласите нового пользователя в вашу команду, отправив ему приглашение по email.
            Назначьте роль для определения уровня доступа.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            id="user-invite-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="eg: john.doe@gmail.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Роль</FormLabel>
                  <SelectDropdown
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                    placeholder="Выберите роль"
                    items={userTypes.map(({ label, value }) => ({
                      label,
                      value,
                    }))}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="desc"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Описание (необязательно)</FormLabel>
                  <FormControl>
                    <Textarea
                      className="resize-none"
                      placeholder="Добавьте личное сообщение к вашему приглашению (необязательно)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter className="gap-y-2">
          <DialogClose asChild>
            <Button variant="outline">Отмена</Button>
          </DialogClose>
          <Button type="submit" form="user-invite-form">
            Пригласить <IconSend />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
