import { Menu } from "lucide-react";

import{
    Sheet, 
    SheetContent,
    SheetTrigger
} from './ui/Sheet'
import { Sidebar } from "./sidebar";

export const MobileSidebar = ({
    isPremium
}: {
    isPremium: boolean;
}) => {
    console.log("Is Premium in MobileSidebar:", isPremium); 
    return ( 
        <Sheet>
            <SheetTrigger className="md:hiden pr-4">
                <Menu />
            </SheetTrigger>
            <SheetContent side="left" className="p-0 bg-secondary pt-10 w-32">
                <Sidebar isPremium={isPremium}/>
            </SheetContent>
        </Sheet>
     );
}
