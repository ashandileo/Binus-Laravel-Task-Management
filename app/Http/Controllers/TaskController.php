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
        $formattedDueDate = Carbon::parse($request->due_date)->format('Y-m-d');

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
}