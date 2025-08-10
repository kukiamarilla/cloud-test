// @ts-ignore
import logo from '../../../img/escama-logo.svg';
import { HamburgerIcon } from '../ui/icons/hamburger';
import { Button } from '../ui/button';
import { Sidebar } from '../ui/sidebar';
import { SidebarMenu } from './sidebar-menu';
import { ThemeToggle } from '../ui/theme-toggle';
import { useTheme } from '../../contexts/theme-context';
import { useState } from 'react';

export const Header = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { theme } = useTheme();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    return (
        <>
            <header className='flex flex-row items-center justify-between p-4 pt-safe bg-background border-b sticky top-0 z-50'>
                <div className='flex flex-row items-center gap-2' style={{position: 'relative'}}>
                    <img 
                        src={logo} 
                        alt="logo" 
                        className={`w-16 h-16 ${theme === 'dark' ? 'invert' : ''}`} 
                    />
                    <span className='text-2xl font-bold'>escama</span>
                    <span className='text-sm text-muted-foreground' style={{position: 'absolute', bottom: '18px', left: 'calc(100% + 10px)'}}>v0.1.0</span>
                    <span  style={{
                        position: 'absolute', 
                        bottom: '18px', 
                        left: "calc(64px + 0.5rem + 2px)",
                        width: '10px',
                        height: '2px',
                        backgroundColor: '#11dd11',
                        content: '""',
                    }}/>
                    <span  style={{
                        position: 'absolute', 
                        top: '24px', 
                        // left: "calc(64px + 0.5rem + 12px)",
                        right: '1px',
                        width: '10px',
                        height: '2px',
                        backgroundColor: 'red',
                        content: '""',
                    }}/>
                </div>
                <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <Button variant="ghost" size="icon" className="h-10 w-10" onClick={toggleSidebar}>
                        <HamburgerIcon className="text-foreground size-7" />
                    </Button>
                </div>
            </header>

            <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} title="Menú">
                <SidebarMenu onClose={closeSidebar} />
            </Sidebar>
        </>
    )
}