class Api::AccountsController < ApplicationController
    def create
        @user = User.new(user_params)
        if @user.save
            session[:user_id] = @user.id
            render json: {
                status: :created,
                logged_in: true,
                user: @user
            }
        else
            render json: @user.errors, status: :unprocessable_entity
        end
    end
    
    def user_params
        user_params = params.require(:user).permit(:username, :password)
    end
end
