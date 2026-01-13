import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ApplicationModal({ job, isOpen, onClose }) {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        message: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulation of sending data
        console.log("Submitting application:", formData, "for job:", job.id);
        alert(`Спасибо, ${formData.name}! Ваша заявка на вакансию "${job.position}" отправлена.`);
        onClose();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Отклик на вакансию</DialogTitle>
                    <DialogDescription>
                        {job.position} в {job.school}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">ФИО</Label>
                        <Input
                            id="name"
                            name="name"
                            placeholder="Иванов Иван Иванович"
                            required
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="phone">Телефон</Label>
                            <Input
                                id="phone"
                                name="phone"
                                placeholder="+7 (999) 000-00-00"
                                required
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="ivan@example.com"
                                required
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="message">Сопроводительное письмо / О себе</Label>
                        <Textarea
                            id="message"
                            name="message"
                            placeholder="Расскажите о своем опыте коротко..."
                            rows={4}
                            value={formData.message}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="resume">Резюме (файл)</Label>
                        <Input id="resume" type="file" disabled className="cursor-not-allowed opacity-50" />
                        <p className="text-[0.8rem] text-slate-500">Загрузка файлов временно недоступна в демо-режиме.</p>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>
                            Отмена
                        </Button>
                        <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">Отправить отклик</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog >
    );
}
