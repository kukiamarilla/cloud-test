<?php

namespace App\Http\Requests\Movements;

use Illuminate\Foundation\Http\FormRequest;
use Carbon\Carbon;

class CreateMovementRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }


    public function prepareForValidation()
    {
        $this->merge([
            'date' => $this->input('date') ?? Carbon::today()->toDateString(),
        ]);
    }
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'description' => 'required|string|max:255|min:3',
            'amount' => 'required|integer|min:1',
            'date' => 'required|date',
            'type' => 'required|in:income,expense',
            'category_id' => 'required|exists:categories,id',
        ];
    }
}
