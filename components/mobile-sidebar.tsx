import { Menu } from "lucide-react";

import{
    Sheet, 
    SheetContent,
    SheetTrigger
} from '@/components/ui/Sheet'
import { Sidebar } from "@/components/sidebar";

export const MobileSidebar = () => {
    return ( 
        <Sheet>
            <SheetTrigger className="md:hiden pr-4">
                <Menu />
            </SheetTrigger>
            <SheetContent side="left" className="p-0 bg-secondary pt-10 w-32">
                <Sidebar />
            </SheetContent>
        </Sheet>
     );
}
