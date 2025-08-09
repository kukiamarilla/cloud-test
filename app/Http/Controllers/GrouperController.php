<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Grouper;
use App\Http\Requests\Groupers\CreateGrouperRequest;
use App\Http\Requests\Groupers\UpdateGrouperRequest;
use App\Models\Movement;
use Carbon\Carbon;

class GrouperController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $groupers = Grouper::with('categories')->get();
        return response()->json($groupers);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateGrouperRequest $request)
    {
        $grouper = Grouper::create($request->all());
        $grouper->categories()->attach($request->categories);
        $grouper->load('categories');
        return response()->json($grouper);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $grouper = Grouper::find($id);
        return response()->json($grouper);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateGrouperRequest $request, string $id)
    {
        $grouper = Grouper::find($id);
        $grouper->update($request->all()); 
        $grouper->categories()->sync($request->categories);
        $grouper->load('categories');
        return response()->json($grouper);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $grouper = Grouper::find($id);
        $grouper->delete();
        return response()->json($grouper);
    }

    public function movements(Request $request, string $id)
    {
        $grouper = Grouper::find($id);
        $query = Movement::whereIn('category_id', $grouper->categories->pluck('id'));

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

        $movements = $query->get();
        return response()->json($movements);
    }
}
