import { Button } from '@/components/ui/button';
import { Pencil, Shapes } from 'lucide-react';

export default function UtilitySidebar(){
    return (
        <>
        {/* Sidebar Tools */}
        <aside className="w-20 bg-gray-100 border-r p-4 flex flex-col items-center space-y-4">
          <Pencil />
          <Shapes />
          <Button size="icon" variant="ghost">⬜</Button>
          <Button size="icon" variant="ghost">🔺</Button>
          <Button size="icon" variant="ghost">🔷</Button>
        </aside>
        </>
    )
}