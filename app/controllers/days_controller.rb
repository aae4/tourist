class DaysController < ApplicationController
	private
    def day_params
      params.require(:day).permit(:name, :diet_id, :sequence, meal_types_attributes: [:name, :meal_type])
    end
end
