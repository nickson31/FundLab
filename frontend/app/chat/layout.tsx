import Sidebar from '@/components/shared/Sidebar';

export default function ChatLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-white dark:bg-gray-900">
            <Sidebar />
            <main className="flex-1 ml-[60px] transition-all duration-300">
                {children}
            </main>
        </div>
    );
}
