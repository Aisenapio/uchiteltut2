import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery, useMutation } from "@apollo/client/react";
import { GET_VACANCY_BY_ID } from "@/graphql/schoolOperations";
import { GET_TEACHER_PROFILE, SUBMIT_JOB_RESPONSE, WITHDRAW_JOB_RESPONSE, GET_TEACHER_APPLICATIONS } from "@/graphql/teacherOperations";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, School, Banknote, Clock, Award, Phone, Mail } from "lucide-react";
import { toast } from "sonner";

const JobDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isApplying, setIsApplying] = useState(false);

    const { loading, error, data } = useQuery(GET_VACANCY_BY_ID, {
        variables: { id }
    });

    // Check if user is authenticated
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [hasResume, setHasResume] = useState(false);
    const [hasApplied, setHasApplied] = useState(false);
    const [applicationId, setApplicationId] = useState(null);

    // Get teacher profile if authenticated
    const { data: teacherData } = useQuery(GET_TEACHER_PROFILE, {
        skip: !isAuthenticated,
    });

    // Get teacher applications to check if already applied
    const { data: applicationsData, refetch: refetchApplications } = useQuery(GET_TEACHER_APPLICATIONS, {
        skip: !isAuthenticated,
    });

    // Mutation for submitting job response
    const [submitJobResponse] = useMutation(SUBMIT_JOB_RESPONSE, {
        onCompleted: (data) => {
            setIsApplying(false);
            toast.success("Отклик успешно отправлен!");
            refetchApplications();
        },
        onError: (error) => {
            setIsApplying(false);
            toast.error(`Ошибка отправки отклика: ${error.message}`);
        }
    });

    // Mutation for withdrawing job response
    const [withdrawJobResponse] = useMutation(WITHDRAW_JOB_RESPONSE, {
        onCompleted: () => {
            setIsApplying(false);
            toast.success("Отклик успешно отменен!");
            refetchApplications();
        },
        onError: (error) => {
            setIsApplying(false);
            toast.error(`Ошибка отмены отклика: ${error.message}`);
        }
    });

    const job = data?.job;

    // Check authentication on component mount
    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
    }, []);

    // Check if teacher has resume
    useEffect(() => {
        const resume = teacherData?.me?.teacherDetails?.resume;
        if (resume && resume.trim() !== '') {
            setHasResume(true);
        } else {
            setHasResume(false);
        }
    }, [teacherData]);

    // Check if teacher has already applied to this job
    useEffect(() => {
        if (applicationsData?.teacherApplications && job) {
            const application = applicationsData.teacherApplications.find(
                app => app.job?.id === job.id
            );
            if (application) {
                setHasApplied(true);
                setApplicationId(application.id);
            } else {
                setHasApplied(false);
                setApplicationId(null);
            }
        } else {
            setHasApplied(false);
            setApplicationId(null);
        }
    }, [applicationsData, job]);

    const handleApplyClick = async () => {
        if (!isAuthenticated) {
            // Redirect to login page
            navigate('/login');
            return;
        }

        if (hasApplied) {
            // Withdraw application
            if (!confirm('Вы уверены, что хотите отменить отклик?')) return;
            setIsApplying(true);
            try {
                await withdrawJobResponse({
                    variables: { applicationId }
                });
            } catch (error) {
                // Error handling is done in onError callback
            }
            return;
        }

        if (!hasResume) {
            // Redirect to profile page to fill resume
            navigate('/dashboard/teacher');
            return;
        }

        // All checks passed, submit application
        setIsApplying(true);
        try {
            await submitJobResponse({
                variables: { jobId: id }
            });
        } catch (error) {
            // Error handling is done in onError callback
        }
    };

    if (loading) {
        return (
            <div className="text-center py-20">
                <h1 className="text-2xl font-bold text-slate-900">Загрузка вакансии...</h1>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-20">
                <h1 className="text-2xl font-bold text-slate-900 text-red-600">Ошибка: {error.message}</h1>
                <Button onClick={() => navigate("/")} variant="link" className="mt-4 text-primary">
                    Вернуться на главную
                </Button>
            </div>
        );
    }

    if (!job) {
        return (
            <div className="text-center py-20">
                <h1 className="text-2xl font-bold text-slate-900">Вакансия не найдена</h1>
                <Button onClick={() => navigate("/")} variant="link" className="mt-4 text-primary">
                    Вернуться на главную
                </Button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <Button onClick={() => navigate(-1)} variant="ghost" className="mb-6 pl-0 hover:bg-transparent text-primary hover:text-primary/80 gap-2">
                <ArrowLeft className="w-4 h-4" />
                Назад к списку
            </Button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                        <div className="flex flex-wrap gap-2 mb-4">
                            {job.housing && <Badge variant="secondary" className="bg-primary/10 text-primary">🏠 {job.housing}</Badge>}
                            {job.studentEmployment && <Badge variant="secondary" className="bg-purple-50 text-purple-700">🎓 Для студентов</Badge>}
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900 mb-4">{job.position}</h1>
                        <div className="flex flex-col gap-2 text-slate-600 mb-6">
                            <div className="flex items-center gap-2">
                                <School className="w-5 h-5 text-slate-400" />
                                <span className="font-medium">{job.school?.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-slate-400" />
                                <span>{job.school?.district}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 mb-6">
                            <div>
                                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Зарплата</p>
                                <p className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                    <Banknote className="w-4 h-4 text-green-600" />
                                    {job.salary}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Нагрузка</p>
                                <p className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-primary" />
                                    {job.hours}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <section>
                                <h3 className="text-lg font-bold text-slate-900 mb-3 border-b pb-2">Обязанности</h3>
                                <p className="text-slate-700 leading-relaxed">{job.duties}</p>
                            </section>

                            <section>
                                <h3 className="text-lg font-bold text-slate-900 mb-3 border-b pb-2">Меры поддержки</h3>
                                <div className="flex items-start gap-3 bg-green-50 p-4 rounded-xl text-green-900">
                                    <Award className="w-5 h-5 mt-0.5 shrink-0" />
                                    <p>{job.support}</p>
                                </div>
                            </section>

                            <section>
                                <h3 className="text-lg font-bold text-slate-900 mb-3 border-b pb-2">Условия и льготы</h3>
                                <p className="text-slate-700">{job.benefits}</p>
                            </section>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm sticky top-24">
                        <h3 className="font-bold text-slate-900 mb-4">Контакты</h3>

                        <div className="space-y-4 mb-6">
                            <div className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-slate-400" />
                                <div>
                                    <p className="text-xs text-slate-500">Телефон</p>
                                    <p className="font-medium text-slate-900">{job.school?.phone}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-slate-400" />
                                <div>
                                    <p className="text-xs text-slate-500">Email</p>
                                    <a href={`mailto:${job.school?.email}`} className="font-medium text-primary hover:underline">{job.school?.email}</a>
                                </div>
                            </div>
                        </div>

                        <Button
                            onClick={handleApplyClick}
                            disabled={isApplying}
                            className="w-full bg-primary hover:bg-primary/90 h-12 text-lg text-primary-foreground"
                        >
                            {isApplying ? (hasApplied ? "Отмена..." : "Отправка...") : (hasApplied ? "Отменить отклик" : "Откликнуться")}
                        </Button>
                        <p className="text-xs text-slate-400 text-center mt-3">
                            Отклик будет отправлен напрямую работодателю
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default JobDetail;
