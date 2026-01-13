import { useState, useRef, useEffect } from "react";
import { useQuery, useMutation } from '@apollo/client/react';
import { GET_TEACHER_PROFILE, UPDATE_TEACHER_PROFILE } from '@/graphql/teacherOperations';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, Save, Upload, FileText, Briefcase, GraduationCap, Download } from "lucide-react";

const UPLOAD_SERVER_URL = 'http://localhost:4000/upload';

export default function TeacherProfile() {
    const fileInputRef = useRef(null);
    const resumeFileRef = useRef(null);
    const [profile, setProfile] = useState({
        firstName: "",
        lastName: "",
        middleName: "",
        birthDate: "",
        phone: "",
        email: "",
        education: [],
        experience: [],
        about: "",
        category: "",
        subjects: "",
        resumeFileName: null,
        resumeBase64: null
    });

    const { loading, error, data } = useQuery(GET_TEACHER_PROFILE);
    const [updateTeacherProfile] = useMutation(UPDATE_TEACHER_PROFILE);

    useEffect(() => {
        if (data?.me) {
            const teacherDetails = data.me.teacherDetails || {};
            setProfile(prev => ({
                ...prev,
                firstName: data.me.firstName || "",
                lastName: data.me.lastName || "",
                email: data.me.email || "",
                // Map teacherDetails fields
                education: teacherDetails.education ? JSON.parse(teacherDetails.education) : [],
                experience: teacherDetails.experience ? JSON.parse(teacherDetails.experience) : [],
                subjects: teacherDetails.subjects ? teacherDetails.subjects.join(', ') : "",
                // Handle resume
                resumeFileName: teacherDetails.resume ? "resume.pdf" : null,
                resumeBase64: teacherDetails.resume || null
            }));
        }
    }, [data]);

    const handleChange = (field, value) => {
        setProfile(prev => ({ ...prev, [field]: value }));
    };

    // Education Handlers
    const addEducation = () => {
        const newEdu = { id: Date.now(), institution: "", faculty: "", year: "", level: "" };
        setProfile(prev => ({ ...prev, education: [...prev.education, newEdu] }));
    };

    const removeEducation = (id) => {
        setProfile(prev => ({ ...prev, education: prev.education.filter(e => e.id !== id) }));
    };

    const updateEducation = (id, field, value) => {
        setProfile(prev => ({
            ...prev,
            education: prev.education.map(e => e.id === id ? { ...e, [field]: value } : e)
        }));
    };

    // Experience Handlers
    const addExperience = () => {
        const newExp = { id: Date.now(), place: "", position: "", start: "", end: "" };
        setProfile(prev => ({ ...prev, experience: [...prev.experience, newExp] }));
    };

    const removeExperience = (id) => {
        setProfile(prev => ({ ...prev, experience: prev.experience.filter(e => e.id !== id) }));
    };

    const updateExperience = (id, field, value) => {
        setProfile(prev => ({
            ...prev,
            experience: prev.experience.map(e => e.id === id ? { ...e, [field]: value } : e)
        }));
    };

    // File Handler
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.type !== "application/pdf") {
            alert("Пожалуйста, загрузите файл в формате PDF");
            return;
        }

        // Store file object for upload
        resumeFileRef.current = file;

        const reader = new FileReader();
        reader.onload = (event) => {
            const base64 = event.target.result;
            setProfile(prev => ({
                ...prev,
                resumeFileName: file.name,
                resumeBase64: base64
            }));
        };
        reader.onerror = () => {
            alert("Ошибка при чтении файла");
        };
        reader.readAsDataURL(file);
    };

    // Upload resume file to upload server
    const uploadResumeFile = async (file) => {
        const formData = new FormData();
        formData.append('resume', file);

        const response = await fetch(`${UPLOAD_SERVER_URL}`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `Upload failed with status ${response.status}`);
        }

        const result = await response.json();
        return result.fileUrl; // Return the URL of the uploaded file
    };

    // Save profile handler
    const handleSave = async () => {
        try {
            let resumeUrl = profile.resumeBase64;

            // If a new file was selected, upload it
            if (resumeFileRef.current) {
                try {
                    resumeUrl = await uploadResumeFile(resumeFileRef.current);
                    // Clear the file ref after successful upload
                    resumeFileRef.current = null;
                } catch (uploadError) {
                    alert(`Ошибка загрузки файла: ${uploadError.message}`);
                    return;
                }
            } else if (profile.resumeFileName === null) {
                // User removed the file, set resume to null
                resumeUrl = null;
            }
            // If resumeBase64 already contains a URL (from previous upload) and no new file, keep it as is

            // Prepare teacherDetails input according to GraphQL schema
            const teacherDetailsInput = {
                education: Array.isArray(profile.education) ? JSON.stringify(profile.education) : profile.education,
                experience: Array.isArray(profile.experience) ? JSON.stringify(profile.experience) : profile.experience,
                subjects: profile.subjects ? profile.subjects.split(',').map(s => s.trim()).filter(s => s) : [],
                certifications: [], // Not implemented yet
                resume: resumeUrl
            };

            await updateTeacherProfile({
                variables: {
                    input: teacherDetailsInput
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
        <div className="space-y-6 max-w-5xl mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Электронная трудовая книжка</h1>
                    <p className="text-slate-500">Ваше профессиональное портфолио и история работы.</p>
                </div>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" onClick={handleSave}>
                    <Save className="mr-2 h-4 w-4" /> Сохранить изменения
                </Button>
            </div>

            <div className="grid gap-6">
                {/* 1. Personal Info */}
                <Card>
                    <CardHeader>
                        <CardTitle>Личные данные</CardTitle>
                        <CardDescription>Основная информация</CardDescription>
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="grid grid-cols-3 gap-2">
                                <div className="space-y-2 col-span-1">
                                    <Label>Фамилия</Label>
                                    <Input value={profile.lastName} onChange={(e) => handleChange("lastName", e.target.value)} />
                                </div>
                                <div className="space-y-2 col-span-1">
                                    <Label>Имя</Label>
                                    <Input value={profile.firstName} onChange={(e) => handleChange("firstName", e.target.value)} />
                                </div>
                                <div className="space-y-2 col-span-1">
                                    <Label>Отчество</Label>
                                    <Input value={profile.middleName} onChange={(e) => handleChange("middleName", e.target.value)} />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Дата рождения</Label>
                                <Input type="date" value={profile.birthDate} onChange={(e) => handleChange("birthDate", e.target.value)} />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label>Телефон</Label>
                                <Input value={profile.phone} onChange={(e) => handleChange("phone", e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>Email</Label>
                                <Input value={profile.email} onChange={(e) => handleChange("email", e.target.value)} />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* 2. Resume / Documents */}
                <Card className="border-primary/20 bg-primary/5">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <FileText className="h-5 w-5 text-primary" />
                            Резюме
                        </CardTitle>
                        <CardDescription>Загрузите готовое резюме в формате PDF</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-4">
                            <input
                                type="file"
                                accept=".pdf"
                                ref={fileInputRef}
                                className="hidden"
                                onChange={handleFileChange}
                            />
                            <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="border-dashed border-2">
                                <Upload className="mr-2 h-4 w-4" />
                                {profile.resumeFileName ? "Заменить файл" : "Загрузить PDF"}
                            </Button>
                            {profile.resumeFileName && (
                                <div className="flex items-center gap-2 text-sm text-primary font-medium p-2 bg-white rounded border border-primary/10">
                                    <FileText className="h-4 w-4" />
                                    {profile.resumeFileName}
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6 text-slate-400 hover:text-primary"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (profile.resumeBase64) {
                                                // Check if it's a URL (starts with http://, https://, or /)
                                                if (profile.resumeBase64.startsWith('http://') ||
                                                    profile.resumeBase64.startsWith('https://') ||
                                                    profile.resumeBase64.startsWith('/')) {
                                                    // Open URL in new tab
                                                    window.open(profile.resumeBase64, '_blank');
                                                } else {
                                                    // Assume it's a data URL (base64)
                                                    const link = document.createElement('a');
                                                    link.href = profile.resumeBase64;
                                                    link.download = profile.resumeFileName || 'resume.pdf';
                                                    link.click();
                                                }
                                            }
                                        }}
                                        title="Скачать резюме"
                                    >
                                        <Download className="h-3 w-3" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6 text-slate-400 hover:text-destructive"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            // Clear file input
                                            if (fileInputRef.current) {
                                                fileInputRef.current.value = '';
                                            }
                                            // Clear stored file object
                                            resumeFileRef.current = null;
                                            // Clear profile state
                                            setProfile(prev => ({
                                                ...prev,
                                                resumeFileName: null,
                                                resumeBase64: null
                                            }));
                                        }}
                                        title="Удалить резюме"
                                    >
                                        <Trash2 className="h-3 w-3" />
                                    </Button>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* 3. Work Experience (Dynamic) */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="flex items-center gap-2">
                                <Briefcase className="h-5 w-5 text-slate-500" />
                                Трудовая деятельность
                            </CardTitle>
                            <CardDescription>История работы (начиная с последнего места)</CardDescription>
                        </div>
                        <Button size="sm" variant="outline" onClick={addExperience}>
                            <Plus className="mr-2 h-4 w-4" /> Добавить
                        </Button>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {profile.experience.map((exp, index) => (
                            <div key={exp.id} className="grid md:grid-cols-12 gap-4 p-4 rounded-lg border bg-slate-50 relative group">
                                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10" onClick={() => removeExperience(exp.id)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                                <div className="md:col-span-4 space-y-2">
                                    <Label>Период работы</Label>
                                    <div className="flex items-center gap-2">
                                        <Input
                                            placeholder="Год начала"
                                            value={exp.start}
                                            onChange={(e) => updateExperience(exp.id, "start", e.target.value)}
                                        />
                                        <span className="text-slate-400">-</span>
                                        <Input
                                            placeholder="Год окончания"
                                            value={exp.end}
                                            onChange={(e) => updateExperience(exp.id, "end", e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="md:col-span-8 space-y-2">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Организация</Label>
                                            <Input
                                                placeholder="Название школы..."
                                                value={exp.place}
                                                onChange={(e) => updateExperience(exp.id, "place", e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Должность</Label>
                                            <Input
                                                placeholder="Кем работали..."
                                                value={exp.position}
                                                onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {profile.experience.length === 0 && (
                            <p className="text-center text-slate-500 py-4 italic">Записи отсутствуют. Добавьте место работы.</p>
                        )}
                    </CardContent>
                </Card>

                {/* 4. Education (Dynamic) */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="flex items-center gap-2">
                                <GraduationCap className="h-5 w-5 text-slate-500" />
                                Образование
                            </CardTitle>
                            <CardDescription>Высшее и среднее профессиональное</CardDescription>
                        </div>
                        <Button size="sm" variant="outline" onClick={addEducation}>
                            <Plus className="mr-2 h-4 w-4" /> Добавить
                        </Button>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {profile.education.map((edu, index) => (
                            <div key={edu.id} className="grid md:grid-cols-12 gap-4 p-4 rounded-lg border bg-slate-50 relative group">
                                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10" onClick={() => removeEducation(edu.id)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <Label>Год выпуска</Label>
                                    <Input
                                        placeholder="20XX"
                                        value={edu.year}
                                        onChange={(e) => updateEducation(edu.id, "year", e.target.value)}
                                    />
                                </div>
                                <div className="md:col-span-10 space-y-2">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="space-y-2 md:col-span-1">
                                            <Label>Уровень</Label>
                                            <Select value={edu.level} onValueChange={(v) => updateEducation(edu.id, "level", v)}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Выберите" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Среднее">Среднее</SelectItem>
                                                    <SelectItem value="Бакалавр">Бакалавр</SelectItem>
                                                    <SelectItem value="Магистр">Магистр</SelectItem>
                                                    <SelectItem value="Специалист">Специалист</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <Label>Учебное заведение и Факультет</Label>
                                            <div className="flex gap-2">
                                                <Input
                                                    placeholder="ВУЗ/Колледж"
                                                    value={edu.institution}
                                                    onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                                                />
                                                <Input
                                                    placeholder="Факультет"
                                                    value={edu.faculty}
                                                    onChange={(e) => updateEducation(edu.id, "faculty", e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* 5. Additional Info */}
                <Card>
                    <CardHeader>
                        <CardTitle>Навыки и достижение</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Предметы (через запятую)</Label>
                                <Input value={profile.subjects} onChange={(e) => handleChange("subjects", e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>Квалификационная категория</Label>
                                <Select value={profile.category} onValueChange={(v) => handleChange("category", v)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Выберите категорию" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Без категории">Без категории</SelectItem>
                                        <SelectItem value="Первая">Первая</SelectItem>
                                        <SelectItem value="Высшая">Высшая</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>О себе и достижениях</Label>
                            <Textarea
                                className="min-h-[100px]"
                                value={profile.about}
                                onChange={(e) => handleChange("about", e.target.value)}
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
