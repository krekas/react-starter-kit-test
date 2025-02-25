import AppLayout from '@/layouts/app-layout'
import {Head, useForm} from '@inertiajs/react'
import {FormEventHandler} from "react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import InputError from "@/components/input-error";
import {Button} from "@/components/ui/button";
import {BreadcrumbItem} from "@/types";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tasks List',
        href: route('tasks.index'),
    },
    {
        title: 'Create Task',
        href: route('tasks.create'),
    },
];

interface TaskForm {
    title: string;
    description: string;
}

export default function Create() {
    const { data, setData, post, processing, errors } = useForm<TaskForm>({
        title: '',
        description: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('tasks.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Task"/>

            <div className="p-4">
                <form className="space-y-6" onSubmit={submit}>
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                type="text"
                                required
                                autoFocus
                                tabIndex={1}
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                            />
                            <InputError message={errors.title} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                required
                                tabIndex={2}
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                            />
                            <InputError message={errors.description} />
                        </div>
                    </div>

                    <Button size="sm" disabled={processing}>Save</Button>
                </form>
            </div>
        </AppLayout>
    )
}
