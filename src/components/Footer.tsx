
import { useTranslations } from 'next-intl';
import { Button } from './ui/button'
import { LuFacebook } from "react-icons/lu";
import { LuInstagram } from "react-icons/lu";

export function Footer() {
    const t = useTranslations('footerText')
    return (

        <footer className="bg-white-500 dark:bg-gray-800 text-red-500 border-t-2 border-red-500 ">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <p className="text-sm ">
                            {t('title')}</p>
                    </div>
                    <div className="flex space-x-4">
                        <Button variant="ghost" size="icon" aria-label="Facebook">
                            <a href="https://www.facebook.com/yilmazyapi09" target="_blank" rel="noopener noreferrer">
                                <LuFacebook className="h-5 w-5" />
                            </a>
                        </Button>
                        <Button variant="ghost" size="icon" aria-label="Instagram">
                            <a href="https://www.instagram.com/yilmazlargrup0948/" target="_blank" rel="noopener noreferrer">
                                <LuInstagram className="h-5 w-5" />
                            </a>
                        </Button>
                    </div>

                </div>
            </div>
        </footer>


    )
}
