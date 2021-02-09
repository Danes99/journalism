// Import pre-installed components
import Link from 'next/link'

// Header
export default function Header() {

    return (
        <header>
            <Link href="/">
                <img src='/svg/logo.svg' alt='Logo' />
            </Link>
        </header>
    )
}