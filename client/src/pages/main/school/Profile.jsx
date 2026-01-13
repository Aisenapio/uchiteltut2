import { useState, useEffect } from "react";
import { useQuery, useMutation } from '@apollo/client/react';
import { GET_SCHOOL_PROFILE, UPDATE_SCHOOL_PROFILE } from '@/graphql/schoolOperations';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const SchoolProfile = () => {
    const [form, setForm] = useState({
        name: "",
        district: "",
        phone: "",
        email: "",
        address: "",
        website: "",
        description: ""
    });

    const { loading, error, data } = useQuery(GET_SCHOOL_PROFILE);
    const [updateSchoolProfile] = useMutation(UPDATE_SCHOOL_PROFILE);

    useEffect(() => {
        if (data?.me) {
            setForm({
                name: data.me.name || "",
                district: data.me.district || "",
                phone: data.me.phone || "",
                email: data.me.email || "",
                address: data.me.address || "",
                website: data.me.schoolDetails?.website || "",
                description: data.me.schoolDetails?.description || ""
            });
        }
    }, [data]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await updateSchoolProfile({
                variables: {
                    input: form
                }
            });
            alert("Профиль сохранен!");
        } catch (err) {
            console.error('Error updating profile:', err);
            alert(`Ошибка при сохранении профиля: ${err.message}`);
        }
    };

    if (loading) return <div className="p-6">Загрузка профиля...</div>;
    if (error) return <div className="p-6">Ошибка: {error.message}</div>;

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
                        <Label htmlFor="email">Email (нельзя изменить)</Label>
                        <Input
                            id="email"
                            value={form.email}
                            disabled
                            className="bg-slate-50"
                        />
                    </div>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="website">Веб-сайт</Label>
                    <Input
                        id="website"
                        value={form.website}
                        onChange={e => setForm({ ...form, website: e.target.value })}
                        placeholder="https://example.com"
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="description">Описание школы</Label>
                    <Textarea
                        id="description"
                        value={form.description}
                        onChange={e => setForm({ ...form, description: e.target.value })}
                        placeholder="Расскажите о вашей школе..."
                        rows={4}
                    />
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
