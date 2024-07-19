class UsersController < ApplicationController
    def create
        @user = User.new(user_params)
        if @user.save
            render json: { success: true }, status: :created
        else
            render json: { error: @user.errors }, status: :unprocessable_entity
        end
    end
    
    def user_params
        user_params = params.require(:user).permit(:username, :password)
    end
end