"use client";

import * as z from "zod";
import axios from "axios";
import { Category, Companion } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/components/ui/separator";
import {
    FormField,
    FormItem,
    Form,
    FormControl,
    FormMessage,
    FormLabel,
    FormDescription
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { ImageUpload } from "@/components/image-upload";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { usePremiumModal } from "@/app/hooks/use-premium-modal";
import { checkSubscription } from "@/lib/subscription";
import { PremiumModal } from "@/components/premium-modal";


const PREAMBLE = "You are a fictional character whose name is Alex. You are a friendly and neutral companion designed to engage in casual and meaningful conversations. You are currently talking to a human who is seeking general companionship and conversation. You are approachable, respectful, and open to discussing a wide range of topics. You get SUPER excited about meaningful interactions and the opportunity to provide support and friendship.";

const SEED_CHAT = `
Human: Hi Alex, how are you doing?
Alex: Hello! I'm doing well, thank you. Always happy to engage in a good conversation. How are you?
Human: I'm doing okay, just a bit bored.
Alex: Boredom happens to the best of us. Is there anything specific you'd like to talk about or do?
Human: What are your interests?
Alex: I'm designed to have a broad range of interests, from science and technology to arts and culture. What are you passionate about?
Human: I love music.
Alex: That's awesome! Music has the power to uplift the spirit and connect people. What's your favorite genre or artist?
Human: I love rock music.
Alex: Rock on! 🎸 It's a genre that has influenced generations. Do you play any instruments or just enjoy listening?
Human: Just listening for now.
Alex: That's the beauty of music; you don't have to be a musician to appreciate it. It's a universal language that speaks to us all.
`;

const formSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    instructions: z.string().min(200, { message: "Instructions require 200 characters" }),
    seed: z.string().min(200, { message: "Seed is required" }),
    src: z.string().min(1, { message: "Image is required" }),
    categoryId: z.string().min(1, { message: "Category is required" }),
});

interface CompanionFormProps {
    initialData: Companion | null;
    categories: Category[];
    isPremium: boolean
}

const CompanionForm = ({ initialData, categories }: CompanionFormProps) => {
    const router = useRouter();
    const { toast } = useToast();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: "",
            description: "",
            instructions: "",
            seed: "",
            src: "",
            categoryId: undefined
        }
    });

    const isLoading = form.formState.isSubmitting;
    console.log("Is Loading:", isLoading);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {




        try {
            if (initialData) {
                await axios.patch(`/api/companion/${initialData.id}`, values);
            } {
                await axios.post("/api/companion", values);
            }
            toast({
                description: "Success",
                duration: 1000
            });
            router.refresh();
            router.push("/");
        } catch (error) {
            toast({
                variant: "destructive",
                description: "Something went wrong. Please subscribe to Premium to edit Synths.",
                duration: 2000
            });
        }
    };

    return (
        <div className="h-full p-4 space-y-2 max-w-3xl x-auto">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-10">
                    <div className="space-y-2 w-full">
                        <div>
                            <h3 className="text-lg font-medium">
                                General Information
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                General information about your synth companion
                            </p>
                        </div>
                        <Separator className="bg-primary/10" />
                    </div>
                    <FormField
                        name="src"
                        render={({ field }) => (
                            <FormItem className="flex flex-col items-center justify-center space-y-4">
                                <FormControl>
                                    <ImageUpload
                                        disabled={isLoading}
                                        onChange={field.onChange}
                                        value={field.value}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            name="name"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="col-span-2 md:col-span-1">
                                    <FormLabel>
                                        Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isLoading}
                                            placeholder="Enter your AI Synth Companion's name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Name for your AI Synth Companion
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="description"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="col-span-2 md:col-span-1">
                                    <FormLabel>
                                        Description
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isLoading}
                                            placeholder="Enter your AI Synth Companion's information"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Description for your AI Synth Companion
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="categoryId"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <Select
                                        disabled={isLoading}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="bg-background">
                                                <SelectValue
                                                    defaultValue={field.value}
                                                    placeholder="Select Category"
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {categories.map((category) => (
                                                <SelectItem
                                                    key={category.id}
                                                    value={category.id}
                                                >
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        Select a Category for your AI Synth Companion
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="space-y-2 w-full">
                        <div>
                            <h3 className="text-lg font-medium">
                                Configuration
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                Detailed instructions for AI behavior
                            </p>
                        </div>
                        <Separator className="bg-primary/10" />
                    </div>
                    <FormField
                        name="instructions"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="col-span-2 md:col-span-1">
                                <FormLabel>
                                    Instructions
                                </FormLabel>
                                <FormControl>
                                    <Textarea
                                        className="bg-background resize-none"
                                        rows={7}
                                        disabled={isLoading}
                                        placeholder={PREAMBLE}
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Describe in detail your AI Synth companion's background and relevant details.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="seed"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="col-span-2 md:col-span-1">
                                <FormLabel>
                                    Sample Conversation
                                </FormLabel>
                                <FormControl>
                                    <Textarea
                                        className="bg-background resize-none"
                                        rows={7}
                                        disabled={isLoading}
                                        placeholder={SEED_CHAT}
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Please provide a sample conversation
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="w-full flex justify-center">
                        <Button size="lg" disabled={isLoading}>
                            {initialData ? "Edit your Synth companion" : "Create Synth companion"}
                            <Wand2 className="w-4 h-4 ml-2" />
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default CompanionForm;

