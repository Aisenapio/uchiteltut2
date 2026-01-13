import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery, useMutation } from '@apollo/client/react';
import { GET_VACANCY_BY_ID, CREATE_VACANCY, UPDATE_VACANCY, GET_SUPPORT_OPTIONS } from '@/graphql/schoolOperations';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
// import { supportOptions } from "@/data/mock";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

const EditVacancy = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = !!id;
    const [openSupport, setOpenSupport] = useState(false);
    const [supportSearch, setSupportSearch] = useState("");
    const [form, setForm] = useState({
        title: "",
        position: "",
        description: "",
        salary: "",
        hours: "",
        duties: "",
        benefits: "",
        support: "",
        studentEmployment: false,
        location: "",
        subject: "",
        requirements: []
    });

    // Query to get vacancy data if editing
    const { loading, error, data } = useQuery(GET_VACANCY_BY_ID, {
        variables: { id },
        skip: !isEditing,
    });

    // Query to get support options from server
    const { data: supportOptionsData } = useQuery(GET_SUPPORT_OPTIONS);
    const supportOptions = supportOptionsData?.supportOptions || [];

    // Mutation for creating/updating vacancy
    const [createVacancy] = useMutation(CREATE_VACANCY);
    const [updateVacancy] = useMutation(UPDATE_VACANCY);

    useEffect(() => {
        if (isEditing && data?.job) {
            setForm({
                title: data.job.title || data.job.position,
                position: data.job.position,
                description: data.job.description || data.job.duties,
                salary: data.job.salary,
                hours: data.job.hours,
                duties: data.job.duties,
                benefits: data.job.benefits,
                support: data.job.support,
                studentEmployment: data.job.studentEmployment,
                location: data.job.location,
                subject: data.job.subject,
                requirements: data.job.requirements || []
            });
        }
    }, [data, isEditing]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare input for server
        const title = form.title || form.position;
        const description = form.description || form.duties;
        const input = {
            title: title,
            position: form.position,
            description: description,
            salary: form.salary,
            location: form.location,
            hours: form.hours ? parseInt(form.hours) : 0,
            duties: form.duties ? form.duties.split('\n').filter(line => line.trim()) : [],
            benefits: form.benefits ? form.benefits.split('\n').filter(line => line.trim()) : [],
            support: form.support,
            studentEmployment: form.studentEmployment,
            subject: form.subject,
            requirements: form.requirements
        };

        try {
            if (isEditing) {
                // Update existing vacancy
                await updateVacancy({
                    variables: {
                        id: id,
                        input: input
                    }
                });
                alert("Вакансия обновлена!");
            } else {
                // Create new vacancy
                await createVacancy({
                    variables: {
                        input: input
                    }
                });
                alert("Вакансия создана!");
            }
            navigate("/dashboard/school");
        } catch (err) {
            console.error('Error saving vacancy:', err);
            alert(`Ошибка при сохранении вакансии: ${err.message}`);
        }
    };

    if (isEditing && loading) return <div>Загрузка...</div>;
    if (isEditing && error) return <div>Ошибка: {error.message}</div>;

    return (
        <div className="max-w-2xl">
            <div className="mb-8">
                <h1 className="text-2xl font-bold tracking-tight">
                    {isEditing ? "Редактирование вакансии" : "Новая вакансия"}
                </h1>
                <p className="text-slate-500">
                    {isEditing ? "Измените детали вакансии ниже" : "Заполните форму, чтобы опубликовать вакансию"}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
                <div className="grid gap-2">
                    <Label htmlFor="position">Название должности</Label>
                    <Input
                        id="position"
                        value={form.position}
                        onChange={e => setForm({ ...form, position: e.target.value })}
                        placeholder="Учитель математики"
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="salary">Зарплата</Label>
                        <Input
                            id="salary"
                            value={form.salary}
                            onChange={e => setForm({ ...form, salary: e.target.value })}
                            placeholder="от 45 000 ₽"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="hours">Нагрузка (часы)</Label>
                        <Input
                            id="hours"
                            value={form.hours}
                            onChange={e => setForm({ ...form, hours: e.target.value })}
                            placeholder="18 часов"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="location">Местоположение</Label>
                        <Input
                            id="location"
                            value={form.location}
                            onChange={e => setForm({ ...form, location: e.target.value })}
                            placeholder="Якутск"
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="subject">Предмет</Label>
                        <Input
                            id="subject"
                            value={form.subject}
                            onChange={e => setForm({ ...form, subject: e.target.value })}
                            placeholder="Математика"
                        />
                    </div>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="duties">Обязанности</Label>
                    <Textarea
                        id="duties"
                        value={form.duties}
                        onChange={e => setForm({ ...form, duties: e.target.value })}
                        placeholder="Проведение уроков, подготовка к экзаменам..."
                        rows={4}
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="benefits">Условия и льготы</Label>
                    <Textarea
                        id="benefits"
                        value={form.benefits}
                        onChange={e => setForm({ ...form, benefits: e.target.value })}
                        placeholder="Оплата проезда, северные надбавки..."
                        rows={2}
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="support">Меры поддержки</Label>
                    <Popover open={openSupport} onOpenChange={setOpenSupport}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={openSupport}
                                className="w-full justify-between font-normal text-left"
                            >
                                {form.support || "Выберите или введите свое..."}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                            <Command>
                                <CommandInput
                                    placeholder="Поиск или ввод новой меры..."
                                    value={supportSearch}
                                    onValueChange={(val) => {
                                        setSupportSearch(val);
                                        // Allow custom value immediately if it doesn't match
                                        if (!supportOptions.includes(val)) {
                                            // Optional: logic to handle custom value typing
                                        }
                                    }}
                                />
                                <CommandList>
                                    <CommandEmpty>
                                        <button
                                            className="w-full text-left px-2 py-1.5 text-sm hover:bg-slate-100 rounded-sm"
                                            onClick={() => {
                                                setForm({ ...form, support: supportSearch });
                                                setOpenSupport(false);
                                            }}
                                        >
                                            Использовать: "{supportSearch}"
                                        </button>
                                    </CommandEmpty>
                                    <CommandGroup>
                                        {supportOptions.map((option) => (
                                            <CommandItem
                                                key={option}
                                                value={option}
                                                onSelect={(currentValue) => {
                                                    setForm({ ...form, support: currentValue });
                                                    setOpenSupport(false);
                                                }}
                                            >
                                                <Check
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        form.support === option ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                                {option}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>

                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="student"
                        checked={form.studentEmployment}
                        onCheckedChange={(checked) => setForm({ ...form, studentEmployment: checked })}
                    />
                    <Label htmlFor="student" className="font-normal text-slate-700">Готовы рассмотреть студентов старших курсов</Label>
                </div>

                <div className="flex gap-4 pt-4">
                    <Button type="button" variant="outline" onClick={() => navigate("/dashboard/school")}>
                        Отмена
                    </Button>
                    <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        {isEditing ? "Сохранить изменения" : "Опубликовать вакансию"}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default EditVacancy;
