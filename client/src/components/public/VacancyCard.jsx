import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Briefcase, Calendar, School } from "lucide-react";
import { Link } from "react-router";

const VacancyCard = ({ job }) => {
    // Determine data structure based on whether it's from server or mock
    const schoolName = job.school?.name || job.school;
    const region = job.school?.district || job.region;
    const openDate = job.openDate || job.open_date; // in case the field name differs

    return (
        <Card className="hover:shadow-lg transition-shadow duration-300 border-slate-200">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-xl text-blue-900 mb-2">{job.position}</CardTitle>
                        <CardDescription className="flex items-center gap-1.5 text-slate-600">
                            <School className="w-4 h-4" /> {schoolName}
                        </CardDescription>
                    </div>
                    <Badge variant={job.studentEmployment ? "default" : "secondary"} className={job.studentEmployment ? "bg-green-100 text-green-700 hover:bg-green-200 border-green-200" : ""}>
                        {job.salary}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid gap-2 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-slate-400" />
                        <span>{region}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-slate-400" />
                        <span>{job.hours}</span>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                    {job.housing && job.housing !== "Нет" && (
                        <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                            🏠 Жильё
                        </Badge>
                    )}
                    {job.studentEmployment && (
                        <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">
                            🎓 Для студентов
                        </Badge>
                    )}
                </div>

            </CardContent>
            <CardFooter className="border-t bg-slate-50/50 p-4">
                <div className="flex items-center justify-between w-full">
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(openDate).toLocaleDateString()}
                    </span>
                    <Link to={`/job/${job.id}`}>
                        <Button variant="outline" size="sm" className="border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-800">
                            Подробнее
                        </Button>
                    </Link>
                </div>
            </CardFooter>
        </Card>
    );
};

export default VacancyCard;
