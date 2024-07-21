class Api::PasswordStrengthScoresController < ApplicationController
    def calculate_score
        logger.debug :params.inspect
        @passwordScore = Zxcvbn.test(params[:password])[:score]
        logger.debug @passwordScore.inspect
        render json: {score: @passwordScore}, status: :created
    end
end