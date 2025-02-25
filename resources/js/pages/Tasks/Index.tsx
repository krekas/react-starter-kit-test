import AppLayout from '@/layouts/app-layout'
import {Head, router} from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import type {BreadcrumbItem, PaginatedData, Task} from "@/types";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import TextLink from "@/components/text-link";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tasks List',
        href: '/tasks',
    },
];

const destroy = (id: number) => {
    if (confirm('Are you sure?')) {
        router.delete(route('tasks.destroy', { id }));
    }
}

export default function Index({ tasks }: { tasks: PaginatedData<Task> }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tasks" />

            <div className="p-4">
                <TextLink href={route('tasks.create')} className="block mb-6" tabIndex={3}>
                    Create Task
                </TextLink>

                <Table>
                    <TableCaption>A list of tasks.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">ID</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Created</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tasks &&
                            tasks.data &&
                            tasks.data.map((task: Task) => (
                                <TableRow>
                                    <TableCell className="font-medium">{task.id}</TableCell>
                                    <TableCell>{task.title}</TableCell>
                                    <TableCell>{task.created_at}</TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <TextLink href={route('tasks.edit', { id: task.id })}>Edit</TextLink>
                                        <Button variant="destructive" size="sm" onClick={() => destroy(task.id)}>
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    );
}
