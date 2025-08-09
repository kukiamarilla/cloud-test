<?php

namespace App\Http\Requests\Groupers;

use Illuminate\Foundation\Http\FormRequest;

class CreateGrouperRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'categories' => 'required|array',
            'categories.*' => 'required|exists:categories,id',
        ];
    }
}
