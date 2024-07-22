class Api::PasswordStrengthScoresController < ApplicationController
    def calculate_score
        @password = password_score_params[:password];
        @passwordScore = Zxcvbn.test(@password)[:score]
        render json: {score: @passwordScore}, status: :created
    end

    def password_score_params
        password_score_params = params.require(:password_strength_score).permit(:password)
    end
end