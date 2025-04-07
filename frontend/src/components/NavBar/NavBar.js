import './NavBar.css';

export default function NavBar() {
    return (
        <nav class="navbar">
            <a href="/" id="sitetitle">BetterHelp</a>
            <ul>
                <CustomLink href="/">Home</CustomLink>
                <CustomLink href="/clients">Clients</CustomLink>
                <CustomLink href="/therapists">Therapists</CustomLink>
                <CustomLink href="/sessions">Sessions</CustomLink>
            </ul>
        </nav>
    )
}

function CustomLink({ href, children, ...props }) {
    const path = window.location.pathname;

    return (
        <li className={path === href ? "active" : ""}>
            <a href={href} {...props}>{children}</a>
        </li>
    )
}