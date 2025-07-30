<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'Trabajo'],
            ['name' => 'Comida'],
            ['name' => 'Transporte'],
            ['name' => 'Entretenimiento'],
            ['name' => 'Salud'],
            ['name' => 'Educación'],
            ['name' => 'Vivienda'],
            ['name' => 'Servicios'],
            ['name' => 'Ropa'],
            ['name' => 'Otros'],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
} 