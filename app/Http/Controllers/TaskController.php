<?php
namespace App\Http\Controllers;

use App\Models\Task;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

// Import Carbon for date formatting

class TaskController extends Controller
{
    public function index()
    {
        // Fetch tasks only for the authenticated user
        $tasks = Task::where('user_id', auth()->id())->latest()->get();

        return Inertia::render('Dashboard', [
            'tasks' => $tasks, // Pass tasks to the frontend
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'task_name' => 'required|string|max:255',
            'progress'  => 'required|integer|min:0|max:100',
            'due_date'  => 'required|date',
        ]);

        // Convert due_date to MySQL format (YYYY-MM-DD)
        $formattedDueDate = Carbon::parse($request->due_date)->setTimezone(config('app.timezone'))->format('Y-m-d');

        // Determine status based on progress
        $status = $request->progress >= 100 ? 'Completed' : 'In Progress';

        $task = Task::create([
            'user_id'   => auth()->id(),
            'task_name' => $request->task_name,
            'status'    => $status, // Auto-set status
            'progress'  => $request->progress,
            'due_date'  => $formattedDueDate, // Store formatted date
        ]);

        return redirect()->back()->with('success', 'Task created successfully!');
    }

    /**
     * Update an existing task
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'task_name' => 'required|string|max:255',
            'progress'  => 'required|integer|min:0|max:100',
            'due_date'  => 'required|date',
        ]);

        // Find the task, ensure it belongs to the authenticated user
        $task = Task::where('user_id', auth()->id())->findOrFail($id);

        // Convert due_date to MySQL format (YYYY-MM-DD)
        $formattedDueDate = Carbon::parse($request->due_date)->setTimezone(config('app.timezone'))->format('Y-m-d');

        // Determine status based on progress
        $status = $request->progress >= 100 ? 'Completed' : 'In Progress';

        // Update the task
        $task->update([
            'task_name' => $request->task_name,
            'status'    => $status, // Auto-update status
            'progress'  => $request->progress,
            'due_date'  => $formattedDueDate, // Store formatted date
        ]);

        return redirect()->back()->with('success', 'Task updated successfully!');
    }

    public function destroy($id)
    {
        // Ensure only the owner can delete their task
        $task = Task::where('user_id', auth()->id())->findOrFail($id);

        $task->delete();

        return redirect()->back()->with('success', 'Task deleted successfully!');
    }
}