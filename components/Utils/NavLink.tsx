import Link from 'next/link';
import styled from 'styled-components';

// Create a custom component that wraps an <a> tag

const PrimaryLink = styled.a`
    color: rgba(8, 178, 122, 1);
    &:visited {
        color: rgba(8, 178, 122, 1) !important;
        text-decoration: none !important;
    }
    text-decoration: none;
`;

const SecondaryLink = styled.a`
    color: rgba(65, 65, 65, 1);
    &:visited {
        color: rgba(65, 65, 65, 1) !important;
        text-decoration: none !important;
    }
    text-decoration: none;
`;
interface NavLinkInterface {
    href: string;
    name: string | JSX.Element;
    className?: any;
    textSecondary?: boolean;
}

function NavLink({ href, name, className, textSecondary }: NavLinkInterface): JSX.Element {
    if (textSecondary === true) {
        return (
            <Link href={href} passHref>
                <SecondaryLink className={className}>{name}</SecondaryLink>
            </Link>
        );
    } else {
        return (
            <Link href={href} passHref>
                <PrimaryLink className={className}>{name}</PrimaryLink>
            </Link>
        );
    }
}

export default NavLink;
