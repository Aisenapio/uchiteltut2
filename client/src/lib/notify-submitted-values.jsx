import { toast } from "@/hooks/use-toast"

export function nofitySubmittedValues(values) {
  toast({
    title: "Вы отправили следующие значения:",
    description: (
      <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        <code className="text-white">{JSON.stringify(values, null, 2)}</code>
      </pre>
    ),
  })
}
