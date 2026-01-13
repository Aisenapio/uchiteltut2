import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { useQuery } from '@apollo/client/react';
import { GET_CURRENT_USER } from '@/graphql/authOperations';

const PublicHeader = () => {
    const navigate = useNavigate();
    const { loading, error, data } = useQuery(GET_CURRENT_USER, {
        fetchPolicy: 'cache-first'
    });

    const currentUser = data?.currentUser;
    const isTeacher = currentUser?.role === 'teacher';
    const isSchool = currentUser?.role === 'school';
    const isAuthenticated = !!currentUser;

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <div className="container flex h-16 items-center justify-between mx-auto px-4">
                <div className="flex items-center gap-2">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                            У
                        </div>
                        <span className="hidden font-bold sm:inline-block text-primary">
                            Учитель тут
                        </span>
                    </Link>
                </div>

                <div className="flex flex-1 items-center justify-end space-x-4">
                    <nav className="flex items-center space-x-2">
                        {isTeacher && (
                            <Link to="/dashboard/teacher/profile">
                                <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
                                    Составить резюме
                                </Button>
                            </Link>
                        )}
                        {isSchool && (
                            <Link to="/dashboard/school">
                                <Button variant="ghost" size="sm">
                                    Для школ
                                </Button>
                            </Link>
                        )}
                        {!isAuthenticated && !loading && (
                            <Link to="/login">
                                <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                                    Войти
                                </Button>
                            </Link>
                        )}
                        {isAuthenticated && (
                            <Link to={`/dashboard/${currentUser.role}`}>
                                <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                                    Личный кабинет
                                </Button>
                            </Link>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default PublicHeader;
