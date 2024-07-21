class PasswordStrengthScoresControllerTest < ActionDispatch::IntegrationTest
  test "password_strength_controller_score_0" do
    post '/api/password-strength-scores', params: { password: 'password' }
    assert_response :created
    assert_equal JSON.parse(response.body), {"score" => 0}
  end

  test "password_strength_controller_score_1" do
    post '/api/password-strength-scores', params: { password: 'passwordpassword123456' }
    assert_response :created
    assert_equal JSON.parse(response.body), {"score" => 1}
  end

  test "password_strength_controller_score_2" do
    post '/api/password-strength-scores', params: { password: 'Str0ngP@ss' }
    assert_response :created
    assert_equal JSON.parse(response.body), {"score" => 2}
  end

  test "password_strength_controller_score_3" do
    post '/api/password-strength-scores', params: { password: 'Str0ng_P@ss' }
    assert_response :created
    assert_equal JSON.parse(response.body), {"score" => 3}
  end

  test "password_strength_controller_score_4" do
    post '/api/password-strength-scores', params: { password: 'Str0ng_P@ssw0d!' }
    assert_response :created
    assert_equal JSON.parse(response.body), {"score" => 4}
  end
end