import Link from 'next/link';

export default function Header() {
    return (
        <header className="bg-white shadow-sm sticky top-0 z-30">
            <Link href="/home" className="flex items-center my-2">
                <p className="text-2xl text-black">
                    <span className=" text-teal-500 ml-8 mr-2">#</span>
                    掲示板アプリ
                </p>
            </Link>
        </header>
    );
};