import { useNavigate } from 'react-router'
import { Button } from './ui/button'

export function BackButton({
    variant = 'outline',
    children = 'Назад',
    ...props
}) {
    const navigate = useNavigate()
    return (
        <Button variant={variant} onClick={() => navigate(-1)} {...props}>
            {children}
        </Button>
    )
}
