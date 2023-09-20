import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface SettingsPageProps {
    params: {
        sroteid: string;
    }
}

const SettingsPage: React.FC<SettingsPageProps> = async ({
    params
}) => {

    const { userId } = auth();

    if (!userId) redirect("/sign-in")

    const store = await prismadb.store.findFirst({
        where: {
            id: params.sroteid,
            userId,

        }
    })

    if (!store) return redirect("/")

    return (
        <div>
            hi settings
        </div>
    )
}

export default SettingsPage;