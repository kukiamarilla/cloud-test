<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Movement;
use App\Http\Requests\Movements\CreateMovementRequest;
use App\Http\Requests\Movements\UpdateMovementRequest;
use Carbon\Carbon;

class MovementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Movement::with('category');

        // Filtro por fecha desde
        if ($request->filled('date_from')) {
            $dateFrom = Carbon::parse($request->date_from)->startOfDay();
            $query->where('date', '>=', $dateFrom);
        }

        // Filtro por fecha hasta
        if ($request->filled('date_to')) {
            $dateTo = Carbon::parse($request->date_to)->endOfDay();
            $query->where('date', '<=', $dateTo);
        }

        // Filtro por tipo (income/expense)
        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }

        // Filtro por categoría
        if ($request->filled('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        // Ordenamiento
        $sortBy = $request->get('sort_by', 'date');
        $sortOrder = $request->get('sort_order', 'desc');
        $query->orderBy($sortBy, $sortOrder);

        // Paginación
        $perPage = $request->get('per_page', 15);
        $movements = $query->with('category')->paginate($perPage);

        return response()->json($movements);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateMovementRequest $request)
    {
        //
        $movement = Movement::create($request->all());
        return response()->json($movement, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $movement = Movement::find($id);
        if (!$movement) {
            return response()->json(['message' => 'Movement not found'], 404);
        }
        return response()->json($movement);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMovementRequest $request, string $id)
    {
        //
        $movement = Movement::find($id);
        if (!$movement) {
            return response()->json(['message' => 'Movement not found'], 404);
        }
        $movement->update($request->all());
        return response()->json($movement);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $movement = Movement::find($id);
        if (!$movement) {
            return response()->json(['message' => 'Movement not found'], 404);
        }
        $movement->delete();
        return response()->json(null, 204);
    }

    /**
     * Get movement statistics
     */
    public function statistics(Request $request)
    {
        $query = Movement::query();

        // Filtro por fecha desde
        if ($request->filled('date_from')) {
            $dateFrom = Carbon::parse($request->date_from)->startOfDay();
            $query->where('date', '>=', $dateFrom);
        }

        // Filtro por fecha hasta
        if ($request->filled('date_to')) {
            $dateTo = Carbon::parse($request->date_to)->endOfDay();
            $query->where('date', '<=', $dateTo);
        }

        // Filtro por categoría
        if ($request->filled('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        $totalIncome = (clone $query)->where('type', 'income')->sum('amount');
        $totalExpense = (clone $query)->where('type', 'expense')->sum('amount');
        $balance = $totalIncome - $totalExpense;
        $totalMovements = $query->count();

        return response()->json([
            'total_income' => $totalIncome,
            'total_expense' => $totalExpense,
            'balance' => $balance,
            'total_movements' => $totalMovements,
            'date_range' => [
                'from' => $request->get('date_from'),
                'to' => $request->get('date_to')
            ]
        ]);
    }
}
