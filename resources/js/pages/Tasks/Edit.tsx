import AppLayout from '@/layouts/app-layout'
import {Head, useForm} from '@inertiajs/react'
import {FormEventHandler} from "react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import InputError from "@/components/input-error";
import {Button} from "@/components/ui/button";
import {BreadcrumbItem, Task} from "@/types";
import log from "eslint-plugin-react/lib/util/log";


interface TaskForm {
    title: string;
    description: string;
}

export default function Edit({ task }: { task: Task }) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Tasks List',
            href: route('tasks.index'),
        },
        {
            title: 'Edit Task: ' + task.data.title,
            href: route('tasks.edit', {task:task.data.id}),
        },
    ];

    const { data, setData, patch, processing, errors } = useForm<TaskForm>({
        title: task.data.title,
        description: task.data.description,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route('tasks.update', {task:task.data.id}));
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
