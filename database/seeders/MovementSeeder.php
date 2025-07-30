<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Movement;
use App\Models\Category;
use Carbon\Carbon;

class MovementSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = Category::all();

        if ($categories->isEmpty()) {
            $this->call(CategorySeeder::class);
            $categories = Category::all();
        }

        $movements = [
            // Ingresos
            [
                'description' => 'Salario mensual',
                'amount' => 5000,
                'date' => Carbon::now()->subDays(5),
                'type' => 'income',
                'category_id' => $categories->where('name', 'Trabajo')->first()->id,
            ],
            [
                'description' => 'Freelance diseño',
                'amount' => 800,
                'date' => Carbon::now()->subDays(3),
                'type' => 'income',
                'category_id' => $categories->where('name', 'Trabajo')->first()->id,
            ],
            [
                'description' => 'Venta de artículos',
                'amount' => 200,
                'date' => Carbon::now()->subDays(1),
                'type' => 'income',
                'category_id' => $categories->where('name', 'Otros')->first()->id,
            ],

            // Gastos
            [
                'description' => 'Supermercado',
                'amount' => 150,
                'date' => Carbon::now()->subDays(2),
                'type' => 'expense',
                'category_id' => $categories->where('name', 'Comida')->first()->id,
            ],
            [
                'description' => 'Gasolina',
                'amount' => 80,
                'date' => Carbon::now()->subDays(4),
                'type' => 'expense',
                'category_id' => $categories->where('name', 'Transporte')->first()->id,
            ],
            [
                'description' => 'Cine',
                'amount' => 25,
                'date' => Carbon::now()->subDays(6),
                'type' => 'expense',
                'category_id' => $categories->where('name', 'Entretenimiento')->first()->id,
            ],
            [
                'description' => 'Luz',
                'amount' => 120,
                'date' => Carbon::now()->subDays(7),
                'type' => 'expense',
                'category_id' => $categories->where('name', 'Servicios')->first()->id,
            ],
            [
                'description' => 'Internet',
                'amount' => 60,
                'date' => Carbon::now()->subDays(8),
                'type' => 'expense',
                'category_id' => $categories->where('name', 'Servicios')->first()->id,
            ],
            [
                'description' => 'Restaurante',
                'amount' => 45,
                'date' => Carbon::now()->subDays(9),
                'type' => 'expense',
                'category_id' => $categories->where('name', 'Comida')->first()->id,
            ],
            [
                'description' => 'Zapatos nuevos',
                'amount' => 120,
                'date' => Carbon::now()->subDays(10),
                'type' => 'expense',
                'category_id' => $categories->where('name', 'Ropa')->first()->id,
            ],
        ];

        foreach ($movements as $movement) {
            Movement::create($movement);
        }
    }
} 