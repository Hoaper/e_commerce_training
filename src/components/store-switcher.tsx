'use client';

import { useStoreModal } from "@/hooks/use-store-modal";
import { Store } from "@prisma/client";
import { PopoverTrigger, PopoverTriggerProps } from "@radix-ui/react-popover";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Popover, PopoverContent } from "./ui/popover";
import { Button } from "./ui/button";
import { Check, ChevronsUpDown, PlusCircle, PlusCircleIcon, StoreIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandList, CommandSeparator, CommandItem } from "./ui/command";

interface StoreSwitcherProps extends PopoverTriggerProps {
    items: Store[];
}

export default function StoreSwitcher({
    className,
    items = []
}: StoreSwitcherProps) { 

    const storeModel = useStoreModal();
    const params = useParams();
    const router = useRouter();
    
    const formattedItems = items.map((item, index) => ({
        label: item.name,
        value: item.id,
        key: index
    }))

    const [open, setOpen] = useState(false);

    const currentStore = formattedItems.find((item) => item.value === params.storeid)
    const onStoreSelect = (store: {value: string, label: string}) => {
        setOpen(false);
        router.push(`/store/${store.value}`);
    }
    

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button 
                    variant="outline" 
                    size="sm"
                    role="combobox"
                    aria-expanded={open}
                    aria-label="Select a store"
                    className={cn("w-[250px] justify-between", className)}
                >
                    <StoreIcon className="mr-2 h-4 w-4"/>
                    {currentStore?.label}
                    <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[250px] p-0">
                <Command>
                    <CommandList>
                        <CommandInput placeholder="Search a store" />
                        <CommandEmpty>No stores found.</CommandEmpty>
                        <CommandGroup heading="Stores">
                            {formattedItems.map((item, index) => (
                                <CommandItem key={index} onClick={() => onStoreSelect(item)}>
                                    <StoreIcon className="mr-2 h-4 w-4" />
                                    {item.label}
                                    <Check 
                                        className={
                                            cn("ml-auto h-4 w-4", 
                                                currentStore?.value === item.value
                                                ? "opacity-100" : "opacity-0"
                                            )
                                        } 
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                    <CommandSeparator />
                    <CommandList>
                        <CommandGroup>
                            <CommandItem 
                                onSelect={() => {
                                        setOpen(false)
                                        storeModel.onOpen();
                                    }
                                }
                            >
                                <PlusCircle className="h-5 w-4 mr-2" />
                                Create store
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}