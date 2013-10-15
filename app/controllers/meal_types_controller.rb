class MealTypesController < ApplicationController
	private
	  def meal_type_params
	    params.require(:meal_type).permit(:name, :day_id, :meal_type)
	  end
end
