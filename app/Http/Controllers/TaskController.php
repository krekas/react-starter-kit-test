<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Http\Requests\TaskRequest;
use App\Http\Resources\TaskResource;
use Illuminate\Http\RedirectResponse;

class TaskController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Tasks/Index', [
            'tasks' => TaskResource::collection(Task::latest()->get()),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Tasks/Create');
    }

    public function store(TaskRequest $request): RedirectResponse
    {
        Task::create($request->validated());

        return to_route('tasks.index');
    }

    public function edit(Task $task): Response
    {
        return Inertia::render('Tasks/Edit', [
            'task' => TaskResource::make($task),
        ]);
    }

    public function update(TaskRequest $request, Task $task): RedirectResponse
    {
        $task->update($request->validated());

        return to_route('tasks.index');
    }

    public function destroy(Task $task): void
    {
        $task->delete();
    }
}
