<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Movement;
use App\Http\Requests\Movements\CreateMovementRequest;
use App\Http\Requests\Movements\UpdateMovementRequest;

class MovementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $movements = Movement::all();
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
}
