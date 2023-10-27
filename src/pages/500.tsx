import HTTP500 from "@/components/features/errors/HTTP500";


import PageWrapper from "@/components/PageWrapper";

export default function Page() {

    return (
        <HTTP500/>
    );
}

Page.PageWrapper = PageWrapper;
