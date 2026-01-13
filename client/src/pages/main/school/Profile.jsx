import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const SchoolProfile = () => {
    const [form, setForm] = useState({
        name: "МБОУ СОШ №2",
        district: "Якутск",
        phone: "+7 (4112) 44-44-44",
        email: "school2@yakutsk.ru",
        address: "ул. Ленина, д. 1"
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Профиль сохранен!");
    };

    return (
        <div className="max-w-2xl">
            <div className="mb-8">
                <h1 className="text-2xl font-bold tracking-tight">Профиль школы</h1>
                <p className="text-slate-500">Управление информацией об учебном заведении</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
                <div className="grid gap-2">
                    <Label htmlFor="name">Название школы</Label>
                    <Input
                        id="name"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="district">Район / Город</Label>
                        <Input
                            id="district"
                            value={form.district}
                            onChange={e => setForm({ ...form, district: e.target.value })}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="address">Адрес</Label>
                        <Input
                            id="address"
                            value={form.address}
                            onChange={e => setForm({ ...form, address: e.target.value })}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="phone">Телефон</Label>
                        <Input
                            id="phone"
                            value={form.phone}
                            onChange={e => setForm({ ...form, phone: e.target.value })}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            value={form.email}
                            onChange={e => setForm({ ...form, email: e.target.value })}
                        />
                    </div>
                </div>

                <div className="pt-4">
                    <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        Сохранить изменения
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default SchoolProfile;
