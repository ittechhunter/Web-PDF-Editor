import {ReactNode} from "react";
import {useRouter} from "next/router";


type LayoutProps = {
    centered?: boolean;
    title?: string;
    heading?: ReactNode;
    subtitle?: ReactNode;
    headerClassName?: string;
    children: ReactNode;
    CTA?: ReactNode;
    large?: boolean;
    MobileNavigationContainer?: ReactNode;
    SidebarContainer?: ReactNode;
    TopNavContainer?: ReactNode;
    // drawerState?: DrawerState;
    HeadingLeftIcon?: ReactNode;
    backPath?: string | boolean; // renders back button to specified path
    // use when content needs to expand with flex
    flexChildrenContainer?: boolean;
    isPublic?: boolean;
    withoutMain?: boolean;
    // Gives you the option to skip HeadSEO and render your own.
    withoutSeo?: boolean;
    // Gives the ability to include actions to the right of the heading
    actions?: ReactNode;
    beforeCTActions?: ReactNode;
    afterHeading?: ReactNode;
    smallHeading?: boolean;
    hideHeadingOnMobile?: boolean;
};

const Layout = (props: LayoutProps)=>{

    const router = useRouter();
    const pageTitle = typeof props.heading === "string" && !props.title ? props.heading : props.title;
}
